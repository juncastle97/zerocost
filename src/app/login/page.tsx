"use client";
import logo from "@/../public/icons/ic-logo.svg";
import google from "@/../public/icons/icon_google.svg";
import kakao from "@/../public/icons/icon_kakaotalk.svg";
import YesNoModal from "@/components/commons/Modal/YesNoModal";
import { loginGuest } from "@/lib/apis/login";
import { loginData, loginState } from "@/lib/atoms/login";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./login.module.scss";

const cn = classNames.bind(styles);

// interface KakaoAuthResponse {
//   access_token: string;
//   token_type: string;
//   refresh_token: string;
//   expires_in: number;
//   scope: string;
//   refresh_token_expires_in: number;
// }

interface KakaoUserResponse {
  id: number;
  connected_at: string;
  properties?: {
    nickname?: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account?: {
    profile_nickname?: string;
    profile_image?: string;
    email?: string;
  };
}

export default function Login() {
  const [modal, setModal] = useState(false);
  const [, setLogin] = useAtom(loginState);
  const [, setLoginData] = useAtom(loginData);
  const router = useRouter();

  const { mutate: postGuest } = useMutation({
    mutationKey: ["postGuest"],
    mutationFn: loginGuest,
    onSuccess: (res) => {
      setLoginData(res);
      document.cookie = `memberKeyId=${res.memberKeyId}; path=/; max-age=3600; secure; samesite=strict`;
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initializeKakao = () => {
        if (!window.Kakao) {
          console.error("Kakao SDK가 로드되지 않았습니다.");
          return;
        }
        // SDK 중복 초기화 방지
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("c99ee35d6b865e87ea702e6d6530e391");
          console.log("Kakao SDK 초기화 완료");
        }
      };
      initializeKakao();
    }
  }, []);

  const kakaoLogin = async () => {
    if (typeof window === "undefined" || !window.Kakao?.Auth) {
      alert("카카오 로그인을 사용할 수 없습니다.");
      return;
    }

    try {
      // 기존 쿠키 제거
      document.cookie =
        "memberKeyId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "memberId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "loginType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // const auth = await new Promise<KakaoAuthResponse>((resolve, reject) => {
      //   window.Kakao.Auth.login({
      //     success: resolve,
      //     fail: (error) =>
      //       reject(new Error(error?.message || "카카오 로그인 실패")),
      //   });
      // });

      const userInfo = await new Promise<KakaoUserResponse>(
        (resolve, reject) => {
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: resolve,
            fail: (error) =>
              reject(new Error(error?.message || "사용자 정보 요청 실패")),
          });
        }
      );

      const serverResponse = await fetch(
        `https://api-zerocost.site/api/auth/kakao-login?code=${userInfo.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || `서버 오류: ${serverResponse.status}`
        );
      }

      const data = await serverResponse.json();
      setLoginData(data);
      setLogin("user");
      router.push("/"); // Next.js router 사용
    } catch (error) {
      console.error("로그인 오류:", error);
      alert(
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <>
      <div className={cn("loginWrap")}>
        <div className={cn("title")}>
          <Image src={logo} alt="logo" width={130} height={130} />
          <p>소비의 가치를 지키다</p>
          <h1>ZERO COST</h1>
        </div>

        <div className={cn("loginBox")}>
          <div onClick={kakaoLogin} className={cn("loginBtn")}>
            <Image src={kakao} alt="kakao login" width={24} height={24} />
            카카오 시작하기
          </div>

          <Link
            className={cn("loginBtn")}
            href={
              "https://kauth.kakao.com/oauth/authorize?client_id=489a2f33bf9d90c59950291ca077adc9&redirect_uri=http://3.39.123.15:8090/api/auth/kakao-login&response_type=code"
            }
          >
            <Image src={google} alt="google login" width={24} height={24} />
            구글로 시작하기
          </Link>
          <div
            className={cn("guest")}
            onClick={() => {
              setModal(true);
            }}
          >
            게스트로 시작하기
          </div>
          {/* <div onClick={postOut}>로그아웃</div> */}
        </div>

        <div className={cn("agreeWrap")}>
          계속 진행함에 따라 Zerocost의 <span>이용약관</span>과{" "}
          <span>개인정보 보호정책</span>에
          <br />
          동의하는 것으로 간주됩니다.
        </div>
      </div>
      {modal && (
        <YesNoModal
          back={() => setModal(false)}
          confirm={() => {
            postGuest();
            setLogin("guest");
            router.push("/");
          }}
        >
          게스트 이용 시 기록들은 저장되지 않으며
          <br />
          일정 기간 미접속 시 삭제될 수 있습니다.
          <br />
          계속 진행하시겠습니까?
        </YesNoModal>
      )}
    </>
  );
}
