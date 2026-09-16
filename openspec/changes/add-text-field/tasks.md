## 1. Public API and behavior

- [x] 1.1 Add the ref-forwarding `TextField` module using Base UI Field parts,
  native input props, generated label associations, and documented consumer class
  hooks.
- [x] 1.2 Implement optional labeling, helper/error precedence, external invalid
  state, and preserved disabled, read-only, required, name, autocomplete,
  controlled, and uncontrolled behavior.
- [x] 1.3 Add non-interactive leading and trailing adornments that remain outside
  the input value and accessible name, then export TextField and its public types
  from the package entry point.

## 2. Institutional styling and theming

- [x] 2.1 Add documented `--intibank-text-field-*` variables for label, surface,
  text, border, hover, focus, invalid, disabled, read-only, support text, and
  adornment treatments.
- [x] 2.2 Add prefixed component styles matching the approved 64px control,
  24px inset, 20px text, 12px radius, flexible width, and label spacing without
  introducing a global reset.
- [x] 2.3 Implement hover, focus-without-layout-shift, invalid, disabled,
  read-only, reduced-motion, and forced-colors behavior with accessible defaults.

## 3. Tests and Storybook

- [x] 3.1 Add focused unit tests for public props, refs, classes, label activation,
  stable generated associations, controlled input behavior, optional copy,
  helper/error semantics, adornments, invalid, disabled, and read-only behavior.
- [x] 3.2 Add public-export Storybook stories for default, optional, helper,
  currency prefix, suffix, invalid, disabled, read-only, focus, and interaction
  cases.
- [x] 3.3 Run TextField unit tests and Storybook interaction/accessibility tests,
  correcting any behavior or contrast failures.

## 4. Consumer guidance and delivery

- [x] 4.1 Document TextField usage, accessibility behavior, adornment limits, and
  all supported semantic variables in the package README.
- [x] 4.2 Update the Tailwind-free example and packed temporary consumer to import,
  render, and build TextField through the public package API and compiled CSS.
- [x] 4.3 Run formatting/static checks, type checking, the complete test suite,
  production builds, package installation, and the packed-package no-Tailwind
  verification.
