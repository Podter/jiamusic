import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { useEffect } from "react";

import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
