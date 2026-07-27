import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./button";

describe("Button", () => {
  it("renders children as button content", () => {
    render(<Button>Continuar</Button>);
    expect(screen.getByRole("button", { name: "Continuar" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continuar</Button>);

    await user.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Continuar
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as a different element via the render prop", () => {
    render(
      <Button render={<a href="/cuentas" />} nativeButton={false}>
        Ver cuentas
      </Button>,
    );

    const link = screen.getByRole("button", { name: "Ver cuentas" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/cuentas");
  });
});
