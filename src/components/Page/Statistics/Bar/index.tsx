import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";

import styles from "./bar.module.scss";
import { categoryNameMap } from "@/constants/category";

const cn = classNames.bind(styles);

interface StatisticsData {
  category: string;
  value: number;
  percentage: number;
  [key: string]: string | number;
}

interface BarProps {
  data: any[];
}

const categoryColors: { [key: string]: string } = {
  커피: "#ffd09b",
  디저트: "#fff7d1",
  밥: "#ffe5e5",
  술: "#ffb0b0",
  담배: "#ff8c8c",
  음료: "#ffad84",
  야식: "#fdffae",
  차비: "#dee5d4",
  취미: "#bacd92",
  쇼핑: "#75a47f",
  영화: "#b6ffa1",
  화장품: "#d4fafc",
  미용: "#d2e0fb",
  덕질: "#8eaccd",
  여행: "#3a98b0",
};

const Bar = ({ data: statisticsData }: BarProps) => {
  const [data, setData] = useState<StatisticsData[]>([]);

  useEffect(() => {
    // API 응답을 Bar 컴포넌트 데이터 형식으로 변환
    const formattedData = statisticsData.map((item) => ({
      category: categoryNameMap[item.categoryName],
      value: item.amount,
      percentage: item.percentage,
    })) as StatisticsData[];

    // categoryColors의 키 순서대로 데이터 정렬 (역순)
    const orderedData = Object.keys(categoryColors)
      .reverse()
      .map((category) =>
        formattedData.find((item) => item.category === category)
      )
      .filter((item) => item !== undefined) as StatisticsData[];

    setData(orderedData);
  }, [statisticsData]);

  return (
    <div
      className={cn("container")}
      style={{ height: `${data.length * 30}px` }}
    >
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="category"
        layout="horizontal"
        margin={{ top: 0, right: 0, bottom: 0, left: 45 }}
        padding={0.4}
        innerPadding={3}
        colors={(bar) => categoryColors[bar.indexValue] || "#d2e0fb"}
        borderRadius={3}
        enableGridY={false}
        enableLabel={false}
        tooltip={({ data, value }) => (
          <div className={cn("tooltip")}>
            <div className={cn("wrap")}>
              <div
                className={cn("color")}
                style={{
                  backgroundColor: categoryColors[data.category],
                }}
              ></div>
              <div>{data.category}</div>
              <div>{data.percentage}%</div>
            </div>
            <div className={cn("amount")}>{value.toLocaleString()}원</div>
          </div>
        )}
        theme={{
          labels: {
            text: {
              fontSize: 16,
              fill: "#000000",
            },
          },
          legends: {
            text: {
              fontSize: 12,
              fill: "#000000",
            },
          },
          axis: {
            legend: {
              text: {
                fontSize: 20,
                fill: "#000000",
              },
            },
            ticks: {
              text: {
                fontSize: 16,
                fill: "#ffffff",
              },
            },
          },
        }}
        axisBottom={{
          tickSize: 0,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -60,
          format: (value) => value,
          renderTick: ({ value, x, y }) => (
            <g transform={`translate(${x},${y})`}>
              <text
                x={-45}
                y={0}
                textAnchor="start"
                dominantBaseline="middle"
                style={{ fill: "#ffffff", fontSize: 16 }}
                className={cn("text")}
              >
                {value}
              </text>
            </g>
          ),
        }}
      />
    </div>
  );
};

export default Bar;
