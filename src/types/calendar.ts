export interface CalendarData {
  year: number;
  month: number;
  days: Day[];
}

export interface Day {
  day: number;
  dayTotalAmount: number;
  count: number;
  categorySummaries: CategorySummary[];
  items: Item[];
}

export interface CategorySummary {
  categoryName: string;
  categoryTotalAmount: number;
}

export interface Item {
  memberId: number;
  savingId: number;
  savingYmd: string;
  savingTime: string;
  amount: number;
  categoryName: string;
}
