import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      insertTypesEntry: true,
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactProImage",
      formats: ["es", "cjs"],
      fileName: (format) => `react-pro-image.${format}.js`,
    },
    rollupOptions: {
      // Don't bundle React — consumers provide their own
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
});
