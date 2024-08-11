import { useRef, useState } from "react";
import { useSocket } from "../contexts/SocketContext";
import { useGameState } from "../contexts/GameContext";
import toast from "react-hot-toast";
import { getTokenPayload } from "../utils/getTokenPayload";
import { Navigate } from "react-router-dom";

const Multiplayer = () => {
  const [gameState] = useGameState();
  const socket = useSocket();
  const inputRef = useRef();

  const [createMode, setCreateMode] = useState("");
  const [findMode, setFindMode] = useState("");

  const handleCreateRoom = () => {
    if (!createMode) {
      toast.error("Please choose game mode");
      return;
    }
    socket?.emit("createRoom", createMode);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    const roomId = inputRef.current.value;
    if (!roomId) {
      toast.error("Please type in room id");
      return;
    }
    let socketPayload = { roomId };
    const tokenPayload = getTokenPayload();
    if (tokenPayload) {
      socketPayload.userId = tokenPayload.userId;
    }

    socket?.emit("joinRoom", socketPayload, (response) => {
      if (!response.success) {
        toast.error(response.message);
      }
    });
  };

  const handleFindGame = () => {
    if (!findMode) {
      toast.error("Please choose game mode");
      return;
    }

    socket?.emit("findGame", findMode, (response) => {
      if (!response.success) {
        toast.error(response.message);
      }
    });
  };

  if (gameState.game) {
    return <Navigate to={`/game/${gameState.game.gameId}`} />;
  }

  return (
    <>
      {gameState?.roomId ? (
        <div className="relative flex items-center justify-center">
          <div className=" flex h-52 w-52 animate-spin items-center justify-center rounded-full border-2 border-cyan-100 p-5 text-xl font-bold text-pink-300 shadow-[inset_-5px_-5px_20px_1px_rgba(0,0,0,0.1),_5px_5px_20px_1px_rgba(45,78,255,0.15)] shadow-cyan-400 md:h-80 md:w-80"></div>
          <p className="absolute text-xs font-bold text-white md:text-lg">
            Waiting for another player...
          </p>
        </div>
      ) : (
        <div className="flex h-full w-[75%] flex-col items-center justify-center gap-3 sm:w-80">
          <div className="flex h-1/5 w-full flex-col items-center justify-center overflow-hidden rounded-full border-2 border-cyan-100 bg-black bg-opacity-60 shadow-[inset_-5px_-5px_20px_1px_rgba(0,0,0,0.1),_5px_5px_20px_1px_rgba(45,78,255,0.15)] shadow-cyan-400">
            <div className="flex h-1/2 w-full text-center font-bold text-pink-300 ">
              <button
                onClick={() => setCreateMode("BASIC")}
                className={`w-1/2 border-r-2 text-center ${
                  createMode === "BASIC" && "bg-cyan-100 text-purple-900"
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setCreateMode("SUPER")}
                className={`w-1/2 text-center ${
                  createMode === "SUPER" && "bg-cyan-100 text-purple-900"
                }`}
              >
                Super
              </button>
            </div>
            <button
              disabled={gameState?.roomId}
              className="h-1/2 w-full cursor-pointer border-t-2 border-cyan-100 text-center  font-bold text-pink-300  shadow-cyan-400 transition hover:bg-cyan-200 hover:text-purple-900"
              onClick={handleCreateRoom}
            >
              Create room
            </button>
          </div>
          <div className="flex h-1/5 w-full flex-col items-center justify-center overflow-hidden rounded-full border-2 border-cyan-100 bg-black bg-opacity-60 shadow-[inset_-5px_-5px_20px_1px_rgba(0,0,0,0.1),_5px_5px_20px_1px_rgba(45,78,255,0.15)] shadow-cyan-400">
            <div className="flex h-1/2 w-full text-center font-bold text-pink-300  ">
              <button
                onClick={() => setFindMode("BASIC")}
                className={`w-1/2 border-r-2  text-center ${
                  findMode === "BASIC" && "bg-cyan-100 text-purple-900"
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setFindMode("SUPER")}
                className={`w-1/2 text-center ${
                  findMode === "SUPER" && "bg-cyan-100 text-purple-900"
                }`}
              >
                Super
              </button>
            </div>
            <button
              disabled={gameState?.roomId}
              className="h-1/2 w-full cursor-pointer border-t-2 text-center font-bold text-pink-300  shadow-cyan-400 transition hover:bg-cyan-200 hover:text-purple-900"
              onClick={handleFindGame}
            >
              Find game
            </button>
          </div>
          <div className="flex h-1/5 w-full flex-col items-center justify-center overflow-hidden rounded-full border-2 border-cyan-100 bg-black bg-opacity-60 shadow-[inset_-5px_-5px_20px_1px_rgba(0,0,0,0.1),_5px_5px_20px_1px_rgba(45,78,255,0.15)] shadow-cyan-400">
            <form className="h-full w-full" onSubmit={handleJoinRoom}>
              <input
                className="h-1/2 w-full text-center outline-none"
                placeholder="Enter room ID"
                ref={inputRef}
                type="text"
              />
              <button
                type="submit"
                disabled={gameState?.roomId}
                className="h-1/2 w-full cursor-pointer text-center  font-bold text-pink-300 shadow-md shadow-cyan-400 transition hover:bg-cyan-200 hover:text-purple-900"
              >
                Join Game
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Multiplayer;
