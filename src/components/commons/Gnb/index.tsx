"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import pig from "@/../public/icons/ic-logo.svg";
import user from "@/../public/icons/icon_user.svg";
import { useRouter } from "next/navigation";
import styles from "./gnb.module.scss";

const cn = classNames.bind(styles);

export default function Gnb() {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [gnbMore] = useState();
  const router = useRouter();

  useEffect(() => {
    const loginState = localStorage.getItem("login");
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }

    if (loginState === "false" || loginState === null) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className={cn("gnbWrap")}>
      <Link href={"/"}>
        <Image src={pig} alt={"로고"} width={40} height={40} />
      </Link>
      <div>{gnbMore}</div>

      {/* 현재 경로가 "/mypage"가 아니면 렌더링 */}
      {currentPath !== "/mypage" && (
        <Link href={"/mypage"}>
          <Image src={user} alt={"메뉴"} width={30} height={30} />
        </Link>
      )}
    </div>
  );
}
