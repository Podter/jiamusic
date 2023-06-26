import {
  useContext,
  createContext,
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
  useRef,
  useEffect,
  type RefObject,
} from "react";
import type { Song } from "../types/song";
import { usePocketBase } from "./PocketBaseContext";
import { useSongs } from "./SongsContext";

const PlayerContext = createContext<
  | {
      song?: Song;
      setSong: Dispatch<SetStateAction<Song | undefined>>;
      shuffle: boolean;
      setShuffle: Dispatch<SetStateAction<boolean>>;
      repeat: boolean;
      setRepeat: Dispatch<SetStateAction<boolean>>;
      volume: number;
      setVolume: Dispatch<SetStateAction<number>>;
      muted: boolean;
      setMuted: Dispatch<SetStateAction<boolean>>;
      playing: boolean;
      togglePlayPause: () => void;
      time: number;
      duration: number;
      audioRef: RefObject<HTMLAudioElement>;
      skipBack: () => void;
      skipNext: () => void;
      seek: (time: number) => void;
    }
  | undefined
>(undefined);

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export function PlayerProvider({ children }: PropsWithChildren) {
  // Stuff
  const pb = usePocketBase();
  const { songs } = useSongs();

  // Audio ref
  const audioRef = useRef<HTMLAudioElement>(null);

  // State
  const [song, setSong] = useState<Song | undefined>(undefined);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Skip back
  function skipBack() {
    const index = songs.findIndex((x) => x.id == song?.id);
    if (index == 0) {
      setSong(songs[songs.length - 1]);
    } else {
      setSong(songs[index - 1]);
    }
  }

  // Skip next
  function skipNext() {
    const index = songs.findIndex((x) => x.id == song?.id);
    if (index == songs.length - 1) {
      setSong(songs[0]);
    } else {
      setSong(songs[index + 1]);
    }
  }

  // Toggle play/pause
  function togglePlayPause() {
    if (!audioRef.current) return;
    if (!song) setSong(songs[Math.floor(Math.random() * songs.length)]);

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  // Seek
  function seek(time: number) {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
  }

  // On song changed
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    if (song) {
      const songUrl = pb.getFileUrl(song, song.audio);
      audioRef.current.src = songUrl;
    }
  }, [song]);

  // On volume changed
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
    <PlayerContext.Provider
      value={{
        song,
        setSong,
        shuffle,
        setShuffle,
        repeat,
        setRepeat,
        volume,
        setVolume,
        muted,
        audioRef,
        setMuted,
        skipBack,
        skipNext,
        togglePlayPause,
        playing,
        time,
        duration,
        seek,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={song ? pb.getFileUrl(song, song.audio) : ""}
        muted={muted}
        onCanPlay={() => {
          if (!audioRef.current) return;
          audioRef.current.play();
        }}
        onEnded={() => {
          if (!audioRef.current) return;

          if (repeat) {
            setSong(song);
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else if (shuffle) {
            setSong(songs[Math.floor(Math.random() * songs.length)]);
          } else skipNext();
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={() => setTime(audioRef.current?.currentTime || 0)}
        onDurationChange={() => setDuration(audioRef.current?.duration || 0)}
      />
    </PlayerContext.Provider>
  );
}
