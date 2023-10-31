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
  game: null,
};

const LEAVE_ROOM = "LEAVE ROOM";
const UPDATE_GAME_STATE = "UPDATE_GAME_STATE";

export const updateGameState = (newState) => {
  return { type: UPDATE_GAME_STATE, payload: newState };
};
export const leaveRoom = () => {
  return { type: LEAVE_ROOM };
};

const gameStateReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_GAME_STATE:
      return { ...state, ...action.payload };
    case LEAVE_ROOM:
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
