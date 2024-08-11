import toast from "react-hot-toast";
import { useGameState } from "../contexts/GameContext";
import { useSocket } from "../contexts/SocketContext";

const BasicGame = ({ basicCell = null, posSuper = null }) => {
  const socket = useSocket();
  const [{ game, roomId }] = useGameState();
  const nextPos = game.nextMandatoryPos;
  const isNextPos = nextPos
    ? nextPos.x === posSuper.x && nextPos.y === posSuper.y
    : false;

  const emptyBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const handlePlay = (x, y) => {
    const payLoad = {
      posBasic: { x, y },
      roomId: roomId,
    };

    if (posSuper) {
      payLoad.posSuper = posSuper;
    }

    socket.emit("play", payLoad, (response) => {
      if (!response.success) {
        toast.error(response.message);
      }
    });
  };

  if (!basicCell && !posSuper && game.gameMode === "BASIC") {
    return (
      <div className=" flex h-screen flex-col items-center justify-center">
        {game?.board?.map((row, y) => {
          return (
            <div className="flex" key={y}>
              {row.map((cell, x) => {
                return (
                  <div
                    style={{
                      textShadow: `0px 0px 10px ${
                        cell === "X" ? "rgba(255,0,71,1)" : "rgb(0,250,255)"
                      }`,
                    }}
                    key={x}
                    onClick={() => handlePlay(x, y)}
                    className="m-2 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-cyan-100 bg-cyan-800 bg-opacity-40 p-1 text-2xl font-bold text-white shadow-[inset_-5px_-5px_20px_1px_rgba(0,0,0,0.1),_5px_5px_20px_1px_rgba(45,78,255,0.15)] shadow-cyan-400  md:h-32 md:w-32 md:text-[300%]  lg:h-40 lg:w-40"
                  >
                    {cell === "X" || cell === "O" ? cell : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  if (basicCell && posSuper && game.gameMode === "SUPER") {
    return (
      <div
        className={`${
          isNextPos &&
          socket.id === game.playerTurn.playerId &&
          " z-10 scale-150 md:scale-100"
        } relative flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-cyan-100 bg-cyan-800 bg-opacity-40  shadow-[inset_-5px_-5px_20px_1px_rgba(0,0,0,0.1),_5px_5px_20px_1px_rgba(45,78,255,0.15)] shadow-cyan-400 md:h-32 md:w-32 lg:h-40 lg:w-40`}
      >
        {isNextPos && (
          <div className="border-1 absolute left-0 top-0 z-[-1] h-full w-full animate-spin rounded-full border-cyan-100 shadow-[inset_-5px_-5px_20px_1px_rgba(0,0,0,0.1),_5px_5px_20px_1px_rgba(45,78,255,0.15)] shadow-cyan-400"></div>
        )}
        {basicCell === "O" ? (
          <div
            style={{
              textShadow: "0px 0px 10px rgb(0,250,255)",
            }}
            className=" font-bold text-white md:text-[300%]"
          >
            O
          </div>
        ) : basicCell === "X" ? (
          <div
            style={{
              textShadow: "0px 0px 10px rgb(255,77,189)",
            }}
            className="font-bold text-white md:text-[300%]"
          >
            X
          </div>
        ) : typeof basicCell === "object" ? (
          basicCell.board?.map((row, y) => {
            return (
              <div key={y} className=" flex">
                {row.map((cell, x) => {
                  return (
                    <button
                      onClick={() => handlePlay(x, y)}
                      style={{
                        textShadow: `0px 0px 10px ${
                          cell === "X" ? "rgba(255,0,71,1)" : "rgb(0,250,255)"
                        }`,
                      }}
                      className={`${
                        isNextPos && "border-2 border-lime-300"
                      }  } m-[2px] flex h-5 w-5 cursor-pointer items-center justify-center bg-[#b75aab] text-xs font-bold text-white shadow-sm shadow-purple-800  hover:bg-[#d167c3]  md:m-[5px] md:h-7 md:w-7 md:text-base lg:h-10 lg:w-10 lg:text-xl`}
                      key={x}
                    >
                      {cell === "X" || cell === "O" ? cell : ""}
                    </button>
                  );
                })}
              </div>
            );
          })
        ) : (
          emptyBoard.map((row, y) => {
            return (
              <div key={y} className="flex">
                {row.map((cell, x) => {
                  return (
                    <div
                      onClick={() => handlePlay(x, y)}
                      style={{
                        textShadow: `0px 0px 10px ${
                          cell === "X" ? "rgba(255,0,71,1)" : "rgb(0,250,255)"
                        }`,
                      }}
                      className={`${
                        isNextPos && "border-2 border-lime-300"
                      }  m-[2px] flex h-5 w-5 cursor-pointer items-center justify-center bg-[#b75aab] text-xs  font-bold shadow-sm  shadow-purple-800 hover:bg-[#d167c3] md:m-[5px] md:h-7 md:w-7 md:text-base lg:h-10 lg:w-10 lg:text-lg`}
                      key={x}
                    >
                      {cell === "X" || cell === "O" ? cell : ""}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default BasicGame;
