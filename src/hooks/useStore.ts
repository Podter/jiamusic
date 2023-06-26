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
  }, []);

  async function setter(value: T) {
    await store.set(key, value);
    await store.save();
  }

  return [value, setter, key];
}
