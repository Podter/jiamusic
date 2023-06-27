import SongList from "../components/SongList";
import { useSongs } from "../contexts/SongsContext";

export default function Search() {
  const { songs } = useSongs();

  return (
    <div className="flex w-full flex-col">
      <div className="p-4 flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Search</h2>
      </div>
      <SongList songs={songs} />
    </div>
  );
}
