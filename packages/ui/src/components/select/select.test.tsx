import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { Select } from "./select";

const cuentas = [
  { value: "ahorro-soles", label: "Cuenta Sol — S/ 4,820.50" },
  { value: "ahorro-dolares", label: "Cuenta Inti USD — $ 1,140.00" },
  { value: "sueldo", label: "Cuenta Sueldo — S/ 320.00" },
];

/* `eventDetails: unknown` en vez del tipo real de Base UI: el handler solo se
   usa para espiar el valor, y anotarlo así evita arrastrar un import de tipos
   internos a cada helper de test. */
function SelectorDeCuenta({
  onValueChange,
  disabled,
}: {
  onValueChange?: (value: string | null, eventDetails: unknown) => void;
  disabled?: boolean;
} = {}) {
  return (
    <Field.Root name="origen" disabled={disabled}>
      <Field.Label>Cuenta de origen</Field.Label>
      <Select.Root items={cuentas} onValueChange={onValueChange}>
        <Select.Trigger>
          <Select.Value placeholder="Elegí una cuenta" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner>
            <Select.Popup>
              <Select.List>
                {cuentas.map((cuenta) => (
                  <Select.Item key={cuenta.value} value={cuenta.value}>
                    <Select.ItemIndicator />
                    <Select.ItemText>{cuenta.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      <Field.Description>
        Desde acá sale el dinero de la transferencia.
      </Field.Description>
    </Field.Root>
  );
}

describe("Select", () => {
  it("shows the placeholder until something is chosen", () => {
    render(<SelectorDeCuenta />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Elegí una cuenta");
  });

  it("takes its label and description from the surrounding Field", () => {
    render(<SelectorDeCuenta />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAccessibleName("Cuenta de origen");
    expect(trigger).toHaveAccessibleDescription(
      "Desde acá sale el dinero de la transferencia.",
    );
  });

  it("opens the list from the trigger", async () => {
    const user = userEvent.setup();
    render(<SelectorDeCuenta />);

    await user.click(screen.getByRole("combobox"));

    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getAllByRole("option")).toHaveLength(3);
  });

  it("selects an option and reflects it on the trigger", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SelectorDeCuenta onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(
      await screen.findByRole("option", { name: /Cuenta Inti USD/ }),
    );

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("combobox")).toHaveTextContent(
      "Cuenta Inti USD — $ 1,140.00",
    );
    expect(onValueChange).toHaveBeenCalledWith(
      "ahorro-dolares",
      expect.anything(),
    );
  });

  it("marks the chosen option as selected", async () => {
    const user = userEvent.setup();
    render(<SelectorDeCuenta />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: /Cuenta Sol/ }));
    await user.click(screen.getByRole("combobox"));

    expect(
      await screen.findByRole("option", { name: /Cuenta Sol/ }),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("can be driven with the keyboard", async () => {
    const user = userEvent.setup();
    render(<SelectorDeCuenta />);

    await user.tab();
    expect(screen.getByRole("combobox")).toHaveFocus();

    await user.keyboard("{Enter}");
    await screen.findByRole("listbox");
    await user.keyboard("{ArrowDown}{Enter}");

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("combobox")).toHaveTextContent(/Cuenta/);
  });

  it("propagates disabled from the Field", () => {
    render(<SelectorDeCuenta disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("submits the selected value under the Field name", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    render(
      <form onSubmit={onSubmit}>
        <SelectorDeCuenta />
        <button type="submit">Continuar</button>
      </form>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: /Sueldo/ }));
    await user.click(screen.getByRole("button", { name: "Continuar" }));

    const form = onSubmit.mock.calls[0]?.[0].target as HTMLFormElement;
    expect(new FormData(form).get("origen")).toBe("sueldo");
  });

  it("merges a custom className over the trigger classes", () => {
    render(
      <Select.Root>
        <Select.Trigger className="h-14">
          <Select.Value placeholder="Elegí" />
        </Select.Trigger>
      </Select.Root>,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("h-14");
    expect(trigger).not.toHaveClass("h-10");
  });
});
