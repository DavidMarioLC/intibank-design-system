import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { Button } from "./button";

const meta = {
  title: "Forms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Transferir",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Ver detalle",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Cancelar cuenta",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Descargar estado de cuenta",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Omitir",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Continuar",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Confirmar transferencia",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Transferir",
  },
};

export const Clickable: Story = {
  args: {
    variant: "primary",
    children: "Transferir",
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: "Transferir" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const DisabledIsNotClickable: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Transferir",
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: "Transferir" });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
