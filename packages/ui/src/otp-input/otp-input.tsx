import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  SyntheticEvent,
} from "react";
import { forwardRef, useId, useState } from "react";

const OTP_LENGTH = 6;
const OTP_POSITIONS = [
  "position-1",
  "position-2",
  "position-3",
  "position-4",
  "position-5",
  "position-6",
] as const;
const ASCII_DIGIT_PATTERN = /[0-9]/gu;

type OwnedInputProps =
  | "children"
  | "defaultValue"
  | "maxLength"
  | "onChange"
  | "type"
  | "value";

export type OtpInputValueChange = (value: string) => void;

export interface OtpInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, OwnedInputProps> {
  /** Localized validation message. Replaces helper text when present. */
  errorMessage?: ReactNode;
  /** Appended after the stable Intibank field container class. */
  fieldClassName?: string;
  /** Localized supporting copy shown while the field is valid. */
  helperText?: ReactNode;
  /** Controls consumer-managed invalid state. */
  invalid?: boolean;
  /** Visible label associated with the one-time-code field. */
  label: ReactNode;
  /** Reports a canonical value containing at most six ASCII digits. */
  onValueChange: OtpInputValueChange;
  /** Controlled value containing zero through six ASCII digits. */
  value: string;
}

function normalizeOtpValue(value: string) {
  return (value.match(ASCII_DIGIT_PATTERN) ?? []).join("").slice(0, OTP_LENGTH);
}

interface OtpSelection {
  end: number;
  start: number;
}

function getSelection(
  input: HTMLInputElement,
  fallback: number,
  maximum = Math.min(input.value.length, OTP_LENGTH)
): OtpSelection {
  return {
    end: Math.min(input.selectionEnd ?? fallback, maximum),
    start: Math.min(input.selectionStart ?? fallback, maximum),
  };
}

// biome-ignore lint/suspicious/noReactForwardRef: React 18 remains in the supported peer range.
export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  function OtpInputImpl(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      autoComplete = "one-time-code",
      className,
      disabled,
      errorMessage,
      fieldClassName,
      helperText,
      id,
      inputMode = "numeric",
      invalid = false,
      label,
      onBlur,
      onClick,
      onFocus,
      onKeyUp,
      onSelect,
      onValueChange,
      pattern = "[0-9]*",
      readOnly,
      required,
      value,
      ...inputProps
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;
    const canonicalValue = normalizeOtpValue(value);
    const hasNativeInvalidState =
      ariaInvalid === true ||
      ariaInvalid === "true" ||
      ariaInvalid === "grammar" ||
      ariaInvalid === "spelling";
    const isInvalid =
      invalid || errorMessage !== undefined || hasNativeInvalidState;
    const message = isInvalid ? errorMessage : helperText;
    const describedBy = [
      ariaDescribedBy,
      message === undefined ? null : messageId,
    ]
      .filter(Boolean)
      .join(" ");
    const fieldClasses = ["ib-otp-input", fieldClassName]
      .filter(Boolean)
      .join(" ");
    const inputClasses = ["ib-otp-input__input", className]
      .filter(Boolean)
      .join(" ");
    const messageClasses = [
      isInvalid ? "ib-otp-input__error" : null,
      "ib-otp-input__message",
    ]
      .filter(Boolean)
      .join(" ");
    const [isFocused, setIsFocused] = useState(false);
    const [selection, setSelection] = useState<OtpSelection>({
      end: 0,
      start: 0,
    });
    const selectionStart = Math.min(selection.start, selection.end);
    const selectionEnd = Math.max(selection.start, selection.end);
    const hasSelection = selectionStart !== selectionEnd;
    const activeIndex = Math.min(selectionStart, OTP_LENGTH - 1);
    const hasDetailedInvalidState =
      ariaInvalid === "grammar" || ariaInvalid === "spelling";
    const resolvedAriaInvalid = hasDetailedInvalidState
      ? ariaInvalid
      : isInvalid || ariaInvalid;

    const updateSelection = (input: HTMLInputElement) => {
      setSelection(getSelection(input, canonicalValue.length));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = normalizeOtpValue(event.currentTarget.value);
      setSelection(
        getSelection(event.currentTarget, nextValue.length, nextValue.length)
      );
      onValueChange(nextValue);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      updateSelection(event.currentTarget);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleSelect = (event: SyntheticEvent<HTMLInputElement>) => {
      updateSelection(event.currentTarget);
      onSelect?.(event);
    };

    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
      updateSelection(event.currentTarget);
      onClick?.(event);
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
      updateSelection(event.currentTarget);
      onKeyUp?.(event);
    };

    return (
      <div
        className={fieldClasses}
        data-complete={canonicalValue.length === OTP_LENGTH ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        data-invalid={isInvalid ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
      >
        <label className="ib-otp-input__label" htmlFor={inputId}>
          {label}
        </label>
        <div className="ib-otp-input__control">
          <input
            {...inputProps}
            aria-describedby={describedBy || undefined}
            aria-invalid={resolvedAriaInvalid}
            autoCapitalize="off"
            autoComplete={autoComplete}
            className={inputClasses}
            disabled={disabled}
            id={inputId}
            inputMode={inputMode}
            onBlur={handleBlur}
            onChange={handleChange}
            onClick={handleClick}
            onFocus={handleFocus}
            onKeyUp={handleKeyUp}
            onSelect={handleSelect}
            pattern={pattern}
            readOnly={readOnly}
            ref={ref}
            required={required}
            spellCheck={false}
            type="text"
            value={canonicalValue}
          />
          <div aria-hidden="true" className="ib-otp-input__cells">
            {OTP_POSITIONS.map((position, index) => (
              <span
                className="ib-otp-input__cell"
                data-active={
                  isFocused && !hasSelection && index === activeIndex
                    ? ""
                    : undefined
                }
                data-filled={
                  canonicalValue[index] === undefined ? undefined : ""
                }
                data-selected={
                  isFocused &&
                  hasSelection &&
                  index >= selectionStart &&
                  index < selectionEnd
                    ? ""
                    : undefined
                }
                key={position}
              >
                {canonicalValue[index] ?? ""}
              </span>
            ))}
          </div>
        </div>
        {message === undefined ? null : (
          <p
            aria-atomic={isInvalid ? "true" : undefined}
            aria-live={isInvalid ? "polite" : undefined}
            className={messageClasses}
            id={messageId}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);
