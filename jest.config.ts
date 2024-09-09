import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Adjust path mappings if necessary
  },
  setupFilesAfterEnv: ["<rootDir>/jest.config.ts"], // Uncomment if you have setup files
  // Add more setup options before each test is run
};

export default createJestConfig(config);
