"use client";
import back from "@/../public/icons/icon_back.svg";
import deleteBtn from "@/../public/icons/icon_remove.svg";
import errorImg from "@/../public/icons/image 13.svg";
import user from "@/../public/icons/user icon.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./loginNick.module.scss";

const cn = classNames.bind(styles);

interface IFormInput {
  nickName: string;
}

export default function Login() {
  const [nickName, setNickName] = useState<string>("야식을좋아했던정비공");
  const [message, setMessage] = useState<string>(
    "닉네임은 언제든 변경할 수 있어요!"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const validateNickName = (value: string) => {
    const regex = /^[a-zA-Z가-힣0-9]+$/;
    if (value.length < 2 || value.length > 16) {
      return "닉네임은 2~16자 이내여야 합니다.";
    }
    if (!regex.test(value)) {
      return "닉네임은 영어 대소문자, 한글, 숫자만 사용 가능합니다.";
    }
    return true;
  };

  const handleNickRemove = () => {
    setNickName("");
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickName(value);

    const validationResult = validateNickName(value);
    if (validationResult === true) {
      //검증 성공
      setMessage("사용 가능한 닉네임이에요!");
      clearErrors("nickName");
    } else {
      //검증 실패
      setMessage("닉네임은 언제든 변경할 수 있어요!");
      setError("nickName", { type: "manual", message: validationResult });
    }
  };
  // console.log(errors.nickName);
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (validateNickName(nickName) === true) {
        console.log("여기서 중복확인 돌리기");
      }
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [nickName]);

  return (
    <div className={cn("loginWrap")}>
      <Link href={"/login"} className={cn("back")}>
        <Image src={back} alt="뒤로가기" width={40} height={40} />
      </Link>

      <div className={cn("nickWrap")}>
        <Image src={user} alt="프로필" width={86} height={86} />
        <div>
          <p className={cn("subTitle")}>만나서 반갑습니다!</p>
          <p className={cn("title")}>어떻게 불러드리는 게 좋을까요?</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={cn("form")}>
          <div className={errors.nickName && cn("nickInputError")}>
            <input
              id="nick"
              type="text"
              value={nickName}
              {...register("nickName", {
                onChange: handleNickNameChange,
              })}
            />
            <Image
              className={cn("nickDelete")}
              onClick={handleNickRemove}
              src={deleteBtn}
              alt="지우기"
              width={16}
              height={16}
            />

            {errors.nickName && (
              <Image src={errorImg} alt="error" width={16} height={16} />
            )}
          </div>

          <label htmlFor="nick" className={errors.nickName && cn("nickError")}>
            {errors.nickName?.message || message}
            <p>{nickName.length}/16</p>
          </label>

          <button
            type="submit"
            disabled={!!errors.nickName}
            className={errors.nickName ? cn("submitError") : cn("submit")}
          >
            완료
          </button>
        </form>
      </div>
    </div>
  );
}
