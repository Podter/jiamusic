import { useContext, createContext, type PropsWithChildren } from "react";
import type { Song } from "../types/song";
import { usePocketBase } from "./PocketBaseContext";
import { useQuery, type QueryStatus } from "@tanstack/react-query";

const SongsContext = createContext<
  | {
      songs: Song[];
      refetch: () => void;
      status: QueryStatus;
    }
  | undefined
>(undefined);

export function useSongs() {
  const context = useContext(SongsContext);
  if (!context) {
    throw new Error("useSongs must be used within a SongsProvider");
  }
  return context;
}

export function SongsProvider({ children }: PropsWithChildren) {
  const pb = usePocketBase();

  const { data, refetch, status } = useQuery({
    queryKey: ["songs"],
    async queryFn() {
      const songs = await pb.collection("songs").getFullList<Song>();
      return songs;
    },
  });

  return (
    <SongsContext.Provider
      value={{
        songs: data ?? [],
        refetch,
        status,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
}
