import { Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="tooltip tooltip-bottom" data-tip="Menu">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Menu className="h-5 w-5" />
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
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Search">
          <button className="btn btn-ghost btn-circle">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
