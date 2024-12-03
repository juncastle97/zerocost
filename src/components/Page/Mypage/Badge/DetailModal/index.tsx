import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";

import styles from "./detailModal.module.scss";

const cn = classNames.bind(styles);

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeData: {
    emblemPath: string;
    badgeName: string;
    badgeDescription: string;
  };
}

export default function DetailModal({
  isOpen,
  onClose,
  badgeData,
}: DetailModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <div>
      <div className={cn("modalBack")} onClick={handleClose}></div>
      <div className={cn("modalWrap", { closing: isClosing })}>
        <div className={cn("bar")}></div>
        <div className={cn("content")}>
          <Image
            src={badgeData.emblemPath}
            alt="배지 상세 이미지"
            width={100}
            height={100}
            className={cn("emblem")}
          />
          <div className={cn("title")}>{badgeData.badgeName}</div>
          <div className={cn("description")}>{badgeData.badgeDescription}</div>
          <div className={cn("number")}>n명 획득</div>
        </div>
      </div>
    </div>
  );
}
