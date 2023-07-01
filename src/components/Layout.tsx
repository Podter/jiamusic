import { Outlet } from "react-router-dom";
import Titlebar from "./Titlebar";
import Sidebar from "./Sidebar";
import Player from "./Player";

export default function Layout() {
  return (
    <>
      <Titlebar />
      <div className="flex flex-row mt-10 h-[calc(100vh-2.5rem-8rem)]">
        <Sidebar />
        <main className="overflow-y-scroll w-full">
          <Outlet />
        </main>
      </div>
      <Player />
    </>
  );
}
