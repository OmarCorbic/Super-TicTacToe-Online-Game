import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <Link className="group" to="/singleplayer">
          <div className="pointer-events-none w-full cursor-pointer rounded-full border-2 border-cyan-200 px-10 py-5 text-center text-xl font-bold text-pink-300 shadow-md shadow-cyan-400 transition group-hover:bg-cyan-200 group-hover:text-purple-900">
            Singleplayer
          </div>
        </Link>
        <Link className="group" to="/multiplayer">
          <div className="pointer-events-none w-full cursor-pointer rounded-full border-2 border-cyan-200 px-10 py-5 text-center text-xl font-bold text-pink-300 shadow-md shadow-cyan-400 transition group-hover:bg-cyan-200 group-hover:text-purple-900">
            Multiplayer
          </div>
        </Link>
        <Link className="group" to="/leaderboard">
          <div className="pointer-events-none w-full cursor-pointer rounded-full border-2 border-cyan-200 px-10 py-5 text-center text-xl font-bold text-pink-300 shadow-md shadow-cyan-400 transition group-hover:bg-cyan-200 group-hover:text-purple-900">
            Leaderboard
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
