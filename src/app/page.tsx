"use client";

import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Swiper navigation styles

import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useRef } from "react"; // Swiper 참조를 위한 useRef
import { Swiper, SwiperSlide } from "swiper/react";

import { countMain, pathAtom } from "@/lib/atoms/main"; // 상태 관리용 atom
import styles from "./home.module.scss";

import BPage from "@/app/save/page"; // "B" 페이지 컴포넌트
import CPage from "@/app/statistics/page"; // "C" 페이지 컴포넌트
import Main1 from "@/components/Page/Main";
import End from "@/components/Page/Main/End";
import Main2 from "@/components/Page/Main/Main2";

import wonOff from "@/../public/icons/ic-won-state-off.svg";
import wonOn from "@/../public/icons/ic-won-state-on.svg";
import historyOff from "@/../public/icons/icon_historyOff.svg";
import historyOn from "@/../public/icons/icon_historyOn.svg";
import statOff from "@/../public/icons/statsOff.svg";
import statOn from "@/../public/icons/statsOn.svg";
import Image from "next/image";

const cn = classNames.bind(styles);

export default function Main({ isModalOpen, isEdting }: any) {
  const [mainOrder] = useAtom(countMain); // 현재 상태 가져오기
  const [nowPath, setNowPath] = useAtom(pathAtom);
  const swiperRef = useRef<any>(null); // Swiper 참조

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

  const handleNavigation = (slideIndex: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(slideIndex);
      setNowPath(slideIndex);
    }
  };
  const handleSlideChange = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.swiper.activeIndex;
      setNowPath(activeIndex);
    }
  };

  return (
    <div className={cn("mainWrap")} id="main">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        style={{ width: "100%", height: "100vh" }}
        loop={false}
        ref={swiperRef}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>{renderComponent(mainOrder)}</SwiperSlide>

        <SwiperSlide>
          <BPage />
        </SwiperSlide>

        <SwiperSlide>
          <CPage />
        </SwiperSlide>
      </Swiper>

      {/* 하단 GNB */}
      <div className={cn("bottomGnb")} id="bottomGnb">
        {nowPath === 0 ? (
          <button onClick={() => handleNavigation(0)}>
            <Image src={wonOn} alt={"main"} width={24} height={24} />
          </button>
        ) : (
          <button onClick={() => handleNavigation(0)}>
            <Image src={wonOff} alt={"main"} width={24} height={24} />
          </button>
        )}

        {nowPath === 1 ? (
          <button onClick={() => handleNavigation(1)}>
            <Image src={historyOn} alt={"history"} width={24} height={24} />
          </button>
        ) : (
          <button onClick={() => handleNavigation(1)}>
            <Image src={historyOff} alt={"history"} width={24} height={24} />
          </button>
        )}

        {nowPath === 2 ? (
          <button onClick={() => handleNavigation(2)}>
            <Image src={statOn} alt={"stat"} width={24} height={24} />
          </button>
        ) : (
          <button onClick={() => handleNavigation(2)}>
            <Image src={statOff} alt={"stat"} width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );
}
