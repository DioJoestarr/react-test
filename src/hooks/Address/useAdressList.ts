import React, { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { getNextPage } from "../../utils/pageHelper";
import instance from "../../utils/instance";
import { ApiResponsePage } from "../../types/api";
import { Address } from "../../types/address";
//Code dùng để phân trang theo kiểu scroll load more nhưng sau khi test update thì phát hiện api khi update không thật sự update trên server nên không dùng đc
const useAdressList = () => {
  const query = useInfiniteQuery(
    ["address-list"],
    async ({
      pageParam = "/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country",
    }) => {
      const newUrl = pageParam?.replace(instance.defaults.baseURL, "");
      const { data } = await instance.get<ApiResponsePage<Address>>(newUrl);
      return data;
    },
    {
      getNextPageParam: getNextPage,
    }
  );
  const data = useMemo(
    () => query?.data?.pages.flatMap((el) => el?.data),
    [query?.data?.pages]
  );
  return { ...query, data };
};

export default useAdressList;
