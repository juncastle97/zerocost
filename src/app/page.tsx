import classNames from "classnames/bind";

import styles from "./main.module.scss";

const cn = classNames.bind(styles);

export default function Home() {
  return (
    <>
      <div className={cn("page")}>test</div>
      <div className={cn("text")}>글입니다.</div>
    </>
  );
}
