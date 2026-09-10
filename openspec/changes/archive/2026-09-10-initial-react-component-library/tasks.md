## 1. Specification and workspace

- [x] 1.1 Initialize OpenSpec for Codex and validate that the spec-driven change artifacts exist
- [x] 1.2 Create the pnpm workspace, strict TypeScript configuration, pinned tooling, and lockfile; verify `pnpm install` completes
- [x] 1.3 Configure Ultracite/Biome and Changesets and verify their configuration is discoverable

## 2. Component package

- [x] 2.1 Configure `@intibank/ui` exports and tsdown dual builds with React, React DOM, and Base UI external
- [x] 2.2 Implement semantic `--intibank-*` tokens and Tailwind CLI CSS without Preflight
- [x] 2.3 Implement the Base UI-backed Button public API with variants, sizes, disabled behavior, icons, className, and refs
- [x] 2.4 Document design normalization, contrast, theming, style overrides, and consumer-managed fonts

## 3. Catalog and tests

- [x] 3.1 Add colocated Button unit tests and verify default, composition, keyboard, disabled, and submit behavior
- [x] 3.2 Configure Storybook through public package exports and add variant, size, state, icon, interaction, and Nightfall stories
- [x] 3.3 Configure Storybook Vitest and accessibility addons to run in Chromium with accessibility violations treated as errors

## 4. Packaging and delivery

- [x] 4.1 Add a Tailwind-free Vite consumer and verify its production build uses package JavaScript and CSS exports
- [x] 4.2 Add a tarball installation smoke test that verifies ESM, CommonJS, declarations, CSS, dependency externalization, and a consumer build
- [x] 4.3 Add CI plus manual protected npm and Pages workflows and document external activation requirements

## 5. Final verification

- [x] 5.1 Run OpenSpec validation, format/lint, type checks, unit/browser accessibility tests, all builds, and tarball verification successfully
