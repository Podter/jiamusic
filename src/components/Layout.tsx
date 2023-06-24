import { Outlet } from "react-router-dom";
import Titlebar from "./Titlebar";

export default function Layout() {
  return (
    <>
      <Titlebar />
      <main className="mt-10">
        <Outlet />
      </main>
    </>
  );
}
