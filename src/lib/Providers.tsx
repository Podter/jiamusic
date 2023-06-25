import type { PropsWithChildren } from "react";
import { PocketBaseProvider } from "../contexts/PocketBaseContext";
import { StoreProvider } from "../contexts/StoreContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SongsProvider } from "../contexts/SongsContext";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <PocketBaseProvider>
          <SongsProvider>{children}</SongsProvider>
        </PocketBaseProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}
