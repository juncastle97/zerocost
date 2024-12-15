"use client";

import classNames from "classnames/bind";

import editBtn from "@/../public/icons/ic-edit-state-on.svg";
import social from "@/../public/icons/icon_kakaotalk.svg";
import profileImg from "@/../public/icons/icon_user.svg";
import EditNick from "@/components/commons/Modal/EditNick";
import YesNoModal from "@/components/commons/Modal/YesNoModal";
import { postLogout, postWithdrawal } from "@/lib/apis/login";
import { getBadges, getStatus } from "@/lib/apis/mypage";
import { loginData } from "@/lib/atoms/login";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./mypage.module.scss";

const cn = classNames.bind(styles);
export default function Account({ setLoginUser }) {
  const router = useRouter();
  const [date, setDate] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [logout, setLogOut] = useState<boolean>(false);
  const [accountDelete, setAccountDelete] = useState<boolean>(false);
  const [editNick, setEditNick] = useState<boolean>(false);
  const [loginDatas] = useAtom<any>(loginData);

  const { data: status, isSuccess } = useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
  });

  const { data: badges } = useQuery({
    queryKey: ["badges"],
    queryFn: getBadges,
  });

  const { mutate: logoutBtn } = useMutation({
    mutationKey: ["logout"],
    mutationFn: postLogout,
  });
  const { mutate: withdrawal } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => postWithdrawal(loginDatas.memberId),
  });
  useEffect(() => {
    if (isSuccess) {
      setDate(status?.daysFromRegistration);
      setPrice(status?.totalAmount);
    }
  }, [isSuccess]);
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
  const kakaoLogout = async () => {
    if (typeof window !== "undefined" && window.Kakao && window.Kakao.Auth) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("c99ee35d6b865e87ea702e6d6530e391");
      }

      try {
        // 카카오 로그아웃
        await new Promise((resolve) => {
          window.Kakao.Auth.logout(() => {
            console.log("Kakao Logout Success");
            resolve(null);
          });
        });

        // 클라이언트 상태 초기화
        document.cookie =
          "memberKeyId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "memberId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "loginType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // 로그인 상태 초기화
        setLoginUser("");
        logoutBtn();
        router.push("/login"); // Next.js router 사용
      } catch (error) {
        console.error("Error during Kakao logout:", error);
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    } else {
      console.error("Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.");
      alert("Kakao SDK를 로드하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={cn("myPageWrap")}>
        <div className={cn("profileWrap")}>
          <div className={cn("profileInner")}>
            <div className={cn("profileImg")}>
              <Image
                src={profileImg}
                alt="프로필이미지"
                width={24}
                height={24}
              />
            </div>
            <div className={cn("profileName")}>
              {loginDatas.memberNickname} 님
            </div>
            <div className={cn("editBtn")} onClick={() => setEditNick(true)}>
              <Image src={editBtn} alt="edit" width={16} height={16} />
            </div>
          </div>

          <div>
            <Image src={social} alt={"social"} width={24} height={24} />
          </div>
        </div>

        <div className={cn("saveDay")}>
          제로코스트와 함께한 {date ? date : 0}일 동안
          <br />
          {price ? price.toLocaleString() : 0}원을 지켰어요
        </div>

        <div
          className={cn("badge")}
          onClick={() => router.push("/mypage/badge")}
          style={{ cursor: "pointer" }}
        >
          <h2>나의 배지</h2>

          <div className={cn("badgeList")}>
            {badges
              ?.filter((item) => item.acquireYN === "Y")
              ?.slice(0, 3)
              ?.map((item, index) => {
                return (
                  <div className={cn("badgeItem")} key={index}>
                    <Image
                      src={item.emblemPath}
                      alt="뱃지"
                      width={40}
                      height={40}
                    />
                    <div>{item.badgeName}</div>
                  </div>
                );
              })}
          </div>
        </div>

        <Link href={"/how"} className={cn("policyVersion")}>
          이용약관 및 정책
        </Link>
        <div className={cn("currentVersion")}>
          현재 버전<span>1.2.3</span>
        </div>

        <div className={cn("out")}>
          {/* <p
            onClick={() => {
              setAccountDelete(true);
            }}
          >
            회원 탈퇴
          </p> */}
          <p
            onClick={() => {
              setLogOut(true);
            }}
          >
            로그아웃
          </p>
        </div>
      </div>
      {editNick && <EditNick back={() => setEditNick(false)} />}
      {logout && (
        <YesNoModal
          back={() => {
            setLogOut(false);
          }}
          confirm={() => {
            window.localStorage.removeItem("login");
            window.localStorage.removeItem("loginData");
            kakaoLogout();
          }}
          ver={2}
        >
          <span className={cn("text")}>로그아웃 하시겠습니까?</span>
        </YesNoModal>
      )}
      {accountDelete && (
        <YesNoModal
          back={() => {
            setAccountDelete(false);
          }}
          confirm={() => {
            withdrawal();
            router.push("/login");
          }}
          ver={2}
        >
          <span className={cn("text")}>계정을 삭제하시겠습니까?</span>
          <br />
          <span className={cn("wrong")}>
            그동안의 모든 기록과 회원 정보가 삭제되며
            <br />
            삭제된 정보는 복구할 수 없습니다.
          </span>
        </YesNoModal>
      )}
    </>
  );
}
