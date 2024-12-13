"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import { useQuery } from "@tanstack/react-query";

import Card from "@/components/Page/Mypage/Badge/Card";
import { getBadgesList, BadgeItem } from "@/lib/apis/badge";
import styles from "./badge.module.scss";

const cn = classNames.bind(styles);

export default function Badge() {
  const router = useRouter();

  const {
    data: badges,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["badges"],
    queryFn: getBadgesList,
  });

  if (isLoading) {
    return <div className={cn("container")}>Loading...</div>;
  }

  if (error) {
    return <div className={cn("container")}>Error loading badges</div>;
  }

  const processedData =
    badges?.map((item) => ({
      ...item,
      badgeDescription: item.badgeDescription || "상세내용이 없습니다",
    })) || [];

  // 배지를 타입별로 그룹화
  const groupedBadges = processedData.reduce(
    (acc, badge) => {
      const type = badge.badgeTypeKr;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(badge);
      return acc;
    },
    {} as Record<string, BadgeItem[]>
  );

  return (
    <div className={cn("container")}>
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
      <div className={cn("content")}>
        {Object.entries(groupedBadges).map(([type, badges]) => (
          <div key={type} className={cn("badgeSection")}>
            <div className={cn("sectionTitle")}>{type}</div>
            <div className={cn("cardContainer")}>
              {badges.map((item) => (
                <Card key={item.badgeId} cardData={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
