import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = ({ showRegister }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const changeLoginData = (e) => {
    setLoginData((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", loginData);
      navigate("/multiplayer");
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setLoginData({ email: "", password: "" });
    e.target.reset();
  };

  return (
    <div className="w-full">
      <form
        action=""
        onSubmit={submitLogin}
        className={`flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg text-center`}
      >
        <input
          value={loginData.email}
          onChange={changeLoginData}
          className=" h-8 w-full rounded-sm px-2   outline-none"
          name="email"
          placeholder="E-mail"
          type="text"
        />

        <input
          onChange={changeLoginData}
          className=" h-8 w-full rounded-sm px-2   outline-none"
          placeholder="Password"
          name="password"
          type="password"
        />

        <button
          className="w-full rounded bg-yellow-500 py-2 font-bold text-white hover:bg-yellow-400"
          type="submit"
        >
          Log in
        </button>
      </form>
      <div
        className="w-full py-2 text-center text-white
      "
      >
        Don't have an account?{" "}
        <button onClick={showRegister} className="text-yellow-200">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
