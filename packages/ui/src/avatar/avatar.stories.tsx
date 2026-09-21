import { Avatar } from "@intibank/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { expect } from "storybook/test";

const meta = {
  args: {
    initials: "ME",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Avatar",
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("ME")).toBeVisible();
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
      <Avatar initials="ME" size="sm" />
      <Avatar initials="ME" size="md" />
      <Avatar initials="ME" size="lg" />
    </div>
  ),
};

export const AccessibleIdentity: Story = {
  args: {
    "aria-label": "María Elena",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: "María Elena" })
    ).toBeVisible();
  },
};

const customTheme = {
  "--intibank-avatar-background": "#1e1b4b",
  "--intibank-avatar-border": "#312e81",
  "--intibank-avatar-foreground": "#f59e0b",
} as CSSProperties;

export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <div style={customTheme}>
        <Story />
      </div>
    ),
  ],
};
