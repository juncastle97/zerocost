"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const cn = classNames.bind(styles);
import classNames from "classnames/bind";

import Card from "@/components/Page/Mypage/Badge/Card";

import styles from "./badge.module.scss";
import { data } from "./data";

export default function Badge() {
  const router = useRouter();

  const processedData = data.map((item) => ({
    ...item,
    badgeDescription: item.badgeDescription || "상세내용이 없습니다",
  }));

  return (
    <>
      <div className={cn("gnb")}>
        <Image
          src="/icons/ic-left-arrow-white.svg"
          alt="뒤로가기"
          width={40}
          height={40}
          onClick={() => router.back()}
          className={cn("back")}
        />
        <div>나의 배지</div>
      </div>
      <div className={cn("cardContainer")}>
        {processedData.map((item, index) => (
          <Card key={index} cardData={item} />
        ))}
      </div>
    </>
  );
}
