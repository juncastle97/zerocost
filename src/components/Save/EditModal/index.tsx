import classNames from "classnames/bind";

import styles from "./editModal.module.scss";

const cn = classNames.bind(styles);
import Image from "next/image";
import { useState } from "react";

import CategorySelector from "../CategorySelector";

interface EditModalProps {
  onClose: () => void;
  category: string;
}

export default function EditModal({ onClose, category }: EditModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div>
      <div className={cn("modalBack")} onClick={handleClose}></div>
      <div className={cn("modalWrap", { closing: isClosing })}>
        <div className={cn("bar")}></div>
        <div className={cn("time")}>1월 4일 (월) 오전 08:20</div>
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
                className={cn("underline")}
                onClick={() => setIsEditingCategory(true)}
              >
                {category}
              </span>
              먹었다치고
            </p>
          </div>
          <div className={cn("categoryMoney", { hidden: isEditingCategory })}>
            <span className={cn("underline")}>00000</span> 원 지켰다
          </div>
        </div>
        <div className={cn("categorySelector", { hidden: isEditingCategory })}>
          <CategorySelector />
        </div>
      </div>
    </div>
  );
}
