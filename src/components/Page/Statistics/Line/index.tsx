import { ResponsiveLine } from "@nivo/line";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./line.module.scss";

const cn = classNames.bind(styles);

interface TimeData {
  hour: number;
  amount: number;
  count: number;
}

interface LineProps {
  data: TimeData[];
}

const Line = ({ data: timeData }: LineProps) => {
  const [data, setData] = useState([
    {
      id: "time",
      data: Array.from({ length: 24 }, (_, i) => ({
        x: i.toString(),
        y: 0,
      })),
    },
  ]);

  useEffect(() => {
    // 24시간 기본 데이터 초기화
    const baseData = Array.from({ length: 24 }, (_, i) => ({
      x: i.toString(),
      y: 0,
    }));

    // 시간대별 데이터 누적
    timeData.forEach((item) => {
      if (item.hour >= 0 && item.hour < 24) {
        if (item.hour % 2 === 0) {
          // 짝수 시간대
          baseData[item.hour].y = item.count;
        } else {
          // 홀수 시간대의 데이터를 이전 짝수 시간대에 누적
          const prevHour = Math.floor(item.hour / 2) * 2;
          if (prevHour >= 0 && prevHour < 24) {
            baseData[prevHour].y += item.count;
          }
        }
      }
    });

    // 짝수 시간대만 필터링
    const filteredData = baseData.filter((_, index) => index % 2 === 0);

    setData([
      {
        id: "time",
        data: filteredData,
      },
    ]);
  }, [timeData]);

  return (
    <div className={cn("container")}>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: "시간",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={null}
        pointSize={8}
        pointColor="#FF9954"
        pointBorderWidth={2}
        pointBorderColor="#1C1C1E"
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={false}
        useMesh={true}
        enableGridX={false}
        enableGridY={false}
        enableSlices={false}
        tooltip={() => null}
        lineWidth={3}
        colors="#FF9954"
      />
    </div>
  );
};

export default Line;
