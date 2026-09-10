import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseButton>, "className"> {
  /** Appended after the stable Intibank classes. */
  className?: string;
  /** Control height: 40px, 48px, or 56px. */
  size?: ButtonSize;
  /** Visual treatment. Defaults to the primary amber action. */
  variant?: ButtonVariant;
}

// biome-ignore lint/suspicious/noReactForwardRef: React 18 remains in the supported peer range.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonImpl(
    { className, size = "md", type = "button", variant = "solid", ...props },
    ref
  ) {
    const classes = [
      "ib-button",
      `ib-button--${variant}`,
      `ib-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <BaseButton {...props} className={classes} ref={ref} type={type} />;
  }
);
