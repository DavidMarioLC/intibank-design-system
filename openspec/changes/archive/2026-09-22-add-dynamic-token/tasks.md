## 1. Public API and visual treatment

- [x] 1.1 Add the ref-forwarding `DynamicToken` module with the controlled
  six-digit code, remaining seconds, active/expired status, localized content,
  resend callback and disabled state, native section attributes, stable
  consumer classes, and public package exports without timer or security side
  effects.
- [x] 1.2 Implement the semantic card structure, existing Badge composition,
  internal decorative lock and timer icons, one accessible digit-spaced code
  value, hidden visual cells and separator, `MM:SSs` formatting and clamping,
  non-live timer semantics, and native resend-button behavior.
- [x] 1.3 Add documented `--intibank-dynamic-token-*` variables and prefixed
  component styles for the desktop reference, compact container reflow, 48px
  resend target, focus and disabled states, and forced-colors behavior without a
  global reset.
- [x] 1.4 Record the normalized card, heading, guidance, digit-cell, timer,
  action, responsive, and accessibility treatments from the supplied reference
  in `DESIGN.md`.

## 2. Tests and Storybook

- [x] 2.1 Add public-import unit tests for controlled updates, digit order,
  accessible single-value output, time formatting and clamping, active/expired
  Badge mapping, refs, native attributes, classes, resend and disabled behavior,
  decorative content, and absence of countdown side effects.
- [x] 2.2 Add public-export Storybook stories for the supplied active state,
  expired and resend-disabled states, a narrow container, and semantic theme
  overrides with interaction assertions.
- [x] 2.3 Run DynamicToken unit tests and Storybook interaction/accessibility
  tests, visually compare the active story with the supplied reference at wide
  and compact widths, and correct any hierarchy, contrast, focus, spacing,
  ordering, or overflow failures.

## 3. Consumer guidance and package verification

- [x] 3.1 Document DynamicToken usage, its controlled security boundary,
  localization and accessibility guidance, status and resend behavior,
  six-digit input contract, and every semantic DynamicToken variable in the
  package README.
- [x] 3.2 Update the Tailwind-free example and packed temporary consumer to
  import, render, and build DynamicToken through the public package API and
  compiled stylesheet, including CommonJS, declaration, dependency, and CSS
  checks.
- [x] 3.3 Run formatting/static checks, strict OpenSpec validation, type
  checking, the complete test suite, production builds, package installation,
  and the packed-package no-Tailwind verification.
