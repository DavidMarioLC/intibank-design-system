import "@testing-library/jest-dom/vitest";
import { MoneyField } from "@intibank/ui";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useCallback, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(cleanup);

describe("MoneyField", () => {
  it("uses PEN and es-PE defaults while forwarding refs and classes", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <form data-testid="form">
        <MoneyField
          className="consumer-input"
          defaultValue="1250.5"
          fieldClassName="consumer-field"
          label="Monto"
          name="amount"
          ref={ref}
        />
      </form>
    );

    const input = screen.getByRole("textbox", { name: "Monto (PEN)" });
    const form = screen.getByTestId("form") as HTMLFormElement;
    const control = input.closest(".ib-text-field__control");
    expect(input).toHaveValue("1,250.50");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input).toHaveClass("ib-money-field__input", "consumer-input");
    expect(input.closest(".ib-text-field")).toHaveClass(
      "ib-money-field",
      "consumer-field"
    );
    expect(control?.firstElementChild).toHaveTextContent("S/");
    expect(new FormData(form).get("amount")).toBe("1250.50");
    expect(ref.current).toBe(input);
  });

  it("ungroups on focus and normalizes an uncontrolled value on blur", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <MoneyField
        defaultValue="1250.50"
        label="Monto"
        onValueChange={onValueChange}
      />
    );

    const input = screen.getByRole("textbox", { name: "Monto (PEN)" });
    expect(input).toHaveValue("1,250.50");
    await user.click(input);
    expect(input).toHaveValue("1250.50");
    await user.clear(input);
    await user.type(input, "1250.5");
    await user.tab();
    expect(input).toHaveValue("1,250.50");
    expect(onValueChange).toHaveBeenLastCalledWith("1250.50");
  });

  it("supports locale decimal separators and suffix currencies", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <MoneyField
        currency="EUR"
        defaultValue="1250.50"
        label="Importe"
        locale="de-DE"
        onValueChange={onValueChange}
      />
    );

    const input = screen.getByRole("textbox", { name: "Importe (EUR)" });
    const control = input.closest(".ib-text-field__control");
    expect(input).toHaveValue("1.250,50");
    expect(control?.lastElementChild).toHaveTextContent("€");
    await user.click(input);
    expect(input).toHaveValue("1250,50");
    await user.clear(input);
    await user.type(input, "9876,5");
    await user.tab();
    expect(input).toHaveValue("9.876,50");
    expect(onValueChange).toHaveBeenLastCalledWith("9876.50");
  });

  it("cleans localized pasted values and submits canonical data while focused", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <form data-testid="form">
        <MoneyField label="Monto" name="amount" onValueChange={onValueChange} />
      </form>
    );

    const input = screen.getByRole("textbox", { name: "Monto (PEN)" });
    const form = screen.getByTestId("form") as HTMLFormElement;
    await user.click(input);
    await user.paste("S/ 1,250.5");
    expect(input).toHaveValue("1250.5");
    expect(onValueChange).toHaveBeenLastCalledWith("1250.5");
    expect(new FormData(form).get("amount")).toBe("1250.50");
  });

  it("rejects excess precision and negative signs unless enabled", async () => {
    const user = userEvent.setup();

    render(
      <>
        <MoneyField label="Monto positivo" />
        <MoneyField allowNegative label="Ajuste" />
      </>
    );

    const positive = screen.getByRole("textbox", {
      name: "Monto positivo (PEN)",
    });
    const adjustment = screen.getByRole("textbox", { name: "Ajuste (PEN)" });
    await user.click(positive);
    await user.type(positive, "-12.345");
    expect(positive).toHaveValue("12.34");

    await user.click(adjustment);
    await user.type(adjustment, "-10.5");
    await user.tab();
    expect(adjustment).toHaveValue("-10.50");
  });

  it("supports controlled values and blur normalization", async () => {
    const observedValues: string[] = [];
    const user = userEvent.setup();

    function ControlledMoneyField() {
      const [value, setValue] = useState("");
      const handleValueChange = useCallback((nextValue: string) => {
        observedValues.push(nextValue);
        setValue(nextValue);
      }, []);
      return (
        <MoneyField
          label="Monto controlado"
          onValueChange={handleValueChange}
          value={value}
        />
      );
    }

    render(<ControlledMoneyField />);
    const input = screen.getByRole("textbox", {
      name: "Monto controlado (PEN)",
    });
    await user.click(input);
    await user.type(input, "42.5");
    await user.tab();
    expect(input).toHaveValue("42.50");
    expect(observedValues.at(-1)).toBe("42.50");
  });

  it("submits an empty value instead of coercing it to zero", async () => {
    const user = userEvent.setup();

    render(
      <form data-testid="form">
        <MoneyField defaultValue="20" label="Monto" name="amount" />
      </form>
    );

    const input = screen.getByRole("textbox", { name: "Monto (PEN)" });
    const form = screen.getByTestId("form") as HTMLFormElement;
    await user.click(input);
    await user.clear(input);
    expect(new FormData(form).get("amount")).toBe("");
    await user.tab();
    expect(input).toHaveValue("");
  });

  it("preserves validation, disabled, and read-only semantics", async () => {
    const user = userEvent.setup();

    render(
      <>
        <MoneyField
          defaultValue="0"
          errorMessage="Ingresa un monto mayor a cero"
          label="Pago"
        />
        <MoneyField defaultValue="10" disabled label="Límite" />
        <MoneyField defaultValue="25" label="Saldo" readOnly />
      </>
    );

    const invalid = screen.getByRole("textbox", { name: "Pago (PEN)" });
    const disabled = screen.getByRole("textbox", { name: "Límite (PEN)" });
    const readOnly = screen.getByRole("textbox", { name: "Saldo (PEN)" });
    expect(invalid).toHaveAttribute("aria-invalid", "true");
    expect(invalid).toHaveAccessibleDescription(
      "Ingresa un monto mayor a cero"
    );
    expect(disabled).toBeDisabled();
    expect(readOnly).toHaveAttribute("readonly");
    const readOnlyControl = readOnly.closest(".ib-text-field__control");
    if (!(readOnlyControl instanceof HTMLElement)) {
      throw new Error("MoneyField control was not rendered");
    }
    await user.click(readOnlyControl);
    expect(readOnly).toHaveFocus();
    expect(readOnly).toHaveValue("25.00");
  });
});
