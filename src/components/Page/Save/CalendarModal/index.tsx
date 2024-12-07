import classNames from "classnames/bind";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { useRef, useState } from "react";

import styles from "./calendarModal.module.scss";

const cn = classNames.bind(styles);

import Button from "@/components/commons/Button";
import CategorySelector from "@/components/Page/Save/CategorySelector";
import { categoryActionMap, categoryNameMap } from "@/constants/category";

import AmountInput from "../AmountInput";
import Card from "../Card";
import calendarData from "../Data/calendarData.json";
import { formatToKoreanCurrency } from "@/constants/formattedAmount";

interface CalendarModalProps {
  date: Date;
  day: number;
  onClose: () => void;
}

export default function CalendarModal({
  date,
  day,
  onClose,
}: CalendarModalProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [category] = useState("coffee");
  const [amount, setAmount] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const selectedDay = calendarData.days.find((dayData) => dayData.day === day);
  const selectedDayData = selectedDay?.items || [];
  const selectedDayTotalAmount = selectedDay?.dayTotalAmount || 0;

  const handleNextClick = () => {
    if (!isEditingAmount) {
      setIsEditingAmount(true);
      setIsEditingCategory(false);
      setIsFocused(false);
      setTimeout(() => {
        amountInputRef.current?.focus();
      }, 0);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSaveClick = () => {
    setIsButtonClicked(true);
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
          <Image
            src={"/icons/ic-left-arrow-white.svg"}
            alt="뒤로가기"
            width={30}
            height={30}
            className={cn("back")}
            onClick={handleClose}
          />
          <div className={cn("time")}>
            {format(date, "M월 d일 (eee)", { locale: ko })}
          </div>
        </div>
        {!isButtonClicked ? (
          selectedDayData.length > 0 ? (
            <>
              <div className={cn("total")}>
                <div>총 {selectedDayData.length}건</div>
                <div>+ {formatToKoreanCurrency(selectedDayTotalAmount)}원</div>
              </div>
              <div className={cn("cardWrap")}>
                {selectedDayData.map((item) => (
                  <Card
                    key={item.savingId}
                    category={item.categoryName}
                    amount={item.amount}
                    date={item.savingYmd}
                    time={item.savingTime}
                    className={cn("card")}
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
                <Image
                  src={`/icons/ic-${category}.svg`}
                  alt="카테고리 아이콘"
                  width={34}
                  height={34}
                />
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
              {(isFocused || isEditingAmount) && (
                <Button className={cn("button")} onClick={handleNextClick}>
                  {isEditingAmount ? "완료" : "다음"}
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
