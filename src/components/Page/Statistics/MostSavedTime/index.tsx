import classNames from "classnames/bind";

import styles from "./mostSavedTime.module.scss";

const cn = classNames.bind(styles);

interface TimeData {
  hour: number;
  amount: number;
  count: number;
}

export default function MostSavedTime({ data }: { data: TimeData[] }) {
  // 데이터가 없는 경우 먼저 체크
  if (!data || data.length === 0) {
    return (
      <div className={cn("container")}>
        <p>
          <span className={cn("title")}>아직 저금 기록이 없어요</span>
        </p>
      </div>
    );
  }

  // 24시 제외하고 홀수 시간대 데이터를 이전 짝수 시간대로 합치기
  const processedData = data.reduce((acc: TimeData[], current) => {
    if (current.hour === 24) return acc;

    if (current.hour % 2 === 0) {
      // 짝수 시간대 데이터 추가
      acc.push({
        hour: current.hour,
        amount: current.amount,
        count: current.count,
      });
    } else {
      // 홀수 시간대는 이전 짝수 시간대에 합치기
      const prevHour = current.hour - 1;
      const prevIndex = acc.findIndex((item) => item.hour === prevHour);
      if (prevIndex !== -1) {
        acc[prevIndex].amount += current.amount;
        acc[prevIndex].count += current.count;
      } else {
        // 이전 짝수 시간대가 없으면 새로 추가
        acc.push({
          hour: prevHour,
          amount: current.amount,
          count: current.count,
        });
      }
    }
    return acc;
  }, []);

  const maxSavings = processedData.reduce(
    (max, current) => (current.amount > max.amount ? current : max),
    processedData[0]
  );

  const formattedHour =
    maxSavings.hour < 12
      ? `오전 ${maxSavings.hour}시`
      : `오후 ${maxSavings.hour % 12 || 12}시`;

  return (
    <div className={cn("container")}>
      <p>
        <span className={cn("time")}>{formattedHour}</span>
        <span className={cn("title")}>에 가장 많이 저금했어요</span>
      </p>
    </div>
  );
}
