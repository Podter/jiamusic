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
import { Link } from "react-router-dom";
import fancyTimeFormat from "../utils/fancyTimeFormat";

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
  const [isChanging, setIsChanging] = useState(false);

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

  const albumCoverUrl = currentSong.song?.album_cover
    ? (pb?.getFileUrl(
        currentSong.song,
        currentSong.song?.album_cover
      ) as string)
    : "https://placeimg.com/256/256/arch";

  return (
    <>
      <div className="navbar bg-base-300 fixed bottom-0 z-30 min-h-[5rem]">
        <div className="navbar-start">
          {currentSong.song ? (
            <div
              className="tooltip"
              data-tip={`By ${currentSong.song.artist || "Unknown"}`}
            >
              <Link
                className="btn btn-ghost normal-case text-xl gap-2"
                to={`/#${currentSong.song?.id}`}
              >
                <img
                  src={!currentSong.song ? "" : albumCoverUrl}
                  alt="Cover"
                  className="h-6 w-6"
                />
                {currentSong.song?.title || ""}
              </Link>
            </div>
          ) : (
            <a></a>
          )}
        </div>

        <div className="navbar-center">
          <div className="tooltip" data-tip="Skip Back">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setNewCurrentTime(currentTime - 10)}
            >
              <SkipBack1020Filled />
            </button>
          </div>

          <div className="tooltip" data-tip="Previous">
            <button className="btn btn-ghost btn-circle" onClick={skipBack}>
              <Previous20Filled />
            </button>
          </div>

          <div className="tooltip" data-tip={playing ? "Pause" : "Play"}>
            <button className="btn btn-ghost btn-circle" onClick={playBtn}>
              {playing ? <Pause20Filled /> : <Play20Filled />}
            </button>
          </div>

          <div className="tooltip" data-tip="Next">
            <button className="btn btn-ghost btn-circle" onClick={skipNext}>
              <Next20Filled />
            </button>
          </div>

          <div className="tooltip" data-tip="Skip Forward">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => {
                setNewCurrentTime(currentTime + 10);
              }}
            >
              <SkipForward1020Filled />
            </button>
          </div>
        </div>

        <div className="navbar-end">
          <div className="tooltip" data-tip={muted ? 0 : volume}>
            <input
              type="range"
              min="0"
              max="100"
              value={muted ? 0 : volume}
              className="range range-primary range-xs w-32"
              onChange={(e) => (muted ? {} : setVolume(+e.target.value))}
            />
          </div>

          <div className="tooltip" data-tip={muted ? "Unmute" : "Mute"}>
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <SpeakerMute20Filled /> : <Speaker220Filled />}
            </button>
          </div>
        </div>
      </div>

      <div
        className="tooltip w-screen -bottom-[6px] fixed z-40"
        data-tip={`${fancyTimeFormat(currentTime)}/${fancyTimeFormat(
          duration
        )}`}
      >
        <input
          type="range"
          min="0"
          max={duration}
          value={isChanging ? newCurrentTime : currentTime}
          className="range range-primary range-2xs  rounded-none"
          onMouseDown={() => {
            setPlaying(false);
            setIsChanging(true);
          }}
          onMouseUp={() => {
            setPlaying(true);
            setIsChanging(false);
          }}
          onChange={(e) => setNewCurrentTime(+e.target.value)}
        />
      </div>

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
