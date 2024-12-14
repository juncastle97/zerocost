import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import arrowOn from "@/../public/icons/arrowOn.svg";

import alcoholImg from "@/../public/icons/ic-alcohol.svg";
import chickenImg from "@/../public/icons/ic-chicken.svg";
import coffeeImg from "@/../public/icons/ic-coffee.svg";
import cosmeticImg from "@/../public/icons/ic-cosmetic.svg";
import dessertImg from "@/../public/icons/ic-dessert.svg";
import drinkImg from "@/../public/icons/ic-drink.svg";
import fandomImg from "@/../public/icons/ic-fandom.svg";
import gameImg from "@/../public/icons/ic-game.svg";
import hairImg from "@/../public/icons/ic-hair.svg";
import mealImg from "@/../public/icons/ic-meal.svg";
import movieImg from "@/../public/icons/ic-movie.svg";
import shoppingImg from "@/../public/icons/ic-shopping.svg";
import smokeImg from "@/../public/icons/ic-smoke.svg";
import taxiImg from "@/../public/icons/ic-taxi.svg";
import travelImg from "@/../public/icons/ic-travel.svg";
import { getMainItems } from "@/lib/apis/main";
import { countMain, mainChoice } from "@/lib/atoms/main";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import styles from "./Main.module.scss";

const cn = classNames.bind(styles);

export default function Main1() {
  const [, setMainOrder] = useAtom(countMain);
  const [, setChoice] = useAtom(mainChoice);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // 이미지 매핑
  const imageMap: { [key: string]: string } = {
    cosmetic: cosmeticImg,
    hair: hairImg,
    shopping: shoppingImg,
    taxi: taxiImg,
    travel: travelImg,
    fandom: fandomImg,
    game: gameImg,
    meal: mealImg,
    alcohol: alcoholImg,
    coffee: coffeeImg,
    drink: drinkImg,
    chicken: chickenImg,
    dessert: dessertImg,
    smoke: smokeImg,
    movie: movieImg,
  };

  // 한글 제목 매핑
  const nameMap: { [key: string]: string } = {
    cosmetic: "화장품",
    hair: "미용",
    shopping: "쇼핑",
    taxi: "차비",
    travel: "여행",
    fandom: "덕질",
    game: "취미",
    meal: "밥",
    alcohol: "술",
    coffee: "커피",
    drink: "음료",
    chicken: "야식",
    dessert: "디저트",
    smoke: "담배",
    movie: "영화",
  };

  const handleChoice = (item: string) => {
    setChoice((prevChoice) => ({
      ...prevChoice,
      categoryName: item,
    }));
    setMainOrder(1);
  };

  const { data: mainItemBox } = useQuery({
    queryKey: ["mainItemBox"],
    queryFn: getMainItems,
  });

  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.realIndex); // 루프일 경우 realIndex 사용
  };

  // 현재 활성화된 슬라이드 이름 가져오기
  const currentCategory = mainItemBox?.categoryNames?.[activeSlideIndex] || "";

  return (
    <>
      {/* 활성화된 슬라이드에 따른 제목 */}
      <h2 className={cn("title")}>{nameMap[currentCategory] || "이것을"}</h2>

      <div className="swiper-button-next">
        <Image
          src={arrowOn}
          alt="위로 가기"
          width={32}
          height={17}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <Swiper
        id="mainSlide"
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-prev", // prev와 next를 서로 바꿈
          prevEl: ".swiper-button-next", // prev와 next를 서로 바꿈
        }}
        modules={[Navigation, Pagination]}
        loop={true}
        className={cn("slide")}
        onSlideChange={handleSlideChange}
      >
        {mainItemBox?.categoryNames?.map((item, index) => {
          const img = imageMap[item] || "";
          const isActive = index === activeSlideIndex;

          return (
            <SwiperSlide key={index}>
              <div className={cn("imageWrapper", { active: isActive })}>
                <Image
                  src={img}
                  alt="메인 슬라이드 이미지"
                  width={300}
                  height={300}
                  onClick={() => isActive && handleChoice(item)}
                  style={{
                    cursor: isActive ? "pointer" : "default",
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="swiper-button-prev">
        <Image
          src={arrowOn}
          alt="아래로 가기"
          width={32}
          height={17}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* 활성화된 슬라이드에 따른 부제목 */}
      <h2 className={cn("subTitle")}>
        {(() => {
          switch (currentCategory) {
            case "cosmetic":
              return "샀다치고";
            case "hair":
              return "했다치고";
            case "shopping":
              return "했다치고";
            case "taxi":
              return "탔다치고";
            case "travel":
              return "갔다치고";
            case "fandom":
              return "했다치고";
            case "game":
              return "했다치고";
            case "meal":
              return "먹었다치고";
            case "alcohol":
              return "마셨다치고";
            case "coffee":
              return "마셨다치고";
            case "drink":
              return "마셨다치고";
            case "chicken":
              return "먹었다치고";
            case "dessert":
              return "먹었다치고";
            case "smoke":
              return "피웠다치고";
            case "movie":
              return "봤다치고";
            default:
              return "샀다치고";
          }
        })()}
      </h2>
    </>
  );
}
