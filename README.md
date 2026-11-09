# astro-build-license-repro

Vite's [`build.license`](https://vite.dev/config/build-options#build-license) writes the licences of every bundled dependency to `<outDir>/.vite/license.md`. Under `astro build` that file is gone by the time the build finishes, and nothing says so.

## Reproduce

Node 24.

```sh
npm ci
npm run build
ls dist/.vite
```

`ls: cannot access 'dist/.vite': No such file or directory`

Expected: `dist/.vite/license.md`, listing `clsx - 2.1.1 (MIT)`, which the one page bundles.

## What happens

Vite writes `dist/.vite/license.md`. After generating the pages, Astro deletes `.vite/` from each output directory to remove Vite's manifests (`removeViteManifestDirectories()` in `packages/astro/src/core/build/vite-plugin-ssr-assets.ts`, called from `static-build.ts`), and the licence file goes with them. With an adapter, the same happens to `dist/client/.vite/` and `dist/server/.vite/`.

A plain Vite build with the same option keeps `dist/.vite/license.md`.

## Workaround

A file name outside `.vite/` survives:

```js
vite: { build: { license: { fileName: "LICENSES.md" } } }
```

leaves `dist/LICENSES.md`.

Versions: astro 7.4.5, vite 8.3.5.
