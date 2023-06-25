import SongCard from "../components/SongCard";
import { useSongs } from "../contexts/SongsContext";

export default function Songs() {
  const { songs, status } = useSongs();

  return status === "success" ? (
    <div className="flex flex-col">
      <h2 className="mx-4 my-6 text-lg font-semibold tracking-tight">Home</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 h-full w-full p-6 pt-0">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex w-full h-full justify-center items-center last:mb-10"
          >
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  ) : status === "loading" ? (
    <div className="flex h-full w-full justify-center items-center">
      <p>Loading...</p>
    </div>
  ) : (
    <p>Error</p>
  );
}
