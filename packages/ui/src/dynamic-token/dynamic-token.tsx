import { LockKeyIcon } from "@phosphor-icons/react/dist/csr/LockKey";
import { TimerIcon } from "@phosphor-icons/react/dist/csr/Timer";
import type {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
} from "react";
import { forwardRef, useId } from "react";
import { Badge } from "../badge/badge";

export type DynamicTokenStatus = "active" | "expired";

export interface DynamicTokenProps
  extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
  /** Exactly six ASCII digits supplied and rotated by the consumer. */
  code: string;
  /** Localized guidance shown below the heading. */
  description: ReactNode;
  /** Localized label shown before the remaining time. */
  expiryLabel: ReactNode;
  /** Localized card heading. */
  heading: ReactNode;
  /** Invoked when the user requests another code. */
  onResend: MouseEventHandler<HTMLButtonElement>;
  /** Controlled remaining validity in seconds. */
  remainingSeconds: number;
  /** Disables the resend control while the consumer handles cooldown or work. */
  resendDisabled?: boolean;
  /** Localized resend action label. */
  resendLabel: ReactNode;
  /** Selects the semantic status treatment. */
  status: DynamicTokenStatus;
  /** Localized text displayed inside the status Badge. */
  statusLabel: ReactNode;
}

function formatRemainingSeconds(value: number) {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  const minutesPart = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secondsPart = (seconds % 60).toString().padStart(2, "0");

  return `${minutesPart}:${secondsPart}s`;
}

// biome-ignore lint/suspicious/noReactForwardRef: React 18 remains in the supported peer range.
export const DynamicToken = forwardRef<HTMLElement, DynamicTokenProps>(
  function DynamicTokenImpl(
    {
      "aria-labelledby": ariaLabelledBy,
      className,
      code,
      description,
      expiryLabel,
      heading,
      onResend,
      remainingSeconds,
      resendDisabled = false,
      resendLabel,
      status,
      statusLabel,
      ...props
    },
    ref
  ) {
    const generatedHeadingId = useId();
    const digits = Array.from(code);
    const classes = ["ib-dynamic-token", className].filter(Boolean).join(" ");
    const formattedTime = formatRemainingSeconds(remainingSeconds);
    const badgeVariant = status === "active" ? "success" : "danger";

    return (
      <section
        {...props}
        aria-labelledby={ariaLabelledBy ?? generatedHeadingId}
        className={classes}
        ref={ref}
      >
        <header className="ib-dynamic-token__header">
          <div className="ib-dynamic-token__identity">
            <LockKeyIcon
              aria-hidden="true"
              className="ib-dynamic-token__lock"
              weight="regular"
            />
            <h2 className="ib-dynamic-token__heading" id={generatedHeadingId}>
              {heading}
            </h2>
          </div>
          <Badge variant={badgeVariant}>{statusLabel}</Badge>
        </header>

        <p className="ib-dynamic-token__description">{description}</p>

        <div className="ib-dynamic-token__code">
          <span className="ib-visually-hidden">{digits.join(" ")}</span>
          <div aria-hidden="true" className="ib-dynamic-token__visual-code">
            <div className="ib-dynamic-token__group">
              <span className="ib-dynamic-token__digit">{digits[0]}</span>
              <span className="ib-dynamic-token__digit">{digits[1]}</span>
              <span className="ib-dynamic-token__digit">{digits[2]}</span>
            </div>
            <span className="ib-dynamic-token__separator">-</span>
            <div className="ib-dynamic-token__group">
              <span className="ib-dynamic-token__digit">{digits[3]}</span>
              <span className="ib-dynamic-token__digit">{digits[4]}</span>
              <span className="ib-dynamic-token__digit">{digits[5]}</span>
            </div>
          </div>
        </div>

        <footer className="ib-dynamic-token__footer">
          <div aria-live="off" className="ib-dynamic-token__timer" role="timer">
            <TimerIcon
              aria-hidden="true"
              className="ib-dynamic-token__timer-icon"
              weight="regular"
            />
            <span>{expiryLabel}</span>
            <strong className="ib-dynamic-token__time">{formattedTime}</strong>
          </div>
          <button
            className="ib-dynamic-token__resend"
            disabled={resendDisabled}
            onClick={onResend}
            type="button"
          >
            {resendLabel}
          </button>
        </footer>
      </section>
    );
  }
);
