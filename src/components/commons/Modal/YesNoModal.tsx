import classNames from "classnames/bind";
import { ReactNode } from "react";
import style from "./modal.module.scss";
import Portal from "./potal";

const cn = classNames.bind(style);

interface YesNoModalProps {
  back: () => void;
  confirm: () => void;
  children: ReactNode;
}

export default function YesNoModal({
  back,
  confirm,
  children,
}: YesNoModalProps) {
  return (
    <Portal>
      <div className={cn("modalWrap")}>
        <div className={cn("modalBox")}>
          <p className={cn("text")}>{children}</p>
          <div className={cn("btnBox")}>
            <button className={cn("back")} onClick={back}>
              취소
            </button>
            <button className={cn("confirm")} onClick={confirm}>
              확인
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
