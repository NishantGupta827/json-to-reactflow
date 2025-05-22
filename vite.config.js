import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "json-to-reactflow",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "@xyflow/react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@xyflow/react": "ReactFlow",
        },
      },
    },
    sourcemap: false,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    dts(),
    cssInjectedByJsPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets', // your source folder
          dest: '.' // copies to dist/images
        }
      ]
    })
  ],
});
