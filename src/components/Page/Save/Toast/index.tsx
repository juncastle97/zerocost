"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { toastAtom } from "@/lib/atoms/toast";
import classNames from "classnames/bind";
import styles from "./toast.module.scss";

const cn = classNames.bind(styles);

export default function Toast() {
  const [toast, setToast] = useAtom(toastAtom);

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast({ isVisible: false, count: 0 });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, setToast]);

  if (!toast.isVisible) return null;

  return (
    <div className={cn("container")}>
      <div className={cn("text")}>{toast.count}개의 항목이 삭제되었습니다.</div>
      {/* <div className={cn("back")}>되돌리기</div> */}
    </div>
  );
}
