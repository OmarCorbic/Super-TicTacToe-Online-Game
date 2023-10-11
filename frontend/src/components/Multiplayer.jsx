import { useRef, useState } from "react";
import { useSocket } from "../contexts/SocketContext";
import {
  updateGame,
  updateGameMode,
  updateRoomClients,
  updateRoomId,
  useGameState,
} from "../contexts/GameContext";
import toast from "react-hot-toast";
import Game from "./Game";

const Multiplayer = () => {
  const [gameState, dispatch] = useGameState();
  const socket = useSocket();
  const inputRef = useRef();

  const [createMode, setCreateMode] = useState("");
  const [findMode, setFindMode] = useState("");

  socket?.on("roomCreated", (roomId) => {
    console.log(roomId);
  });

  socket?.on("roomJoined", (room) => {
    const { mode, id, game, clients } = room;
    if (mode) {
      dispatch(updateGameMode(mode));
    }
    if (id) {
      dispatch(updateRoomId(id));
    }
    if (clients) {
      dispatch(updateRoomClients(clients));
    }
    if (game) {
      dispatch(updateGame(game));
    }
  });

  socket?.on("clientsUpdated", (clients) => {
    dispatch(updateRoomClients(clients));
  });

  socket?.on("gameUpdated", (game) => {
    dispatch(updateGame(game));
  });

  socket?.on("error", (error) => {
    toast.error(error);
  });

  const handleCreateRoom = () => {
    if (!createMode) {
      toast.error("Please chose game mode");
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
    socket?.emit("joinRoom", roomId);
  };

  const handleFindGame = () => {};

  if (gameState.game) {
    return <Game />;
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
