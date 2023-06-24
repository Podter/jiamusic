import TitlebarButton from "./TitlebarButton";
import {
  Subtract16Regular,
  Maximize16Regular,
  SquareMultiple16Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import Menu from "./Menu";

export default function Titlebar() {
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    appWindow.isMaximized().then((maximized) => setMaximized(maximized));
  }, []);

  return (
    <div
      data-tauri-drag-region
      className="h-10 bg-background select-none flex fixed top-0 left-0 right-0 justify-between items-center border-b border-border z-40"
    >
      <Menu />
      <div className="flex justify-end">
        <TitlebarButton onClick={() => appWindow.minimize()}>
          <Subtract16Regular />
        </TitlebarButton>
        <TitlebarButton
          onClick={async () => {
            await appWindow.toggleMaximize();
            const isMaximized = await appWindow.isMaximized();
            setMaximized(isMaximized);
          }}
        >
          {maximized ? <SquareMultiple16Regular /> : <Maximize16Regular />}
        </TitlebarButton>
        <TitlebarButton
          className="hover:text-destructive-foreground hover:bg-destructive/90"
          onClick={() => appWindow.close()}
        >
          <Dismiss16Regular />
        </TitlebarButton>
      </div>
    </div>
  );
}
