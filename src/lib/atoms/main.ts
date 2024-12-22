import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const countMain = atom(0);
export const pathAtom = atom(0);
export const mainChoice = atom({
  categoryName: "",
  amount: 0,
  savingYmd: "2020-11-11,",
});

export const splashAtom = atomWithStorage<boolean>("splash", false);
