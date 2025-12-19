import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src",
  testMatch: ["<rootDir>/**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!**/*.d.ts",
    "!**/index.ts",
    "!**/*.test.ts",
    "!**/*.spec.ts",
    "!types/**",
    "!server.ts",
    "!**/*.schema.ts",
  ],
  coverageDirectory: "../coverage",
  coverageReporters: ["text", "lcov", "html"],
};

export default config;
