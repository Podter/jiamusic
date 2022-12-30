import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
// import Settings from "./pages/Settings";
import Search from "./pages/Search";
import { E } from "@tauri-apps/api/shell-cbf4da8b";

export default function App() {
  // Disable right click menu
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
