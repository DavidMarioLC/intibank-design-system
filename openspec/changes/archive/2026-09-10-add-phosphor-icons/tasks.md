## 1. Dependency and public API

- [x] 1.1 Add the pinned `@phosphor-icons/react` runtime dependency and update the pnpm lockfile reproducibly
- [x] 1.2 Create the curated icon entry with direct exports for ArrowRight, Check, Plus, and X
- [x] 1.3 Configure tsdown and package exports for ESM, CommonJS, and declarations at `@intibank/ui/icons`, keeping Phosphor external in ESM, bundling only curated icons in CommonJS, and keeping React external in both

## 2. Catalog, accessibility, and documentation

- [x] 2.1 Replace the Button story's inline SVG through the public icon subpath and add an accessible icon-only Button story with interaction assertions
- [x] 2.2 Replace the Tailwind-free example's inline SVG through the public icon subpath
- [x] 2.3 Document the curated catalog, visual conventions, accessibility rules, upstream escape hatch, and policy for adding icons

## 3. Packaging and release record

- [x] 3.1 Extend the tarball smoke test to import an icon and verify icon ESM, CommonJS, declarations, public exports, ESM externalization, and the bounded CommonJS workaround
- [x] 3.2 Add a Changesets minor entry for the new non-breaking icon subpath

## 4. Verification

- [x] 4.1 Run formatting/lint, strict typecheck, unit and Storybook tests, and production builds
- [x] 4.2 Run the Tailwind-free packed-package installation check and strict OpenSpec validation
