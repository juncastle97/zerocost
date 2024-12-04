"use client";

import classNames from "classnames/bind";
import { useRouter } from "next/navigation";

import styles from "./list.module.scss";

const cn = classNames.bind(styles);

import ListCard from "@/components/Page/Admin/ListCard";

export default function List() {
  const router = useRouter();
  const dummyData = Array(20).fill(null);

  const handleAddClick = () => {
    router.push("/admin/add");
  };

  return (
    <div className={cn("container")}>
      <button className={cn("button")} onClick={handleAddClick}>
        배지 추가
      </button>
      <div className={cn("scroll")}>
        {dummyData.map((_, index) => (
          <ListCard key={index} />
        ))}
      </div>
    </div>
  );
}
