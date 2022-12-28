import { Record } from "pocketbase";
import { useContext, createContext, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type ContextType = {
  song: Record | undefined;
  setSong: (song: Record) => void;
};

const CurrentSongContext = createContext<ContextType>({
  song: undefined,
  setSong: (_song) => null,
});

export const useCurrentSong = () => useContext(CurrentSongContext);

export function CurrentSongProvider({ children }: Props) {
  const [song, setSong] = useState<ContextType["song"]>();

  return (
    <CurrentSongContext.Provider value={{ song, setSong }}>
      {children}
    </CurrentSongContext.Provider>
  );
}
