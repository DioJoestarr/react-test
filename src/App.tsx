import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routers from "./routers";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import React, { useEffect } from "react";
import { useAddressSetState } from "./store/AddressStore";
import instance from "./utils/instance";
import { ApiResponse, ApiResponsePage } from "./types/api";
import { Address } from "./types/address";

function App() {
  // const setAddress = useAddressSetState();
  // useEffect(() => {
  //   instance
  //     .get<ApiResponsePage<Address>>(
  //       "/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country"
  //     )
  //     .then(({ data }) => {
  //       setAddress(data.data);
  //     });
  // }, []);

  return (
    <BrowserRouter>
      <Routers />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
