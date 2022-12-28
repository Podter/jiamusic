import {
  Play20Filled,
  Pause20Filled,
  Next20Filled,
  Previous20Filled,
  Speaker220Filled,
  SpeakerMute20Filled,
  SkipBack1020Filled,
  SkipForward1020Filled,
} from "@fluentui/react-icons";
import { useCurrentSong } from "../contexts/CurrentSongContext";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
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
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [newCurrentTime, setNewCurrentTime] = useState(0);

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

  function audioOnTimeUpdate(event: SyntheticEvent<HTMLAudioElement, Event>) {
    setCurrentTime(event.currentTarget.currentTime);
    setDuration(event.currentTarget.duration);
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

  useEffect(() => {
    (audio.current as HTMLAudioElement).currentTime = newCurrentTime;
  }, [newCurrentTime]);

  return (
    <>
      <div className="navbar bg-base-300 fixed bottom-0 z-30 min-h-[5rem]">
        <div className="navbar-start">
          <a
            className="btn btn-ghost normal-case text-xl"
            href={`#${currentSong.song?.id}`}
          >
            {currentSong.song?.title || ""}
          </a>
        </div>
        <div className="navbar-center">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setNewCurrentTime(currentTime - 10)}
          >
            <SkipBack1020Filled />
          </button>
          <button className="btn btn-ghost btn-circle" onClick={skipBack}>
            <Previous20Filled />
          </button>
          <button className="btn btn-ghost btn-circle" onClick={playBtn}>
            {playing ? <Pause20Filled /> : <Play20Filled />}
          </button>
          <button className="btn btn-ghost btn-circle" onClick={skipNext}>
            <Next20Filled />
          </button>
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              setNewCurrentTime(currentTime + 10);
            }}
          >
            <SkipForward1020Filled />
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
      </div>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        className="range range-primary range-2xs w-screen bottom-0 fixed z-40 rounded-none"
      />
      <audio
        ref={audio}
        src={audioSrc}
        onLoadedData={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onTimeUpdate={audioOnTimeUpdate}
        onEnded={skipNext}
      />
    </>
  );
}
