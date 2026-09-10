import "@testing-library/jest-dom/vitest";
import { Button } from "@intibank/ui";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(cleanup);

describe("Button", () => {
  it("uses safe defaults and forwards its ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Transferir</Button>);

    const button = screen.getByRole("button", { name: "Transferir" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("ib-button--solid", "ib-button--md");
    expect(ref.current).toBe(button);
  });

  it("accepts variants, sizes, native props, and className", () => {
    render(
      <Button
        aria-label="Agregar"
        className="consumer-class"
        size="lg"
        variant="outline"
      >
        +
      </Button>
    );

    expect(screen.getByRole("button", { name: "Agregar" })).toHaveClass(
      "ib-button--outline",
      "ib-button--lg",
      "consumer-class"
    );
  });

  it.each(["{Enter}", " "])(
    "activates from the keyboard with %s",
    async (key) => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={onClick}>Continuar</Button>);

      await user.tab();
      await user.keyboard(key);

      expect(onClick).toHaveBeenCalledTimes(1);
    }
  );

  it("does not activate when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        Continuar
      </Button>
    );

    await user.click(screen.getByRole("button", { name: "Continuar" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("allows submit semantics explicitly", () => {
    render(<Button type="submit">Enviar</Button>);
    expect(screen.getByRole("button", { name: "Enviar" })).toHaveAttribute(
      "type",
      "submit"
    );
  });
});
