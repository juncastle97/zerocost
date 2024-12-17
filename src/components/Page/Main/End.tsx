import classNames from "classnames/bind";

import { countMain } from "@/lib/atoms/main";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import styles from "./Main.module.scss";

const cn = classNames.bind(styles);

export default function End() {
  const [, setMainOrder] = useAtom(countMain);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMainOrder(0);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setMainOrder]);

  return (
    <>
      <h2 className={cn("title")}>
        <DotLottieReact
          src="https://lottie.host/1f74818f-a5bf-4aba-8ae1-4f8a06eceaf4/bFs9Yo5W25.lottie"
          loop
          autoplay
        />
      </h2>

      <h2 className={cn("subTitle")}>내가 해냄!</h2>
    </>
  );
}
