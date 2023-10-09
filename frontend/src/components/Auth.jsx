import { useState } from "react";

import logo from "../images/logo.png";
import superText from "../images/superText.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Auth = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      toast.error("Please provide username");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ name: username }));
    navigate("/menu");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="z-0 h-2/3  w-3/4  min-w-[250px] max-w-[500px] rounded-xl bg-opacity-30">
        <form
          onSubmit={handleSubmit}
          className="flex h-full items-center justify-center"
        >
          <div className="flex flex-col items-center justify-start gap-4 p-4">
            <div
              className="relative mb-10 h-52 w-40 rounded-md border-2 border-cyan-400 bg-contain bg-center  bg-no-repeat shadow-md shadow-cyan-400"
              style={{ backgroundImage: `url(${logo})` }}
            >
              <div
                style={{ backgroundImage: `url(${superText})` }}
                className="absolute left-[-60px] top-[-60px] h-32 w-40 -rotate-45 bg-cover bg-center bg-no-repeat"
              ></div>
            </div>
            <label className="text-xl font-bold text-white" htmlFor="username">
              Username
            </label>
            <input
              className="rounded-md bg-pink-100 p-2 text-center outline-none"
              onChange={handleUsernameChange}
              value={username}
              type="text"
              name="username"
            />
            <button
              className="w-full rounded bg-cyan-600 py-2 font-bold text-white hover:bg-cyan-500"
              type="submit"
            >
              Let's go!
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-0 right-0 p-1 text-xs font-bold text-cyan-400">
        Designed & developed by <span className="text-white">Omar Čorbić</span>
      </div>
    </div>
  );
};

export default Auth;
