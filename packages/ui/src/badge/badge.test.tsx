import "@testing-library/jest-dom/vitest";
import { Badge } from "@intibank/ui";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it } from "vitest";

afterEach(cleanup);

describe("Badge", () => {
  it.each([
    ["success", "Activo"],
    ["warning", "Pendiente"],
    ["danger", "Rechazado"],
  ] as const)(
    "renders the %s variant and consumer content",
    (variant, label) => {
      render(<Badge variant={variant}>{label}</Badge>);

      expect(screen.getByText(label)).toHaveClass(
        "ib-badge",
        `ib-badge--${variant}`
      );
    }
  );

  it("forwards its ref, native attributes, and consumer class", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Badge
        className="consumer-badge"
        data-status="active"
        ref={ref}
        title="Estado de la cuenta"
        variant="success"
      >
        Activo
      </Badge>
    );

    expect(ref.current).toHaveClass(
      "ib-badge",
      "ib-badge--success",
      "consumer-badge"
    );
    expect(ref.current).toHaveAttribute("data-status", "active");
    expect(ref.current).toHaveAttribute("title", "Estado de la cuenta");
  });

  it("keeps the indicator decorative and the visible label accessible", () => {
    const { container } = render(<Badge variant="warning">Pendiente</Badge>);

    expect(screen.getByText("Pendiente")).toHaveTextContent("Pendiente");
    expect(container.querySelector(".ib-badge__indicator")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("does not introduce interactive behavior", () => {
    render(<Badge variant="danger">Rechazado</Badge>);

    const badge = screen.getByText("Rechazado");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).not.toHaveAttribute("role");
    expect(badge).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
