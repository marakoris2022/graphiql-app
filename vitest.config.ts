// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"), // Alias for root directory
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"], // Point to the setup file
  },
});
