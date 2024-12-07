import classNames from "classnames/bind";
import styles from "./listView.module.scss";
import listData from "../Data/listData.json";
import Card from "../Card";
import { formatToKoreanCurrency } from "@/constants/formattedAmount";
import { groupByDate } from "@/constants/date";
import Image from "next/image";

const cn = classNames.bind(styles);

export default function Listview() {
  const groupedItems = groupByDate(listData);

  return (
    <div className={cn("listWrap")}>
      <div className={cn("saveMoney")}>
        <span>이번 달 지킨 돈</span>
        <span>{formatToKoreanCurrency(listData.totalAmount)}원</span>
      </div>
      {groupedItems.map((group, index) => (
        <div key={group.label} className={cn({ firstGroup: index === 0 })}>
          <div className={cn("date")}>{group.label}</div>
          {group.items.map((item) => (
            <Card
              key={item.savingId}
              category={item.categoryName}
              amount={item.amount}
              date={item.savingYmd}
              time={item.savingTime}
            />
          ))}
        </div>
      ))}
      {listData.dailyGroups.length === 0 && (
        <div className={cn("empty")}>
          <Image
            src="/icons/ic-logo.svg"
            alt="로고 이미지"
            width={74}
            height={74}
          />
          <div className={cn("emptyState")}>아직 지킨 돈이 없어요</div>
        </div>
      )}
    </div>
  );
}
