import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { Field } from "../field";
import { Input } from "./input";

const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    onValueChange: fn(),
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Número de cuenta",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Buscar movimiento",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "S/ 0.00",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "191-3456789-0-12",
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "191-000",
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: "S/ 0.00",
  },
  render: (args) => (
    <Field.Root name="monto" className="max-w-sm">
      <Field.Label>Monto a transferir</Field.Label>
      <Input {...args} />
      <Field.Description>Máximo S/ 5,000 por operación</Field.Description>
    </Field.Root>
  ),
};

export const Typing: Story = {
  args: {
    placeholder: "S/ 0.00",
  },
  render: (args) => (
    <Field.Root name="monto" className="max-w-sm">
      <Field.Label>Monto a transferir</Field.Label>
      <Input {...args} />
    </Field.Root>
  ),
  play: async ({ canvas, args }) => {
    const input = canvas.getByLabelText("Monto a transferir");
    await userEvent.type(input, "1200");

    await expect(input).toHaveValue("1200");
    await expect(args.onValueChange).toHaveBeenCalled();
  },
};
