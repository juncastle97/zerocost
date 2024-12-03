import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import pig from "@/../public/icons/ic-logo.svg";
import user from "@/../public/icons/icon_user.svg";

// import { useRouter } from "next/navigation";
import styles from "./gnb.module.scss";

const cn = classNames.bind(styles);

export default function Gnb() {
  // const loginState = localStorage.getItem("loginState");
  const [gnbMore] = useState();

  // const router = useRouter();

  // useEffect(() => {
  //   if (loginState === "false" || loginState === null) {
  //     router.push("/login");
  //   }
  // }, [loginState]);

  return (
    <div className={cn("gnbWrap")}>
      <Link href={"/"}>
        <Image src={pig} alt={"로고"} width={40} height={40} />
      </Link>
      <div>{gnbMore}</div>

      {window.location.pathname !== "/mypage" && (
        <Link href={"/mypage"}>
          <Image src={user} alt={"메뉴"} width={30} height={30} />
        </Link>
      )}
    </div>
  );
}
