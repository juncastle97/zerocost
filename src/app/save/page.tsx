"use client";

import classNames from "classnames/bind";

import styles from "./save.module.scss";

const cn = classNames.bind(styles);

import { useState } from "react";

import CalendarView from "@/components/Save/CalendarView";
import SaveGnb from "@/components/Save/Gnb";
import Listview from "@/components/Save/ListView";

export default function SavePage() {
  const [isCalendarView, setIsCalendarView] = useState(true);

  return (
    <div className={cn("wrap")}>
      <SaveGnb
        isCalendarView={isCalendarView}
        setIsCalendarView={setIsCalendarView}
      />

      {isCalendarView ? <CalendarView /> : <Listview />}
    </div>
  );
}
