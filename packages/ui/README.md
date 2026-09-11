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

For structural exceptions, pass `className` and load the consumer stylesheet
after `@intibank/ui/styles.css`. Intibank selectors use the `ib-` prefix and the
distributed stylesheet does not include a global reset.

## Fonts

The styles prefer Hanken Grotesk but never download it. Applications can
self-host the font, install `@fontsource-variable/hanken-grotesk`, or use the
provided system font fallback.

## Public exports

- `@intibank/ui`: `Button` and its public TypeScript types.
- `@intibank/ui/icons`: curated Phosphor icon components.
- `@intibank/ui/styles.css`: compiled tokens and component styles.

Licensed under the [MIT License](./LICENSE).
