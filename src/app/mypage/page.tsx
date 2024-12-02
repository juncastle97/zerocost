"use client";
import Account from "@/components/Page/Mypage/Account";
import Guest from "@/components/Page/Mypage/Guest";
import { loginState } from "@/lib/atoms/login";
import { useAtom } from "jotai";

export default function MyPage() {
  const [loginUser, setLoginUser] = useAtom(loginState);
  return loginUser === "guest" ? (
    <Guest setLoginUser={setLoginUser} />
  ) : (
    <Account setLoginUser={setLoginUser} />
  );
}
