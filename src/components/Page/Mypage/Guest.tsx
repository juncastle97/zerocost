import classNames from "classnames/bind";

import arrow from "@/../public/icons/arrowOn.svg";
import profileImg from "@/../public/icons/icon_user.svg";
import MypageDropBottom from "@/components/commons/Modal/MypageDropBottom";
import YesNoModal from "@/components/commons/Modal/YesNoModal";
import { postLogout } from "@/lib/apis/login";
import { getStatus } from "@/lib/apis/mypage";
import { loginData } from "@/lib/atoms/login";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./mypage.module.scss";

const cn = classNames.bind(styles);
export default function Guest({ setLoginUser }) {
  const [date, setDate] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [logout, setLogOut] = useState<boolean>(false);
  const [accountDelete, setAccountDelete] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [loginDatas] = useAtom<any>(loginData);

  const handleGuest = () => {
    setLogin(true);
  };

  const { mutate: logoutBtn } = useMutation({
    mutationKey: ["logout"],
    mutationFn: postLogout,
  });

  const { data: status, isSuccess } = useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
  });

  useEffect(() => {
    if (isSuccess) {
      setDate(status.daysFromRegistration);
      setPrice(status.totalAmount);
    }
  }, [isSuccess]);

  return (
    <>
      <div className={cn("myPageWrap")}>
        <div className={cn("profileWrap")}>
          <div className={cn("profileInner")}>
            <Image src={profileImg} alt="프로필이미지" width={34} height={34} />
            <div className={cn("profileName")}>
              {loginDatas.memberNickname} 님
            </div>
          </div>
        </div>

        <div className={cn("saveDay")}>
          제로코스트와 함께한 {date ? date : 0}일 동안
          <br />
          {price ? price.toLocaleString() : 0}원을 지켰어요
        </div>

        <div className={cn("saveData")} onClick={handleGuest}>
          소셜 연동으로 기록도 지킬 수 있어요
          <Image src={arrow} alt={"화살표"} width={10} height={5} />
        </div>

        <div className={cn("badge")}>
          <h2>나의 배지</h2>

          <div className={cn("badgeList", "badgeGuest")}>
            <div className={cn("badgeItem")}>
              <Image src={profileImg} alt="뱃지" width={40} height={40} />
              <div>badge</div>
            </div>
            <div className={cn("badgeItem")}>
              <Image src={profileImg} alt="뱃지" width={40} height={40} />
              <div>badge</div>
            </div>
            <div className={cn("badgeItem")}>
              <Image src={profileImg} alt="뱃지" width={40} height={40} />
              <div>badge</div>
            </div>
          </div>
          <p className={cn("guestText")}>연동 후 확인할 수 있어요</p>
        </div>

        <Link href={"/how"} className={cn("policyVersion")}>
          이용약관 및 정책
        </Link>
        <div className={cn("currentVersion")}>
          현재 버전<span>1.2.3</span>
        </div>

        <div className={cn("out")}>
          <p
            onClick={() => {
              setLogOut(true);
            }}
          >
            로그아웃
          </p>
        </div>
      </div>
      {login && <MypageDropBottom back={() => setLogin(false)} />}
      {logout && (
        <YesNoModal
          back={() => {
            setLogOut(false);
          }}
          confirm={() => {
            setLoginUser("");
            logoutBtn();
          }}
          ver={2}
        >
          <span className={cn("text")}>로그아웃 하시겠습니까?</span> <br />
          <span className={cn("wrong")}>
            게스트 상태로 로그아웃 하시면
            <br />
            그동안의 모든 기록과 회원 정보가 삭제되며
            <br />
            삭제된 정보는 복구할 수 없습니다.
          </span>
        </YesNoModal>
      )}
      {accountDelete && (
        <YesNoModal
          back={() => {
            setAccountDelete(false);
          }}
          confirm={() => {
            console.log("Account deleted");
          }}
          ver={2}
        >
          <span className={cn("text")}>로그아웃 하시겠습니까?</span>
        </YesNoModal>
      )}
    </>
  );
}
