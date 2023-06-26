import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { useEffect } from "react";

import Home from "./pages/Home";
import Search from "./pages/Search";

export default function App() {
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
