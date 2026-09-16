## Why

Intibank money-entry flows need a reusable field that accepts natural decimal
input while keeping application values free of currency symbols and grouping
separators. Extending the generic TextField with monetary parsing would blur its
contract, so the behavior belongs in a dedicated MoneyField.

## What Changes

- Add a public `MoneyField` component for controlled and uncontrolled decimal
  monetary values, with `es-PE` and `PEN` defaults and configurable locale and
  ISO 4217 currency.
- Keep editing predictable by accepting an ungrouped decimal draft while focused
  and applying localized currency presentation on blur, without live regrouping
  that moves the caret.
- Derive currency placement and fraction precision from `Intl.NumberFormat`,
  preserve a canonical decimal-string value for application logic and forms, and
  avoid binary floating-point conversion.
- Reuse TextField labeling, messaging, focus, disabled, read-only, and invalid
  behavior while adding tabular numeric styling and monetary accessibility
  guidance.
- Document and verify the component through unit tests, public-export Storybook
  stories, the example app, and the Tailwind-free packed consumer.

## Capabilities

### New Capabilities

- `money-field`: Monetary value API, locale-aware editing and presentation,
  currency metadata, form submission, accessibility, and visual states.

### Modified Capabilities

- `component-library-contract`: Extend the consumable public package contract to
  export MoneyField and its types through the existing JavaScript, declaration,
  and compiled-style entry points.
- `quality-and-delivery`: Include MoneyField stories, interaction tests, and the
  packed Tailwind-free consumer in the delivery checks.

## Impact

This change adds a colocated component, tests, and stories under
`packages/ui/src/money-field`, extends the package entry point, shared component
styles, README, example, and package verification script, and uses the existing
React, Base UI, and `Intl` runtime capabilities. It does not add a third-party
number-formatting dependency or change TextField's public behavior.
