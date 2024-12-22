import { addDays, endOfMonth, format, getDay, startOfMonth } from "date-fns";

import classNames from "classnames/bind";

import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { currentDateAtom } from "@/lib/atoms/date";

import CalendarModal from "../CalendarModal";
import CalendarItem from "../CalendarItem";
import styles from "./calendar.module.scss";
import { getVirtualItemCalendar } from "@/lib/apis/virtualItems";
import { CalendarData } from "@/types/virtualItems";

interface CalendarProps {
  selectedCategories: string[];
}

const cn = classNames.bind(styles);

export default function Calendar({ selectedCategories }: CalendarProps) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentDate] = useAtom(currentDateAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  const startDate = addDays(startOfCurrentMonth, -getDay(startOfCurrentMonth));
  const days = Array.from({ length: 35 }, (_, i) => addDays(startDate, i));

  const fetchCalendarData = useCallback(async () => {
    try {
      const year = parseInt(format(currentDate, "yyyy"));
      const month = parseInt(format(currentDate, "M"));
      const data = await getVirtualItemCalendar(year, month);
      setCalendarData(data);
    } catch (error) {
      console.error("Failed to fetch calendar data:", error);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchCalendarData();
  }, [fetchCalendarData]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    fetchCalendarData();
  };

  return (
    <div className={cn("container")}>
      <div className={cn("calendar")}>
        <div className={cn("weekdays")}>
          {week.map((day) => (
            <div key={day} className={cn("weekday")}>
              {day}
            </div>
          ))}
        </div>
        <div className={cn("dates")}>
          {days.map((day) => {
            const isCurrentMonth =
              day >= startOfCurrentMonth && day <= endOfCurrentMonth;
            const dayOfWeek = getDay(day);
            const dayNumber = parseInt(format(day, "d"));
            const dayData = calendarData?.days.find(
              (item) => item.day === dayNumber
            );
            const isToday =
              format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

            const filteredSummaries = dayData?.categorySummaries.filter(
              (summary) =>
                selectedCategories.length === 0 ||
                selectedCategories.includes(summary.categoryName)
            );

            return (
              <div
                key={day.toISOString()}
                className={cn("date", {
                  current: isCurrentMonth,
                  other: !isCurrentMonth,
                  sunday: dayOfWeek === 0,
                  saturday: dayOfWeek === 6,
                  today: isToday,
                })}
                onClick={() => {
                  if (isCurrentMonth) {
                    setSelectedDate(day);
                    setIsModalOpen(true);
                  }
                }}
              >
                {dayData && isCurrentMonth && filteredSummaries ? (
                  <CalendarItem
                    day={dayNumber}
                    categorySummaries={filteredSummaries}
                  />
                ) : (
                  format(day, "d")
                )}
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && selectedDate && (
        <CalendarModal
          date={selectedDate}
          day={parseInt(format(selectedDate, "d"))}
          onClose={handleModalClose}
          onUpdate={fetchCalendarData}
        />
      )}
    </div>
  );
}
