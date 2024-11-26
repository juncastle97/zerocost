"use client";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./loginNick.module.scss";

import back from "@/../public/icons/icon_back.svg";
import user from "@/../public/icons/user icon.svg";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const cn = classNames.bind(styles);

interface IFormInput {
  nickName: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className={cn("loginWrap")}>
      <Link href={"/login"} className={cn("back")}>
        <Image src={back} alt="back" width={40} height={40} />
      </Link>

      <div className={cn("nickWrap")}>
        <Image src={user} alt="프로필" width={86} height={86} />
        <div>
          <p className={cn("subTitle")}>만나서 반값습니다!</p>
          <p className={cn("title")}>어떻게 불러드리는 게 좋을까요?</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={cn("form")}>
          <input
            id="nick"
            type="text"
            defaultValue="야식을좋아했던정비공"
            {...register("nickName")}
          />
          <label htmlFor="nick">닉네임은 언제든 변경할 수 있어요!</label>

          <button type="submit" className={cn("submit")}>
            완료
          </button>
        </form>
      </div>
    </div>
  );
}
