import { instance } from "./axios";

export const postVirtualItem = async (postItem: any) => {
  try {
    const res = await instance.post("/api/virtual-items", postItem);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
