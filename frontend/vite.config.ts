import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || "/",
  server: {
    port: 4000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/**",
        "__tests__/",
        "cypress/",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/dist/**",
        "**/*.d.ts",
        "src/graphql/**",
        "**/validation.schema.ts",
        "src/components/pages/**",
        "src/components/templates/SignInTemplate/**",
        "src/components/templates/SignUpTemplate/**",
        "src/app/i18n.ts",
        "src/app/App.tsx",
        "src/main.tsx",
      ],
      include: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.test.{ts,tsx}",
        "!src/**/*.spec.{ts,tsx}",
      ],
    },
  },
});
