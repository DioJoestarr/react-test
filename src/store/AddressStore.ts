import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Address } from "../types/address";

const addressState = atom<Address[]>({
  key: "addressData",
  default: [],
});
export const useAddressValue = () => {
  return useRecoilValue(addressState);
};
export const useAddressState = () => {
  return useRecoilState(addressState);
};
export const useAddressSetState = () => {
  return useSetRecoilState(addressState);
};
