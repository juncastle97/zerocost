import { instance } from "./axios";
import { getMemberId } from "../utils/memberId";

export const getStatisticsCategory = async (year: number, month: number) => {
  const memberId = getMemberId();
  if (!memberId) throw new Error("Member ID not found");

  try {
    const response = await instance.get(
      `/api/statistics/category/${year}/${month}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("get statistics category 요청 실패:", error);
    throw error;
  }
};

export const getStatisticsHourly = async (year: number, month: number) => {
  const memberId = getMemberId();
  if (!memberId) throw new Error("Member ID not found");

  try {
    const response = await instance.get(
      `/api/statistics/hourly/${year}/${month}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("get statistics hourly 요청 실패:", error);
    throw error;
  }
};

export const getStatisticsMonthlyTotal = async (
  year: number,
  month: number
) => {
  const memberId = getMemberId();
  if (!memberId) throw new Error("Member ID not found");

  try {
    const response = await instance.get(
      `/api/statistics/monthly-total/${year}/${month}?memberId=${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("get statistics monthly total 요청 실패:", error);
    throw error;
  }
};
