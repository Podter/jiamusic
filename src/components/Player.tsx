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
  Heart20Filled,
  Heart20Regular,
} from "@fluentui/react-icons";
import { Slider } from "./ui/Slider";
import { cn } from "../lib/utils";

export default function Player() {
  return (
    <div className="w-full h-32 fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30 px-4">
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="absolute left-0 flex flex-row h-full justify-start items-center">
          <img
            src="https://jiamusic.podter.me/api/files/qknlb4iwr7eqndg/3dpcvfyrbd3pssr/blob_so6sRNFsBr.png"
            alt="A Deal With Papi"
            className="rounded-lg"
            width={96}
            height={96}
          />
          <div className="flex flex-col ml-3 gap-1">
            <p className="font-semibold leading-none tracking-tight">
              A Deal With Papi
            </p>
            <p className="text-sm text-muted-foreground">@DawnofCupcakKe</p>
          </div>
        </div>
        <div className="absolute right-0 flex flex-row h-full justify-end items-center w-56">
          <Button
            size="sm"
            className="rounded-full h-8 px-[0.375rem]"
            variant="ghost"
            // onClick={controls.toggleMute}
          >
            {/* {audioState.muted ? <SpeakerMute20Filled /> : <Speaker220Filled />} */}
            <Speaker220Filled />
          </Button>
          <Slider
            // value={[state.volume]}
            max={100}
            // onValueChange={(v) => controls.setVolume(v[0])}
            className={cn(
              "scale-75 -mx-4"
              // , audioState.muted && "opacity-50"
            )}
            // disabled={audioState.muted}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <Button
            size="lg"
            className="rounded-full h-10 px-2"
            variant="ghost"
            // onClick={() => controls.setRepeat((repeat) => !repeat)}
          >
            {/* {state.repeat ? (
              <ArrowRepeatAll24Filled />
            ) : (
              <ArrowRepeatAllOff24Filled />
            )} */}
            <ArrowRepeatAllOff24Filled />
          </Button>
          <Button
            size="lg"
            className="rounded-full h-12 px-[0.625rem]"
            variant="ghost"
            // onClick={controls.skipBack}
          >
            <Previous28Filled />
          </Button>
          <Button
            size="lg"
            className="rounded-full h-14 px-3"
            // onClick={controls.togglePlayPause}
          >
            {/* {audioState.playing ? <Pause32Filled /> : <Play32Filled />} */}
            <Pause32Filled />
          </Button>
          <Button
            size="lg"
            className="rounded-full h-12 px-[0.625rem]"
            variant="ghost"
            // onClick={controls.skipNext}
          >
            <Next28Filled />
          </Button>
          <Button
            size="lg"
            className="rounded-full h-10 px-2"
            variant="ghost"
            // onClick={() => controls.setShuffle((shuffle) => !shuffle)}
          >
            {/* {state.shuffle ? (
              <ArrowShuffle24Filled />
            ) : (
              <ArrowShuffleOff24Filled />
            )} */}
            <ArrowShuffleOff24Filled />
          </Button>
        </div>
        <div className="flex flex-row justify-center items-center w-2/5 gap-3">
          <p className="text-sm text-muted-foreground">
            {/* {fancyTimeFormat(newTime || audioState.time)} */}
            00:00
          </p>
          <Slider
            // value={[newTime || audioState.time]}
            // max={audioState.duration}
            step={1}
            // onValueChange={(value) => {
            //   audioControls.pause();
            //   setNewTime(value[0]);
            // }}
            // onValueCommit={async (value) => {
            //   audioControls.seek(value[0]);
            //   await audioControls.play();
            //   setNewTime(undefined);
            // }}
          />
          <p className="text-sm text-muted-foreground">
            {/* {fancyTimeFormat(audioState.duration)} */}
            00:00
          </p>
        </div>
      </div>
    </div>
  );
}
