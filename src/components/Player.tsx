import { Button } from "./ui/Button";
import {
  Play32Filled,
  Pause32Filled,
  Next28Filled,
  Previous28Filled,
  Speaker220Filled,
  SpeakerMute20Filled,
  ArrowShuffle24Filled,
  ArrowRepeatAll24Filled,
  ArrowShuffleOff24Filled,
  ArrowRepeatAllOff24Filled,
} from "@fluentui/react-icons";
import { Slider } from "./ui/Slider";
import { cn, fancyTimeFormat } from "../lib/utils";
import { usePocketBase } from "../contexts/PocketBaseContext";
import { usePlayer } from "../contexts/PlayerContext";
import { useState } from "react";

export default function Player() {
  const pb = usePocketBase();
  const {
    song,
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
  } = usePlayer();

  const [newTime, setNewTime] = useState<number | undefined>(undefined);

  return (
    <div className="w-full h-32 fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30 px-4">
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-4">
        {song && (
          <div className="absolute left-0 flex flex-row h-full justify-start items-center">
            <img
              src={pb.getFileUrl(song, song.album_cover)}
              alt={song.title}
              className="rounded-lg"
              width={96}
              height={96}
            />
            <div className="flex flex-col ml-3 gap-1">
              <p className="font-semibold leading-none tracking-tight">
                {song.title}
              </p>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
          </div>
        )}
        <div className="absolute right-0 flex flex-row h-full justify-end items-center w-56">
          <Button
            size="sm"
            className="rounded-full h-8 px-[0.375rem]"
            variant="ghost"
            onClick={async () => await setMuted(!muted)}
          >
            {muted ? <SpeakerMute20Filled /> : <Speaker220Filled />}
          </Button>
          <Slider
            value={[volume ?? 75]}
            max={100}
            onValueChange={(v) => setVolume(v[0])}
            className={cn("scale-75 -mx-4", muted && "opacity-50")}
            disabled={muted ?? false}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <Button
            size="lg"
            className="rounded-full h-10 px-2"
            variant="ghost"
            onClick={async () => await setRepeat(!repeat)}
          >
            {repeat ? (
              <ArrowRepeatAll24Filled />
            ) : (
              <ArrowRepeatAllOff24Filled />
            )}
          </Button>
          <Button
            size="lg"
            className="rounded-full h-12 px-[0.625rem]"
            variant="ghost"
            onClick={skipBack}
          >
            <Previous28Filled />
          </Button>
          <Button
            size="lg"
            className="rounded-full h-14 px-3"
            onClick={togglePlayPause}
          >
            {playing ? <Pause32Filled /> : <Play32Filled />}
          </Button>
          <Button
            size="lg"
            className="rounded-full h-12 px-[0.625rem]"
            variant="ghost"
            onClick={skipNext}
          >
            <Next28Filled />
          </Button>
          <Button
            size="lg"
            className="rounded-full h-10 px-2"
            variant="ghost"
            onClick={async () => await setShuffle(!shuffle)}
          >
            {shuffle ? <ArrowShuffle24Filled /> : <ArrowShuffleOff24Filled />}
          </Button>
        </div>
        <div className="flex flex-row justify-center items-center w-2/5 gap-3">
          <p className="text-sm text-muted-foreground">
            {fancyTimeFormat(newTime ?? time)}
          </p>
          <Slider
            value={[newTime ?? time]}
            max={duration}
            step={1}
            onValueChange={(value) => {
              if (!audioRef.current) return;
              audioRef.current.pause();
              setNewTime(value[0]);
            }}
            onValueCommit={async (value) => {
              if (!audioRef.current) return;
              seek(value[0]);
              await audioRef.current.play();
              setNewTime(undefined);
            }}
          />
          <p className="text-sm text-muted-foreground">
            {fancyTimeFormat(duration)}
          </p>
        </div>
      </div>
    </div>
  );
}
