## Why

Intibank interfaces need a consistent, accessible way to communicate compact
account and workflow states without recreating colored pills in each consumer.
The supplied references establish the semantic success, warning, and danger
treatments that should become a reusable package primitive.

## What Changes

- Add a public, ref-forwarding `Badge` component with required `success`,
  `warning`, and `danger` variants, consumer-provided label content, native span
  attributes, and custom classes.
- Match the references with a fully rounded pill, centered semibold text, a
  decorative circular status indicator, and variant-specific background,
  foreground, and border treatments.
- Add semantic `--intibank-badge-*` variables so every treatment can be themed
  without rebuilding the distributed stylesheet.
- Add focused unit coverage, public-import Storybook stories, package
  documentation, design guidance, and Tailwind-free packed-consumer
  verification.

## Capabilities

### New Capabilities

- `badge`: Public API, semantic variants, decorative status indicator,
  accessible text behavior, visual treatment, and runtime theming contract for
  the Badge component.

### Modified Capabilities

- `component-library-contract`: Extend public package exports and runtime
  theming to include Badge.
- `quality-and-delivery`: Include Badge in the public Storybook catalog and
  packed Tailwind-free consumer verification.

## Impact

This change adds colocated Badge source, tests, and stories under
`packages/ui/src/badge`, extends the package entry point and compiled component
stylesheet, records the normalized treatment in `DESIGN.md`, documents the
public API and semantic variables, and updates the example and packed consumer.
It uses the existing React and CSS infrastructure without adding a runtime
dependency.
