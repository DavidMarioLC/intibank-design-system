import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../badge";
import { Card } from "../card";
import { Table } from "./table";

const movimientos = [
  {
    fecha: "02 ago",
    detalle: "Yape a Rosa Quispe",
    canal: "App",
    estado: "Completado",
    monto: "-S/ 120.00",
  },
  {
    fecha: "01 ago",
    detalle: "Haberes agosto",
    canal: "Abono",
    estado: "Completado",
    monto: "+S/ 3,200.00",
  },
  {
    fecha: "01 ago",
    detalle: "Transferencia a Cuenta Inti USD",
    canal: "App",
    estado: "En proceso",
    monto: "-S/ 400.00",
  },
  {
    fecha: "31 jul",
    detalle: "Mantenimiento de cuenta",
    canal: "Automático",
    estado: "Completado",
    monto: "-S/ 8.00",
  },
  {
    fecha: "30 jul",
    detalle: "Compra en Mercado San Isidro",
    canal: "Tarjeta",
    estado: "Rechazado",
    monto: "-S/ 64.90",
  },
] as const;

const estados = {
  Completado: "success",
  "En proceso": "warning",
  Rechazado: "destructive",
} as const;

const meta = {
  title: "Data display/Table",
  component: Table.Root,
  tags: ["autodocs"],
} satisfies Meta<typeof Table.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Movimientos",
  render: () => (
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
              <Table.Cell className="whitespace-nowrap text-muted-foreground">
                {movimiento.fecha}
              </Table.Cell>
              <Table.Cell className="font-medium">
                {movimiento.detalle}
              </Table.Cell>
              <Table.Cell>
                <Badge variant={estados[movimiento.estado]} size="sm">
                  {movimiento.estado}
                </Badge>
              </Table.Cell>
              <Table.Cell numeric>{movimiento.monto}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.Scroller>
  ),
};

export const WithCaptionAndFooter: Story = {
  name: "Con caption y total",
  render: () => (
    <Table.Scroller>
      <Table.Root>
        <Table.Caption>
          Movimientos de la Cuenta Sol · últimos 30 días
        </Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Fecha</Table.Head>
            <Table.Head>Detalle</Table.Head>
            <Table.Head numeric>Monto</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {movimientos.slice(0, 3).map((movimiento) => (
            <Table.Row key={movimiento.detalle}>
              <Table.Cell className="whitespace-nowrap text-muted-foreground">
                {movimiento.fecha}
              </Table.Cell>
              <Table.Cell>{movimiento.detalle}</Table.Cell>
              <Table.Cell numeric>{movimiento.monto}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={2}>Saldo final</Table.Cell>
            <Table.Cell numeric>S/ 4,820.50</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Table.Scroller>
  ),
};

/* El caso real en el producto: la tabla vive dentro de la Card del producto.
   `Table.Scroller` acota el overflow adentro de la tarjeta, así que la página
   nunca scrollea de costado por culpa de una columna de más. */
export const InsideACard: Story = {
  name: "Dentro de una Card",
  render: () => (
    <Card.Root className="w-full max-w-2xl">
      <Card.Header>
        <Card.Title>Cuenta Sol</Card.Title>
        <Card.Description>Soles · 191-3456789-0-12</Card.Description>
      </Card.Header>
      <Card.Content className="px-0">
        <Table.Scroller>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head className="pl-6">Fecha</Table.Head>
                <Table.Head>Detalle</Table.Head>
                <Table.Head numeric className="pr-6">
                  Monto
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {movimientos.map((movimiento) => (
                <Table.Row key={movimiento.detalle}>
                  <Table.Cell className="whitespace-nowrap pl-6 text-muted-foreground">
                    {movimiento.fecha}
                  </Table.Cell>
                  <Table.Cell>{movimiento.detalle}</Table.Cell>
                  <Table.Cell numeric className="pr-6">
                    {movimiento.monto}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.Scroller>
      </Card.Content>
    </Card.Root>
  ),
};

/* La fecha como `th scope="row"` deja de ser un dato suelto y pasa a nombrar
   la fila: un lector de pantalla anuncia "02 ago, Monto, -S/ 120.00" al
   moverse por la columna de montos, en vez de leer el número solo. */
export const WithRowHeaders: Story = {
  name: "Con encabezado de fila",
  render: () => (
    <Table.Scroller>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head scope="col">Detalle</Table.Head>
            <Table.Head scope="col">Canal</Table.Head>
            <Table.Head scope="col" numeric>
              Monto
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {movimientos.map((movimiento) => (
            <Table.Row key={movimiento.detalle}>
              <Table.Cell
                render={<th scope="row" />}
                className="text-left font-medium"
              >
                {movimiento.detalle}
              </Table.Cell>
              <Table.Cell className="text-muted-foreground">
                {movimiento.canal}
              </Table.Cell>
              <Table.Cell numeric>{movimiento.monto}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.Scroller>
  ),
};

export const Empty: Story = {
  name: "Sin movimientos",
  render: () => (
    <Table.Scroller>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Fecha</Table.Head>
            <Table.Head>Detalle</Table.Head>
            <Table.Head numeric>Monto</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell
              colSpan={3}
              className="py-10 text-center text-muted-foreground"
            >
              No hay movimientos en el período elegido.
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Table.Scroller>
  ),
};
