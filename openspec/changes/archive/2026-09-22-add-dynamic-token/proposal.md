## Why

Intibank flows need a consistent, accessible way to present a short-lived
dynamic token, its remaining validity, and the recovery action without
recreating a security card in each application. The supplied reference defines
the approved visual hierarchy for this high-trust interaction.

## What Changes

- Add a public, ref-forwarding `DynamicToken` component that presents a
  consumer-provided six-digit code, localized title and guidance, status,
  remaining time, and a resend action.
- Keep token generation, countdown scheduling, expiry policy, and network
  requests outside the component; consumers provide the current values and own
  the resend callback.
- Match the reference with an elevated white card, indigo heading and lock,
  reusable success Badge, grouped digit cells, an accessible separator, amber
  timer treatment, divider, and text-style resend control.
- Add semantic `--intibank-dynamic-token-*` variables, responsive behavior,
  forced-colors support, public-import tests and Storybook stories,
  documentation, an example, and packed-consumer verification.

## Capabilities

### New Capabilities

- `dynamic-token`: Public API, controlled token and expiry data, accessible
  presentation, resend interaction, responsive layout, and runtime theming for
  the DynamicToken component.

### Modified Capabilities

- `component-library-contract`: Extend public package exports and runtime
  theming to include DynamicToken.
- `quality-and-delivery`: Include DynamicToken in the public Storybook catalog
  and Tailwind-free packed-consumer verification.

## Impact

This change adds colocated DynamicToken source, tests, and stories under
`packages/ui/src/dynamic-token`, extends the package entry point and compiled
stylesheet, records the normalized treatment in `DESIGN.md`, documents the
public API and semantic variables, and updates the example and packed consumer.
It composes the existing Badge treatment and uses the installed Phosphor icon
dependency without adding a runtime dependency or implementing authentication
or secret-generation logic.
