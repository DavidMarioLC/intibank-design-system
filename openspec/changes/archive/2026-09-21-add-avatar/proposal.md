## Why

Intibank interfaces need a consistent identity marker for people and accounts
instead of recreating initials, sizing, and institutional styling in each
consumer. The supplied visual reference establishes the warm rounded treatment
that should become a reusable package primitive.

## What Changes

- Add a public `Avatar` component that renders user-provided initials with a
  forwarded ref, native element attributes, consumer classes, and an accessible
  label when one is supplied.
- Match the reference with a rounded-square silhouette, warm ivory surface,
  soft neutral border, dark brown initials, and centered Hanken Grotesk type.
- Provide small, medium, and large sizes using semantic Avatar CSS variables so
  consumers can theme the component without rebuilding the stylesheet.
- Add focused unit coverage, public-import Storybook stories, package
  documentation, and packed-consumer verification.

## Capabilities

### New Capabilities

- `avatar`: Public API, accessible initials, supported sizes, visual treatment,
  and runtime theming contract for the Avatar component.

### Modified Capabilities

- `component-library-contract`: Extend public package exports and runtime
  theming to include Avatar.
- `quality-and-delivery`: Include Avatar in the public Storybook catalog and
  packed Tailwind-free consumer verification.

## Impact

This change adds colocated Avatar source, tests, and stories under
`packages/ui/src/avatar`, extends the package entry point and compiled component
stylesheet, documents the public API and semantic variables, and updates the
temporary packed consumer. It uses the existing React and CSS infrastructure
without adding a runtime dependency.
