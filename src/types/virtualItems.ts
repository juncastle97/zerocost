export interface VirtualItem {
  memberId: number;
  savingId: number;
  savingYmd: string; // "YYYY-MM-DD"
  savingTime: string; // "HH:mm:ss"
  amount: number;
  categoryName: string;
}

export interface CategorySummary {
  categoryName: string;
  categoryTotalAmount: number;
}

export interface DayData {
  day: number; // 일(day)
  dayTotalAmount: number;
  count: number; // 아이템 개수
  categorySummaries: CategorySummary[];
  items: VirtualItem[];
}

export interface CalendarData {
  year: number;
  month: number;
  days: DayData[];
}

export interface DailyGroup {
  day: number; // 일(day)
  items: VirtualItem[];
}

export interface ListData {
  memberId: number;
  totalAmount: number; // 전체 금액
  dailyGroups: DailyGroup[];
}
