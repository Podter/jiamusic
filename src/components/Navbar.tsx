import { Search20Filled, LineHorizontal320Filled } from "@fluentui/react-icons";

export default function Navbar() {
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
              <a>Home</a>
            </li>
            <li>
              <a>Refresh</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Exit</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <button className="btn btn-ghost normal-case text-xl gap-2">
          <img src="/jiamusic.png" alt="JIΛmusic Logo" className="h-6 w-6" />
          JIΛmusic
        </button>
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button className="btn btn-square">
              <Search20Filled />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
