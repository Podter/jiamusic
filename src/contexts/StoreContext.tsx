import { useContext, createContext, type PropsWithChildren } from "react";
import { Store } from "tauri-plugin-store-api";

const StoreContext = createContext<Store | undefined>(undefined);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

export function StoreProvider({ children }: PropsWithChildren) {
  const store = new Store(".data.dat");
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
