import { atom } from "jotai";

interface ToastState {
  isVisible: boolean;
  count?: number;
  type?: "multiple" | "single";
}

export const toastAtom = atom<ToastState>({
  isVisible: false,
  count: 0,
  type: "multiple",
});
