import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          environment: "jsdom",
          include: ["packages/ui/src/**/*.test.tsx"],
          name: "unit",
        },
      },
      {
        extends: true,
        optimizeDeps: {
          include: [
            "@intibank/ui > @base-ui/react/field",
            "@storybook/react-vite",
          ],
        },
        plugins: [
          storybookTest({
            configDir: "apps/storybook/.storybook",
          }),
        ],
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
            provider: playwright(),
          },
          name: "storybook",
        },
      },
    ],
  },
});
