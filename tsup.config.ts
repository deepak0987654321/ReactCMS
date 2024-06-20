import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  external: [
    "react",
    "react-dom",
    "react-quill", // Mark react-quill as external
    "react-quill/dist/quill.snow.css", // Mark CSS file as external
  ],
  sourcemap: true,
  clean: true,
  minify: true,
  bundle: true,
});
