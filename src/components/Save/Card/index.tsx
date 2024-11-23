import "swiper/css";
import "swiper/css/pagination";

import classNames from "classnames/bind";
import Image from "next/image";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./card.module.scss";

const cn = classNames.bind(styles);

interface ListCardProps {
  category: string;
}

export default function Card({ category }: ListCardProps) {
  return (
    <div>
      <div className={cn("cardWrap")}>
        <div className={cn("cardWrap2")}>
          <div className={cn("time")}>오전 12:12</div>
          <div className={cn("cardWrap3")}>
            <div className={cn("textWrap")}>
              <div className={cn("category")}>디저트 먹었다치고</div>
              <div className={cn("money")}>1110000원 지켰다</div>
            </div>
            <div className={cn("categoryIcon")}>
              <Image
                src={`/icons/ic-${category}.svg`}
                alt="카테고리 아이콘"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
        <div className={cn("editWrap")}>
          <div className={cn("cardEdit")}>수정</div>
          <div className={cn("cardDelete")}>삭제</div>
        </div>
      </div>
    </div>
  );
}
