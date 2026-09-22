## 1. Public API and visual treatment

- [x] 1.1 Add the ref-forwarding `Badge` module with required `success`,
  `warning`, and `danger` variants, consumer label content, native span
  attributes, stable consumer classes, and an accessibility-hidden indicator,
  then export Badge and its public types from the package entry point.
- [x] 1.2 Add documented `--intibank-badge-*` variables and prefixed component
  styles for the 40px pill, 24px inline padding, 12px gap and indicator, 20px
  semibold label, three semantic treatments, and forced-colors behavior without
  a global reset.
- [x] 1.3 Record the normalized Badge geometry, semantic treatments, concise-copy
  guidance, and contrast normalization from the three supplied references in
  `DESIGN.md`.

## 2. Tests and Storybook

- [x] 2.1 Add focused unit tests for consumer content, all variants, forwarded
  refs, native attributes, consumer classes, the decorative indicator, and
  non-interactive behavior through the public package export.
- [x] 2.2 Add public-export Storybook stories for `Activo`, `Pendiente`, and
  `Rechazado`, all variants together, and semantic theme overrides.
- [x] 2.3 Run Badge unit tests and Storybook interaction/accessibility tests,
  visually compare each semantic story with its supplied reference, and correct
  any behavior, contrast, proportion, spacing, or overflow failures.

## 3. Consumer guidance and package verification

- [x] 3.1 Document Badge usage, variant selection, accessibility behavior,
  concise-content guidance, and all semantic Badge variables in the package
  README.
- [x] 3.2 Update the Tailwind-free example and packed temporary consumer to
  import, render, and build Badge through the public package API and compiled
  stylesheet, including CommonJS, declaration, and CSS checks.
- [x] 3.3 Run formatting/static checks, type checking, the complete test suite,
  production builds, package installation, and the packed-package no-Tailwind
  verification.
