import { atom } from "recoil";

export const currentEditorialLocaleAtom = atom({
  key: "current-editorial-locale-atom",
  default: "en",
});
