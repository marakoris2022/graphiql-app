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
    coverage: {
      provider: "v8", // or "istanbul"
      reportsDirectory: "coverage",
      include: ["app/**/*.{ts,tsx}"], // Adjust the path according to your folder structure
      exclude: ["app/**/*.test.{ts,tsx}"], // Optionally exclude test files
    },
  },
});
