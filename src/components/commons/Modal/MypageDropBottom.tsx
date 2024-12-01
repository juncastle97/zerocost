import logo from "@/../public/icons/ic-logo.svg";
import google from "@/../public/icons/icon_google.svg";
import kakao from "@/../public/icons/icon_kakaotalk.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./MypageDropBottom.module.scss";
import Portal from "./potal";

const cn = classNames.bind(styles);

interface YesNoModalProps {
  back: () => void;
}

export default function MypageDropBottom({ back }: YesNoModalProps) {
  const ref = useRef(null);
  const handleClickOutside = () => {
    back();
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
            <div className={cn("btn")}>
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
