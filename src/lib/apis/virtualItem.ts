import { getMemberId } from "../utils/memberId";
import { instance } from "./axios";

export const postVirtualItem = async (postItem: any) => {
  const memberId = getMemberId();
  try {
    const res = await instance.post(
      `/api/virtual-items?memberId=${memberId}`,
      postItem
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
