import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Table } from "./table";

const movimientos = [
  { fecha: "02 ago", detalle: "Yape a Rosa Quispe", monto: "-S/ 120.00" },
  { fecha: "01 ago", detalle: "Haberes agosto", monto: "+S/ 3,200.00" },
  { fecha: "31 jul", detalle: "Mantenimiento de cuenta", monto: "-S/ 8.00" },
];

function Movimientos() {
  return (
    <Table.Scroller>
      <Table.Root>
        <Table.Caption>Últimos 30 días</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Fecha</Table.Head>
            <Table.Head>Detalle</Table.Head>
            <Table.Head numeric>Monto</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {movimientos.map((movimiento) => (
            <Table.Row key={movimiento.detalle}>
              <Table.Cell>{movimiento.fecha}</Table.Cell>
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
  );
}

describe("Table", () => {
  it("renders a real table with its rows and columns", () => {
    render(<Movimientos />);

    const table = screen.getByRole("table");
    /* 1 del header + 3 de movimientos + 1 del footer. */
    expect(within(table).getAllByRole("row")).toHaveLength(5);
    expect(within(table).getAllByRole("columnheader")).toHaveLength(3);
  });

  it("names the table with its caption", () => {
    render(<Movimientos />);
    expect(screen.getByRole("table")).toHaveAccessibleName("Últimos 30 días");
  });

  it("aligns numeric cells to the right with tabular figures", () => {
    render(<Movimientos />);

    const monto = screen.getByText("+S/ 3,200.00");
    expect(monto).toHaveClass("text-right", "tabular-nums");
  });

  it("leaves non-numeric cells aligned to the start", () => {
    render(<Movimientos />);

    const detalle = screen.getByText("Haberes agosto");
    expect(detalle).not.toHaveClass("text-right");
    expect(detalle).not.toHaveClass("tabular-nums");
  });

  it("forwards native table props like colSpan", () => {
    render(<Movimientos />);
    expect(screen.getByText("Saldo final")).toHaveAttribute("colspan", "2");
  });

  it("renders header cells as th and body cells as td", () => {
    render(<Movimientos />);

    expect(screen.getByRole("columnheader", { name: "Monto" }).tagName).toBe(
      "TH",
    );
    expect(screen.getByText("Yape a Rosa Quispe").tagName).toBe("TD");
  });

  it("lets `render` turn a cell into a row header", () => {
    render(
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell render={<th scope="row" />}>02 ago</Table.Cell>
            <Table.Cell numeric>-S/ 120.00</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    );

    const rowHeader = screen.getByRole("rowheader", { name: "02 ago" });
    expect(rowHeader).toHaveAttribute("scope", "row");
  });

  it("merges a custom className over the base classes", () => {
    render(
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="px-6">Yape</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    );

    const cell = screen.getByText("Yape");
    expect(cell).toHaveClass("px-6");
    expect(cell).not.toHaveClass("px-3");
  });

  it("lets className win over the numeric alignment", () => {
    render(
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell numeric className="text-left">
              S/ 8.00
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    );

    const cell = screen.getByText("S/ 8.00");
    expect(cell).toHaveClass("text-left", "tabular-nums");
    expect(cell).not.toHaveClass("text-right");
  });
});
