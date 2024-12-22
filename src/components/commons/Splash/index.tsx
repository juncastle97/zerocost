"use client";

import logo from "@/../public/icons/ic-logo.svg";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./splash.module.scss";

const cn = classNames.bind(style);

export default function Splash() {
  const [loading, setLoading] = useState(false); // 초기 상태 false로 변경

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = Cookies.get("visited");

      if (hasVisited !== "true") {
        setLoading(true); // 처음 방문할 때만 로딩 화면을 보여줌
        Cookies.set("visited", "true", { expires: 1 }); // 쿠키 설정
        setTimeout(() => {
          setLoading(false); // 3초 후 로딩 종료
        }, 3000);
      }
    }
  }, []);

  return (
    loading && (
      <div className={cn("splashWrap")}>
        <div className={cn("splash")}>
          <Image src={logo} alt="logo" width={164} height={164} />
          <p>zerocost</p>
        </div>
      </div>
    )
  );
}
