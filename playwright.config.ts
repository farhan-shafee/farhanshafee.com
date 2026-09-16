import { defineConfig, devices } from "@playwright/test";

const existingServer = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  workers: 3,
  timeout: 60_000,
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: existingServer || "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },
  webServer: existingServer
    ? undefined
    : {
        command:
          "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100",
        url: "http://127.0.0.1:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
