import { useContext, createContext, type PropsWithChildren } from "react";
import PocketBase from "pocketbase";

const PocketBaseContext = createContext<PocketBase | undefined>(undefined);

export function usePocketBase() {
  const context = useContext(PocketBaseContext);
  if (!context) {
    throw new Error("usePocketBase must be used within a PocketBaseProvider");
  }
  return context;
}

export function PocketBaseProvider({ children }: PropsWithChildren) {
  const pb = new PocketBase("https://jiamusic.podter.me");

  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
}
