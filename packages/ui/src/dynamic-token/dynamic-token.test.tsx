import "@testing-library/jest-dom/vitest";
import { DynamicToken } from "@intibank/ui";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const defaultProps = {
  code: "739418",
  description:
    "Ingresa el código seguro generado automáticamente en tu App Intibank Móvil.",
  expiryLabel: "Expira en:",
  heading: "Token Digital Dinámico",
  onResend: vi.fn(),
  remainingSeconds: 8,
  resendLabel: "Reenviar código",
  status: "active" as const,
  statusLabel: "Activo",
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("DynamicToken", () => {
  it("renders controlled content and exposes the code once in digit order", () => {
    const { container } = render(<DynamicToken {...defaultProps} />);

    expect(
      screen.getByRole("region", { name: "Token Digital Dinámico" })
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeVisible();
    expect(screen.getByText("7 3 9 4 1 8")).toBeInTheDocument();
    expect(
      Array.from(
        container.querySelectorAll(".ib-dynamic-token__digit"),
        (digit) => digit.textContent
      )
    ).toEqual(["7", "3", "9", "4", "1", "8"]);
    expect(
      container.querySelector(".ib-dynamic-token__visual-code")
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("reflects consumer updates without changing them internally", () => {
    const { rerender } = render(<DynamicToken {...defaultProps} />);

    expect(screen.getByText("00:08s")).toBeVisible();
    rerender(
      <DynamicToken {...defaultProps} code="123456" remainingSeconds={65} />
    );

    expect(screen.getByText("1 2 3 4 5 6")).toBeInTheDocument();
    expect(screen.getByText("01:05s")).toBeVisible();
    expect(screen.queryByText("7 3 9 4 1 8")).not.toBeInTheDocument();
  });

  it("clamps negative and non-finite remaining time to zero", () => {
    const { rerender } = render(
      <DynamicToken {...defaultProps} remainingSeconds={-4} />
    );

    expect(screen.getByText("00:00s")).toBeVisible();
    rerender(<DynamicToken {...defaultProps} remainingSeconds={Number.NaN} />);
    expect(screen.getByText("00:00s")).toBeVisible();
  });

  it("maps active and expired status to semantic Badge treatments", () => {
    const { rerender } = render(<DynamicToken {...defaultProps} />);

    expect(screen.getByText("Activo")).toHaveClass("ib-badge--success");
    rerender(
      <DynamicToken {...defaultProps} status="expired" statusLabel="Expirado" />
    );
    expect(screen.getByText("Expirado")).toHaveClass("ib-badge--danger");
  });

  it("forwards its ref, native attributes, and consumer class", () => {
    const ref = createRef<HTMLElement>();
    render(
      <DynamicToken
        {...defaultProps}
        className="consumer-token"
        data-flow="transfer"
        ref={ref}
        title="Autenticación"
      />
    );

    expect(ref.current).toHaveClass("ib-dynamic-token", "consumer-token");
    expect(ref.current).toHaveAttribute("data-flow", "transfer");
    expect(ref.current).toHaveAttribute("title", "Autenticación");
  });

  it("invokes the resend callback once and honors disabled behavior", () => {
    const onResend = vi.fn();
    const { rerender } = render(
      <DynamicToken {...defaultProps} onResend={onResend} />
    );
    const resend = screen.getByRole("button", { name: "Reenviar código" });

    fireEvent.click(resend);
    expect(onResend).toHaveBeenCalledTimes(1);

    rerender(
      <DynamicToken {...defaultProps} onResend={onResend} resendDisabled />
    );
    expect(resend).toBeDisabled();
    fireEvent.click(resend);
    expect(onResend).toHaveBeenCalledTimes(1);
  });

  it("keeps decorative content hidden and timer updates non-live", () => {
    const { container } = render(<DynamicToken {...defaultProps} />);

    expect(container.querySelector(".ib-dynamic-token__lock")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(
      container.querySelector(".ib-dynamic-token__timer-icon")
    ).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("timer")).toHaveAttribute("aria-live", "off");
  });

  it("does not start an internal countdown", () => {
    vi.useFakeTimers();
    render(<DynamicToken {...defaultProps} />);

    vi.advanceTimersByTime(5000);
    expect(screen.getByText("00:08s")).toBeVisible();
  });
});
