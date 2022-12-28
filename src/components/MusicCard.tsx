import { Record } from "pocketbase";
import { usePocketBase } from "../contexts/PocketBaseContext";
import { useCurrentSong } from "../contexts/CurrentSongContext";

type Props = {
  song: Record;
};

export default function MusicCard({ song }: Props) {
  const pb = usePocketBase();
  const currentSong = useCurrentSong();

  const albumCoverUrl = song.album_cover
    ? (pb?.getFileUrl(song, song.album_cover) as string)
    : "https://placeimg.com/256/256/arch";

  return (
    <div
      className={`card h-[26rem] w-64 shadow-xl cursor-pointer hover:scale-[1.025] transition-all ${
        song == currentSong.song ? "bg-primary" : "bg-base-100"
      }`}
      onClick={() => currentSong.setSong(song)}
      id={song.id}
    >
      <figure>
        <img src={albumCoverUrl} alt="Cover" className="h-64 w-64" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{song.title}</h2>
        <p>By {song.artist || "Unknown"}</p>
      </div>
    </div>
  );
}
