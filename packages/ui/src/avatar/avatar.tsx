import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps
  extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  /** One or two initials displayed inside the identity marker. */
  initials: string;
  /** Square dimensions and proportional typography. Defaults to `md`. */
  size?: AvatarSize;
}

// biome-ignore lint/suspicious/noReactForwardRef: React 18 remains in the supported peer range.
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  function AvatarImpl(
    {
      "aria-label": ariaLabel,
      className,
      initials,
      role,
      size = "md",
      ...props
    },
    ref
  ) {
    const hasAccessibleLabel = Boolean(ariaLabel);
    const accessibilityProps = hasAccessibleLabel
      ? { "aria-label": ariaLabel, role: "img" as const }
      : { role };
    const classes = ["ib-avatar", `ib-avatar--${size}`, className]
      .filter(Boolean)
      .join(" ");

    return (
      <span {...props} {...accessibilityProps} className={classes} ref={ref}>
        <span
          aria-hidden={hasAccessibleLabel ? true : undefined}
          className="ib-avatar__initials"
        >
          {initials}
        </span>
      </span>
    );
  }
);
