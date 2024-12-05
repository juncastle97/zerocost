import "swiper/css";
import "swiper/css/pagination";

import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";

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

interface ListCardProps {
  category: string;
  amount: number;
  date: string;
  className?: string;
}

export default function Card({
  category,
  amount,
  date,
  className,
}: ListCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEdit] = useAtom(listEditState);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div className={className}>
      <div className={cn("cardWrap")}>
        <div className={cn("cardWrap2")}>
          <div className={cn("timeWrap")}>
            {isEdit && <CheckBox />}
            <div className={cn("time")}>{formatTimeToAmPm(date)}</div>
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
          <div className={cn("cardDelete")}>삭제</div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditModal
          onClose={() => setIsEditModalOpen(false)}
          category={category}
          money={amount}
          date={date}
        />
      )}
    </div>
  );
}
