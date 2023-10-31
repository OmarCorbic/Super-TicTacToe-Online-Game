import { useState } from "react";

import logo from "../images/logo.png";
import superText from "../images/superText.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const navigate = useNavigate();

  const continueAsGuest = () => {
    navigate("/menu");
  };

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const showRegister = () => {
    setLogin(false);
    setRegister(true);
  };
  const showLogin = () => {
    setRegister(false);
    setLogin(true);
  };

  return (
    <div className="flex h-screen items-center justify-center text-xs md:text-sm">
      <div className="z-0  h-full w-3/4 min-w-[250px] max-w-[500px]  rounded-xl bg-opacity-30 py-5">
        <div className=" flex h-full flex-col items-center justify-center gap-4  p-4">
          <div
            className=" relative mb-4 h-44 w-32 rounded-md border-2 border-cyan-400 bg-contain bg-center bg-no-repeat shadow-md  shadow-cyan-400 md:h-44 md:w-32"
            style={{ backgroundImage: `url(${logo})` }}
          >
            <div
              style={{ backgroundImage: `url(${superText})` }}
              className="absolute left-[-60px] top-[-60px] h-32 w-40 -rotate-45 bg-cover bg-center bg-no-repeat"
            ></div>
          </div>

          {login ? (
            <Login showRegister={showRegister} />
          ) : register ? (
            <Register showLogin={showLogin} />
          ) : null}

          <button
            onClick={showLogin}
            className={`${
              login || register ? "hidden" : "block"
            } w-full rounded bg-violet-600 py-2 font-bold text-white hover:bg-violet-500`}
          >
            Use account
          </button>
          <div
            className={`${
              login || register ? "flex-row" : "flex-col"
            } flex w-full gap-4`}
          >
            <button
              onClick={continueAsGuest}
              className="w-full rounded bg-pink-600 py-2 font-bold text-white hover:bg-pink-500"
            >
              Guest
            </button>

            <button className="w-full rounded bg-cyan-600 py-2 font-bold text-white hover:bg-cyan-500">
              Google
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-1 text-xs font-bold text-cyan-400">
        Designed & developed by <span className="text-white">Omar Čorbić</span>
      </div>
    </div>
  );
};

export default Auth;
