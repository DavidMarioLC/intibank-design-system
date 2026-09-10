## Why

Intibank UI needs a consistent icon language for its component catalog and future
controls instead of maintaining ad-hoc SVG markup. Phosphor matches the warm,
defined visual direction while providing a broad financial catalog and
tree-shakeable React components.

## What Changes

- Add Phosphor Icons as the standard icon source for Intibank UI.
- Expose a small, intentional initial icon catalog from the public
  `@intibank/ui/icons` subpath instead of re-exporting the entire upstream package.
- Define visual and accessibility conventions for icon size, weight, color, and
  accessible naming.
- Replace inline demonstration SVGs in Button stories and the Tailwind-free
  example with icons consumed through the public package subpath.
- Extend package verification to cover icon exports, declarations, format-specific
  dependency handling, and installation from the packed tarball.
- Keep Button icon-library agnostic: its existing children-based composition API
  remains unchanged.

## Capabilities

### New Capabilities

- `icon-system`: Curated Phosphor icon exports, visual conventions,
  accessibility behavior, and package-consumption requirements.

### Modified Capabilities

None.

## Impact

- Public API: adds the non-breaking `@intibank/ui/icons` export subpath.
- Dependencies: adds `@phosphor-icons/react` as a pinned runtime dependency of
  `@intibank/ui`; ESM keeps it external while CommonJS embeds only the curated
  icon implementations to work around the upstream Node 24 export behavior.
- Build and packaging: adds an icon entry point and verifies its ESM, CommonJS,
  and declaration outputs.
- Documentation and examples: Button stories and `apps/example` adopt the curated
  icon API without installing or configuring Tailwind.
