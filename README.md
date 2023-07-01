<p align="center">
    <img alt="logo" src="https://raw.githubusercontent.com/Podter/jiamusic/main/src-tauri/icons/128x128%402x.png">
</p>

<h2 align="center">
    JIΛmusic
</h2>
<h3 align="center">
    A music streaming service app by JIΛFEI (jiafeitech)
</h3>

## Developing and building

This should work on all operating systems. Including Windows, macOS and Linux

### Installing building dependencies

Make sure you have Node.js and Rust installed and follow [this instruction](https://tauri.app/v1/guides/getting-started/prerequisites) to install Tauri building dependencies

### Developing

```bash
npm run dev
# or pnpm
pnpm dev
```

### Building

```bash
npm run build
# or pnpm
pnpm build
```

The built executable should be in `src-tauri/target/release`

## Backend

[PocketBase](https://pocketbase.io/) is the backend for JIΛmusic.

The exported collections will be in `pocketbase/pb_schema.json`

You can import collections by going to PocketBase Admin UI and click on Settings > Import collections and then upload the .json file

You can change the PocketBase base URL for this app.

```tsx
export function PocketBaseProvider({ children }: PropsWithChildren) {
  const pb = new PocketBase("http://example:8090"); // Here

  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
}
```
