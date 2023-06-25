import { useEffect, useState } from "react";
import { useTauriStore } from "../contexts/StoreContext";

export default function useStore<T>(
  key: string,
  initialValue?: T
): [T | null, (value: T) => Promise<void>, string] {
  const store = useTauriStore();

  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    store.get<T>(key).then((value) => {
      if (initialValue && !value) {
        store.set(key, initialValue);
        setValue(initialValue);
      } else {
        setValue(value);
      }
    });
    const unlisten = store.onKeyChange<T>(key, (value) => setValue(value));

    return () => {
      unlisten.then((unlisten) => unlisten());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setter(value: T) {
    await store.set(key, value);
  }

  return [value, setter, key];
}