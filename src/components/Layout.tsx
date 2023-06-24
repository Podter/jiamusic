import { Outlet } from "react-router-dom";
import Titlebar from "./Titlebar";

export default function Layout() {
  return (
    <>
      <Titlebar />
      <Outlet />
    </>
  );
}
