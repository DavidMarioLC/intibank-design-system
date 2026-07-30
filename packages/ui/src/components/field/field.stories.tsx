import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Input } from "../input";
import { Field } from "./field";

const meta = {
  title: "Forms/Field",
  component: Field.Root,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Agrupa label, control, descripción y mensaje de error, y conecta el `aria-describedby`/`aria-invalid` correspondiente. Se compone con cualquier control de la librería (`Input`, y más adelante `Select`).",
      },
    },
  },
} satisfies Meta<typeof Field.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field.Root name="cuenta" className="max-w-sm">
      <Field.Label>Número de cuenta</Field.Label>
      <Input placeholder="191-3456789-0-12" />
    </Field.Root>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field.Root name="cci" className="max-w-sm">
      <Field.Label>Código CCI</Field.Label>
      <Input placeholder="002 191 003456789012 34" />
      <Field.Description>
        Son 20 dígitos, los encuentras en tu estado de cuenta.
      </Field.Description>
    </Field.Root>
  ),
};

export const Required: Story = {
  render: () => (
    <Field.Root name="monto" className="max-w-sm">
      <Field.Label>Monto a transferir</Field.Label>
      <Input required placeholder="S/ 0.00" />
      <Field.Error />
    </Field.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field.Root name="cuenta" disabled className="max-w-sm">
      <Field.Label>Número de cuenta</Field.Label>
      <Input defaultValue="191-3456789-0-12" />
      <Field.Description>
        La cuenta de origen no se puede cambiar.
      </Field.Description>
    </Field.Root>
  ),
};

export const ValidationOnBlur: Story = {
  render: () => (
    <Field.Root
      name="monto"
      className="max-w-sm"
      validationMode="onBlur"
      validate={(value) =>
        Number(value) > 5000 ? "El monto excede tu límite diario" : null
      }
    >
      <Field.Label>Monto a transferir</Field.Label>
      <Input placeholder="S/ 0.00" />
      <Field.Description>Máximo S/ 5,000 por operación</Field.Description>
      <Field.Error />
    </Field.Root>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Monto a transferir");
    await userEvent.type(input, "9000");
    await userEvent.tab();

    await expect(
      await canvas.findByText("El monto excede tu límite diario"),
    ).toBeVisible();
    await expect(input).toHaveAttribute("aria-invalid", "true");
  },
};
