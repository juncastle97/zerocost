import { instance } from "./axios";

export const getMainItems = async () => {
  try {
    const res = await instance.get("/api/categories/names");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
