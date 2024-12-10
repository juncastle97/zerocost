import { instance } from "./axios";

export const getStatisticsCategory = async (year: number, month: number) => {
  try {
    const response = await instance.get(
      `/api/statistics/category/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("카테고리별 통계 요청 실패:", error);
    throw error;
  }
};

export const getStatisticsHourly = async (year: number, month: number) => {
  try {
    const response = await instance.get(
      `/api/statistics/hourly/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("시간대별 통계 요청 실패:", error);
    throw error;
  }
};

export const getStatisticsMonthlyTotal = async (
  year: number,
  month: number
) => {
  try {
    const response = await instance.get(
      `/api/statistics/monthly-total/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("월별 총 통계 요청 실패:", error);
    throw error;
  }
};
