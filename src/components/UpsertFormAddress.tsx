import React, { useMemo } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FormInput from "../ui/AppFormInput/FormInput";
import FormSelect from "../ui/AppFormInput/FormSelect";

import { AddressForm } from "../types/address";
import useAddressCreate from "../hooks/Address/useAddressCreate";
import useProvinces from "../hooks/Common/useProvinces";

import useAddressUpdate from "../hooks/Address/useAddressUpdate";

import useDistricts from "../hooks/Common/useDistricts";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";


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
  const queryClient = useQueryClient()
  const { data: provinces } = useProvinces();

  const selectedProvince = useMemo(() => {
    return provinces?.find((p) => watch().city === p.name)?.code;
  }, [watch().city, provinces]);
  const { data: districts } = useDistricts(selectedProvince);
  const { mutate } = useAddressCreate();
  const { mutate: mutateUpdate } = useAddressUpdate(updateId);
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

  return (
    <div>
      <Card className="p-0">
        <CardBody>
          <div className=" border-bottom py-3 fw-bold mb-3  text-center">
            Thêm mới địa chỉ
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              if (type === "create") {
                mutate(data, {
                  onSuccess(data, variables, context) {},
                });
              } else {
                mutateUpdate(data, {
                  onSuccess(data, variables, context) {
                    // setAddress((prev) => {
                    //   return prev.data.map((item) => {
                    //     const { zipcode, ...newValue } = watch();
                    //     return {
                    //       ...newValue,
                    //     };
                    //   });
                    // });
                    queryClient.setQueryData("address-list",()=>{
                      
                    })
                    navigate("/address");
                    console.log("đâsd");
                  },
                });
              }
            })}
          >
            <FormInput
              label="Họ và tên"
              rules={{ required: "Vui lòng nhập họ và tên", maxLength: 50 }}
              control={control}
              {...register("name")}
            />
            <FormInput
              label="Số điện thoại"
              rules={{
                required: "Vui lòng nhập phố điện thoại",
                maxLength: 10,
              }}
              control={control}
              {...register("phone")}
            />
            <FormInput
              label="Địa chỉ Email"
              rules={{ required: "Vui lòng nhập email", maxLength: 50 }}
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
