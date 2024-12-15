import { getMemberId } from "../utils/memberId";
import { instance } from "./axios";
const memberId = getMemberId;

export const postVirtualItem = async (postItem: any) => {
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
