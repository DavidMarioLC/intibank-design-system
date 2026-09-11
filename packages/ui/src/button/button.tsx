import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "hairline"
  | "danger"
  | "soft"
  | "solid"
  | "outline"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type CanonicalButtonVariant = Exclude<
  ButtonVariant,
  "solid" | "outline" | "ghost"
>;

const canonicalVariant: Record<ButtonVariant, CanonicalButtonVariant> = {
  danger: "danger",
  ghost: "hairline",
  hairline: "hairline",
  outline: "hairline",
  primary: "primary",
  secondary: "secondary",
  soft: "soft",
  solid: "primary",
};

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseButton>, "className"> {
  /** Appended after the stable Intibank classes. */
  className?: string;
  /** Control height: 40px, 48px, or 56px. */
  size?: ButtonSize;
  /** Semantic visual treatment. Defaults to `primary`; legacy values remain aliases. */
  variant?: ButtonVariant;
}

// biome-ignore lint/suspicious/noReactForwardRef: React 18 remains in the supported peer range.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonImpl(
    { className, size = "md", type = "button", variant = "primary", ...props },
    ref
  ) {
    const resolvedVariant = canonicalVariant[variant];
    const classes = [
      "ib-button",
      `ib-button--${resolvedVariant}`,
      resolvedVariant === variant ? undefined : `ib-button--${variant}`,
      `ib-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <BaseButton {...props} className={classes} ref={ref} type={type} />;
  }
);
