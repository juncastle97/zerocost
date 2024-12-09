import { instance } from "./axios";

export const loginGuest = async () => {
  try {
    const res = await instance.post("/api/guest/sign-in", {});
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const postLogout = async () => {
  try {
    const res = await instance.post("/api/auth/logout", {});
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getKakaoLogin = async (KakaoLogin: string) => {
  try {
    const res = await instance.get(`/api/auth/kakao-login?code=${KakaoLogin}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
