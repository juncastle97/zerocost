import { addMonths, format, subMonths } from "date-fns";

const cn = classNames.bind(styles);

import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./monthHeader.module.scss";

interface MonthHeaderProps {
  onDateChange: (date: Date) => void;
  currentDate: Date;
}

export default function MonthHeader({
  onDateChange,
  currentDate,
}: MonthHeaderProps) {
  const today = new Date();
  const isCurrentMonth =
    format(currentDate, "yyyyMM") === format(today, "yyyyMM");

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    if (!isCurrentMonth) {
      const newDate = addMonths(currentDate, 1);
      onDateChange(newDate);
    }
  };

  return (
    <div className={cn("header")}>
      <button onClick={handlePrevMonth}>
        <Image
          src={"/icons/ic-left-arrow-400.svg"}
          alt="화살표"
          width={24}
          height={24}
        />
      </button>
      <p>{currentDate.getMonth() + 1}월</p>
      <button onClick={handleNextMonth}>
        <Image
          src={
            isCurrentMonth
              ? "/icons/ic-right-arrow-600.svg"
              : "/icons/ic-right-arrow-400.svg"
          }
          alt="화살표"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
