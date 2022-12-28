import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import App from "./App";

import { PocketBaseProvider } from "./contexts/PocketBaseContext";
import { CurrentSongProvider } from "./contexts/CurrentSongContext";
import { SongListProvider } from "./contexts/SongListContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PocketBaseProvider>
      <SongListProvider>
        <CurrentSongProvider>
          <App />
        </CurrentSongProvider>
      </SongListProvider>
    </PocketBaseProvider>
  </React.StrictMode>
);
