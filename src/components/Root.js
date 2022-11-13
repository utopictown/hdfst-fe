import React, { useContext } from "react";
import { Store } from "../store";
import Claims from "./Claims";
import Login from "./Login";
import Register from "./Register";

function Root() {
  const token = localStorage.getItem("u_tkn");

  if (token) {
    return <Claims />;
  } else {
    return <Register />;
  }
}

export default Root;
