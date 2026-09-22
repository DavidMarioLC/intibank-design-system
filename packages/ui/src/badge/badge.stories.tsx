import { Badge } from "@intibank/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { expect } from "storybook/test";

const meta = {
  args: {
    children: "Activo",
    variant: "success",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "warning", "danger"],
    },
  },
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Badge",
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  play: async ({ canvas }) => {
    const badge = canvas.getByText("Activo");
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass("ib-badge--success");
  },
};

export const Pending: Story = {
  args: {
    children: "Pendiente",
    variant: "warning",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Pendiente")).toHaveClass(
      "ib-badge--warning"
    );
  },
};

export const Rejected: Story = {
  args: {
    children: "Rechazado",
    variant: "danger",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Rechazado")).toHaveClass("ib-badge--danger");
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
      <Badge variant="success">Activo</Badge>
      <Badge variant="warning">Pendiente</Badge>
      <Badge variant="danger">Rechazado</Badge>
    </div>
  ),
};

const customTheme = {
  "--intibank-badge-success-background": "#1e1b4b",
  "--intibank-badge-success-border": "#312e81",
  "--intibank-badge-success-foreground": "#ffffff",
  "--intibank-badge-success-indicator": "#f59e0b",
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
