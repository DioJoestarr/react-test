import { useMutation } from "react-query";

import instance from "../../utils/instance";
import toast from "react-hot-toast";
import { ApiErrorResponse } from "../../types/api";
import { AddressForm } from "../../types/address";

const useAddressUpdate = (id) => {
  return useMutation<any, ApiErrorResponse, AddressForm>({
    mutationFn: async (bodyform) => {
      if (!id) return undefined;
      const body = { ...bodyform };
      const { data } = await instance.put(`/self/address/${id}`, body);
      return data;
    },
    onSuccess(data) {
      toast.success("Thành công!");
    },
    onError(error, variables, context) {
      toast.error(error.error.message);
    },
  });
};
export default useAddressUpdate;
