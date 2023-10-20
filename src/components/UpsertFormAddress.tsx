import React, { useMemo } from "react";
import { Card, CardBody } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FormInput from "../ui/AppFormInput/FormInput";
import FormSelect from "../ui/AppFormInput/FormSelect";

import { Address, AddressForm } from "../types/address";
import useAddressCreate from "../hooks/Address/useAddressCreate";
import useProvinces from "../hooks/Common/useProvinces";

import useAddressUpdate from "../hooks/Address/useAddressUpdate";

import useDistricts from "../hooks/Common/useDistricts";
import { useNavigate } from "react-router-dom";
import { InfiniteData, useQueryClient } from "react-query";
import { ApiResponsePage } from "../types/api";

const UpsertFormAddress = ({
  type,
  initData,
  updateId,
}: {
  type?: "create" | "update";
  initData?: AddressForm;
  updateId?: string | number;
}) => {
  const { control, register, watch, handleSubmit } = useForm<AddressForm>({
    defaultValues: initData
      ? initData
      : {
          zipcode: 1,
          country: "VN",
          address: "dasd",
        },
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: provinces } = useProvinces();

  const selectedProvince = useMemo(() => {
    return provinces?.find((p) => watch().city === p.name)?.code;
  }, [watch().city, provinces]);
  const { data: districts } = useDistricts(selectedProvince);
  const { mutate } = useAddressCreate();
  const { mutate: mutateUpdate } = useAddressUpdate(updateId);
  //vì api chỉ nhận tên tỉnh chứ ko lấy id nên phải so sánh value bằng tên, một vài address có tỉnh ko match với trên api tỉnh sẽ không hiện đc.
  const provinceSelectList = useMemo(() => {
    const modifieldData = provinces?.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    return modifieldData;
  }, [provinces]);
  const districtSelectList = useMemo(() => {
    const modifieldData = districts?.districts?.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    return modifieldData;
  }, [districts]);
  const handleSubmitForm = (data) => {
    if (type === "create") {
      mutate(data, {
        onSuccess(data) {
          //cập nhật list bên trang address mà không cần gọi request lại api
          queryClient.setQueryData<InfiniteData<ApiResponsePage<Address>>>(
            "address-list",
            (oldData): any => {
              const newElem = {
                ...watch(),
                xid: data.data.xid,
              } as Address;
              const currentList = oldData?.pages[0];
              if (currentList) {
                currentList.data = [newElem, ...currentList.data];
              }
              return {
                ...oldData,
              };
            }
          );
          navigate("/address");
        },
      });
    } else {
      mutateUpdate(data, {
        onSuccess(data, variables, context) {
          //cập nhật list bên trang address mà không cần gọi request lại api
          queryClient.setQueryData<InfiniteData<ApiResponsePage<Address>>>(
            "address-list",
            (oldData): any => {
              const newData = oldData?.pages.map((page) => {
                const newList = page.data.map((item) => {
                  if (item.xid === updateId) {
                    return {
                      ...watch(),
                    };
                  } else {
                    return item;
                  }
                });
                return {
                  ...page,
                  data: newList,
                };
              });
              return {
                ...oldData,
                pages: newData,
              };
            }
          );
          navigate("/address");
        },
      });
    }
  };

  return (
    <div className="m-auto max-w-400 py-3">
      <Card className="p-0">
        <CardBody>
          <div className=" border-bottom pb-3 fw-bold mb-3  text-center">
            {type === "create" ? "Thêm mới địa chỉ" : "Chỉnh sửa địa chỉ"}
          </div>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormInput
              label="Họ và tên"
              rules={{ required: "Vui lòng nhập họ và tên", maxLength: 50 }}
              control={control}
              {...register("name")}
            />

            <FormInput
              label="Số điện thoại"
              inputProps={{
                type:"number"
              }}
              rules={{
                required: "Vui lòng nhập số điện thoại",
                maxLength: 10,

                validate: {
                  checkPhone: (v) => {
                    return (
                      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(v) ||
                      "Vui lòng nhập đúng định dạng SDT"
                    );
                  },
                },
              }}
              control={control}
              {...register("phone")}
            />
            <FormInput
              label="Địa chỉ Email"
              rules={{
                required: "Vui lòng nhập email",
                validate: {
                  checkEmail: (v) => {
                    return (
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Vui lòng nhập đúng định dạng email"
                    );
                  },
                },
              }}
              control={control}
              {...register("email")}
            />
            <FormSelect
              {...register("city")}
              control={control}
              label="Tỉnh, Thành phố"
              rules={{
                required: "Vui lòng chọn tỉnh thành phố",
              }}
              selectProps={{
                options: provinceSelectList,
              }}
            />
            <FormSelect
              {...register("state")}
              control={control}
              label="Quận, huyện"
              rules={{
                required: "Vui lòng chọn quận huyện",
              }}
              selectProps={{
                options: districtSelectList,
              }}
            />

            <FormInput
              label="Địa chỉ cụ thể"
              rules={{ required: "Vui lòng nhập địa chỉ cụ thể" }}
              control={control}
              {...register("shipping_address")}
            />
            <div className="mt-3">
              <button
                type="submit"
                style={{ backgroundColor: "#ffdd0f" }}
                className="btn btn-primary text-black border-0 py-2"
              >
                Lưu thông tin
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpsertFormAddress;
