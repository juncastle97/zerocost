"use client";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import styles from "./how.module.scss";

const cn = classNames.bind(styles);
export default function How() {
  const router = useRouter();
  return (
    <div className={cn("wrap")}>
      <div className={cn("back")} onClick={() => router.back()}>
        {"<"}
        <p>정책 및 약관</p>
        <div></div>
      </div>
      <div className={cn("text")}>
        <p>서비스 이용약관</p>
        <br />
        <p>제 1조 (목적)</p>
        <p>
          이 약관은 인터넷 서비스 “제로코스트”(이하 “서비스”)의 이용에 관한
          기본적인 사항을 규정함을 목적으로 합니다.
        </p>
        <br />
        <p>제 2조 (약관의 효력 및 변경)</p>
        <ol>
          <li>본 약관은 서비스를 이용하는 모든 사용자에게 적용됩니다.</li>
          <li>
            본 약관은 서비스 화면 또는 기타 방법으로 이용 고객에게 공지함으로써
            효력을 발생합니다.
          </li>
          <li>
            회사는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제2항과 같은
            방법으로 공지 또는 통지함으로써 효력을 발생합니다.
          </li>
          <li>
            사용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고
            계정을 삭제할 수 있습니다.
          </li>
        </ol>
        <br />
        <p>제 3조 (개인정보 보호)</p>
        <ol>
          <li>
            회사는 사용자의 개인정보를 소중히 보호하며, 관련 법령과 개인정보
            처리방침에 따라 개인정보를 처리합니다.
          </li>
          <li>
            개인정보 보호와 관련된 세부 사항은 서비스 내 제공되는 개인정보
            처리방침을 참조하십시오.
          </li>
        </ol>
        <br />
        <p>제 4조 (회원 탈퇴)</p>
        <ol>
          <li>
            사용자는 카카오 또는 구글 계정을 통해 서비스를 이용할 수 있으며,
            계정 관리 책임은 사용자 본인에게 있습니다.
          </li>
          <li>
            사용자는 언제든지 계정 삭제를 요청할 수 있으며, 회사는 요청 즉시
            처리합니다.
          </li>
          <li>
            회원 탈퇴 시, 사용자가 작성한 저축 내역 및 통계 데이터는 영구
            삭제됩니다.
          </li>
        </ol>
        <br />
        <p>제 5조 (서비스 이용)</p>
        <ol>
          <li>
            사용자는 본 약관과 관련 법령을 준수하여 서비스를 이용해야 합니다.
          </li>
          <li>회사는 사용자에게 다음과 같은 행위를 금지합니다.</li>
          <ul>
            <li>불법 행위 또는 범죄 행위</li>
            <li>타인의 개인정보 도용</li>
            <li>서비스의 정상적 운영을 방해하는 행위</li>
          </ul>
        </ol>
      </div>
    </div>
  );
}
