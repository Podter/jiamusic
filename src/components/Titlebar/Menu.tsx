import { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarCheckboxItem,
} from "../ui/Menubar";
import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";

export default function Menu() {
  const [autostart, setAutostart] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    isEnabled().then((enabled) => setAutostart(enabled));
  }, []);

  return (
    <Menubar className="h-8 border-none ml-2">
      <MenubarMenu>
        <MenubarTrigger asChild className="px-2">
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
        <MenubarContent>
          <MenubarItem>About JIΛmusic</MenubarItem>
          <MenubarSeparator />
          <MenubarCheckboxItem
            checked={autostart}
            onClick={async () => {
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
          <MenubarItem>Hide Window</MenubarItem>
          <MenubarItem>Quit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
