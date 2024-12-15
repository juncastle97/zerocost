"use client";

import classNames from "classnames/bind";

import styles from "./gnb.module.scss";

const cn = classNames.bind(styles);

export default function Toast() {
  return (
    <div className={cn("container")}>
      <div>개의 기록이 삭제되었어요</div>
      <div>되돌리기</div>
    </div>
  );
}
