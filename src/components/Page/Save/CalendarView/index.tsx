import styles from "./calendarView.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

import Calendar from "../Calendar";
import CategoryFilter from "../CategoryFilter";

const cn = classNames.bind(styles);

export default function CalendarView() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className={cn("container")}>
      <CategoryFilter
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
      />
      <Calendar selectedCategories={selectedCategories} />
    </div>
  );
}
