import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./input";

describe("Input", () => {
  it("renders an input with its placeholder", () => {
    render(<Input placeholder="Número de cuenta" />);
    expect(screen.getByPlaceholderText("Número de cuenta")).toBeInTheDocument();
  });

  it("reports typed values through onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Input onValueChange={onValueChange} placeholder="Monto" />);

    await user.type(screen.getByPlaceholderText("Monto"), "120");

    expect(onValueChange).toHaveBeenCalledTimes(3);
    expect(onValueChange).toHaveBeenLastCalledWith("120", expect.anything());
  });

  it("does not accept input when disabled", async () => {
    const user = userEvent.setup();
    render(<Input disabled placeholder="Monto" />);

    const input = screen.getByPlaceholderText("Monto");
    await user.type(input, "120");

    expect(input).toBeDisabled();
    expect(input).toHaveValue("");
  });

  it("works as a controlled input", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Input value="191" onValueChange={onValueChange} placeholder="Cuenta" />,
    );

    const input = screen.getByPlaceholderText("Cuenta");
    expect(input).toHaveValue("191");

    await user.type(input, "5");

    expect(onValueChange).toHaveBeenCalledWith("1915", expect.anything());
    expect(input).toHaveValue("191");
  });
});
