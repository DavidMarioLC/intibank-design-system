## 1. Public API and visual treatment

- [x] 1.1 Add the ref-forwarding `Avatar` module with initials, `sm`, `md`, and
  `lg` sizes, native span attributes, stable consumer classes, and accessible
  label behavior, then export Avatar and its public types from the package entry
  point.
- [x] 1.2 Add documented `--intibank-avatar-*` variables and prefixed component
  styles for the reference's warm surface, neutral hairline, dark initials,
  proportional rounded-square shape, and 40px, 56px, and 72px sizes without a
  global reset.
- [x] 1.3 Record the normalized Avatar treatment in `DESIGN.md`, including the
  one- or two-initial content boundary and the relationship between the supplied
  scaled reference and runtime sizes.

## 2. Tests and Storybook

- [x] 2.1 Add focused unit tests for initials, the medium default, all size
  classes, forwarded refs, native attributes, consumer classes, and labeled and
  unlabeled accessibility behavior through the public package export.
- [x] 2.2 Add public-export Storybook stories for the reference-style `ME`
  default, all sizes, an accessible named identity, and semantic theme overrides.
- [x] 2.3 Run Avatar unit tests and Storybook interaction/accessibility tests,
  visually compare the default story with the supplied reference, and correct
  any behavior, contrast, proportion, or overflow failures.

## 3. Consumer guidance and package verification

- [x] 3.1 Document Avatar usage, accessibility guidance, supported sizes,
  content limits, and all semantic Avatar variables in the package README.
- [x] 3.2 Update the Tailwind-free example and packed temporary consumer to
  import, render, and build Avatar through the public package API and compiled
  stylesheet, including CommonJS and declaration checks.
- [x] 3.3 Run formatting/static checks, type checking, the complete test suite,
  production builds, package installation, and the packed-package no-Tailwind
  verification.
