import { Button } from "@intibank/ui";
import { ArrowRightIcon, PlusIcon } from "@intibank/ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { expect, fn } from "storybook/test";

const meta = {
  args: {
    children: "Transferir",
    onClick: fn(),
  },
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Disabled: Story = { args: { disabled: true } };

export const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: "flex", gap: 12 }}>
  <Button>Solid</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
</div>`,
        language: "tsx",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button>Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div style={{ alignItems: "center", display: "flex", gap: 12 }}>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
        language: "tsx",
      },
    },
  },
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button>
  <ArrowRightIcon aria-hidden="true" />
  Transferir
</Button>`,
        language: "tsx",
      },
    },
  },
  render: () => (
    <Button>
      <ArrowRightIcon aria-hidden="true" />
      Transferir
    </Button>
  ),
};

export const IconOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button aria-label="Agregar beneficiario">
  <PlusIcon aria-hidden="true" />
</Button>`,
        language: "tsx",
      },
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", {
      name: "Agregar beneficiario",
    });
    const icon = button.querySelector("svg");

    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
  render: ({ onClick }) => (
    <Button aria-label="Agregar beneficiario" onClick={onClick}>
      <PlusIcon aria-hidden="true" />
    </Button>
  ),
};

const nightfallTheme = {
  "--intibank-color-focus-ring": "#f59e0b",
  "--intibank-color-on-primary": "#ffffff",
  "--intibank-color-primary": "#1e1b4b",
  "--intibank-color-primary-hover": "#312e81",
  "--intibank-color-surface": "#e0e7ff",
  "--intibank-color-text": "#1e1b4b",
} as CSSProperties;

export const NightfallPalette: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div
  style={{
    "--intibank-color-primary": "#1e1b4b",
    "--intibank-color-primary-hover": "#312e81",
    "--intibank-color-on-primary": "#ffffff",
  } as CSSProperties}
>
  <Button>Nightfall</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
</div>`,
        language: "tsx",
      },
    },
  },
  render: () => (
    <div
      style={{
        ...nightfallTheme,
        background: "#fafaf9",
        borderRadius: 20,
        display: "flex",
        gap: 12,
        padding: 32,
      }}
    >
      <Button>Nightfall</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const KeyboardInteraction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Transferir" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
