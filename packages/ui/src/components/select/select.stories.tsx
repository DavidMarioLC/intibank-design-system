import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { Field } from "../field";
import { Select } from "./select";

const cuentas = [
  { value: "ahorro-soles", label: "Cuenta Sol — S/ 4,820.50" },
  { value: "ahorro-dolares", label: "Cuenta Inti USD — $ 1,140.00" },
  { value: "sueldo", label: "Cuenta Sueldo — S/ 320.00" },
];

/* `items` no es decorativo: es lo que deja que el trigger muestre la etiqueta
   del ítem elegido en vez del valor crudo que viaja en el formulario. */
function SelectorDeCuenta({
  onValueChange,
  size,
}: {
  onValueChange?: (value: string | null, eventDetails: unknown) => void;
  size?: "sm" | "default" | "lg";
}) {
  return (
    <Select.Root items={cuentas} onValueChange={onValueChange}>
      <Select.Trigger size={size} className="w-72">
        <Select.Value placeholder="Elegí una cuenta" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              {cuentas.map((cuenta) => (
                <Select.Item key={cuenta.value} value={cuenta.value}>
                  <Select.ItemIndicator />
                  <Select.ItemText>{cuenta.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

/* El meta apunta al armado completo y no a `Select.Trigger`: en un componente
   compuesto los args útiles (el valor elegido, el tamaño) son los de la
   composición entera, no los del botón que la dispara. */
const meta = {
  title: "Forms/Select",
  component: SelectorDeCuenta,
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
} satisfies Meta<typeof SelectorDeCuenta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InAField: Story = {
  name: "Dentro de un Field",
  render: ({ onValueChange }) => (
    <Field.Root name="origen" className="w-72">
      <Field.Label>Cuenta de origen</Field.Label>
      <SelectorDeCuenta onValueChange={onValueChange} />
      <Field.Description>
        Desde acá sale el dinero de la transferencia.
      </Field.Description>
    </Field.Root>
  ),
};

export const Grouped: Story = {
  name: "Con grupos",
  render: ({ onValueChange }) => (
    <Select.Root onValueChange={onValueChange}>
      <Select.Trigger className="w-72">
        <Select.Value placeholder="Elegí un destino" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              <Select.Group>
                <Select.GroupLabel>Mis cuentas</Select.GroupLabel>
                <Select.Item value="ahorro-soles">
                  <Select.ItemIndicator />
                  <Select.ItemText>Cuenta Sol</Select.ItemText>
                </Select.Item>
                <Select.Item value="ahorro-dolares">
                  <Select.ItemIndicator />
                  <Select.ItemText>Cuenta Inti USD</Select.ItemText>
                </Select.Item>
              </Select.Group>
              <Select.Group>
                <Select.GroupLabel>Contactos frecuentes</Select.GroupLabel>
                <Select.Item value="rosa">
                  <Select.ItemIndicator />
                  <Select.ItemText>Rosa Quispe</Select.ItemText>
                </Select.Item>
                <Select.Item value="ccl" disabled>
                  <Select.ItemIndicator />
                  <Select.ItemText>
                    Carlos Loayza (dado de baja)
                  </Select.ItemText>
                </Select.Item>
              </Select.Group>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const Sizes: Story = {
  name: "Tamaños",
  render: ({ onValueChange }) => (
    <div className="flex flex-col gap-3">
      <SelectorDeCuenta onValueChange={onValueChange} size="sm" />
      <SelectorDeCuenta onValueChange={onValueChange} size="default" />
      <SelectorDeCuenta onValueChange={onValueChange} size="lg" />
    </div>
  ),
};

export const Invalid: Story = {
  name: "Inválido",
  render: ({ onValueChange }) => (
    <Field.Root
      name="origen"
      className="w-72"
      validationMode="onChange"
      validate={() => "Elegí una cuenta para continuar"}
    >
      <Field.Label>Cuenta de origen</Field.Label>
      <SelectorDeCuenta onValueChange={onValueChange} />
      <Field.Error />
    </Field.Root>
  ),
};

export const Disabled: Story = {
  name: "Deshabilitado",
  render: () => (
    <Field.Root name="origen" className="w-72" disabled>
      <Field.Label>Cuenta de origen</Field.Label>
      <SelectorDeCuenta />
    </Field.Root>
  ),
};

/* El popup se porta a `body`, así que las consultas van contra `screen` y no
   contra el canvas de la story. */
export const PickAnAccount: Story = {
  name: "Elegir una cuenta",
  ...Default,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("combobox");

    await step("abre la lista", async () => {
      await userEvent.click(trigger);
      await expect(await screen.findByRole("listbox")).toBeInTheDocument();
    });

    await step("elige una cuenta y la muestra en el trigger", async () => {
      await userEvent.click(
        screen.getByRole("option", { name: /Cuenta Inti USD/ }),
      );

      await waitFor(() =>
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
      );
      await expect(trigger).toHaveTextContent("Cuenta Inti USD — $ 1,140.00");
      await expect(args.onValueChange).toHaveBeenCalledWith(
        "ahorro-dolares",
        expect.anything(),
      );
    });
  },
};
