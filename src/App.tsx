import Navbar from "./components/Navbar";
import MusicCard from "./components/MusicCard";
import Player from "./components/Player";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="flex w-fill justify-center items-center">
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 py-24">
          <MusicCard />
        </div>
      </div>
      <Player />
    </>
  );
}
