import { useMutation } from "react-query";
import { AddressForm } from "../../types/address";
import instance from "../../utils/instance";
import toast from "react-hot-toast";
import { ApiErrorResponse, ApiResponse } from "../../types/api";

const useAddressCreate = () => {
  return useMutation<
    ApiResponse<{ xid: string }>,
    ApiErrorResponse,
    AddressForm
  >({
    mutationFn: async (bodyform) => {
      const body = { ...bodyform };
      const { data } = await instance.post(`/self/address`, body);
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
export default useAddressCreate;
