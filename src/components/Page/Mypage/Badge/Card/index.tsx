const cn = classNames.bind(styles);

import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";

import DetailModal from "../DetailModal";
import styles from "./card.module.scss";

interface CardProps {
  cardData: {
    emblemPath: string;
    badgeName: string;
    badgeDescription: string;
  };
}

export default function Card({ cardData }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={cn("container")}>
        <div className={cn("emblem")} onClick={() => setIsModalOpen(true)}>
          <Image
            src={cardData.emblemPath}
            alt="배지 이미지"
            width={60}
            height={60}
          />
        </div>
        <div className={cn("name")}>{cardData.badgeName}</div>
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
