import SongCard from "../components/SongCard";
import { useSongs } from "../contexts/SongsContext";
import { Icon } from "@iconify/react";
import icon90RingWithBg from "@iconify/icons-svg-spinners/90-ring-with-bg";
import { Button } from "../components/ui/Button";
import { ErrorCircleRegular } from "@fluentui/react-icons";

export default function Songs() {
  const { songs, status, refetch } = useSongs();

  return status === "success" ? (
    <div className="flex flex-col">
      <h2 className="mx-4 my-6 text-lg font-semibold tracking-tight">Home</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4 h-full w-full p-6 pt-0">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex w-full h-full justify-center items-center last:mb-10"
          >
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  ) : status === "loading" ? (
    <div className="flex h-full w-full justify-center items-center">
      <Icon icon={icon90RingWithBg} fontSize={32} />
    </div>
  ) : (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <ErrorCircleRegular fontSize={96} />
      <h2 className="text-xl font-medium tracking-tight mt-2">
        Something went wrong!
      </h2>
      <Button size="sm" className="mt-2" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );
}
