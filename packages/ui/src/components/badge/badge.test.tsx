import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, badgeVariants } from "./badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>Completada</Badge>);
    expect(screen.getByText("Completada")).toBeInTheDocument();
  });

  it("falls back to the neutral variant", () => {
    render(<Badge>Pendiente</Badge>);
    expect(screen.getByText("Pendiente")).toHaveClass("bg-muted");
  });

  it("applies the requested variant", () => {
    render(<Badge variant="destructive">Rechazada</Badge>);
    expect(screen.getByText("Rechazada")).toHaveClass("bg-destructive");
  });

  it("merges a custom className over the variant classes", () => {
    render(<Badge className="rounded-none">Programada</Badge>);

    const badge = screen.getByText("Programada");
    expect(badge).toHaveClass("rounded-none");
    expect(badge).not.toHaveClass("rounded-full");
  });

  it("forwards native span props", () => {
    render(<Badge title="Estado del movimiento">Completada</Badge>);
    expect(screen.getByTitle("Estado del movimiento")).toBeInTheDocument();
  });

  it("pairs every state variant with its own foreground", () => {
    /* Un badge es superficie: si una variante trae `bg-X` sin su
       `text-X-foreground`, hereda el color de texto de la página y el
       contraste queda librado al azar. Ver la nota en semantic.css. */
    for (const variant of ["success", "warning", "destructive"] as const) {
      const classes = badgeVariants({ variant });
      expect(classes).toContain(`bg-${variant}`);
      expect(classes).toContain(`text-${variant}-foreground`);
    }
  });
});
