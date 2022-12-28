import {
  Play20Filled,
  Pause20Filled,
  Next20Filled,
  Previous20Filled,
  Speaker220Filled,
} from "@fluentui/react-icons";
import { useCurrentSong } from "../contexts/CurrentSongContext";
import { useEffect, useRef, useState } from "react";
import { usePocketBase } from "../contexts/PocketBaseContext";
import { useSongList } from "../contexts/SongListContext";

export default function Player() {
  const currentSong = useCurrentSong();
  const songList = useSongList();
  const pb = usePocketBase();

  const audio = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");

  function playBtn() {
    if (!currentSong.song) currentSong.setSong(songList.list[0]);
    else setPlaying(!playing);
  }

  useEffect(() => {
    if (playing) {
      audio.current?.play();
    } else {
      audio.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    setPlaying(false);
    if (currentSong.song)
      setAudioSrc(
        pb?.getFileUrl(currentSong.song, currentSong.song?.audio) || ""
      );
  }, [currentSong.song]);

  return (
    <div className="navbar bg-base-300 fixed bottom-0 z-40">
      <div className="navbar-start">
        <a
          className="btn btn-ghost normal-case text-xl"
          href={`#${currentSong.song?.id}`}
        >
          {currentSong.song?.title || ""}
        </a>
      </div>
      <div className="navbar-center">
        <button className="btn btn-ghost btn-circle">
          <Previous20Filled />
        </button>
        <button className="btn btn-ghost btn-circle" onClick={playBtn}>
          {playing ? <Pause20Filled /> : <Play20Filled />}
        </button>
        <button className="btn btn-ghost btn-circle">
          <Next20Filled />
        </button>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Speaker220Filled />
        </button>
      </div>
      <audio
        ref={audio}
        src={audioSrc}
        onLoadedData={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
    </div>
  );
}
