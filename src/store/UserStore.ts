import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { UserAuthData } from "../types/user";

const userState = atom<UserAuthData | null>({
  key: "user",
  default: null,
});
export const useUser = () => {
  return useRecoilValue(userState);
};
export const useSetUser = () => {
  return useSetRecoilState(userState);
};
