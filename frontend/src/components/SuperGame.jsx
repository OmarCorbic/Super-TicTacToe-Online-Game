import React from "react";
import BasicGame from "./BasicGame";
import { useGameState } from "../contexts/GameContext";

const SuperGame = () => {
  const [{ game }] = useGameState();

  const validPos = {
    "TL-BR": { 0: 0, 1: 1, 2: 2 },
    "TR-BL": { 0: 2, 1: 1, 2: 0 },
  };

  return (
    <div className="flex items-center justify-center ">
      <div>
        {game.board.map((row, y) => {
          return (
            <div key={y} className="relative flex gap-3">
              {row.map((cell, x) => {
                return (
                  <div
                    className="relative mt-3 flex items-center justify-center"
                    key={x}
                  >
                    <BasicGame posSuper={{ x, y }} basicCell={cell} />
                    {game.winner && game.winner.column === x && (
                      <div className="absolute left-[49%] z-0 h-[120%] border-2"></div>
                    )}
                    {game.winner &&
                      game.winner.diagonal &&
                      validPos[game.winner.diagonal][y] === x && (
                        <div
                          className={`absolute left-[49%] z-0 h-[170%] w-2 ${
                            game.winner.diagonal === "TL-BR"
                              ? "-rotate-45"
                              : "rotate-45"
                          } bg-blue-400`}
                        ></div>
                      )}
                  </div>
                );
              })}
              {game.winner && game.winner.row === y && (
                <div className="absolute top-[49%] w-full border-2"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuperGame;
