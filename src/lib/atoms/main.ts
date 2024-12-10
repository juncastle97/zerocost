import { atom } from "jotai";

export const countMain = atom(0);
export const mainChoice = atom({
  categoryName: "",
  amount: 0,
  savingYmd: "2020-11-11,",
});
