import { useSongList } from "../contexts/SongListContext";

import Navbar from "../components/Navbar";
import MusicCard from "../components/MusicCard";
import Player from "../components/Player";

export default function Home() {
  const songList = useSongList();

  return (
    <div className="flex w-fill justify-center items-center">
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 py-24">
        {songList.list.map((song) => (
          <MusicCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
