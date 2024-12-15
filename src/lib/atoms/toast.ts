import { atom } from "jotai";

interface ToastState {
  isVisible: boolean;
  count: number;
}

export const toastAtom = atom<ToastState>({
  isVisible: false,
  count: 0,
});
