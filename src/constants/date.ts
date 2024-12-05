export function formatTimeToAmPm(dateString: string): string {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(date);
}

export function formatToCustomDate(dateString: string): string {
  const date = new Date(dateString);

  // 각 부분을 개별적으로 포맷팅
  const month = new Intl.DateTimeFormat("ko-KR", { month: "numeric" }).format(
    date
  );
  const day = new Intl.DateTimeFormat("ko-KR", { day: "numeric" }).format(date);
  const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(
    date
  );
  const time = new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${month} ${day} (${weekday}) ${time}`;
}

export function formatDateSection(dateString: string): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const targetDate = new Date(dateString);

  // 날짜만 비교하기 위해 시간을 00:00:00으로 설정
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const normalizedToday = normalizeDate(today);
  const normalizedYesterday = normalizeDate(yesterday);
  const normalizedTarget = normalizeDate(targetDate);

  if (normalizedTarget.getTime() === normalizedToday.getTime()) {
    return "오늘";
  } else if (normalizedTarget.getTime() === normalizedYesterday.getTime()) {
    return "어제";
  } else {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "2-digit",
      month: "long",
      day: "numeric",
    }).format(targetDate);
  }
}

export function groupByDate(
  items: Array<{ savingYmd: string; [key: string]: any }>
) {
  // 먼저 전체 아이템을 시간순으로 정렬 (최신순)
  const sortedItems = [...items].sort((a, b) => {
    return new Date(b.savingYmd).getTime() - new Date(a.savingYmd).getTime();
  });

  // 정렬된 아이템을 날짜별로 그룹화
  const groups = sortedItems.reduce(
    (acc, item) => {
      const dateSection = formatDateSection(item.savingYmd);
      if (!acc[dateSection]) {
        acc[dateSection] = [];
      }
      acc[dateSection].push(item);
      return acc;
    },
    {} as { [key: string]: typeof items }
  );

  // 날짜 섹션을 '오늘', '어제', 기타 날짜 순으로 정렬
  const sortedGroups = Object.entries(groups).sort(([dateA], [dateB]) => {
    if (dateA === "오늘") return -1;
    if (dateB === "오늘") return 1;
    if (dateA === "어제") return -1;
    if (dateB === "어제") return 1;
    return 0;
  });

  return sortedGroups;
}
