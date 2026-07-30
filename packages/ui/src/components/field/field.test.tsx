import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "../input";
import { Field } from "./field";

describe("Field", () => {
  it("associates the label with the control", () => {
    render(
      <Field.Root name="cuenta">
        <Field.Label>Número de cuenta</Field.Label>
        <Input />
      </Field.Root>,
    );

    expect(screen.getByLabelText("Número de cuenta")).toBeInTheDocument();
  });

  it("describes the control with the description", () => {
    render(
      <Field.Root name="cci">
        <Field.Label>Código CCI</Field.Label>
        <Input />
        <Field.Description>Son 20 dígitos.</Field.Description>
      </Field.Root>,
    );

    expect(screen.getByLabelText("Código CCI")).toHaveAccessibleDescription(
      "Son 20 dígitos.",
    );
  });

  it("propagates disabled from the root to the control", () => {
    render(
      <Field.Root name="cuenta" disabled>
        <Field.Label>Número de cuenta</Field.Label>
        <Input />
      </Field.Root>,
    );

    expect(screen.getByLabelText("Número de cuenta")).toBeDisabled();
  });

  it("shows the validation error on blur and marks the control invalid", async () => {
    const user = userEvent.setup();
    render(
      <Field.Root
        name="monto"
        validationMode="onBlur"
        validate={(value) =>
          Number(value) > 5000 ? "El monto excede tu límite diario" : null
        }
      >
        <Field.Label>Monto a transferir</Field.Label>
        <Input />
        <Field.Error />
      </Field.Root>,
    );

    const input = screen.getByLabelText("Monto a transferir");
    await user.type(input, "9000");
    await user.tab();

    expect(
      await screen.findByText("El monto excede tu límite diario"),
    ).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("does not show an error when the value is valid", async () => {
    const user = userEvent.setup();
    render(
      <Field.Root
        name="monto"
        validationMode="onBlur"
        validate={(value) =>
          Number(value) > 5000 ? "El monto excede tu límite diario" : null
        }
      >
        <Field.Label>Monto a transferir</Field.Label>
        <Input />
        <Field.Error />
      </Field.Root>,
    );

    await user.type(screen.getByLabelText("Monto a transferir"), "1200");
    await user.tab();

    expect(
      screen.queryByText("El monto excede tu límite diario"),
    ).not.toBeInTheDocument();
  });
});
