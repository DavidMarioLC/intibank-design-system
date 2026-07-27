import tailwindcss from "@tailwindcss/vite";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../../../packages/ui/src/components/**/*.mdx",
    "../../../packages/ui/src/components/**/*.stories.@(ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  "viteFinal": async (viteConfig) => {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(tailwindcss());
    return viteConfig;
  }
};
export default config;