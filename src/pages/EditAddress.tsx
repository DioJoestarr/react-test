import FormInput from "../ui/AppFormInput/FormInput";

import useAddressUpdate from "../hooks/Address/useAddressUpdate";
import {
  useAddressValue,
} from "../store/AddressStore";

import React, { useMemo } from "react";
import { AddressForm } from "../types/address";
import { useParams } from "react-router-dom";
import UpsertFormAddress from "../components/UpsertFormAddress";

function EditAddress() {
  const { addressId } = useParams();
  const value = useAddressValue();

  if (!addressId) return <></>;
  const addressDetail = useMemo(() => {
    if (!value) return undefined;
    return value.data?.find((item) => {
      return item.xid == addressId;
    });
  }, [value, addressId]);
  if (!addressDetail)
    return <h4 className="text-center">Không tồn tại địa chỉ này</h4>;

  return (
    <UpsertFormAddress
      initData={{ ...addressDetail, zipcode: 1 } as AddressForm}
      updateId={addressDetail.xid}
      type="update"
    />
  );
}

export default EditAddress;
