import { useState } from "react";
import classNames from "classnames/bind";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  subMonths,
  addMonths,
  getDay,
} from "date-fns";

import styles from "./calendar.module.scss";

const cn = classNames.bind(styles);

export default function Calendar() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  const startDate = addDays(startOfCurrentMonth, -getDay(startOfCurrentMonth)); // 달력 시작일 계산
  const days = Array.from({ length: 35 }, (_, i) => addDays(startDate, i)); // 35칸 생성

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className={cn("container")}>
      <div className={cn("calendar")}>
        <div className={cn("header")}>
          <button onClick={handlePrevMonth}>{"<"}</button>
          <h2>{format(currentDate, "MM월")}</h2>
          <button onClick={handleNextMonth}>{">"}</button>
        </div>
        <div className={cn("weekdays")}>
          {week.map((day, index) => (
            <div
              key={day}
              className={cn("weekday", {
                sunday: index === 0,
                saturday: index === 6,
              })}
            >
              {day}
            </div>
          ))}
        </div>
        <div className={cn("dates")}>
          {days.map((day) => {
            const isCurrentMonth =
              day >= startOfCurrentMonth && day <= endOfCurrentMonth;
            const dayOfWeek = getDay(day);
            return (
              <div
                key={day.toISOString()}
                className={cn("date", {
                  current: isCurrentMonth,
                  other: !isCurrentMonth,
                  sunday: dayOfWeek === 0,
                  saturday: dayOfWeek === 6,
                })}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
