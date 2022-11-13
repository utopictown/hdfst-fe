import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import actionType from "../store/action-type";
import { Button } from "./shared/Button";
import ButtonContent from "./shared/ButtonContent";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  const { state, dispatch } = useContext(Store.State);

  const [errorMsg, setErrorMsg] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("u_tkn");
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        username: user.username,
        password: user.password,
      });

      if (resp.status == 201) {
        localStorage.setItem("u_tkn", resp.data.access_token);
        dispatch({ type: actionType.LOGIN, value: user });
        navigate("/");
      }
    } catch (error) {
      setErrorMsg(Array.isArray(error.response.data.message) ? error.response.data.message : [error.response.data.message]);
    }
  };
  return (
    <form className="flex justify-center items-center h-screen flex-col space-y-8" onSubmit={handleOnSubmit}>
      <section className="flex flex-col space-y-2 w-80">
        <label htmlFor="username">username</label>
        <input
          placeholder="admin"
          onChange={handleOnChange}
          id="username"
          type="text"
          name="username"
          className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
        />
      </section>
      <section className="flex flex-col space-y-2 w-80">
        <label htmlFor="password">password</label>
        <input
          placeholder="admin"
          onChange={handleOnChange}
          id="password"
          type="password"
          name="password"
          className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
        />
      </section>
      {errorMsg.length > 0 ? (
        <section className="flex flex-col space-y-2 w-80">
          {errorMsg.map((msg) => (
            <span className=" text-red-500 text-sm">{msg}</span>
          ))}
        </section>
      ) : (
        ""
      )}
      <section className="flex flex-col space-y-2 w-80">
        <Button type="submit" className={"bg-indigo-500 text-white"}>
          <ButtonContent text={"Login"} />
        </Button>
      </section>
    </form>
  );
}

export default Login;
