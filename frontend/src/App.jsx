import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Auth from "./components/Auth";
import Menu from "./components/Menu";
import Multiplayer from "./components/Multiplayer";
import RootLayout from "./components/RootLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Singleplayer from "./components/Singleplayer";
import Leaderboard from "./components/Leaderboard";
import GameStateProvider from "./contexts/GameContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Auth />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/menu" element={<Menu />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Route>,
  ),
);

function App() {
  return (
    <GameStateProvider>
      <RouterProvider router={router} />
    </GameStateProvider>
  );
}

export default App;
