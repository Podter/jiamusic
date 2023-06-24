import type { PropsWithChildren } from "react";
import { PocketBaseProvider } from "../contexts/PocketBaseContext";
import { StoreProvider } from "../contexts/StoreContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <PocketBaseProvider>{children}</PocketBaseProvider>
    </StoreProvider>
  );
}
