import classNames from "classnames/bind";

import editBtn from "@/../public/icons/ic-edit-state-on.svg";
import social from "@/../public/icons/icon_kakaotalk.svg";
import profileImg from "@/../public/icons/icon_user.svg";
import EditNick from "@/components/commons/Modal/EditNick";
import YesNoModal from "@/components/commons/Modal/YesNoModal";
import Image from "next/image";
import { useState } from "react";
import styles from "./mypage.module.scss";

const cn = classNames.bind(styles);
export default function Account({ setLoginUser }: any) {
  const [date, setDate] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [logout, setLogOut] = useState<boolean>(false);
  const [accountDelete, setAccountDelete] = useState<boolean>(false);
  const [editNick, setEditNick] = useState<boolean>(false);

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
            <div className={cn("profileName")}>{"asdfsd"} 님</div>
            <div className={cn("editBtn")} onClick={() => setEditNick(true)}>
              <Image src={editBtn} alt="edit" width={16} height={16} />
            </div>
          </div>

          <div>
            <Image src={social} alt={"social"} width={24} height={24} />
          </div>
        </div>

        <div className={cn("saveDay")}>
          제로코스트와 함께한 {date}일 동안
          <br />
          {price.toLocaleString()}원을 지켰어요
        </div>

        <div className={cn("badge")}>
          <h2>나의 배지</h2>

          <div className={cn("badgeList")}>
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
        </div>

        <div className={cn("policyVersion")}>이용약관 및 정책</div>
        <div className={cn("currentVersion")}>
          현재 버전<span>1.2.3</span>
        </div>

        <div className={cn("out")}>
          <p
            onClick={() => {
              setAccountDelete(true);
            }}
          >
            회원 탈퇴
          </p>
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
            setLoginUser("");
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
            console.log("Account deleted");
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
