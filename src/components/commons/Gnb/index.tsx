"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // usePathname 사용
import { useEffect, useState } from "react";
import styles from "./gnb.module.scss";

import pig from "@/../public/icons/ic-logo.svg";
import wonOff from "@/../public/icons/ic-won-state-off.svg";
import wonOn from "@/../public/icons/ic-won-state-on.svg";
import historyOff from "@/../public/icons/icon_historyOff.svg";
import historyOn from "@/../public/icons/icon_historyOn.svg";
import user from "@/../public/icons/icon_user.svg";
import statOff from "@/../public/icons/statsOff.svg";
import statOn from "@/../public/icons/statsOn.svg";

const cn = classNames.bind(styles);

export default function Gnb() {
  const [gnbMore] = useState();
  const pathname = usePathname(); // 현재 경로 가져오기

  useEffect(() => {
    const loginState = localStorage.getItem("login");
    if (
      (loginState === "false" || loginState === null) &&
      pathname !== "/login"
    ) {
      window.location.href = "/login"; // 로그인 상태 확인 후 리다이렉트
    }
  }, []);

  return (
    <>
      <div className={cn("gnbWrap")}>
        <Link href={"/"}>
          <Image src={pig} alt={"로고"} width={40} height={40} />
        </Link>
        <div>{gnbMore}</div>

        {/* 현재 경로가 "/mypage"가 아니면 렌더링 */}
        {pathname !== "/mypage" && (
          <Link href={"/mypage"}>
            <Image src={user} alt={"메뉴"} width={30} height={30} />
          </Link>
        )}
      </div>

      <div className={cn("bottomGnb")}>
        {pathname === "/" ? (
          <Link href={"/"}>
            <Image src={wonOn} alt={"main"} width={24} height={24} />
          </Link>
        ) : (
          <Link href={"/"}>
            <Image src={wonOff} alt={"main"} width={24} height={24} />
          </Link>
        )}

        {pathname === "/save" ? (
          <Link href={"/save"}>
            <Image src={historyOn} alt={"history"} width={24} height={24} />
          </Link>
        ) : (
          <Link href={"/save"}>
            <Image src={historyOff} alt={"history"} width={24} height={24} />
          </Link>
        )}

        {pathname === "/statistics" ? (
          <Link href={"/statistics"}>
            <Image src={statOn} alt={"stat"} width={24} height={24} />
          </Link>
        ) : (
          <Link href={"/statistics"}>
            <Image src={statOff} alt={"stat"} width={24} height={24} />
          </Link>
        )}
      </div>
    </>
  );
}
