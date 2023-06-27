import { Pause24Filled, Play24Filled } from "@fluentui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import type { Song } from "../types/song";
import { usePlayer } from "../contexts/PlayerContext";
import { usePocketBase } from "../contexts/PocketBaseContext";
import { format, parseISO } from "date-fns";

type SongListProps = {
  songs: Song[];
};

export default function SongList({ songs }: SongListProps) {
  const { song: currentSong, setSong, togglePlayPause, playing } = usePlayer();
  const pb = usePocketBase();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Uploaded</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song, i) => (
          <TableRow className="group">
            <TableCell>{i + 1}</TableCell>
            <TableCell className="flex flex-row items-center gap-3">
              <div className="h-12 w-12 rounded overflow-hidden relative">
                <img
                  src={pb.getFileUrl(song, song.album_cover)}
                  alt={song.title}
                  height={48}
                  width={48}
                />
                <div
                  className="absolute flex w-full h-full justify-center items-center bg-black top-0 right-0 left-0 bottom-0 opacity-0 group-hover:opacity-50 transition-opacity hover:cursor-pointer"
                  onClick={() => {
                    if (song.id === currentSong?.id) {
                      togglePlayPause();
                    } else {
                      setSong(song);
                    }
                  }}
                >
                  {song.id === currentSong?.id && playing ? (
                    <Pause24Filled color="white" />
                  ) : (
                    <Play24Filled color="white" />
                  )}
                </div>
              </div>
              <span>{song.title}</span>
            </TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>
              {format(parseISO(song.created), "do MMMM, yyyy")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
