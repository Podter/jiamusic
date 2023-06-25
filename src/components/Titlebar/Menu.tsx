import { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "../ui/Menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";
import { appWindow } from "@tauri-apps/api/window";
import useStore from "../../hooks/useStore";
import { open } from "@tauri-apps/api/shell";
import icon from "../../assets/icon.png";
import logo from "../../assets/logo.png";

export default function Menu() {
  const [autostart, setAutostart] = useState<boolean | undefined>(undefined);
  const [theme, setTheme] = useStore<"light" | "dark">(
    "theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    isEnabled().then((enabled) => setAutostart(enabled));
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Dialog>
      <Menubar className="h-8 border-none">
        <MenubarMenu>
          <MenubarTrigger
            asChild
            className="focus:bg-background focus:text-foreground data-[state=open]:bg-background data-[state=open]:text-foreground"
            disabled
          >
            <span className="font-bold">
              <img
                src={icon}
                alt="JIΛmusic"
                className="mr-[0.375rem]"
                width={20}
                height={20}
              />
              JIΛmusic
            </span>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Refresh</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onSelect={() => appWindow.hide()}>
              Hide Window
            </MenubarItem>
            <MenubarItem onSelect={() => appWindow.close()}>Quit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Options</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={autostart}
              onSelect={async () => {
                if (autostart) {
                  await disable();
                  setAutostart(false);
                } else if (!autostart) {
                  await enable();
                  setAutostart(true);
                }
              }}
            >
              Autostart
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value={theme ?? undefined}>
              <MenubarRadioItem
                value="light"
                onSelect={async () => await setTheme("light")}
              >
                Light theme
              </MenubarRadioItem>
              <MenubarRadioItem
                value="dark"
                onSelect={async () => await setTheme("dark")}
              >
                Dark theme
              </MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onSelect={async () =>
                await open("https://github.com/Podter/jiamusic")
              }
            >
              Open GitHub
            </MenubarItem>
            <DialogTrigger asChild>
              <MenubarItem>About JIΛmusic</MenubarItem>
            </DialogTrigger>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
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
    </Dialog>
  );
}
