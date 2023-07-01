import type { Record } from "pocketbase";

interface Song extends Record {
  title: string;
  audio: string;
  artist: string;
  album_cover: string;
  source: string;
}
