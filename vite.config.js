import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" membuat hasil build bisa ditaruh di sub-folder hosting
// (misalnya https://domainkamu.my.id/dasbor/) tanpa mengubah apa pun.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
