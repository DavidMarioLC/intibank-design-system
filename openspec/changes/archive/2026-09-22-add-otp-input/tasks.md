## 1. Public API and input behavior

- [x] 1.1 Add the controlled, ref-forwarding `OtpInput` module with `value`,
  `onValueChange`, localized label and messages, invalid, required, disabled,
  read-only, form naming, native input attributes, stable consumer classes, and
  public package exports.
- [x] 1.2 Implement one semantic native input with six hidden-from-assistive-
  technology visual cells, ASCII-digit normalization, six-digit limiting,
  selection-aware active-cell presentation, native caret navigation, deletion,
  replacement, full-code paste, numeric-keyboard and one-time-code hints, and no
  automatic verification or submission side effects.
- [x] 1.3 Add documented `--intibank-otp-input-*` variables and prefixed styles
  for resting, focus, invalid, disabled, read-only, helper, and error states,
  including compact container reflow, minimum control target height, and
  forced-colors behavior without a global reset.
- [x] 1.4 Record the OtpInput visual, responsive, interaction, and accessibility
  treatment in `DESIGN.md` while preserving the distinct read-only DynamicToken
  contract.

## 2. Tests and Storybook

- [x] 2.1 Add public-import unit tests for partial and controlled values, ASCII
  normalization and length limiting, typing, selection replacement, deletion,
  navigation, paste-shaped input, form submission, native autofill hints,
  labels and messages, invalid, required, disabled, read-only, ref, attributes,
  classes, single-field accessibility, and absence of verification side effects.
- [x] 2.2 Add public-export Storybook stories for empty and partially filled
  interactive states, completed, invalid, disabled, read-only, narrow-container,
  and semantic-theme states with typing, replacement, paste, keyboard, and form
  interaction assertions.
- [x] 2.3 Run OtpInput unit tests and Storybook interaction/accessibility tests,
  visually inspect resting, focus, error, completed, and compact states, and
  correct any hierarchy, contrast, focus, ordering, pointer-target, or overflow
  failures.

## 3. Consumer guidance and package verification

- [x] 3.1 Document OtpInput controlled usage, its six-ASCII-digit contract,
  DynamicToken distinction, localization and accessibility behavior, form and
  autofill support, security boundary, consumer verification responsibility,
  and every semantic OtpInput variable in the package README.
- [x] 3.2 Update the Tailwind-free example and packed temporary consumer to
  import, interact with, submit, and build OtpInput through the public package
  API and compiled stylesheet, including CommonJS, declaration, and CSS checks.
- [x] 3.3 Run formatting/static checks, strict OpenSpec validation, type
  checking, the complete test suite, production builds, package installation,
  and packed-package no-Tailwind verification.
