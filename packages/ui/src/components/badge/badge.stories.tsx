import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";

const meta = {
  title: "Data display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Completada",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "neutral",
        "primary",
        "secondary",
        "success",
        "warning",
        "destructive",
        "outline",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "default"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Pendiente",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="neutral">Pendiente</Badge>
      <Badge variant="primary">Nuevo</Badge>
      <Badge variant="secondary">Cuota 3/12</Badge>
      <Badge variant="success">Completada</Badge>
      <Badge variant="warning">En proceso</Badge>
      <Badge variant="destructive">Rechazada</Badge>
      <Badge variant="outline">Programada</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" variant="success">
        Completada
      </Badge>
      <Badge size="default" variant="success">
        Completada
      </Badge>
    </div>
  ),
};

export const TransactionStates: Story = {
  name: "Estados de transacción",
  render: () => (
    <ul className="flex w-full max-w-sm flex-col gap-3 text-sm">
      {[
        { label: "Transferencia a Yape", state: "Completada" as const },
        {
          label: "Pago de servicio — Luz del Sur",
          state: "En proceso" as const,
        },
        { label: "Retiro sin tarjeta", state: "Rechazada" as const },
      ].map((movimiento) => (
        <li
          key={movimiento.label}
          className="flex items-center justify-between gap-4"
        >
          <span>{movimiento.label}</span>
          <Badge
            variant={
              movimiento.state === "Completada"
                ? "success"
                : movimiento.state === "En proceso"
                  ? "warning"
                  : "destructive"
            }
          >
            {movimiento.state}
          </Badge>
        </li>
      ))}
    </ul>
  ),
};
