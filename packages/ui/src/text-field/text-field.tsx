import { Field } from "@base-ui/react/field";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { forwardRef, useId } from "react";

export interface TextFieldProps
  extends Omit<ComponentPropsWithoutRef<"input">, "children"> {
  /** Non-interactive content rendered after the editable value. */
  endAdornment?: ReactNode;
  /** Validation message. When present, it replaces helper text and marks the field invalid. */
  errorMessage?: ReactNode;
  /** Appended after the stable Intibank field container class. */
  fieldClassName?: string;
  /** Supporting copy shown while the field is valid. */
  helperText?: ReactNode;
  /** Controls external invalid state when validation is managed elsewhere. */
  invalid?: boolean;
  /** Visible label associated with the input. */
  label: ReactNode;
  /** Adds the localized `(Opcional)` marker without changing native required semantics. */
  optional?: boolean;
  /** Non-interactive content rendered before the editable value. */
  startAdornment?: ReactNode;
}

// biome-ignore lint/suspicious/noReactForwardRef: React 18 remains in the supported peer range.
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextFieldImpl(
    {
      className,
      disabled,
      endAdornment,
      errorMessage,
      fieldClassName,
      helperText,
      id,
      invalid = false,
      label,
      optional = false,
      readOnly,
      startAdornment,
      ...inputProps
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isInvalid = invalid || errorMessage !== undefined;
    const fieldClasses = ["ib-text-field", fieldClassName]
      .filter(Boolean)
      .join(" ");
    const inputClasses = ["ib-text-field__input", className]
      .filter(Boolean)
      .join(" ");
    const startAdornmentElement =
      startAdornment === undefined ? null : (
        <span aria-hidden="true" className="ib-text-field__adornment">
          {startAdornment}
        </span>
      );
    const endAdornmentElement =
      endAdornment === undefined ? null : (
        <span aria-hidden="true" className="ib-text-field__adornment">
          {endAdornment}
        </span>
      );
    let message: ReactNode = null;
    if (isInvalid && errorMessage !== undefined) {
      message = (
        <Field.Error
          className="ib-text-field__message ib-text-field__error"
          match
        >
          {errorMessage}
        </Field.Error>
      );
    } else if (!isInvalid && helperText !== undefined) {
      message = (
        <Field.Description className="ib-text-field__message">
          {helperText}
        </Field.Description>
      );
    }

    return (
      <Field.Root
        className={fieldClasses}
        data-readonly={readOnly ? "" : undefined}
        disabled={disabled}
        invalid={isInvalid}
      >
        <Field.Label className="ib-text-field__label" htmlFor={inputId}>
          {label}
          {optional ? (
            <>
              {" "}
              <span className="ib-text-field__optional">(Opcional)</span>
            </>
          ) : null}
        </Field.Label>
        <label className="ib-text-field__control" htmlFor={inputId}>
          {startAdornmentElement}
          <Field.Control
            {...inputProps}
            className={inputClasses}
            disabled={disabled}
            id={inputId}
            readOnly={readOnly}
            ref={ref as Ref<HTMLElement>}
          />
          {endAdornmentElement}
        </label>
        {message}
      </Field.Root>
    );
  }
);
