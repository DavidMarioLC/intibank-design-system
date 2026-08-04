import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import tailwindcss from "@tailwindcss/vite";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../../../packages/ui/src/components/**/*.mdx",
    "../../../packages/ui/src/components/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-mcp"),
  ],
  framework: getAbsolutePath("@storybook/react-vite"),
  viteFinal: async (viteConfig) => {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(tailwindcss());
    return viteConfig;
  },
};
export default config;

function getAbsolutePath(value) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
