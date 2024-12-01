import classNames from "classnames/bind";
import { ReactNode, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./modal.module.scss";
import Portal from "./potal";

const cn = classNames.bind(styles);

interface YesNoModalProps {
  back: () => void;
  confirm: () => void;
  children: ReactNode;
  ver?: number;
}

export default function YesNoModal({
  back,
  confirm,
  children,
  ver,
}: YesNoModalProps) {
  const ref = useRef(null);
  const handleClickOutside = () => {
    back();
  };

  useOnClickOutside(ref, handleClickOutside);
  return (
    <Portal>
      <div className={cn("modalWrap")}>
        <div className={cn("modalBack")}></div>
        <div className={cn("modalBox")} ref={ref}>
          <p className={cn("text")}>{children}</p>
          <div className={cn("btnBox")}>
            <button className={cn("back")} onClick={back}>
              {ver === 2 ? "아니요" : "취소"}
            </button>
            <button className={cn("confirm")} onClick={confirm}>
              {ver === 2 ? "네" : "확인"}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
