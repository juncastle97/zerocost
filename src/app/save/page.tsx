"use client";

import { isCalendarViewAtom } from "@/lib/atoms/view";
import classNames from "classnames/bind";
import { useAtom } from "jotai";

import styles from "./save.module.scss";

const cn = classNames.bind(styles);

import CalendarView from "@/components/Page/Save/CalendarView";
import SaveGnb from "@/components/Page/Save/Gnb";
import Listview from "@/components/Page/Save/ListView";

export default function SavePage() {
  const [isCalendarView, setIsCalendarView] = useAtom(isCalendarViewAtom);

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
