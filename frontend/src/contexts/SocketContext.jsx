import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const ip = "";
  const localhost = "localhost";

  useEffect(() => {
    const newSocket = io(`ws://${localhost}:8000`);

    setSocket(newSocket);

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket && socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
