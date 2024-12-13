const cn = classNames.bind(styles);

import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";

import DetailModal from "../DetailModal";
import styles from "./card.module.scss";
import { BadgeItem } from "@/lib/apis/badge";

interface CardProps {
  cardData: BadgeItem;
}

export default function Card({ cardData }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={cn("container")}>
        <div
          className={cn("emblem", { locked: cardData.acquireYN === "N" })}
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={
              cardData.acquireYN === "Y"
                ? cardData.emblemPath
                : "/icons/ic-lock.svg"
            }
            alt={cardData.acquireYN === "Y" ? "배지 이미지" : "잠금 이미지"}
            width={60}
            height={60}
          />
        </div>
        <div className={cn("name", { locked: cardData.acquireYN === "N" })}>
          {cardData.badgeName}
        </div>
      </div>
      <div className={cn("modal")}>
        <DetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          badgeData={cardData}
        />
      </div>
    </>
  );
}
