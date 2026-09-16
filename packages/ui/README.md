# @intibank/ui

Accessible React components for the Intibank design system. The package ships
compiled JavaScript, TypeScript declarations, and ready-to-use CSS, so consumer
applications do not need Tailwind CSS.

## Install

```sh
pnpm add @intibank/ui react react-dom
```

React and React DOM 18.2 or 19 are peer dependencies.

Import the stylesheet once near the root of the application, then consume only
the public package exports:

```tsx
import { Button } from "@intibank/ui";
import "@intibank/ui/styles.css";

export function TransferAction() {
  return <Button>Transferir</Button>;
}
```

## Button

`Button` is built on Base UI and supports the institutional variants `primary`,
`secondary`, `hairline`, `danger`, and `soft`. The default is `primary`.
Compatibility aliases remain available: `solid` maps to `primary`, while
`outline` and `ghost` map to `hairline`.

All variants support `sm`, `md`, and `lg` sizes, native button props, refs,
disabled state, icons as children, and custom classes. Its safe default type is
`button`. Hover and keyboard focus styles follow the selected variant; disabled
buttons use a shared warm neutral treatment.

```tsx
import { Button } from "@intibank/ui";
import { ArrowRightIcon } from "@intibank/ui/icons";

export function ContinueButton() {
  return (
    <Button size="lg" variant="secondary">
      Continuar
      <ArrowRightIcon aria-hidden="true" />
    </Button>
  );
}
```

An icon accompanying equivalent visible text is decorative and should use
`aria-hidden="true"`. An icon-only button must instead receive an accessible name
on the button, normally with `aria-label`, while the icon remains hidden from the
accessibility tree.

The curated `@intibank/ui/icons` entry point exports `ArrowRightIcon`,
`CheckIcon`, `PlusIcon`, and `XIcon`. Applications that need the wider Phosphor
catalog should install `@phosphor-icons/react` directly.

## TextField

`TextField` is a composed single-line field with an associated label, native
input behavior, helper or error messaging, and optional presentational
adornments. It fills the available width; constrain its container when a shorter
field is needed.

```tsx
import { TextField } from "@intibank/ui";

export function TransferDetails() {
  return (
    <>
      <TextField
        defaultValue="Pago de Honorarios Proyecto Sol Andino"
        label="Mensaje o Motivo"
        optional
      />
      <TextField
        inputMode="decimal"
        label="Monto"
        name="amount"
        startAdornment="S/."
      />
    </>
  );
}
```

`errorMessage` marks the field invalid and replaces `helperText`. Use `invalid`
when an external validator owns the invalid state without message copy. Native
properties such as `required`, `disabled`, `readOnly`, `name`, `autoComplete`,
`value`, and `onChange` pass through to the input, and its ref is forwarded.
`className` extends the input while `fieldClassName` extends the outer field.

`startAdornment` and `endAdornment` are for non-interactive content such as
currency symbols and units. They are hidden from the accessibility tree and do
not become part of the input value. Controls such as clear or password-reveal
buttons should not be placed in these slots.

## MoneyField

`MoneyField` is the specialized control for monetary entry. It defaults to PEN
with the `es-PE` locale, accepts an unformatted decimal string while editing, and
applies localized grouping and currency precision when focus leaves the field.

```tsx
import { MoneyField } from "@intibank/ui";
import { useState } from "react";

export function TransferAmount() {
  const [amount, setAmount] = useState("1250.50");

  return (
    <MoneyField
      currency="PEN"
      helperText="Monto disponible para transferir"
      label="Monto"
      locale="es-PE"
      name="amount"
      onValueChange={setAmount}
      value={amount}
    />
  );
}
```

`value`, `defaultValue`, and `onValueChange` use ASCII decimal strings without
currency symbols or grouping separators. A draft may temporarily end in a
decimal separator while it is focused; blur normalizes it to the currency's
fraction precision. Controlled consumers must accept `onValueChange` updates,
including the normalized blur value. Use `allowNegative` only when the product
flow accepts negative amounts.

When `name` is present, MoneyField submits a hidden canonical value, so FormData
receives `1250.50` instead of the localized `1,250.50`. The visible currency
symbol is presentational and the ISO code is included in the accessible name.
Formatting does not perform arithmetic, currency conversion, balance validation,
or rounding of excessive fractional input; domain validation remains the
consumer's responsibility through `invalid` and `errorMessage`.

MoneyField owns `type`, `inputMode`, native `onChange`, and its adornments. Other
TextField behavior such as labels, helper/error messages, refs, classes,
`disabled`, `readOnly`, `required`, focus, and autocomplete remains available.

## Themes and style overrides

Semantic CSS custom properties are the supported palette API. Override them
globally or on a subtree without recompiling the package:

```css
.nightfall-theme {
  --intibank-button-primary-background: #1e1b4b;
  --intibank-button-primary-foreground: #ffffff;
  --intibank-button-primary-border: #1e1b4b;
  --intibank-button-primary-hover-background: #312e81;
  --intibank-button-primary-focus: #f59e0b;
}
```

Each canonical variant exposes `--intibank-button-<variant>-background`,
`-foreground`, `-border`, `-hover-background`, and `-focus` variables. Replace
`<variant>` with `primary`, `secondary`, `hairline`, `danger`, or `soft`.
Disabled buttons use these shared variables:

```css
--intibank-button-disabled-background: #f5f0ed;
--intibank-button-disabled-foreground: #aaa6a3;
--intibank-button-disabled-border: #f5f0ed;
```

TextField and MoneyField expose the following semantic variables:

```css
--intibank-text-field-label: #2e2a26;
--intibank-text-field-background: #ffffff;
--intibank-text-field-foreground: #2e2a26;
--intibank-text-field-placeholder: #78716c;
--intibank-text-field-border: #e7e5e4;
--intibank-text-field-hover-border: #a8a29e;
--intibank-text-field-focus: #f59e0b;
--intibank-text-field-invalid: #dc2626;
--intibank-text-field-disabled-background: #f5f0ed;
--intibank-text-field-disabled-foreground: #aaa6a3;
--intibank-text-field-disabled-border: #e7e5e4;
--intibank-text-field-readonly-background: #fafaf9;
--intibank-text-field-readonly-border: #d6d3d1;
--intibank-text-field-supporting: #78716c;
--intibank-text-field-adornment: #78716c;
```

For structural exceptions, pass `className` and load the consumer stylesheet
after `@intibank/ui/styles.css`. Intibank selectors use the `ib-` prefix and the
distributed stylesheet does not include a global reset.

## Fonts

The styles prefer Hanken Grotesk but never download it. Applications can
self-host the font, install `@fontsource-variable/hanken-grotesk`, or use the
provided system font fallback.

## Public exports

- `@intibank/ui`: `Button`, `TextField`, `MoneyField`, and their public TypeScript types.
- `@intibank/ui/icons`: curated Phosphor icon components.
- `@intibank/ui/styles.css`: compiled tokens and component styles.

Licensed under the [MIT License](./LICENSE).
