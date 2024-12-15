import { getMemberId } from "../utils/memberId";
import { instance } from "./axios";

export const getStatus = async () => {
  const memberId = getMemberId();
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
  const memberId = getMemberId();
  try {
    const res = await instance.get(`/api/badges/list?memberId=${memberId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const putNick = async (nick: string) => {
  const memberId = getMemberId();
  try {
    const res = await instance.put(`/api/members/${memberId}/nickname`, null, {
      params: { memberNickname: nick },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
