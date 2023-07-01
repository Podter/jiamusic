import SongList from "../components/SongList";
import { useSongs } from "../contexts/SongsContext";
import { Input } from "../components/ui/Input";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import type { Song } from "../types/song";
import { TableCaption } from "../components/ui/Table";

export default function Search() {
  const { songs } = useSongs();
  const [search, setSearch] = useState("");

  const fuse = new Fuse(songs, {
    keys: ["title"],
  });

  const [results, setResults] = useState<Song[]>([]);

  useEffect(() => {
    const list = fuse.search(search);
    const songs = list.map((item) => item.item);
    setResults(songs);
  }, [search]);

  return (
    <div className="flex w-full flex-col">
      <div className="p-4 flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Search</h2>
        <Input
          className="w-72"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {results.length > 0 ? (
        <SongList songs={results} />
      ) : !search ? (
        <SongList songs={songs} />
      ) : (
        <TableCaption>No results</TableCaption>
      )}
    </div>
  );
}
