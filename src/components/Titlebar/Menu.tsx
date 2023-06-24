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
          <MenubarItem>Hide Window</MenubarItem>
          <MenubarItem>Quit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Options</MenubarTrigger>
        <MenubarContent>
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
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About JIΛmusic</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
