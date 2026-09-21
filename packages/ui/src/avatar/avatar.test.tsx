import "@testing-library/jest-dom/vitest";
import { Avatar } from "@intibank/ui";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it } from "vitest";

afterEach(cleanup);

describe("Avatar", () => {
  it("renders initials with the medium size by default", () => {
    render(<Avatar initials="ME" />);

    const initials = screen.getByText("ME");
    expect(initials.parentElement).toHaveClass("ib-avatar", "ib-avatar--md");
    expect(initials).not.toHaveAttribute("aria-hidden");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"] as const)("applies the %s size class", (size) => {
    render(<Avatar initials="ME" size={size} />);

    expect(screen.getByText("ME").parentElement).toHaveClass(
      `ib-avatar--${size}`
    );
  });

  it("forwards its ref, native attributes, and consumer class", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Avatar
        className="consumer-avatar"
        data-account-id="primary"
        initials="ME"
        ref={ref}
        title="Cuenta principal"
      />
    );

    expect(ref.current).toHaveClass("ib-avatar", "consumer-avatar");
    expect(ref.current).toHaveAttribute("data-account-id", "primary");
    expect(ref.current).toHaveAttribute("title", "Cuenta principal");
  });

  it("uses a supplied accessible identity without announcing initials twice", () => {
    render(<Avatar aria-label="María Elena" initials="ME" />);

    const avatar = screen.getByRole("img", { name: "María Elena" });
    expect(avatar).toHaveClass("ib-avatar--md");
    expect(screen.getByText("ME")).toHaveAttribute("aria-hidden", "true");
  });
});
