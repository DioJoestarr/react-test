import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routers from "./routers";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import React, { useEffect } from "react";


function App() {
 

  return (
    <BrowserRouter>
      <Routers />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
