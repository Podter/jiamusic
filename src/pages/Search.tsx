import { useNavigate, useSearchParams } from "react-router-dom";
import { Record } from "pocketbase";
import { useSongList } from "../contexts/SongListContext";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import MusicCard from "../components/MusicCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const songList = useSongList();
  const fuse = new Fuse(songList.list, {
    keys: ["title"],
  });
  const navigate = useNavigate();

  const searchQuery = searchParams.get("query");

  const [searchList, setSearchList] = useState<Fuse.FuseResult<Record>[]>([]);

  useEffect(() => {
    if (!searchQuery) return navigate("/");

    const list = fuse.search(searchQuery);
    setSearchList(list);
  }, [searchQuery]);

  return (
    <div className="flex w-fill justify-center items-center">
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 py-24">
        {searchList.map((song) => (
          <MusicCard key={song.item.id} song={song.item} />
        ))}
      </div>
    </div>
  );
}
