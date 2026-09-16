## 1. Monetary value and public API

- [x] 1.1 Add locale metadata, decimal-draft parsing, blur normalization, and
  Intl-based display helpers that preserve string values, currency precision,
  symbol placement, paste cleanup, and negative-value policy.
- [x] 1.2 Implement the ref-forwarding MoneyField composition with PEN/es-PE
  defaults, controlled and uncontrolled value behavior, focus/blur display
  switching, consumer event composition, and the owned decimal input settings.
- [x] 1.3 Add canonical hidden-input form submission and export MoneyField,
  MoneyFieldProps, and its value-change contract from the package entry point.

## 2. Accessibility and institutional presentation

- [x] 2.1 Add presentational locale-aware currency adornments and visually hidden
  ISO currency context while preserving TextField label, message, invalid,
  disabled, read-only, required, and focus semantics.
- [x] 2.2 Add prefixed MoneyField styles for tabular numeric figures and accessible
  hidden copy while reusing existing TextField variables and state treatments.

## 3. Automated behavior and Storybook coverage

- [x] 3.1 Add focused unit tests for PEN defaults, alternate currencies and
  decimal separators, editing/blur formatting, paste cleanup, excessive
  precision, negative policy, empty values, controlled and uncontrolled use,
  callbacks, refs, classes, canonical FormData, and accessibility semantics.
- [x] 3.2 Add public-export Storybook stories for default PEN, alternate locale
  and currency, empty, invalid, disabled, read-only, focus, paste, and formatting
  interactions with axe coverage.
- [x] 3.3 Run MoneyField unit and Storybook interaction/accessibility tests and
  correct any parsing, focus, transition, or accessible-name failures.

## 4. Consumer guidance and delivery

- [x] 4.1 Document MoneyField's decimal-string contract, controlled and
  uncontrolled examples, blur formatting, form submission, currency/locale
  options, validation boundary, and accessibility behavior in the package README.
- [x] 4.2 Update the example application and packed Tailwind-free consumer to
  import and render MoneyField through the public API and compiled stylesheet.
- [x] 4.3 Extend package verification to require MoneyField declarations and
  compiled selectors, then verify package installation and the no-Tailwind build.
- [x] 4.4 Run formatting/static checks, OpenSpec validation, type checking, the
  complete unit and Storybook suites, and production builds.
