import { useContext, createContext, ReactNode } from "react";
import PocketBase from "pocketbase";

type Props = {
  children: ReactNode;
};

const PocketBaseContext = createContext<PocketBase | undefined>(undefined);

export const usePocketBase = () => useContext(PocketBaseContext);

export function PocketBaseProvider({ children }: Props) {
  const pb = new PocketBase("http://127.0.0.1:8090");

  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
}
