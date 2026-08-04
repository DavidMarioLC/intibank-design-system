import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Badge } from "../badge";
import { Card } from "../card";
import { Table } from "../table";
import { Tabs } from "./tabs";

const movimientos = [
  { fecha: "02 ago", detalle: "Yape a Rosa Quispe", monto: "-45.00" },
  { fecha: "01 ago", detalle: "Abono de haberes", monto: "+3,200.00" },
  { fecha: "29 jul", detalle: "Metro Av. Arequipa", monto: "-128.40" },
];

/* El meta apunta al armado completo y no a `Tabs.Tab`: en un componente
   compuesto los args útiles —qué producto está activo, con qué variante se
   pinta la lista— son los de la composición entera, no los de un botón. */
function ProductosDeCuenta({
  onValueChange,
  variant,
  orientation,
}: {
  onValueChange?: (value: unknown, eventDetails: unknown) => void;
  variant?: "underline" | "pills";
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <Tabs.Root
      defaultValue="movimientos"
      onValueChange={onValueChange}
      orientation={orientation}
      className="w-full max-w-xl"
    >
      <Tabs.List variant={variant}>
        <Tabs.Tab value="movimientos">Movimientos</Tabs.Tab>
        <Tabs.Tab value="detalle">Detalle</Tabs.Tab>
        <Tabs.Tab value="cci">CCI</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>

      <Tabs.Panel value="movimientos" className="text-sm">
        <ul className="flex flex-col gap-2">
          {movimientos.map((movimiento) => (
            <li key={movimiento.detalle} className="flex justify-between gap-4">
              <span>{movimiento.detalle}</span>
              <span className="tabular-nums text-muted-foreground">
                S/ {movimiento.monto}
              </span>
            </li>
          ))}
        </ul>
      </Tabs.Panel>

      <Tabs.Panel value="detalle" className="text-sm">
        Cuenta Sol en soles, abierta el 12/03/2024. Sin comisión de
        mantenimiento.
      </Tabs.Panel>

      <Tabs.Panel value="cci" className="text-sm tabular-nums">
        002-193-001234567890-14
      </Tabs.Panel>
    </Tabs.Root>
  );
}

const meta = {
  title: "Navigation/Tabs",
  component: ProductosDeCuenta,
  tags: ["autodocs"],
  args: {
    onValueChange: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["underline", "pills"],
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ProductosDeCuenta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pills: Story = {
  name: "Pastillas",
  args: { variant: "pills" },
};

/* Vertical con `pills`: el subrayado en vertical existe —pasa a ser una línea
   al costado— pero en una columna angosta la pastilla se lee mejor. */
export const Vertical: Story = {
  args: { orientation: "vertical", variant: "pills" },
};

export const Disabled: Story = {
  name: "Con un tab deshabilitado",
  render: ({ onValueChange }) => (
    <Tabs.Root
      defaultValue="soles"
      onValueChange={onValueChange}
      className="w-full max-w-xl"
    >
      <Tabs.List>
        <Tabs.Tab value="soles">Cuenta Sol</Tabs.Tab>
        <Tabs.Tab value="dolares">Cuenta Inti USD</Tabs.Tab>
        <Tabs.Tab value="credito" disabled>
          Tarjeta de crédito
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="soles" className="text-sm">
        Saldo disponible S/ 4,820.50
      </Tabs.Panel>
      <Tabs.Panel value="dolares" className="text-sm">
        Saldo disponible $ 1,140.00
      </Tabs.Panel>
      <Tabs.Panel value="credito" className="text-sm">
        Todavía no tenés una tarjeta de crédito con nosotros.
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

/* El caso real por el que existe el componente: un solo detalle de cuenta con
   varias vistas encima, sin sacar a la persona de la pantalla. */
export const InsideCard: Story = {
  name: "Dentro de una Card",
  render: ({ onValueChange }) => (
    <Card.Root className="w-full max-w-xl">
      <Card.Header>
        <Card.Title>Cuenta Sol</Card.Title>
        <Card.Description>S/ 4,820.50 disponibles</Card.Description>
      </Card.Header>
      <Card.Content>
        <Tabs.Root defaultValue="movimientos" onValueChange={onValueChange}>
          <Tabs.List variant="pills">
            <Tabs.Tab value="movimientos">Movimientos</Tabs.Tab>
            <Tabs.Tab value="detalle">Detalle</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>

          <Tabs.Panel value="movimientos">
            <Table.Scroller>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>Fecha</Table.Head>
                    <Table.Head>Detalle</Table.Head>
                    <Table.Head>Estado</Table.Head>
                    <Table.Head numeric>Monto</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {movimientos.map((movimiento) => (
                    <Table.Row key={movimiento.detalle}>
                      <Table.Cell>{movimiento.fecha}</Table.Cell>
                      <Table.Cell>{movimiento.detalle}</Table.Cell>
                      <Table.Cell>
                        <Badge variant="success">Procesado</Badge>
                      </Table.Cell>
                      <Table.Cell numeric>S/ {movimiento.monto}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.Scroller>
          </Tabs.Panel>

          <Tabs.Panel value="detalle" className="py-3 text-sm">
            Cuenta Sol en soles, abierta el 12/03/2024. CCI
            002-193-001234567890-14.
          </Tabs.Panel>
        </Tabs.Root>
      </Card.Content>
    </Card.Root>
  ),
};

export const SwitchTabs: Story = {
  name: "Cambiar de producto",
  ...Default,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("cambia de tab con el mouse", async () => {
      await userEvent.click(canvas.getByRole("tab", { name: "Detalle" }));

      await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
        "Cuenta Sol en soles",
      );
      await expect(args.onValueChange).toHaveBeenCalledWith(
        "detalle",
        expect.anything(),
      );
    });

    await step("y con el teclado, sin salir del tablist", async () => {
      await userEvent.keyboard("{ArrowRight}{Enter}");

      await expect(canvas.getByRole("tab", { name: "CCI" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
        "002-193-001234567890-14",
      );
    });
  },
};
