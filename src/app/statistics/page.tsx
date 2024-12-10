"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./statistics.module.scss";
import {
  getStatisticsCategory,
  getStatisticsMonthlyTotal,
  getStatisticsHourly,
} from "@/lib/apis/statistics";

const cn = classNames.bind(styles);

import MonthHeader from "@/components/commons/MonthHeader";
import Bar from "@/components/Page/Statistics/Bar";
import Line from "@/components/Page/Statistics/Line";
import MostSavedTime from "@/components/Page/Statistics/MostSavedTime";
import Percentage from "@/components/Page/Statistics/Percentage";

interface MonthlyTotal {
  monthlyTotal: number;
}

interface HourlyData {
  hour: number;
  amount: number;
  count: number;
}

export default function Statistics() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [statisticsData, setStatisticsData] = useState<any[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState<MonthlyTotal>({
    monthlyTotal: 0,
  });
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, totalData, hourlyData] = await Promise.all([
          getStatisticsCategory(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1
          ),
          getStatisticsMonthlyTotal(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1
          ),
          getStatisticsHourly(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1
          ),
        ]);

        setStatisticsData(categoryData);
        setMonthlyTotal(totalData);
        setHourlyData(hourlyData);
      } catch (error) {
        console.error("통계 데이터 요청 실패:", error);
      }
    };

    fetchData();
  }, [currentDate]);

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  if (statisticsData.length === 0) {
    return (
      <div className={cn("container")}>
        <MonthHeader
          currentDate={currentDate}
          onDateChange={handleDateChange}
        />
        <div className={cn("empty")}>
          <Image
            src="/icons/ic-logo.svg"
            alt="로고 이미지"
            width={74}
            height={74}
          />
          <div className={cn("emptyState")}>아직 지킨 돈이 없어요</div>
        </div>
      </div>
    );
  }
  console.log(monthlyTotal);

  return (
    <div className={cn("container")}>
      <MonthHeader currentDate={currentDate} onDateChange={setCurrentDate} />
      <div className={cn("content")}>
        <p className={cn("total")}>
          이번 달 지킨 돈 {monthlyTotal.monthlyTotal.toLocaleString()}원
        </p>
        <div className={cn("chartWrap")}>
          <div className={cn("title")}>절약 카테고리</div>
          <div className={cn("barWrap")}>
            <Bar data={statisticsData} />
            <Percentage data={statisticsData} />
          </div>
        </div>
        <div className={cn("chartWrap")}>
          <p className={cn("title")}>시간별 절약</p>
          <div className={cn("timeWrap")}>
            <Line data={hourlyData} />
            <MostSavedTime data={hourlyData} />
          </div>
        </div>
      </div>
    </div>
  );
}
