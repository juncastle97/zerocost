export function getMemberId() {
  const loginData = window.localStorage.getItem("loginData");
  let memberIdBox = 0;
  if (loginData) {
    try {
      // JSON 형식의 문자열을 객체로 파싱
      const parsedData = JSON.parse(loginData);

      // memberId 값을 가져옴
      memberIdBox = parsedData.memberId;
    } catch (error) {
      console.error("JSON 파싱 에러:", error);
    }
  } else {
    console.log("loginData가 존재하지 않습니다.");
  }

  return memberIdBox;
}
