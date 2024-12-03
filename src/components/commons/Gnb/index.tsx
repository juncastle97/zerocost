"use client";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import pig from "@/../public/icons/ic-logo.svg";
import user from "@/../public/icons/icon_user.svg";
import styles from "./gnb.module.scss";

const cn = classNames.bind(styles);

export default function Gnb() {
  const [isMypage, setIsMypage] = useState(false);

  useEffect(() => {
    // 클라이언트 환경에서만 실행
    if (typeof window !== "undefined") {
      setIsMypage(window.location.pathname === "/mypage");
    }
  }, []);

  return (
    <div className={cn("gnbWrap")}>
      <Link href={"/"}>
        <Image src={pig} alt={"로고"} width={40} height={40} />
      </Link>
      {!isMypage && (
        <Link href={"/mypage"}>
          <Image src={user} alt={"메뉴"} width={30} height={30} />
        </Link>
      )}
    </div>
  );
}
