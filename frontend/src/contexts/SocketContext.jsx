import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { updateGameState, useGameState } from "./GameContext";
import { getTokenPayload } from "../utils/getTokenPayload";
import toast from "react-hot-toast";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [gameState, dispatch] = useGameState();
  // https://super-tictactoe-online.onrender.com
  useEffect(() => {
    const newSocket = io("ws://localhost:10000");

    setSocket(newSocket);
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on("roomCreated", (roomId) => {
      let socketPayload = { roomId };
      const tokenPayload = getTokenPayload();
      if (tokenPayload) {
        socketPayload.userId = tokenPayload.userId;
      }

      socket?.emit("joinRoom", socketPayload, (response) => {
        if (!response.succes) {
          toast.error(response.message);
        }
      });
    });

    return () => {
      socket?.off("roomCreated");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("roomJoined", (room) => {
      const { id, game, clients } = room;

      const newGameState = {
        roomId: id,
        roomClients: clients,
      };

      if (game) {
        newGameState.game = game;
      }

      dispatch(updateGameState(newGameState));
    });

    return () => {
      socket?.off("roomJoined");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("clientsUpdated", (clients) => {
      const newState = { roomClients: clients };
      dispatch(updateGameState(newState));
    });

    return () => {
      socket?.off("clientsUpdated");
    };
  }, [socket]);
  useEffect(() => {
    socket?.on("gameFound", (roomId) => {
      let socketPayload = { roomId };
      const tokenPayload = getTokenPayload();
      if (tokenPayload) {
        socketPayload.userId = tokenPayload.userId;
      }

      socket?.emit("joinRoom", socketPayload);
    });

    return () => {
      socket?.off("gameFound");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("gameUpdated", (game) => {
      const newState = { game: game };
      dispatch(updateGameState(newState));
    });

    return () => {
      socket?.off("gameUpdated");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket && socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
