import classNames from "classnames/bind";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "@/lib/atoms/category";

import styles from "./calendarModal.module.scss";

const cn = classNames.bind(styles);

import Button from "@/components/commons/Button";
import CategorySelector from "@/components/Page/Save/CategorySelector";
import { categoryActionMap, categoryNameMap } from "@/constants/category";
import { formatToKoreanCurrency } from "@/constants/formattedAmount";
import {
  getVirtualItemCalendar,
  postVirtualItem,
} from "@/lib/apis/virtualItems";
import { DayData } from "@/types/virtualItems";
import AmountInput from "../AmountInput";
import Card from "../Card";

interface CalendarModalProps {
  date: Date;
  day: number;
  onClose: () => void;
  onUpdate: () => void;
}

type ModalDayData = Pick<DayData, "items" | "dayTotalAmount">;

export default function CalendarModal({
  date,
  day,
  onClose,
  onUpdate,
}: CalendarModalProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [category, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [amount, setAmount] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [dayData, setDayData] = useState<ModalDayData | null>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const fetchDayData = useCallback(async () => {
    try {
      const year = parseInt(format(date, "yyyy"));
      const month = parseInt(format(date, "M"));
      const response = await getVirtualItemCalendar(year, month);

      if (!response || !response.days) {
        setDayData({ items: [], dayTotalAmount: 0 });
        return;
      }

      const dayData = response.days.find((item) => item.day === day);

      if (!dayData) {
        setDayData({ items: [], dayTotalAmount: 0 });
        return;
      }

      setDayData({
        items: dayData.items,
        dayTotalAmount: dayData.dayTotalAmount,
      });
    } catch (error) {
      console.error("Failed to fetch day data:", error);
      setDayData({ items: [], dayTotalAmount: 0 });
    }
  }, [date, day]);

  useEffect(() => {
    fetchDayData();
  }, [fetchDayData]);

  console.log(dayData);

  const handleNextClick = () => {
    setIsEditingAmount(true);
    setIsEditingCategory(false);
    setIsFocused(false);
    setTimeout(() => {
      amountInputRef.current?.focus();
    }, 0);
  };

  const handleComplete = () => {
    const savingData = {
      savingYmd: format(date, "yyyy-MM-dd"),
      categoryName: category,
      amount: amount,
    };

    postVirtualItem(savingData)
      .then(() => {
        onUpdate();
        handleClose();
      })
      .catch((error) => {
        console.error("Failed to save virtual item:", error);
      });
  };

  const handleClose = () => {
    setIsClosing(true);
    setSelectedCategory("none");
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSaveClick = () => {
    setIsButtonClicked(true);
  };

  const handleBackClick = () => {
    setIsButtonClicked(false);
  };

  // const handleCategorySelect = (selectedCategory: string) => {
  //   setCategory(selectedCategory);
  //   setIsEditingCategory(false);
  // };

  return (
    <div>
      <div className={cn("modalBack")} onClick={handleClose}></div>
      <div className={cn("modalWrap", { closing: isClosing })}>
        <div className={cn("bar")}></div>
        <div className={cn("timeWrap")}>
          {isButtonClicked && (
            <Image
              src={"/icons/ic-left-arrow-white.svg"}
              alt="뒤로가기"
              width={30}
              height={30}
              className={cn("back")}
              onClick={handleBackClick}
            />
          )}
          <div className={cn("time")}>
            {format(date, "M월 d일 (eee)", { locale: ko })}
          </div>
        </div>
        {!isButtonClicked ? (
          dayData?.items.length ? (
            <>
              <div className={cn("total")}>
                <div>총 {dayData.items.length}건</div>
                <div>+ {formatToKoreanCurrency(dayData.dayTotalAmount)}원</div>
              </div>
              <div className={cn("cardWrap")}>
                {dayData.items.map((item) => (
                  <Card
                    key={item.savingId}
                    id={item.savingId}
                    category={item.categoryName}
                    amount={item.amount}
                    date={item.savingYmd}
                    time={item.savingTime}
                    className={cn("card")}
                    onDelete={() => {
                      fetchDayData();
                      onUpdate();
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className={cn("empty")}>
              <Image
                src="/icons/ic-logo.svg"
                alt="로고 이미지"
                width={74}
                height={74}
              />
              <div className={cn("emptyState")}>아직 지킨 돈이 없어요</div>
            </div>
          )
        ) : (
          <>
            <div className={cn("content", { editing: isEditingCategory })}>
              <div className={cn("categoryText")}>
                {category !== "none" && (
                  <Image
                    src={`/icons/ic-${category}.svg`}
                    alt="카테고리 아이콘"
                    width={34}
                    height={34}
                  />
                )}
                <p>
                  <span
                    className={cn("underline", { focused: isFocused })}
                    onClick={() => {
                      setIsEditingCategory(true);
                      setIsEditingAmount(false);
                    }}
                    onFocus={() => setIsFocused(true)}
                    tabIndex={0}
                  >
                    {categoryNameMap[category]}
                  </span>
                  {categoryActionMap[category]}
                </p>
              </div>
              <div
                className={cn("categoryMoney", { hidden: isEditingCategory })}
              >
                <AmountInput
                  value={amount}
                  onChange={(newValue) => setAmount(newValue)}
                  inputRef={amountInputRef}
                />
                <span>원 지켰다</span>
              </div>
              {(isButtonClicked || isFocused) && !isEditingAmount && (
                <Button
                  className={cn("button")}
                  onClick={handleNextClick}
                  disabled={category === "none"}
                >
                  다음
                </Button>
              )}
              {isEditingAmount && (
                <Button
                  className={cn("button")}
                  onClick={handleComplete}
                  disabled={category === "none" || amount === 0}
                >
                  완료
                </Button>
              )}
            </div>
            <div
              className={cn("categorySelector", { hidden: isEditingCategory })}
            >
              <CategorySelector />
            </div>
          </>
        )}
        {!isButtonClicked && (
          <Button className={cn("button")} onClick={handleSaveClick}>
            <div className={cn("plus")}>
              <Image
                src="/icons/ic-plus.svg"
                alt="더하기 아이콘"
                width={18}
                height={18}
              />
              <div>저금하기</div>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
