import "@fontsource-variable/hanken-grotesk";
import "@intibank/ui/styles.css";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    a11y: { test: "error" },
    backgrounds: {
      default: "warm-stone",
      values: [
        { name: "warm-stone", value: "#fafaf9" },
        { name: "elevated", value: "#ffffff" },
        { name: "indigo", value: "#1e1b4b" },
      ],
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
