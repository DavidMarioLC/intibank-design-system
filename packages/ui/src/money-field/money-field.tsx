import type { ChangeEvent, FocusEvent, Ref } from "react";
import { forwardRef, useMemo, useState } from "react";
import { TextField, type TextFieldProps } from "../text-field/text-field";

const NUMERIC_PART_TYPES = new Set<Intl.NumberFormatPartTypes>([
  "decimal",
  "fraction",
  "group",
  "integer",
  "minusSign",
  "plusSign",
]);
const MONEY_DRAFT_PATTERN = /^\d*(?:\.\d*)?$/;
const NEGATIVE_MONEY_DRAFT_PATTERN = /^-?\d*(?:\.\d*)?$/;
const LEADING_ZERO_PATTERN = /^0+(?=\d)/u;
const ZERO_PATTERN = /^0+$/u;
const WHITESPACE_PATTERN = /\s/gu;

interface MoneyFormatMetadata {
  currency: string;
  currencyBeforeValue: boolean;
  currencySymbol: string;
  decimalSeparator: string;
  formatter: Intl.NumberFormat;
  fractionDigits: number;
  groupSeparators: string[];
  minusSign: string;
}

type OwnedTextFieldProps =
  | "defaultValue"
  | "endAdornment"
  | "inputMode"
  | "max"
  | "min"
  | "name"
  | "onChange"
  | "startAdornment"
  | "step"
  | "type"
  | "value";

export type MoneyFieldValueChange = (value: string) => void;

export interface MoneyFieldProps
  extends Omit<TextFieldProps, OwnedTextFieldProps> {
  /** Allows a leading negative sign. Disabled by default. */
  allowNegative?: boolean;
  /** ISO 4217 currency code. Defaults to `PEN`. */
  currency?: string;
  /** Initial decimal draft for uncontrolled usage. */
  defaultValue?: string;
  /** Locale used for separators and currency placement. Defaults to `es-PE`. */
  locale?: string;
  /** Name used by the canonical hidden form input. */
  name?: string;
  /** Reports the unformatted ASCII decimal draft. */
  onValueChange?: MoneyFieldValueChange;
  /** Controlled unformatted ASCII decimal draft. */
  value?: string;
}

function removeToken(value: string, token: string): string {
  return token === "" ? value : value.split(token).join("");
}

function createMoneyFormatMetadata(
  locale: string,
  currency: string
): MoneyFormatMetadata {
  const normalizedCurrency = currency.toUpperCase();
  const formatter = new Intl.NumberFormat(locale, {
    currency: normalizedCurrency,
    currencyDisplay: "narrowSymbol",
    style: "currency",
  });
  const sampleParts = formatter.formatToParts(-12_345.6);
  const currencyIndex = sampleParts.findIndex(
    (part) => part.type === "currency"
  );
  const firstNumericIndex = sampleParts.findIndex(
    (part) => part.type === "integer"
  );
  const decimalFormatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
    useGrouping: false,
  });
  const decimalSeparator =
    decimalFormatter.formatToParts(1.1).find((part) => part.type === "decimal")
      ?.value ?? ".";
  const resolvedOptions = formatter.resolvedOptions();

  return {
    currency: normalizedCurrency,
    currencyBeforeValue:
      currencyIndex !== -1 &&
      firstNumericIndex !== -1 &&
      currencyIndex < firstNumericIndex,
    currencySymbol:
      sampleParts.find((part) => part.type === "currency")?.value ??
      normalizedCurrency,
    decimalSeparator,
    formatter,
    fractionDigits:
      resolvedOptions.maximumFractionDigits ??
      resolvedOptions.minimumFractionDigits ??
      2,
    groupSeparators: [
      ...new Set(
        sampleParts
          .filter((part) => part.type === "group")
          .map((part) => part.value)
      ),
    ],
    minusSign:
      sampleParts.find((part) => part.type === "minusSign")?.value ?? "-",
  };
}

function parseMoneyDraft(
  input: string,
  metadata: MoneyFormatMetadata,
  allowNegative: boolean
): string | null {
  let candidate = input.trim();
  candidate = removeToken(candidate, metadata.currencySymbol);
  candidate = candidate.replaceAll(metadata.currency, "");
  candidate = candidate.replaceAll(metadata.currency.toLowerCase(), "");
  candidate = candidate.replaceAll(metadata.minusSign, "-");
  candidate = candidate.replace(WHITESPACE_PATTERN, "");

  const hasLocaleDecimal =
    metadata.decimalSeparator !== "." &&
    candidate.includes(metadata.decimalSeparator);
  const asciiDecimalIndex = candidate.indexOf(".");
  const usesAsciiDecimal =
    metadata.decimalSeparator !== "." &&
    !hasLocaleDecimal &&
    asciiDecimalIndex !== -1 &&
    asciiDecimalIndex === candidate.lastIndexOf(".") &&
    candidate.length - asciiDecimalIndex - 1 <= metadata.fractionDigits;

  for (const separator of metadata.groupSeparators) {
    if (!(separator === "." && usesAsciiDecimal)) {
      candidate = removeToken(candidate, separator);
    }
  }
  if (hasLocaleDecimal) {
    candidate = candidate.replaceAll(metadata.decimalSeparator, ".");
  }

  if (candidate === ".") {
    candidate = "0.";
  } else if (candidate === "-.") {
    candidate = "-0.";
  }

  const draftPattern = allowNegative
    ? NEGATIVE_MONEY_DRAFT_PATTERN
    : MONEY_DRAFT_PATTERN;
  if (!draftPattern.test(candidate)) {
    return null;
  }
  if (!allowNegative && candidate.startsWith("-")) {
    return null;
  }

  const fraction = candidate.split(".")[1] ?? "";
  if (fraction.length > metadata.fractionDigits) {
    return null;
  }

  return candidate;
}

function normalizeMoneyDraft(draft: string, fractionDigits: number): string {
  if (draft === "" || draft === "-" || draft === "." || draft === "-.") {
    return "";
  }

  const isNegative = draft.startsWith("-");
  const unsignedDraft = isNegative ? draft.slice(1) : draft;
  const [rawInteger = "", rawFraction = ""] = unsignedDraft.split(".");
  const integer = rawInteger.replace(LEADING_ZERO_PATTERN, "") || "0";
  const fraction = rawFraction.padEnd(fractionDigits, "0");
  const isZero =
    ZERO_PATTERN.test(integer) &&
    (fraction === "" || ZERO_PATTERN.test(fraction));
  const sign = isNegative && !isZero ? "-" : "";

  return fractionDigits === 0
    ? `${sign}${integer}`
    : `${sign}${integer}.${fraction}`;
}

function localizeMoneyDraft(draft: string, decimalSeparator: string): string {
  return decimalSeparator === "."
    ? draft
    : draft.replace(".", decimalSeparator);
}

function formatMoneyValue(value: string, formatter: Intl.NumberFormat): string {
  if (value === "") {
    return "";
  }

  return formatter
    .formatToParts(value as unknown as number)
    .filter((part) => NUMERIC_PART_TYPES.has(part.type))
    .map((part) => part.value)
    .join("");
}

// biome-ignore lint/suspicious/noReactForwardRef: React 18 remains in the supported peer range.
export const MoneyField = forwardRef<HTMLInputElement, MoneyFieldProps>(
  function MoneyFieldImpl(
    {
      allowNegative = false,
      className,
      currency = "PEN",
      defaultValue = "",
      disabled,
      fieldClassName,
      form,
      label,
      locale = "es-PE",
      name,
      onBlur,
      onFocus,
      onValueChange,
      readOnly,
      value,
      ...textFieldProps
    },
    ref
  ) {
    const metadata = useMemo(
      () => createMoneyFormatMetadata(locale, currency),
      [currency, locale]
    );
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const isControlled = value !== undefined;
    const draft = value ?? uncontrolledValue;
    const normalizedValue = normalizeMoneyDraft(draft, metadata.fractionDigits);
    const visibleValue =
      isFocused && !readOnly
        ? localizeMoneyDraft(draft, metadata.decimalSeparator)
        : formatMoneyValue(normalizedValue, metadata.formatter);
    const moneyFieldClassName = ["ib-money-field", fieldClassName]
      .filter(Boolean)
      .join(" ");
    const moneyInputClassName = ["ib-money-field__input", className]
      .filter(Boolean)
      .join(" ");
    const accessibleLabel = (
      <>
        {label}{" "}
        <span className="ib-visually-hidden">({metadata.currency})</span>
      </>
    );
    const currencyAdornment = (
      <span className="ib-money-field__currency">
        {metadata.currencySymbol}
      </span>
    );

    const publishValue = (nextValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseMoneyDraft(
        event.currentTarget.value,
        metadata,
        allowNegative
      );
      if (nextValue === null) {
        event.currentTarget.value = localizeMoneyDraft(
          draft,
          metadata.decimalSeparator
        );
        return;
      }
      publishValue(nextValue);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (!readOnly && normalizedValue !== draft) {
        publishValue(normalizedValue);
      }
      setIsFocused(false);
      onBlur?.(event);
    };

    return (
      <>
        <TextField
          {...textFieldProps}
          className={moneyInputClassName}
          disabled={disabled}
          endAdornment={
            metadata.currencyBeforeValue ? undefined : currencyAdornment
          }
          fieldClassName={moneyFieldClassName}
          form={form}
          inputMode="decimal"
          label={accessibleLabel}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          readOnly={readOnly}
          ref={ref as Ref<HTMLInputElement>}
          startAdornment={
            metadata.currencyBeforeValue ? currencyAdornment : undefined
          }
          type="text"
          value={visibleValue}
        />
        {name ? (
          <input
            disabled={disabled}
            form={form}
            name={name}
            type="hidden"
            value={normalizedValue}
          />
        ) : null}
      </>
    );
  }
);
