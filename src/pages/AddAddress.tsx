import React from "react";

import UpsertFormAddress from "../components/UpsertFormAddress";
import { withAuth } from "../hocs/withAuth";

const AddAddress = () => {
  return <UpsertFormAddress type="create" />;
};

export default withAuth(AddAddress);
