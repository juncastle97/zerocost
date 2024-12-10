import classNames from "classnames/bind";

import { postVirtualItem } from "@/lib/apis/virtualItem";
import { countMain, mainChoice } from "@/lib/atoms/main";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./Main.module.scss";

const cn = classNames.bind(styles);

export default function End() {
  const [, setMainOrder] = useAtom(countMain);
  const [choice] = useAtom(mainChoice);
  const router = useRouter();

  const { mutate: postItem } = useMutation({
    mutationKey: ["postItem"],
    mutationFn: () => postVirtualItem(choice),
  });

  useEffect(() => {
    postItem();
    // setTimeout(() => {
    //   router.push("/mypage");
    // }, 5000);
  }, []);

  return (
    <>
      <h2 className={cn("title")}>
        {/* <Image src={saveAnimate} alt="로고" width={236} height={236} /> */}

        <DotLottieReact
          src="https://lottie.host/1f74818f-a5bf-4aba-8ae1-4f8a06eceaf4/bFs9Yo5W25.lottie"
          loop
          autoplay
        />
      </h2>

      <h2 className={cn("subTitle")}>내가 해냄!</h2>
      <div className={cn("back")} onClick={() => setMainOrder(0)}>
        {"<- "}뒤로가기
      </div>
    </>
  );
}
