import { instance } from "./axios";

export const getStatus = async () => {
  try {
    const res = await instance.get("/api/personal/member-status");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getBadges = async () => {
  try {
    const res = await instance.get("/api/badges/list");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
