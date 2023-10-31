import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import background from "../images/background.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSocket } from "../contexts/SocketContext";
import { leaveRoom, useGameState } from "../contexts/GameContext";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  const [gameState, dispatch] = useGameState();
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexPage = location.pathname === "/";

  const goBack = () => {
    if (gameState.roomId) {
      socket.emit("leaveRoom", gameState.roomId);
      dispatch(leaveRoom());
      navigate("/multiplayer");
      return;
    }
    if (location.pathname === "/multiplayer") {
      navigate("/menu");
      return;
    }
    if (location.pathname === "/menu") {
      navigate("/");
      return;
    }
    navigate(-1);
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div
        className="absolute left-0 top-0 -z-10 h-full w-full bg-cover blur-sm brightness-75"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <Toaster />

      <button
        onClick={goBack}
        className={`absolute left-0 top-0 cursor-pointer pl-2 pt-2 ${
          isIndexPage && "hidden"
        }`}
      >
        <IoMdArrowRoundBack size={30} color="cyan" />
      </button>
      <div className="flex h-full w-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
