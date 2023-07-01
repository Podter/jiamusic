import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { useToast } from "./hooks/useToast";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import { ToastAction } from "./components/ui/Toast";

import Home from "./pages/Home";
import Search from "./pages/Search";

export default function App() {
  const { toast } = useToast();

  useEffect(() => {
    // Disable right click
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    // Check for updates
    checkUpdate()
      .then(({ shouldUpdate, manifest }) => {
        if (shouldUpdate) {
          toast({
            title: "Update available",
            description: `Version ${manifest?.version} is available.`,
            action: (
              <ToastAction
                altText="Install and restart"
                onClick={async () => {
                  await installUpdate();
                  await relaunch();
                }}
              >
                Install and restart
              </ToastAction>
            ),
          });
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
