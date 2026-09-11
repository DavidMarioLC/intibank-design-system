## 1. Public API and styling

- [x] 1.1 Extend `ButtonVariant` with the five canonical institutional values,
  make `primary` the default, and resolve the three legacy values to their
  documented canonical treatments.
- [x] 1.2 Add semantic theme variables and component styles for the default,
  hover, focus-visible, and disabled states of every canonical variant.
- [x] 1.3 Preserve existing sizes, native behavior, ref forwarding, consumer
  classes, reduced-motion handling, forced-colors support, and SVG composition.

## 2. Verification and catalog

- [x] 2.1 Update focused Button unit tests for the canonical API, default behavior,
  compatibility mappings, disabled activation, keyboard use, refs, and classes.
- [x] 2.2 Replace the Storybook variant examples with focused canonical variant,
  hover/focus, disabled, icon, and size stories through public package exports.
- [x] 2.3 Run Button unit tests and Storybook interaction/accessibility tests, then
  correct any behavioral or accessibility regressions.
- [x] 2.4 Remove the aggregate `InstitutionalVariants` and
  `CompatibilityAliases` stories while retaining individual canonical stories
  and automated alias coverage.
- [x] 2.5 Remove the `AlternatePalette` story while retaining the documented
  runtime theming contract and automated accessibility coverage.

## 3. Consumer guidance and delivery checks

- [x] 3.1 Document canonical variants, compatibility aliases, state behavior, and
  all supported semantic theme variables in the package README.
- [x] 3.2 Update the example and packed temporary consumer to exercise a canonical
  variant and a compatibility alias without installing Tailwind.
- [x] 3.3 Run formatting/static checks, type checking, production builds, the
  Storybook build, and the packed-package no-Tailwind verification.
