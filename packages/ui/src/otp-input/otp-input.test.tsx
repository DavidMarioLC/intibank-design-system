import "@testing-library/jest-dom/vitest";
import { OtpInput, type OtpInputProps } from "@intibank/ui";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FormEvent } from "react";
import { createRef, useCallback, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(cleanup);

interface ControlledOtpProps
  extends Omit<OtpInputProps, "label" | "onValueChange" | "value"> {
  initialValue?: string;
  label?: OtpInputProps["label"];
  onValueChange?: (value: string) => void;
}

function ControlledOtp({
  initialValue = "",
  label = "Código de verificación",
  onValueChange,
  ...props
}: ControlledOtpProps) {
  const [value, setValue] = useState(initialValue);
  const handleValueChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      onValueChange?.(nextValue);
    },
    [onValueChange]
  );

  return (
    <OtpInput
      {...props}
      label={label}
      onValueChange={handleValueChange}
      value={value}
    />
  );
}

describe("OtpInput", () => {
  it("renders a partial controlled value as one accessible field", () => {
    const { container } = render(
      <OtpInput
        helperText="Ingresa los seis dígitos"
        label="Código de verificación"
        onValueChange={vi.fn()}
        value="120"
      />
    );

    const input = screen.getByRole("textbox", {
      name: "Código de verificación",
    });
    const cells = Array.from(
      container.querySelectorAll(".ib-otp-input__cell"),
      (cell) => cell.textContent
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(1);
    expect(input).toHaveValue("120");
    expect(input).toHaveAccessibleDescription("Ingresa los seis dígitos");
    expect(cells).toEqual(["1", "2", "0", "", "", ""]);
    expect(container.querySelector(".ib-otp-input__cells")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("accepts typing and normalizes paste-shaped input to six ASCII digits", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<ControlledOtp onValueChange={onValueChange} />);

    const input = screen.getByRole("textbox", {
      name: "Código de verificación",
    });
    await user.type(input, "12a3");
    expect(input).toHaveValue("123");

    fireEvent.change(input, { target: { value: "73 94-18 extra 9" } });
    expect(input).toHaveValue("739418");
    expect(onValueChange).toHaveBeenLastCalledWith("739418");
  });

  it("preserves native selection replacement, deletion, and navigation", async () => {
    const user = userEvent.setup();
    const { container } = render(<ControlledOtp initialValue="123456" />);
    const input = screen.getByRole("textbox", {
      name: "Código de verificación",
    }) as HTMLInputElement;

    await user.click(input);
    input.setSelectionRange(2, 4);
    fireEvent.select(input);
    const cells = container.querySelectorAll(".ib-otp-input__cell");
    expect(cells[2]).toHaveAttribute("data-selected");
    expect(cells[3]).toHaveAttribute("data-selected");
    expect(cells[1]).not.toHaveAttribute("data-selected");
    expect(cells[4]).not.toHaveAttribute("data-selected");
    expect(container.querySelector("[data-active]")).not.toBeInTheDocument();

    await user.keyboard("90");
    expect(input).toHaveValue("129056");
    await user.keyboard("{ArrowLeft}{Backspace}");
    expect(input).toHaveValue("12056");
    expect(input.selectionStart).toBe(2);
  });

  it("supports full-code paste through the native field", async () => {
    const user = userEvent.setup();
    render(<ControlledOtp />);
    const input = screen.getByRole("textbox", {
      name: "Código de verificación",
    });

    await user.click(input);
    await user.paste("73 94-18");
    expect(input).toHaveValue("739418");
  });

  it("provides native form, required, and autofill semantics", () => {
    render(
      <form data-testid="form">
        <OtpInput
          label="Código"
          name="otp"
          onValueChange={vi.fn()}
          required
          value="012345"
        />
      </form>
    );

    const input = screen.getByRole("textbox", { name: "Código" });
    const form = screen.getByTestId("form") as HTMLFormElement;
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("autocomplete", "one-time-code");
    expect(input).toHaveAttribute("inputmode", "numeric");
    expect(input).toHaveAttribute("pattern", "[0-9]*");
    expect(new FormData(form).get("otp")).toBe("012345");
  });

  it("replaces helper text with an associated error", () => {
    render(
      <OtpInput
        errorMessage="El código no es válido"
        helperText="Revisa tu mensaje"
        label="Código"
        onValueChange={vi.fn()}
        value="123"
      />
    );

    const input = screen.getByRole("textbox", { name: "Código" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("El código no es válido");
    expect(screen.queryByText("Revisa tu mensaje")).not.toBeInTheDocument();
    expect(screen.getByText("El código no es válido")).toHaveAttribute(
      "aria-live",
      "polite"
    );
    expect(screen.getByText("El código no es válido")).toHaveAttribute(
      "aria-atomic",
      "true"
    );
  });

  it("preserves supported native aria-invalid values", () => {
    render(
      <OtpInput
        aria-invalid="spelling"
        label="Código"
        onValueChange={vi.fn()}
        value="123"
      />
    );

    expect(screen.getByRole("textbox", { name: "Código" })).toHaveAttribute(
      "aria-invalid",
      "spelling"
    );
  });

  it("honors disabled and read-only behavior", async () => {
    const onDisabledChange = vi.fn();
    const onReadOnlyChange = vi.fn();
    const user = userEvent.setup();
    render(
      <>
        <ControlledOtp disabled onValueChange={onDisabledChange} />
        <ControlledOtp
          initialValue="123456"
          label="Código confirmado"
          onValueChange={onReadOnlyChange}
          readOnly
        />
      </>
    );

    const disabled = screen.getByRole("textbox", {
      name: "Código de verificación",
    });
    const readOnly = screen.getByRole("textbox", {
      name: "Código confirmado",
    });
    expect(disabled).toBeDisabled();
    expect(readOnly).toHaveAttribute("readonly");
    await user.type(disabled, "123456");
    await user.type(readOnly, "0");
    expect(onDisabledChange).not.toHaveBeenCalled();
    expect(onReadOnlyChange).not.toHaveBeenCalled();
    expect(readOnly).toHaveValue("123456");
  });

  it("forwards its input ref, native attributes, and consumer classes", () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <OtpInput
        className="consumer-input"
        data-flow="transfer"
        fieldClassName="consumer-field"
        id="transfer-otp"
        label="Código"
        onValueChange={vi.fn()}
        ref={ref}
        value=""
      />
    );

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Código" }));
    expect(ref.current).toHaveAttribute("data-flow", "transfer");
    expect(ref.current).toHaveAttribute("id", "transfer-otp");
    expect(ref.current).toHaveClass("ib-otp-input__input", "consumer-input");
    expect(container.querySelector(".ib-otp-input")).toHaveClass(
      "consumer-field"
    );
  });

  it("does not submit or verify automatically when the code is complete", async () => {
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <form onSubmit={onSubmit}>
        <ControlledOtp onValueChange={onValueChange} />
      </form>
    );

    await user.type(
      screen.getByRole("textbox", { name: "Código de verificación" }),
      "739418"
    );
    expect(onValueChange).toHaveBeenLastCalledWith("739418");
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
