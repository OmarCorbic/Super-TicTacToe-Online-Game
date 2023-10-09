import React from "react";
import { leaveRoom, useGameState } from "../contexts/GameContext";
import SuperGame from "./SuperGame";
import BasicGame from "./BasicGame";
import { useSocket } from "../contexts/SocketContext";
import PlayerInfo from "./PlayerInfo";
import { useLocation, useNavigate } from "react-router-dom";

const Game = () => {
  const socket = useSocket();
  const location = useLocation();
  const navigate = useNavigate();

  const [{ game, roomClients, roomId }, dispatch] = useGameState();
  const playerOne = game.playerOne;
  const playerTwo = game.playerTwo;
  const playerTurn = game.playerTurn;
  const you = playerOne.playerId === socket.id ? playerOne : playerTwo;
  const opponent = playerOne.playerId !== socket.id ? playerOne : playerTwo;

  const goBack = () => {
    if (location.pathname === "/multiplayer" && game) {
      socket.emit("leaveRoom", roomId);
      dispatch(leaveRoom());
    }
    navigate(-1);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-around p-5 md:flex-row-reverse md:items-center md:justify-center md:gap-5 md:pt-11">
      <PlayerInfo
        player={opponent}
        side="Opponent"
        turn={playerTurn.playerId === opponent.playerId}
      />
      {!roomClients.length < 2 ? (
        <div className="relative flex items-center justify-center">
          <div className=" flex h-52 w-52 animate-spin items-center justify-center rounded-full border-2 border-cyan-100 p-5 text-xl font-bold text-pink-300 shadow-[inset_-5px_-5px_20px_1px_rgba(0,0,0,0.1),_5px_5px_20px_1px_rgba(45,78,255,0.15)] shadow-cyan-400 md:h-80 md:w-80"></div>
          <p className="absolute flex flex-col text-center text-xs font-bold text-white md:text-xl">
            Opponent left...
            <button
              className="mt-2 rounded-lg border bg-cyan-900 p-2"
              onClick={goBack}
            >
              Go to menu
            </button>
          </p>
        </div>
      ) : game?.gameMode === "SUPER" ? (
        <SuperGame />
      ) : game?.gameMode === "BASIC" ? (
        <BasicGame />
      ) : null}
      <PlayerInfo
        player={you}
        side="You"
        turn={playerTurn.playerId === socket.id}
      />
    </div>
  );
};

export default Game;
