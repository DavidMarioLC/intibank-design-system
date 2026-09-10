## Why

Intibank needs a reproducible foundation for accessible React components that can
be consumed without adopting the library's build-time styling tools. This first
delivery proves the package, styling, documentation, testing, and release contracts
with one production-shaped Button.

## What Changes

- Add a pnpm monorepo with strict TypeScript and reproducible tooling.
- Add the publishable `@intibank/ui` package with compiled JavaScript, types, and CSS.
- Add semantic theme tokens and an accessible Base UI-backed Button.
- Add colocated stories, interaction tests, accessibility checks, and unit tests.
- Add a Storybook catalog and a Tailwind-free consumer application/package smoke test.
- Add Changesets and manual GitHub Actions workflows for future npm and Pages delivery.

## Capabilities

### New Capabilities

- `component-library-contract`: Published exports, isolated compiled styles, semantic tokens, and consumer customization.
- `button`: Accessible Button variants, sizes, disabled behavior, icons, keyboard interaction, and refs.
- `quality-and-delivery`: Reproducible checks, packaging verification, Storybook catalog, and guarded release/deployment workflows.

### Modified Capabilities

None.

## Impact

Introduces the complete workspace under `packages/ui`, `apps`, OpenSpec,
Changesets, documentation, and GitHub Actions. React and React DOM remain consumer
peers; Base UI is a runtime dependency kept outside the compiled library bundle.
