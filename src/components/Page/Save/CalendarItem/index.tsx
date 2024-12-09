import classNames from "classnames/bind";
import styles from "./calendarItem.module.scss";

const cn = classNames.bind(styles);

import Image from "next/image";
import { formatToKoreanCurrency } from "@/constants/formattedAmount";

interface CategorySummary {
  categoryName: string;
  categoryTotalAmount: number;
}

interface CalendarItemProps {
  day: number;
  categorySummaries: CategorySummary[];
}

export default function CalendarItem({
  day,
  categorySummaries,
}: CalendarItemProps) {
  const displaySummaries = categorySummaries.slice(0, 2);
  const remainingCount = categorySummaries.length - 2;

  return (
    <div className={cn("container")}>
      <div className={cn("day")}>{day}</div>
      <div className={cn("categories")}>
        {displaySummaries.map((summary, index) => (
          <div key={index} className={cn("category")}>
            <Image
              src={`/icons/ic-${summary.categoryName}.svg`}
              alt={`${summary.categoryName} 아이콘`}
              width={16}
              height={16}
            />
            <div className={cn("amount")}>
              {formatToKoreanCurrency(summary.categoryTotalAmount)}
            </div>
          </div>
        ))}
        {remainingCount > 0 && (
          <div className={cn("category", "more")}>
            <span>...</span>
          </div>
        )}
      </div>
    </div>
  );
}
