## Why

The library can display a generated dynamic token, but it does not provide the
complementary control required when a user must enter a one-time code received
through SMS, email, an authenticator, or another device. A dedicated `OtpInput`
keeps editable verification-code behavior separate from the read-only
`DynamicToken` contract.

## What Changes

- Add an accessible, controlled `OtpInput` for exactly six ASCII digits with a
  visible label and optional helper or error text.
- Support digit entry, automatic forward movement, backward deletion, arrow-key
  navigation, full-code paste, selection replacement, mobile numeric keyboards,
  and one-time-code autofill without introducing timers or verification logic.
- Expose disabled, read-only, required, invalid, focus, refs, native form naming,
  consumer classes, and localized content through the public React API.
- Add semantic `--intibank-otp-input-*` variables and responsive, prefixed
  styles that remain usable in compact containers and forced-colors mode.
- Add public-import unit coverage, Storybook interaction/accessibility stories,
  package documentation, the Tailwind-free example, and packed-consumer checks.

## Capabilities

### New Capabilities

- `otp-input`: Defines the editable six-digit OTP control, keyboard and paste
  behavior, controlled value contract, form and accessibility semantics, and
  security boundary.

### Modified Capabilities

- `component-library-contract`: Adds `OtpInput` to the public executable,
  declaration, stylesheet, theming, and package-consumption contract.
- `quality-and-delivery`: Requires OtpInput stories, interaction and
  accessibility coverage, documentation, and Tailwind-free packed-consumer
  verification.

## Impact

- Adds a new public `OtpInput` component and TypeScript types to `@intibank/ui`.
- Extends the compiled stylesheet and documented semantic theme variables.
- Adds colocated tests and Storybook stories plus example and package-smoke
  coverage.
- Does not change `DynamicToken`, generate or verify codes, start timers, send
  messages, make network requests, or persist sensitive values.
