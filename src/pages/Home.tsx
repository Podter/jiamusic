import { useSongs } from "../contexts/SongsContext";

export default function Home() {
  const { songs } = useSongs();

  return (
    <div>
      {songs.map((song) => (
        <p>{song.title}</p>
      ))}
    </div>
  );
}
