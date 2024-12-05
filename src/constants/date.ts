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
