import "swiper/css";
import "swiper/css/pagination";

import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState, useRef, TouchEvent, MouseEvent } from "react";

import styles from "./card.module.scss";

const cn = classNames.bind(styles);

import CheckBox from "@/components/commons/CheckBox";
import { listEditState } from "@/lib/atoms/list";
import EditModal from "../EditModal";
import {
  categoryActionMap,
  categoryNameReverseMap,
} from "@/constants/category";
import { formatToKoreanCurrency } from "@/constants/formattedAmount";
import { formatTimeToAmPm } from "@/constants/date";
import { deleteVirtualItem } from "@/lib/apis/virtualItems";

interface ListCardProps {
  id: number;
  category: string;
  amount: number;
  date: string;
  time: string;
  className?: string;
  onDelete?: () => void;
}

export default function Card({
  id,
  category,
  amount,
  date,
  time,
  className,
  onDelete,
}: ListCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEdit] = useAtom(listEditState);
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteVirtualItem(id);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Failed to delete virtual item:", error);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchEnd = () => {
    startXRef.current = null;
    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: MouseEvent) => {
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || startXRef.current === null) return;

    const diffX = startXRef.current - e.clientX;
    if (diffX > 50) {
      setIsSwipedLeft(true);
    } else if (diffX < -50) {
      setIsSwipedLeft(false);
    }
  };

  const handleMouseUp = () => {
    startXRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div className={className}>
      <div
        className={cn("cardWrap", { swiped: isSwipedLeft })}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className={cn("cardWrap2")}>
          <div className={cn("timeWrap")}>
            {isEdit && <CheckBox savingId={id} />}
            <div className={cn("time")}>{formatTimeToAmPm(time)}</div>
          </div>
          <div className={cn("cardWrap3")}>
            <div className={cn("textWrap")}>
              <div className={cn("category")}>
                {categoryNameReverseMap[category]} {categoryActionMap[category]}
              </div>
              <div className={cn("money")}>
                {formatToKoreanCurrency(amount)}원 지켰다
              </div>
            </div>
            <div className={cn("categoryIcon")}>
              <Image
                src={`/icons/ic-${category}.svg`}
                alt="카테고리 아이콘"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
        <div className={cn("editWrap")}>
          <button className={cn("cardEdit")} onClick={handleEditClick}>
            수정
          </button>
          <button className={cn("cardDelete")} onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <EditModal
          onClose={() => setIsEditModalOpen(false)}
          category={category}
          money={amount}
          date={date}
          time={time}
          savingId={id}
          onUpdate={onDelete}
          onComplete={() => setIsSwipedLeft(false)}
        />
      )}
    </div>
  );
}
