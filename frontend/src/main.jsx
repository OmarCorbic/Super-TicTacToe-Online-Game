import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SocketProvider from "./contexts/SocketContext.jsx";
import GameStateProvider from "./contexts/GameContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GameStateProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </GameStateProvider>,
);
