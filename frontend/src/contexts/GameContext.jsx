import { createContext, useContext, useReducer } from "react";

const GameContext = createContext();

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context)
    throw new Error("useGameState must be used within a GameStateProvider.");
  return context;
};

const initialState = {
  roomId: null,
  roomClients: [],
  gameMode: "",
  game: null,
};

const UPDATE_ROOM_ID = "UPDATE_ROOM_ID";
const LEAVE_ROOM = "LEAVE ROOM";
const UPDATE_ROOM_CLIENTS = "UPDATE_ROOM_CLIENTS";
const UPDATE_GAME = "UPDATE_GAME";
const UPDATE_GAME_MODE = "UPDATE_GAME_MODE";

export const updateRoomId = (roomId) => {
  return { type: UPDATE_ROOM_ID, payload: roomId };
};
export const updateRoomClients = (clients) => {
  return { type: UPDATE_ROOM_CLIENTS, payload: clients };
};
export const updateGame = (game) => {
  return { type: UPDATE_GAME, payload: game };
};
export const updateGameMode = (gameMode) => {
  return { type: UPDATE_GAME_MODE, payload: gameMode };
};
export const leaveRoom = () => {
  return { type: LEAVE_ROOM };
};

const gameStateReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ROOM_ID:
      return { ...state, roomId: action.payload };
    case UPDATE_ROOM_CLIENTS:
      return { ...state, roomClients: action.payload };
    case UPDATE_GAME:
      return { ...state, game: action.payload };
    case UPDATE_GAME_MODE:
      return { ...state, gameMode: action.payload };
    case LEAVE_ROOM:
      console.log("left room");
      return initialState;
    default:
      return state;
  }
};

const GameStateProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialState);
  return (
    <GameContext.Provider value={[gameState, dispatch]}>
      {children}
    </GameContext.Provider>
  );
};

export default GameStateProvider;
