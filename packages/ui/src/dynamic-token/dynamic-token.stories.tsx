import { DynamicToken } from "@intibank/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { expect, fn, userEvent } from "storybook/test";

const meta = {
  args: {
    code: "739418",
    description:
      "Ingresa el código seguro generado automáticamente en tu App Intibank Móvil.",
    expiryLabel: "Expira en:",
    heading: "Token Digital Dinámico",
    onResend: fn(),
    remainingSeconds: 8,
    resendLabel: "Reenviar código",
    status: "active",
    statusLabel: "Activo",
  },
  argTypes: {
    status: {
      control: "select",
      options: ["active", "expired"],
    },
  },
  component: DynamicToken,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "DynamicToken",
} satisfies Meta<typeof DynamicToken>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "min(1024px, calc(100vw - 48px))" }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ args, canvas }) => {
    await expect(
      canvas.getByRole("region", { name: "Token Digital Dinámico" })
    ).toBeVisible();
    await expect(canvas.getByText("Activo")).toHaveClass("ib-badge--success");
    await expect(canvas.getByRole("timer")).toHaveTextContent("00:08s");
    const resend = canvas.getByRole("button", { name: "Reenviar código" });
    await userEvent.click(resend);
    await expect(args.onResend).toHaveBeenCalledTimes(1);
    resend.blur();
  },
};

export const Expired: Story = {
  args: {
    remainingSeconds: 0,
    status: "expired",
    statusLabel: "Expirado",
  },
  decorators: Active.decorators,
};

export const ResendDisabled: Story = {
  args: {
    resendDisabled: true,
  },
  decorators: Active.decorators,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Reenviar código" })
    ).toBeDisabled();
  },
};

export const NarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

const customTheme = {
  "--intibank-dynamic-token-action": "#1e1b4b",
  "--intibank-dynamic-token-action-focus": "#1e1b4b",
  "--intibank-dynamic-token-action-hover": "#312e81",
  "--intibank-dynamic-token-digit-background": "#eef2ff",
  "--intibank-dynamic-token-digit-border": "#c7d2fe",
  "--intibank-dynamic-token-surface": "#fafafa",
  "--intibank-dynamic-token-timer-accent": "#de5c22",
} as CSSProperties;

export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <div style={{ ...customTheme, width: "min(1024px, calc(100vw - 48px))" }}>
        <Story />
      </div>
    ),
  ],
};
