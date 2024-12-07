export function formatTimeToAmPm(timeString: string): string {
  // HH:mm:ss 형식의 시간 문자열을 파싱
  const [hours, minutes] = timeString.split(":").map(Number);

  // 12시간제로 변환
  const period = hours >= 12 ? "오후" : "오전";
  const hour12 = hours % 12 || 12;

  return `${period} ${hour12}:${minutes.toString().padStart(2, "0")}`;
}

export function formatToCustomDate(
  dateString: string,
  timeString: string
): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(
    date
  );
  const formattedTime = formatTimeToAmPm(timeString);

  return `${month}월 ${day}일 (${weekday}) ${formattedTime}`;
}

export function formatDateSection(dateString: string): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const [year, month, day] = dateString.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day);

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

export function groupByDate(data: {
  dailyGroups: Array<{
    day: number;
    items: Array<{ savingYmd: string; savingTime: string; [key: string]: any }>;
  }>;
}) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groupedData = data.dailyGroups.map((group) => {
    const groupDate = new Date(group.items[0].savingYmd);
    let label: string;

    if (groupDate.toDateString() === today.toDateString()) {
      label = "오늘";
    } else if (groupDate.toDateString() === yesterday.toDateString()) {
      label = "어제";
    } else {
      const year = groupDate.getFullYear().toString().slice(-2);
      const month = groupDate.getMonth() + 1;
      const day = groupDate.getDate();
      label = `${year}년 ${month}월 ${day}일`;
    }

    return { label, items: group.items };
  });

  // "오늘", "어제"가 최상위에 오도록 정렬
  return groupedData.sort((a, b) => {
    if (a.label === "오늘") return -1;
    if (b.label === "오늘") return 1;
    if (a.label === "어제") return -1;
    if (b.label === "어제") return 1;
    return 0;
  });
}
