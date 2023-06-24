import type { PropsWithChildren } from "react";
import { PocketBaseProvider } from "../contexts/PocketBaseContext";

export default function Providers({ children }: PropsWithChildren) {
  return <PocketBaseProvider>{children}</PocketBaseProvider>;
}
