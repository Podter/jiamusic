import logo from "../../assets/logo.png";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { useQuery } from "@tanstack/react-query";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import { Icon } from "@iconify/react";
import icon90RingWithBg from "@iconify/icons-svg-spinners/90-ring-with-bg";
import {
  Dismiss12Filled,
  Checkmark12Filled,
  ArrowDownloadFilled,
} from "@fluentui/react-icons";
import { useState } from "react";

export default function AboutDialog() {
  const [updating, setUpdating] = useState(false);

  const { data, status } = useQuery({
    queryKey: ["update"],
    async queryFn() {
      const update = await checkUpdate();
      return update;
    },
  });

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
        <DialogDescription asChild className="flex flex-row items-center gap-1">
          {updating ? (
            <span>
              <Icon icon={icon90RingWithBg} fontSize={12} /> Installing update
            </span>
          ) : status === "success" ? (
            data.shouldUpdate ? (
              <button
                className="group"
                onClick={async () => {
                  setUpdating(true);
                  await installUpdate();
                  await relaunch();
                }}
              >
                <ArrowDownloadFilled fontSize={12} />
                <span className="group-hover:hidden">
                  New version is available: {data.manifest?.version}
                </span>
                <span className="hidden group-hover:block underline underline-offset-4">
                  Install and relaunch now
                </span>
              </button>
            ) : (
              <span>
                <Checkmark12Filled /> You are up to date
              </span>
            )
          ) : status === "error" ? (
            <span>
              <Dismiss12Filled /> Failed to check for updates
            </span>
          ) : (
            <span>
              <Icon icon={icon90RingWithBg} fontSize={12} /> Checking for
              updates
            </span>
          )}
        </DialogDescription>
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
