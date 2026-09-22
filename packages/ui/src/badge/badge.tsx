import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

export type BadgeVariant = "success" | "warning" | "danger";

export interface BadgeProps
  extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  /** Visible status label supplied by the consumer. */
  children: ReactNode;
  /** Semantic visual treatment for the status. */
  variant: BadgeVariant;
}

// biome-ignore lint/suspicious/noReactForwardRef: React 18 remains in the supported peer range.
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function BadgeImpl(
  { children, className, variant, ...props },
  ref
) {
  const classes = ["ib-badge", `ib-badge--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span {...props} className={classes} ref={ref}>
      <span aria-hidden="true" className="ib-badge__indicator" />
      {children}
    </span>
  );
});
