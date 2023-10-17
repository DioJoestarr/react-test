import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Address } from "../types/address";
import { ApiResponsePage } from "../types/api";
import instance from "../utils/instance";

const ADDRESS_LIST = "addressListData";
type AddressListStateType = {
  data: Address[];
  nextPage: string | null;
  isLoading?: boolean;
  firstFetch?: boolean
};
const addressListState = atom<AddressListStateType>({
  key: ADDRESS_LIST,
  default: {
    data: [],
    nextPage: "/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country",
    isLoading: true,
    firstFetch: false,
  },
});
const addressQuery = selector({
  key: "AddressQuery",
  get: async ({ get }): Promise<AddressListStateType> => {
    const { data, isLoading, nextPage } = get(addressListState);
    console.log("đấ")
    if (!nextPage)
      return {
        data,
        nextPage,
        isLoading,
      };
    const res = await instance.get<ApiResponsePage<Address>>(nextPage);
    const newUrl = res.data.meta.paging.links.next?.replace(
      instance.defaults.baseURL as string,
      ""
    );
    return {
      data: res.data.data,
      isLoading: false,
      nextPage: newUrl,
    };
  },
});

export const useAddressValue = () => {
  return useRecoilValue(addressListState);
};
export const useAddressState = () => {
  return useRecoilState(addressListState);
};
