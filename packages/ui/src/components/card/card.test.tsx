import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "./card";

describe("Card", () => {
  it("renders every part", () => {
    render(
      <Card.Root>
        <Card.Header>
          <Card.Title>Cuenta Sol</Card.Title>
          <Card.Description>Soles · 191-3456789-0-12</Card.Description>
        </Card.Header>
        <Card.Content>S/ 4,820.50</Card.Content>
        <Card.Footer>Transferir</Card.Footer>
      </Card.Root>,
    );

    expect(screen.getByText("Cuenta Sol")).toBeInTheDocument();
    expect(screen.getByText("Soles · 191-3456789-0-12")).toBeInTheDocument();
    expect(screen.getByText("S/ 4,820.50")).toBeInTheDocument();
    expect(screen.getByText("Transferir")).toBeInTheDocument();
  });

  it("renders the title as a level 3 heading by default", () => {
    render(<Card.Title>Cuenta Sol</Card.Title>);
    expect(
      screen.getByRole("heading", { level: 3, name: "Cuenta Sol" }),
    ).toBeInTheDocument();
  });

  it("lets `render` change the heading level", () => {
    render(<Card.Title render={<h2 />}>Cuenta Sol</Card.Title>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Cuenta Sol" }),
    ).toBeInTheDocument();
  });

  it("lets `render` change the root element", () => {
    render(
      <Card.Root render={<article />}>
        <Card.Content>S/ 4,820.50</Card.Content>
      </Card.Root>,
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("merges a custom className over the base classes", () => {
    render(<Card.Root data-testid="card" className="rounded-none" />);

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("rounded-none");
    expect(card).not.toHaveClass("rounded-lg");
  });

  it("forwards native props to the rendered element", () => {
    render(<Card.Root aria-label="Resumen de cuenta" />);
    expect(screen.getByLabelText("Resumen de cuenta")).toBeInTheDocument();
  });
});
