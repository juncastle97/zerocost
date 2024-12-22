"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toastAtom } from "@/lib/atoms/toast";
import classNames from "classnames/bind";
import styles from "./toast.module.scss";

const cn = classNames.bind(styles);

export default function Toast() {
  const [toast, setToast] = useAtom(toastAtom);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isMounted && toast.isVisible) {
      timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [toast.isVisible, isMounted, setToast]);

  if (!isMounted || !toast.isVisible) return null;

  return (
    <div className={cn("container")}>
      <div className={cn("text")}>
        {toast.type === "multiple"
          ? `${toast.count}개의 항목이 삭제되었습니다.`
          : "기록이 삭제되었어요"}
      </div>
    </div>
  );
}
