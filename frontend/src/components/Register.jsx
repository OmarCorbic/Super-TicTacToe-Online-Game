import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = ({ showLogin }) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPw: "",
  });

  const changeRegisterData = (e) => {
    setRegisterData((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", registerData);
      toast.success("Successfully registered!", response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setRegisterData({ username: "", email: "", password: "", confirmPw: "" });
    e.target.reset();
  };

  return (
    <div className="w-full">
      <form
        onSubmit={submitRegister}
        action=""
        className={`flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg text-center`}
      >
        <input
          onChange={changeRegisterData}
          value={registerData.username}
          className=" h-8 w-full rounded-sm px-2  outline-none"
          name="username"
          placeholder="Username"
          type="text"
        />
        <input
          onChange={changeRegisterData}
          value={registerData.email}
          className=" h-8 w-full rounded-sm px-2  outline-none"
          name="email"
          placeholder="E-mail"
          type="text"
        />

        <input
          onChange={changeRegisterData}
          className=" h-8 w-full rounded-sm px-2  outline-none"
          placeholder="Password"
          name="password"
          type="password"
        />
        <input
          onChange={changeRegisterData}
          className=" h-8 w-full rounded-sm px-2  outline-none"
          placeholder="Confirm password"
          name="confirmPw"
          type="password"
        />

        <button
          className="w-full rounded bg-yellow-500 py-2 font-bold text-white hover:bg-yellow-400"
          type="submit"
        >
          Register
        </button>
      </form>
      <div
        className="w-full py-2 text-center text-white
  "
      >
        Already have an account?{" "}
        <button onClick={showLogin} className="text-yellow-200">
          Log in
        </button>
      </div>
    </div>
  );
};

export default Register;
