## Why

Intibank forms need a reusable, accessible text-entry primitive that matches the
approved warm institutional design instead of requiring consumers to recreate
labels, validation messaging, adornments, and interaction states.

## What Changes

- Add a public `TextField` component for single-line text entry with an associated
  label, optional marker, helper text, and validation message.
- Support native input behavior and refs, flexible width, disabled and read-only
  states, invalid semantics, and leading or trailing adornments such as `S/.`.
- Add semantic `--intibank-text-field-*` variables and scoped component styles for
  default, hover, focus, invalid, disabled, and read-only treatments.
- Document and verify the component through unit tests, focused Storybook stories,
  the package README, and the Tailwind-free consumer smoke test.

## Capabilities

### New Capabilities

- `text-field`: Public API, accessible labeling and messaging, adornments, visual
  states, and normalized Intibank styling for single-line text fields.

### Modified Capabilities

- `component-library-contract`: Extend the public package and runtime theming
  contract to cover TextField and its semantic variables.
- `quality-and-delivery`: Include TextField in the public-export Storybook catalog
  and Tailwind-free packed-consumer verification.

## Impact

This change adds a new public export and colocated source, tests, and stories under
`packages/ui/src/text-field`, extends the compiled component stylesheet and package
documentation, and updates the example and package smoke test. It uses the existing
React, Base UI, Storybook, Vitest, and semantic CSS infrastructure without adding a
runtime dependency. The component owns presentation and accessibility wiring; it
does not format, mask, or validate monetary values.
