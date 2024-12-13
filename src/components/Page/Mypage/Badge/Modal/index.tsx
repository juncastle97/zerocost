import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./modal.module.scss";
import Button from "@/components/commons/Button";
import { useState } from "react";

const cn = classNames.bind(styles);

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleConfirm = () => {
    handleClose();
    router.push("/mypage/badge");
  };

  return (
    <>
      <div
        className={cn("modalBack", { closing: isClosing })}
        onClick={handleClose}
      ></div>
      <div className={cn("container", { closing: isClosing })}>
        <div className={cn("title")}>뱃지 획득을 축하드려요!</div>
        <div className={cn("imageWrap")}>
          <Image
            src={"/icons/ic-first-badge.svg"}
            alt="첫만남 뱃지"
            width={60}
            height={60}
            className={cn("image")}
          />
          <div>첫만남</div>
        </div>
        <Button className={cn("button")} onClick={handleConfirm}>
          확인하러 가기
        </Button>
      </div>
    </>
  );
}
