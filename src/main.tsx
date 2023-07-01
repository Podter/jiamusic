import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Providers from "./lib/Providers";
import { Toaster } from "./components/ui/Toaster";

import "./styles.css";
import "@fontsource/inter/latin.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
      <Toaster />
    </Providers>
  </React.StrictMode>
);
