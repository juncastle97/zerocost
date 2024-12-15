"use client";

import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { countMain } from "@/lib/atoms/main";
import { isModalOpenAtom } from "@/lib/atoms/modal";
import { currentDateAtom } from "@/lib/atoms/date";
import { isCalendarViewAtom } from "@/lib/atoms/view";
import { listEditState } from "@/lib/atoms/list";
import styles from "./gnb.module.scss";
import MonthHeader from "@/components/commons/MonthHeader";

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
  const pathname = usePathname();
  const [mainOrder] = useAtom(countMain);
  const [isModalOpen] = useAtom(isModalOpenAtom);
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom);
  const [isCalendarView] = useAtom(isCalendarViewAtom);
  const [isEdting] = useAtom(listEditState);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const loginState = localStorage.getItem("login");
    if (
      (loginState === "false" || loginState === null) &&
      pathname !== "/login"
    ) {
      window.location.href = "/login";
    }
  }, [pathname]);

  useEffect(() => {
    // 페이지가 변경될 때만 현재 달로 업데이트
    if (
      prevPathname !== pathname &&
      (pathname === "/statistics" || (pathname === "/save" && isCalendarView))
    ) {
      setCurrentDate(new Date());
      window.location.reload();
    }
    setPrevPathname(pathname);
  }, [pathname, prevPathname, isCalendarView]);

  const showMonthHeader =
    pathname === "/statistics" || (pathname === "/save" && isCalendarView);

  return (
    <>
      <div className={cn("gnbWrap")}>
        <Link href={"/"}>
          <Image src={pig} alt={"로고"} width={40} height={40} />
        </Link>

        {showMonthHeader && (
          <MonthHeader
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        )}
        {pathname !== "/mypage" && (
          <Link href={"/mypage"}>
            <Image src={user} alt={"메뉴"} width={30} height={30} />
          </Link>
        )}
      </div>

      {pathname !== "/mypage" &&
        mainOrder === 0 &&
        !isModalOpen &&
        !isEdting && (
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
                <Image
                  src={historyOff}
                  alt={"history"}
                  width={24}
                  height={24}
                />
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
        )}
    </>
  );
}
