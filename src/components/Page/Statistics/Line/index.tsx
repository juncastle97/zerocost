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
      data: Array.from({ length: 25 }, (_, i) => ({
        x: i.toString(),
        y: 0,
      })),
    },
  ]);

  useEffect(() => {
    const baseData = Array.from({ length: 24 }, (_, i) => ({
      x: i.toString(),
      y: 0,
    }));

    // API 데이터로 해당하는 시간의 count 값을 업데이트
    timeData.forEach((item) => {
      if (item.hour % 2 === 0) {
        // 짝수 시간대는 그대로 표시
        baseData[item.hour] = {
          x: item.hour.toString(),
          y: item.count,
        };
      } else {
        // 홀수 시간대는 이전 시간대의 값에 더함
        const prevHour = item.hour - 1;
        if (prevHour >= 0) {
          baseData[prevHour].y += item.count;
        }
      }
    });

    // x축에 짝수 시간대만 표시되도록 필터링
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
