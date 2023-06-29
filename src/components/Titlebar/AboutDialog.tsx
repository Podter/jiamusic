import logo from "../../assets/logo.png";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";

export default function AboutDialog() {
  return (
    <DialogContent className="max-w-sm">
      <DialogHeader className="items-center text-center">
        <img
          src={logo}
          alt="JIΛmusic"
          className="h-32 w-32 mb-2"
          width={128}
          height={128}
        />
        <DialogTitle>JIΛmusic</DialogTitle>
        <DialogDescription>2.0.0</DialogDescription>
        <DialogDescription className="text-foreground text-base">
          Music streaming service app by JIΛFEI
        </DialogDescription>
        <DialogDescription>Copyright © 2022-2023 Podter</DialogDescription>
        <DialogDescription asChild>
          <button
            className="hover:underline underline-offset-4"
            onClick={async () =>
              await open("https://github.com/Podter/jiamusic")
            }
          >
            GitHub repository
          </button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
