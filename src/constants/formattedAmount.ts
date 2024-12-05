export function formatToKoreanCurrency(amount: number): string {
  return amount.toLocaleString("ko-KR");
}
