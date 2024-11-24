"use client";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Swiper navigation styles

import classNames from "classnames/bind";
import { useAtom } from "jotai";

import Main1 from "@/components/Page/Main";

import End from "@/components/Page/Main/End";
import Main2 from "@/components/Page/Main/Main2";
import { loginState } from "@/lib/atoms/login";
import { countMain } from "@/lib/atoms/main";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./main.module.scss";

const cn = classNames.bind(styles);

export default function Main() {
  const [mainOrder, setMainOrder] = useAtom(countMain);

  const [login, setLogin] = useAtom(loginState);

  const router = useRouter();

  useEffect(() => {
    if (login === false) {
      router.push("login");
    }
  }, [login]);

  const renderComponent = (key: number) => {
    switch (key) {
      case 0:
        return <Main1 />;
      case 1:
        return <Main2 />;
      default:
        return <End />;
    }
  };

  return (
    <div className={cn("mainWrap")} id="main">
      {renderComponent(mainOrder)}
    </div>
  );
}
