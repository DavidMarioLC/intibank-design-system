import "@testing-library/jest-dom/vitest";
import { TextField } from "@intibank/ui";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ChangeEvent } from "react";
import { createRef, useCallback, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(cleanup);

describe("TextField", () => {
  it("forwards native input behavior, refs, and consumer classes", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <TextField
        autoComplete="organization"
        className="consumer-input"
        fieldClassName="consumer-field"
        id="company"
        label="Empresa"
        name="company"
        ref={ref}
        required
      />
    );

    const input = screen.getByRole("textbox", { name: "Empresa" });
    expect(input).toHaveAttribute("autocomplete", "organization");
    expect(input).toHaveAttribute("id", "company");
    expect(input).toHaveAttribute("name", "company");
    expect(input).toBeRequired();
    expect(input).toHaveClass("ib-text-field__input", "consumer-input");
    expect(input.closest(".ib-text-field")).toHaveClass("consumer-field");
    expect(ref.current).toBe(input);
  });

  it("generates a stable label association and focuses from the label", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<TextField label="Mensaje" />);
    const input = screen.getByRole("textbox", { name: "Mensaje" });
    const generatedId = input.id;

    expect(generatedId).not.toBe("");
    await user.click(screen.getByText("Mensaje"));
    expect(input).toHaveFocus();

    rerender(<TextField label="Mensaje" />);
    expect(screen.getByRole("textbox", { name: "Mensaje" })).toHaveAttribute(
      "id",
      generatedId
    );
  });

  it("supports controlled text input", async () => {
    const user = userEvent.setup();

    function ControlledField() {
      const [value, setValue] = useState("");
      const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          setValue(event.currentTarget.value);
        },
        []
      );
      return (
        <TextField label="Referencia" onChange={handleChange} value={value} />
      );
    }

    render(<ControlledField />);
    const input = screen.getByRole("textbox", { name: "Referencia" });
    await user.type(input, "Honorarios");
    expect(input).toHaveValue("Honorarios");
  });

  it("shows localized optional copy without changing required semantics", () => {
    render(<TextField label="Mensaje o Motivo" optional />);

    const input = screen.getByRole("textbox", {
      name: "Mensaje o Motivo (Opcional)",
    });
    expect(input).not.toBeRequired();
  });

  it("associates helper text while the field is valid", () => {
    render(
      <TextField
        helperText="Máximo 80 caracteres"
        label="Mensaje"
        maxLength={80}
      />
    );

    expect(
      screen.getByRole("textbox", { name: "Mensaje" })
    ).toHaveAccessibleDescription("Máximo 80 caracteres");
  });

  it("replaces helper text with an associated validation error", () => {
    render(
      <TextField
        errorMessage="Ingresa un monto válido"
        helperText="Monto en soles"
        label="Monto"
      />
    );

    const input = screen.getByRole("textbox", { name: "Monto" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Ingresa un monto válido");
    expect(screen.queryByText("Monto en soles")).not.toBeInTheDocument();
  });

  it("keeps presentational adornments outside the accessible name and value", async () => {
    const user = userEvent.setup();

    render(
      <form data-testid="form">
        <TextField
          defaultValue="120"
          endAdornment="PEN"
          label="Monto"
          name="amount"
          startAdornment="S/."
        />
      </form>
    );

    const input = screen.getByRole("textbox", { name: "Monto" });
    const form = screen.getByTestId("form") as HTMLFormElement;
    expect(input).toHaveAccessibleName("Monto");
    expect(input).toHaveValue("120");
    expect(new FormData(form).get("amount")).toBe("120");
    expect(screen.getByText("S/.")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("PEN")).toHaveAttribute("aria-hidden", "true");

    await user.click(screen.getByText("PEN"));
    expect(input).toHaveFocus();
  });

  it("preserves disabled and read-only behavior", async () => {
    const onDisabledChange = vi.fn();
    const onReadOnlyChange = vi.fn();
    const user = userEvent.setup();

    render(
      <>
        <TextField disabled label="Cuenta" onChange={onDisabledChange} />
        <TextField
          defaultValue="Cuenta sueldo"
          label="Producto"
          onChange={onReadOnlyChange}
          readOnly
        />
      </>
    );

    const disabled = screen.getByRole("textbox", { name: "Cuenta" });
    const readOnly = screen.getByRole("textbox", { name: "Producto" });
    expect(disabled).toBeDisabled();
    expect(readOnly).toHaveAttribute("readonly");

    await user.type(disabled, "123");
    await user.type(readOnly, " nueva");
    expect(onDisabledChange).not.toHaveBeenCalled();
    expect(onReadOnlyChange).not.toHaveBeenCalled();
    expect(readOnly).toHaveValue("Cuenta sueldo");
  });
});
