import { Button } from "@intibank/ui";
import { ArrowRightIcon, PlusIcon } from "@intibank/ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

const meta = {
  args: {
    children: "Transferir",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "hairline",
        "danger",
        "soft",
        "solid",
        "outline",
        "ghost",
      ],
    },
  },
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Hairline: Story = { args: { variant: "hairline" } };
export const Danger: Story = { args: { variant: "danger" } };
export const Soft: Story = { args: { variant: "soft" } };
export const Disabled: Story = { args: { disabled: true } };

export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Button>
      <ArrowRightIcon aria-hidden="true" />
      Transferir
    </Button>
  ),
};

export const IconOnly: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Agregar beneficiario" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
  render: (args) => (
    <Button aria-label="Agregar beneficiario" onClick={args.onClick}>
      <PlusIcon aria-hidden="true" />
    </Button>
  ),
};

export const FocusVisible: Story = {
  args: { children: "Confirmar operación", variant: "primary" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "Confirmar operación" })
    ).toHaveFocus();
  },
};

export const Hover: Story = {
  args: { children: "Solicitar crédito", variant: "secondary" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(
      canvas.getByRole("button", { name: "Solicitar crédito" })
    );
  },
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
