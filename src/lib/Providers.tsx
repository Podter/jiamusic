import type { PropsWithChildren } from "react";
import { PocketBaseProvider } from "../contexts/PocketBaseContext";
import { StoreProvider } from "../contexts/StoreContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <PocketBaseProvider>{children}</PocketBaseProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}
