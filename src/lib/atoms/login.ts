import { atomWithStorage } from "jotai/utils";

export const loginState = atomWithStorage("login", "");
export const loginData = atomWithStorage<any>("loginData", []);
