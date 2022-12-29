import { Search20Filled, LineHorizontal320Filled } from "@fluentui/react-icons";
import { useSongList } from "../contexts/SongListContext";
import { exit } from "@tauri-apps/api/process";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const songList = useSongList();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [navBlur, setNavBlur] = useState(false);

  function search() {
    if (!searchQuery) navigate("/");
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({
        query: searchQuery,
      })}`,
    });
  }

  useEffect(() => {
    function handleBlur() {
      if (window.scrollY >= 90) {
        setNavBlur(true);
      } else {
        setNavBlur(false);
      }
    }
    window.addEventListener("scroll", handleBlur);
  }, []);

  return (
    <div
      className={`navbar fixed z-50 transition-all backdrop-blur-xl ${
        navBlur ? "bg-base-300/20 shadow-sm" : "bg-base-300"
      }`}
    >
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => {
                if (e.key == "Enter") search();
              }}
            />
            <button onClick={search} className="btn btn-square">
              <Search20Filled />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
