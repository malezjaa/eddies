import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  clean: true,
  external: ["react"],
  keepNames: true,
  injectStyle: true,
});
