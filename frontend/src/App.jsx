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
import Singleplayer from "./components/Singleplayer";
import Leaderboard from "./components/Leaderboard";
import Game from "./components/Game";
import RouteNotFound from "./components/RouteNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Auth />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/singleplayer" element={<Singleplayer />} />
      <Route path="/multiplayer" element={<Multiplayer />} />
      <Route path="/game/:id" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="*" element={<RouteNotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
