import { getMemberId } from "../utils/memberId";
import { instance } from "./axios";
const memberId = getMemberId();

export const getStatus = async () => {
  try {
    const res = await instance.get(
      `/api/personal/member-status?memberId=${memberId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getBadges = async () => {
  try {
    const res = await instance.get(`/api/badges/list?memberId=${memberId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
