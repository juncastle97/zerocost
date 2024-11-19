"use client";
import "swiper/css"; // Import Swiper styles

import classNames from "classnames/bind";
import Image from "next/image";
import { Navigation, Pagination } from "swiper"; // Import required modules
import { Swiper, SwiperSlide } from "swiper/react";

import mainImg from "@/../public/icons/ic-coffee.svg";

import styles from "./main.module.scss";

const cn = classNames.bind(styles);

export default function Main() {
  return (
    <div className={cn("mainWrap")}>
      <h2 className={cn("title")}>커피</h2>

      <Swiper
        id="mainSlide"
        direction={"vertical"} // Set the direction to vertical
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className={cn("slide")}
      >
        <SwiperSlide>
          <Image
            src={mainImg}
            alt="메인 슬라이드 이미지"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={mainImg}
            alt="메인 슬라이드 이미지"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={mainImg}
            alt="메인 슬라이드 이미지"
            width={300}
            height={300}
          />
        </SwiperSlide>
      </Swiper>

      <h2 className={cn("subTitle")}>마셨다치고</h2>
    </div>
  );
}
