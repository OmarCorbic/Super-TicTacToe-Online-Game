import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useGameState } from "../contexts/GameContext";

const PlayerInfo = ({ player, side }) => {
  const [
    {
      game: { winner, playerTurn },
    },
  ] = useGameState();
  const turn = playerTurn.playerId === player.playerId;

  return (
    <fieldset className="flex w-full items-center rounded-lg border border-cyan-100 px-4 py-3 text-white md:h-44 md:flex-col md:items-start md:self-start">
      <legend className={` flex items-center justify-start`}>
        <div className={`${turn && "font-bold text-yellow-500"} pr-3`}>
          {side}
        </div>
        <div
          style={{
            textShadow: `0px 0px 10px ${
              player.sign === "X" ? "rgba(255,0,71,1)" : "rgb(0,250,255)"
            }`,
          }}
          className={`text-center text-3xl font-bold text-white`}
        >
          {player.sign}
        </div>
      </legend>
      <div className="flex items-center text-xs">
        <div className="flex  items-center justify-center rounded-xl border-2 bg-cyan-900 p-3 md:h-20 md:w-20">
          <BsPersonCircle className="h-5 w-5 md:h-10 md:w-10" />
        </div>
        <div className="ml-3 md:mt-2">
          {player.username
            ? player.username
            : "Guest_" + player.playerId.slice(0, 5)}
        </div>
      </div>
      {winner && winner.playerId === player.playerId && (
        <div className="p-2 text-lg text-yellow-400">YOU WON</div>
      )}
    </fieldset>
  );
};

export default PlayerInfo;
