import React, { useContext } from "react";
import { Store } from "../store";
import Order from "./Order";
import Login from "./Login";
import Register from "./Register";

function Root() {
  const token = localStorage.getItem("u_tkn");

  if (token) {
    return <Order />;
  } else {
    return <Register />;
  }
}

export default Root;
