import {
  Play20Filled,
  Pause20Filled,
  Next20Filled,
  Previous20Filled,
  Speaker220Filled,
  SpeakerMute20Filled,
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
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);

  function playBtn() {
    if (!currentSong.song) currentSong.setSong(songList.list[0]);
    else setPlaying(!playing);
  }

  function skipBack() {
    const index = songList.list.findIndex(
      (x) => x.title == currentSong.song?.title
    );
    if (index == 0) {
      currentSong.setSong(songList.list[songList.list.length - 1]);
    } else {
      currentSong.setSong(songList.list[index - 1]);
    }
  }

  function skipNext() {
    const index = songList.list.findIndex(
      (x) => x.title == currentSong.song?.title
    );

    if (index == songList.list.length - 1) {
      currentSong.setSong(songList.list[0]);
    } else {
      currentSong.setSong(songList.list[index + 1]);
    }
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

  useEffect(() => {
    (audio.current as HTMLAudioElement).volume = muted ? 0 : volume / 100;
  }, [volume, muted]);

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
        <button className="btn btn-ghost btn-circle" onClick={skipBack}>
          <Previous20Filled />
        </button>
        <button className="btn btn-ghost btn-circle" onClick={playBtn}>
          {playing ? <Pause20Filled /> : <Play20Filled />}
        </button>
        <button className="btn btn-ghost btn-circle" onClick={skipNext}>
          <Next20Filled />
        </button>
      </div>
      <div className="navbar-end">
        <input
          type="range"
          min="0"
          max="100"
          value={muted ? 0 : volume}
          className="range range-primary range-xs w-32"
          onChange={(e) => (muted ? {} : setVolume(+e.target.value))}
        />
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setMuted(!muted)}
        >
          {muted ? <SpeakerMute20Filled /> : <Speaker220Filled />}
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
