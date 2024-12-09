"use client";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./deleteToast.module.scss";

const cn = classNames.bind(styles);

interface DeleteToastProps {
  count: number;
  onClose: () => void;
}

export default function DeleteToast({ count, onClose }: DeleteToastProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트 환경임을 확인
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isClient) return null;

  return createPortal(
    <div className={cn("container")}>
      <div className={cn("notice")}>{count}개의 기록이 삭제되었어요</div>
      <button className={cn("back")}>되돌리기</button>
    </div>,
    document.body
  );
}
