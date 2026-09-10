import { defineConfig } from "tsdown";

const sharedConfig = {
  outDir: "dist",
  platform: "browser" as const,
  sourcemap: true,
  target: "es2022",
};

export default defineConfig([
  {
    ...sharedConfig,
    clean: true,
    deps: {
      neverBundle: ["react", "react-dom", "@base-ui/react"],
    },
    dts: true,
    entry: { index: "src/index.ts" },
    format: ["esm", "cjs"],
  },
  {
    ...sharedConfig,
    clean: false,
    deps: {
      neverBundle: ["react", "react-dom", "@phosphor-icons/react"],
    },
    dts: true,
    entry: { icons: "src/icons/index.ts" },
    format: ["esm"],
  },
  {
    ...sharedConfig,
    clean: false,
    deps: {
      alwaysBundle: [/^@phosphor-icons\/react(?:\/|$)/],
      neverBundle: ["react", "react-dom"],
      onlyBundle: [/^@phosphor-icons\/react(?:\/|$)/],
    },
    dts: false,
    entry: { icons: "src/icons/index.ts" },
    format: ["cjs"],
  },
]);
