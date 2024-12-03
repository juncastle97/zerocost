import { instance } from "./axios";

export const loginGuest = async () => {
  try {
    const res = await instance.post("api/guest/singin", {});
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
