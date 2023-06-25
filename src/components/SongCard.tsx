import { usePocketBase } from "../contexts/PocketBaseContext";
import type { Song } from "../types/song";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Pause24Filled, Play24Filled } from "@fluentui/react-icons";
import { cn } from "../lib/utils";

type SongCardProps = {
  song: Song;
};

export default function SongCard({ song }: SongCardProps) {
  const pb = usePocketBase();

  return (
    <Card
      className="overflow-hidden relative w-48 h-72 group hover:cursor-pointer"
      // onClick={() => {
      //   setSong(song);
      // }}
    >
      <div className="relative bg-transparent overflow-hidden aspect-square">
        <img
          src={pb.getFileUrl(song, song.album_cover)}
          alt={song.title}
          width={192}
          height={192}
          className={cn(
            "group-hover:scale-110 transition-transform"
            // song.id === currentSong?.id && playing && "scale-110"
          )}
        />
        <Button
          className={cn(
            "opacity-0 absolute bottom-2 right-2 rounded-full h-10 px-2 transition-opacity"
            // song.id === currentSong?.id && "opacity-100"
          )}
          size="lg"
          // onClick={togglePlayPause}
        >
          {/* {playing ? <Pause24Filled /> : <Play24Filled />} */}
          <Play24Filled />
        </Button>
      </div>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-base">{song.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-sm text-muted-foreground">{song.artist}</p>
      </CardContent>
    </Card>
  );
}
