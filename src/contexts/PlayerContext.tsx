import {
  useContext,
  createContext,
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Song } from "../types/song";

const PlayerContext = createContext<
  | {
      song?: Song;
      setSong: Dispatch<SetStateAction<Song | undefined>>;
    }
  | undefined
>(undefined);

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export function PlayerProvider({ children }: PropsWithChildren) {
  const [song, setSong] = useState<Song | undefined>(undefined);

  return (
    <PlayerContext.Provider value={{ song, setSong }}>
      {children}
    </PlayerContext.Provider>
  );
}
