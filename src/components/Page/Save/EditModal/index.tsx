import classNames from "classnames/bind";
import styles from "./editModal.module.scss";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useAtom } from "jotai";

import Button from "@/components/commons/Button";
import { categoryActionMap, categoryNameMap } from "@/constants/category";
import AmountInput from "../AmountInput";
import CategorySelector from "../CategorySelector";
import { formatToCustomDate } from "@/constants/date";
import { selectedCategoryAtom } from "@/lib/atoms/category";
import { putVirtualItem } from "@/lib/apis/virtualItems";
import { isModalOpenAtom } from "@/lib/atoms/modal";

const cn = classNames.bind(styles);

interface EditModalProps {
  onClose: () => void;
  category: string;
  money: number;
  date: string;
  time: string;
  savingId: number;
  onUpdate?: () => void;
  onComplete?: () => void;
}

export default function EditModal({
  onClose,
  category: initialCategory,
  money,
  date,
  time,
  savingId,
  onUpdate,
  onComplete,
}: EditModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [amount, setAmount] = useState(money);
  const [isFocused, setIsFocused] = useState(false);
  const [, setIsAmountFocused] = useState(false);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const [, setIsModalOpen] = useAtom(isModalOpenAtom);

  // 초기 카테고리 설정
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory, setSelectedCategory]);

  useEffect(() => {
    setIsModalOpen(true);
    return () => setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

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

  const handleComplete = async () => {
    try {
      const savingData = {
        savingYmd: date,
        savingTime: time,
        categoryName: selectedCategory,
        amount: amount,
      };

      await putVirtualItem(savingId, savingData);

      if (onUpdate) {
        onUpdate(); // 수정 후 데이터 새로고침
      }

      if (onComplete) {
        onComplete(); // 스와이프 상태 초기화
      }

      handleClose();
    } catch (error) {
      console.error("Failed to update virtual item:", error);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className={cn("modalBack")} onClick={handleClose}></div>
      <div
        className={cn("modalWrap", { closing: isClosing })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn("bar")}></div>
        <div className={cn("time")}>{formatToCustomDate(date, time)}</div>
        <div className={cn("content", { editing: isEditingCategory })}>
          <div className={cn("categoryText")}>
            <Image
              src={`/icons/ic-${selectedCategory}.svg`}
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
                {categoryNameMap[selectedCategory]}
              </span>
              {categoryActionMap[selectedCategory]}
            </p>
          </div>
          <div className={cn("categoryMoney", { hidden: isEditingCategory })}>
            <AmountInput
              value={amount}
              onChange={(newValue) => setAmount(newValue)}
              inputRef={amountInputRef}
              onFocus={() => {
                setIsAmountFocused(true);
                setIsEditingAmount(true);
              }}
              onBlur={() => setIsAmountFocused(false)}
            />
            <span>원 지켰다</span>
          </div>
          {isFocused && !isEditingAmount && (
            <Button
              className={cn("button")}
              onClick={handleNextClick}
              disabled={selectedCategory === "none"}
            >
              다음
            </Button>
          )}
          {isEditingAmount && (
            <Button
              className={cn("button")}
              onClick={handleComplete}
              disabled={selectedCategory === "none" || amount === 0}
            >
              완료
            </Button>
          )}
        </div>
        <div className={cn("categorySelector", { hidden: isEditingCategory })}>
          <CategorySelector onSelect={handleCategorySelect} />
        </div>
      </div>
    </div>
  );
}
