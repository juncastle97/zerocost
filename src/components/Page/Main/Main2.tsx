import classNames from "classnames/bind";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import logo from "@/../public/icons/ic-logo.svg";
import saveBtn from "@/../public/images/button.svg";
import { postVirtualItem } from "@/lib/apis/virtualItem";
import { countMain, mainChoice } from "@/lib/atoms/main";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";
import styles from "./Main.module.scss";

const cn = classNames.bind(styles);

export default function Main1() {
  const [, setMainOrder] = useAtom(countMain);
  const [choice, setChoice] = useAtom(mainChoice);
  const [num, setNum] = useState<number[]>([]);

  const numBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const nowDate = new Date();
  const date =
    nowDate.getFullYear() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    String(nowDate.getDate()).padStart(2, "0");

  const amount = Number(num.join("")) || 0; // 현재 금액 계산
  console.log(nowDate.getDate());
  const handleChoice = () => {
    // 금액이 0원이면 함수 종료
    if (amount === 0) {
      return;
    }

    setChoice((prevChoice) => ({
      ...prevChoice,
      amount,
      savingYmd: date,
    }));
    postItem();
  };

  const handleSlideChange = (swiper, index: number) => {
    setNum((prev) => {
      const updatedNum = [...prev];
      updatedNum[index] = numBox[swiper.realIndex];
      return updatedNum;
    });
  };
  const { mutate: postItem } = useMutation({
    mutationKey: ["postItem"],
    mutationFn: () => postVirtualItem(choice),
    onSuccess: () => {
      setMainOrder(2);
    },
    onError: (error) => {
      console.error("저장 실패:", error);
    },
  });
  return (
    <>
      <h2 className={cn("title")}>
        <Image src={logo} alt="로고" width={158} />
      </h2>

      <div className={cn("countWrap")}>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <Swiper
              key={`swiper-${index}`}
              id="mainSlide2"
              direction={"vertical"}
              slidesPerView={3}
              centeredSlides={true}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, Pagination]}
              loop={true}
              className={cn("slide")}
              onSlideChange={(swiper) => handleSlideChange(swiper, index)}
              onClick={(swiper, event: any) => {
                const target = event.target as HTMLElement;
                const swiperElement =
                  target.closest(".swiper-container") ||
                  target.closest(".swiper");

                if (swiperElement) {
                  const rect = swiperElement.getBoundingClientRect();
                  // 터치 이벤트와 마우스 이벤트 모두 처리
                  const clientY = event.touches
                    ? event.touches[0].clientY
                    : event.clientY;
                  const height = rect.height;

                  // 중간 영역(33% ~ 66%)은 클릭 무시
                  if (
                    clientY - rect.top > height * 0.33 &&
                    clientY - rect.top < height * 0.66
                  ) {
                    return;
                  }

                  // 상단이면 이전, 하단이면 다음
                  if (clientY - rect.top < height * 0.33) {
                    swiper.slidePrev();
                  } else {
                    swiper.slideNext();
                  }
                }
              }}
            >
              {numBox.map((item) => (
                <SwiperSlide key={item}>
                  <p className={cn("countNum")}>{item}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          ))}
        <p className={cn("countNum")}>원</p>
      </div>
      <h2
        className={cn("subTitle", { active: amount > 0 })}
        onClick={handleChoice}
      >
        <Image src={saveBtn} alt="지키기" width={200} height={100} />
      </h2>
      <div className={cn("back")} onClick={() => setMainOrder(0)}>
        {"<- "}뒤로가기
      </div>
    </>
  );
}
