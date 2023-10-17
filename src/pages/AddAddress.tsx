import React, { useMemo } from "react";

import { useForm } from "react-hook-form";
import { useSetAddressRecoilState } from "../store/AddressStore";
import useProvinces from "../hooks/Common/useProvinces";
import useDistricts from "../hooks/Common/useDistricts";
import useAddressCreate from "../hooks/Address/useAddressCreate";
import useAddressUpdate from "../hooks/Address/useAddressUpdate";
import { Card, CardBody } from "react-bootstrap";
import FormInput from "../ui/AppFormInput/FormInput";
import FormSelect from "../ui/AppFormInput/FormSelect";
import { AddressCreateForm } from "../types/address";
import UpsertFormAddress from "../components/UpsertFormAddress";

const AddAddress = () => {
  return <UpsertFormAddress type="create" />;
};

export default AddAddress;
