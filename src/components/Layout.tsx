import { Outlet } from "react-router-dom";
import Titlebar from "./Titlebar";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <Titlebar />
      <div className="flex flex-row mt-10">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
