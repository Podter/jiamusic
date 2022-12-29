import { Search20Filled, LineHorizontal320Filled } from "@fluentui/react-icons";
import { useSongList } from "../contexts/SongListContext";
import { exit } from "@tauri-apps/api/process";
import { Link } from "react-router-dom";

export default function Navbar() {
  const songList = useSongList();

  return (
    <div className="navbar bg-base-300/20 backdrop-blur-xl shadow-sm fixed z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="tooltip tooltip-bottom" data-tip="Menu">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <LineHorizontal320Filled />
            </label>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li onClick={songList.refresh}>
              <a>Refresh</a>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li onClick={() => exit(0)}>
              <a>Quit</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl gap-2">
          <img src="/jiamusic.png" alt="JIΛmusic Logo" className="h-6 w-6" />
          JIΛmusic
        </Link>
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <Link to="/search" className="btn btn-square">
              <Search20Filled />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
