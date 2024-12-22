import "swiper/css";
import "swiper/css/pagination";

import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState, useRef, TouchEvent, MouseEvent, useEffect } from "react";

import styles from "./card.module.scss";
import { toastAtom } from "@/lib/atoms/toast";

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
  const [, setToast] = useAtom(toastAtom);
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const options = { passive: false };

    const touchStartHandler = (e: TouchEvent) => {
      e.stopPropagation();
      startXRef.current = e.touches[0].clientX;
      isDraggingRef.current = true;
    };

    const touchMoveHandler = (e: TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isDraggingRef.current || startXRef.current === null) return;

      const currentX = e.touches[0].clientX;
      const diffX = startXRef.current - currentX;

      if (diffX > 50) {
        setIsSwipedLeft(true);
      } else if (diffX < -50) {
        setIsSwipedLeft(false);
      }
    };

    const touchEndHandler = (e: TouchEvent) => {
      e.stopPropagation();
      startXRef.current = null;
      isDraggingRef.current = false;
    };

    card.addEventListener("touchstart", touchStartHandler as any, options);
    card.addEventListener("touchmove", touchMoveHandler as any, options);
    card.addEventListener("touchend", touchEndHandler as any, options);

    return () => {
      card.removeEventListener("touchstart", touchStartHandler as any);
      card.removeEventListener("touchmove", touchMoveHandler as any);
      card.removeEventListener("touchend", touchEndHandler as any);
    };
  }, []);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteVirtualItem(id);
      setToast({ isVisible: true, type: "single" });
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Failed to delete virtual item:", error);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isDraggingRef.current || startXRef.current === null) return;

    const diffX = startXRef.current - e.clientX;
    if (diffX > 50) {
      setIsSwipedLeft(true);
    } else if (diffX < -50) {
      setIsSwipedLeft(false);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.stopPropagation();
    startXRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div className={className}>
      <div
        ref={cardRef}
        className={cn("cardWrap", { swiped: isSwipedLeft })}
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
