import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../badge";
import { Button } from "../button";
import { Card } from "./card";

const meta = {
  title: "Data display/Card",
  component: Card.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card.Root className="w-80">
      <Card.Header>
        <Card.Title>Cuenta Sol</Card.Title>
        <Card.Description>Soles · 191-3456789-0-12</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-3xl font-semibold tabular-nums">S/ 4,820.50</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Disponible S/ 4,320.50
        </p>
      </Card.Content>
    </Card.Root>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card.Root className="w-80">
      <Card.Header>
        <Card.Title>Cuenta Sol</Card.Title>
        <Card.Description>Soles · 191-3456789-0-12</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-3xl font-semibold tabular-nums">S/ 4,820.50</p>
      </Card.Content>
      <Card.Footer>
        <Button size="sm">Transferir</Button>
        <Button size="sm" variant="outline">
          Ver movimientos
        </Button>
      </Card.Footer>
    </Card.Root>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card.Root className="w-80">
      <Card.Header>
        <div className="flex items-start justify-between gap-3">
          <Card.Title>Tarjeta de crédito</Card.Title>
          <Badge variant="warning">Pago pendiente</Badge>
        </div>
        <Card.Description>Visa Inti · **** 4021</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-3xl font-semibold tabular-nums">S/ 1,240.00</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Vence el 15 de agosto
        </p>
      </Card.Content>
    </Card.Root>
  ),
};

export const ContentOnly: Story = {
  name: "Solo contenido",
  render: () => (
    <Card.Root className="w-80">
      <Card.Content className="pt-6">
        <p className="text-sm text-muted-foreground">Ahorro del mes</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">S/ 380.00</p>
      </Card.Content>
    </Card.Root>
  ),
};

export const AsArticle: Story = {
  name: "Con render",
  render: () => (
    <Card.Root render={<article />} className="w-80">
      <Card.Header>
        <Card.Title render={<h2 />}>Cuenta Sol</Card.Title>
        <Card.Description>Soles · 191-3456789-0-12</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-3xl font-semibold tabular-nums">S/ 4,820.50</p>
      </Card.Content>
    </Card.Root>
  ),
};
