export const getMemberId = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const loginDataStr = localStorage.getItem("loginData");
  if (!loginDataStr) {
    return null;
  }

  try {
    const loginData = JSON.parse(loginDataStr);
    return loginData.memberId;
  } catch (error) {
    console.error("Failed to parse loginData:", error);
    return null;
  }
};
