import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/Menubar";

export default function Menu() {
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
          <MenubarItem>Hide Window</MenubarItem>
          <MenubarItem>Quit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
