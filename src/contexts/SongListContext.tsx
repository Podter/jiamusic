import { Record } from "pocketbase";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePocketBase } from "./PocketBaseContext";

type Props = {
  children: ReactNode;
};

type ContextType = {
  list: Record[];
  refresh: () => Promise<void>;
};

const SongListContext = createContext<ContextType>({
  list: [],
  refresh: async () => {},
});

export const useSongList = () => useContext(SongListContext);

export function SongListProvider({ children }: Props) {
  const pb = usePocketBase();

  const [list, setSongList] = useState<ContextType["list"]>([]);

  async function refresh() {
    const records = await pb?.collection("songs").getFullList();
    setSongList(records as Record[]);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SongListContext.Provider value={{ list, refresh }}>
      {children}
    </SongListContext.Provider>
  );
}
