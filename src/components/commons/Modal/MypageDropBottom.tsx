import logo from "@/../public/icons/ic-logo.svg";
import google from "@/../public/icons/icon_google.svg";
import kakao from "@/../public/icons/icon_kakaotalk.svg";
import { loginData, loginState } from "@/lib/atoms/login";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./MypageDropBottom.module.scss";
import Portal from "./potal";

const cn = classNames.bind(styles);

interface YesNoModalProps {
  back: () => void;
}

export default function MypageDropBottom({ back }: YesNoModalProps) {
  const [, setLogin] = useAtom(loginState);
  const [, setLoginData] = useAtom(loginData);
  const router = useRouter();
  const ref = useRef(null);
  const handleClickOutside = () => {
    back();
  };
  useEffect(() => {
    // 브라우저 환경 확인
    if (typeof window === "undefined") return;

    // Kakao SDK가 이미 로드된 경우 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("c99ee35d6b865e87ea702e6d6530e391");
      console.log("Kakao SDK Initialized:", window.Kakao.isInitialized());
      return;
    }

    // Kakao SDK 동적 로드
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;

    script.onload = () => {
      // 로드 완료 후 초기화
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("c99ee35d6b865e87ea702e6d6530e391");
        console.log("Kakao SDK Initialized:", window.Kakao.isInitialized());
      }
    };

    script.onerror = () => {
      console.error("Kakao SDK를 로드하는 데 실패했습니다.");
    };

    document.body.appendChild(script);

    return () => {
      // script 태그를 제거 (필요 시 cleanup)
      document.body.removeChild(script);
    };
  }, []);
  const kakaoLogin = async () => {
    if (typeof window !== "undefined" && window.Kakao && window.Kakao.Auth) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("c99ee35d6b865e87ea702e6d6530e391");
      }

      try {
        // 기존 쿠키 제거
        document.cookie =
          "memberKeyId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "memberId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "loginType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // 1. 카카오 로그인
        const auth = await new Promise((resolve, reject) => {
          window.Kakao.Auth.login({
            success: resolve,
            fail: reject,
          });
        });
        console.log("Kakao Login Success:", auth);

        // 2. 사용자 정보 요청
        const userInfo = await new Promise<any>((resolve, reject) => {
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: resolve,
            fail: reject,
          });
        });
        console.log("Kakao User Info:", userInfo);

        // 3. 서버로 사용자 정보 전송
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
          throw new Error(`HTTP error! status: ${serverResponse.status}`);
        }

        const data = await serverResponse.json();
        console.log("Server Response:", data);
        setLoginData(data);
        setLogin("user");
        router.push("/"); // Next.js router 사용
      } catch (error) {
        console.error("Error during Kakao login:", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
    } else {
      console.error("Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.");
      alert("Kakao SDK를 로드하는 중 오류가 발생했습니다.");
    }
  };
  useOnClickOutside(ref, handleClickOutside);
  return (
    <Portal>
      <div className={cn("modalWrap")}>
        <div className={cn("modalInner")} ref={ref}>
          <h2>게스트로 로그인해주셨네요!</h2>

          <Image src={logo} alt="logo" width={80} height={80} />

          <p>
            계정을 연동해주시면 지킨 기록들을
            <br />
            안전하게 저장할 수 있습니다.
          </p>

          <div className={cn("btnWrap")}>
            <div className={cn("btn")} onClick={kakaoLogin}>
              <Image src={kakao} alt="kakao" width={24} height={24} />
              카카오 연동하기
            </div>
            <div className={cn("btn")}>
              <Image src={google} alt="kakao" width={24} height={24} />
              구글에 연동하기
            </div>
          </div>

          <div className={cn("next")} onClick={() => back()}>
            다음에 할래요
          </div>
        </div>
      </div>
    </Portal>
  );
}
