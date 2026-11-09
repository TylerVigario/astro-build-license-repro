import { defineConfig } from "astro/config";

// Vite writes the licences of every bundled dependency to
// <outDir>/.vite/license.md. Under `astro build` that file is gone by the
// time the build finishes.
export default defineConfig({
  vite: { build: { license: true } },
});
