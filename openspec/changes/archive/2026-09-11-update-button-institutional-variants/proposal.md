## Why

The current Button exposes generic visual variants that do not represent the
institutional hierarchy and operational states in the approved reference. The
component needs semantic treatments for primary, secondary, neutral, dangerous,
and low-emphasis actions while preserving source compatibility for current users.

## What Changes

- Add `primary`, `secondary`, `hairline`, `danger`, and `soft` Button variants.
- Make `primary` the default and keep `solid`, `outline`, and `ghost` as supported
  compatibility aliases.
- Define variant-specific default, hover, focus-visible, and disabled treatments
  using semantic CSS custom properties.
- Update Button stories, tests, package documentation, and the Tailwind-free
  consumer example to demonstrate the institutional variants and states.
- Preserve native/Base UI activation, ref forwarding, icon composition, sizes,
  and consumer `className` support.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `button`: Expand the public variant API and define the institutional visual and
  interaction-state behavior, including compatibility aliases.
- `component-library-contract`: Expand the semantic token contract required to
  theme every institutional Button treatment without component-specific overrides.
- `quality-and-delivery`: Require catalog coverage for canonical variants and
  states, plus automated package verification for compatibility aliases.

## Impact

The change affects Button TypeScript types and class mapping, compiled component
CSS and theme variables, Button unit tests and Storybook stories, package
documentation, and the example application. It adds no runtime dependency and
does not remove an existing Button prop value.
