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
import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";
import { appWindow } from "@tauri-apps/api/window";
import useStore from "../../hooks/useStore";
import { open } from "@tauri-apps/api/shell";

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
    <Menubar className="h-8 border-none">
      <MenubarMenu>
        <MenubarTrigger
          asChild
          className="focus:bg-background focus:text-foreground data-[state=open]:bg-background data-[state=open]:text-foreground"
          disabled
        >
          <span className="font-bold">
            <img
              src="/jiamusic.png"
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
          <MenubarItem>About JIΛmusic</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
