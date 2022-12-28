import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Player from "./Player";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Player />
    </>
  );
}
