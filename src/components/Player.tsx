import {
  Play20Filled,
  Pause20Filled,
  Next20Filled,
  Previous20Filled,
  Speaker220Filled,
} from "@fluentui/react-icons";

export default function Player() {
  return (
    <div className="navbar bg-base-300 fixed bottom-0 z-40">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Anal Cream</a>
      </div>
      <div className="navbar-center">
        <button className="btn btn-ghost btn-circle">
          <Previous20Filled />
        </button>
        <button className="btn btn-ghost btn-circle">
          <Play20Filled />
        </button>
        <button className="btn btn-ghost btn-circle">
          <Next20Filled />
        </button>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Speaker220Filled />
        </button>
      </div>
    </div>
  );
}
