## Context

The repository began with only `DESIGN.md`, with no package metadata or Git
repository. The library must ship portable CSS while Tailwind remains strictly a
build-time tool. See the proposal and capability specs for the consumer contract.

## Goals / Non-Goals

**Goals:**

- Establish one reproducible workspace and one production-shaped component.
- Prove public exports, isolated styles, runtime theming, catalog testing, and packing.
- Keep future npm and Pages delivery explicit and protected.

**Non-Goals:**

- Additional components, a monorepo task orchestrator, automatic releases, visual
  regression hosting, and bundled or remotely downloaded fonts.

## Decisions

### Distribution and dependency boundaries

tsdown emits ESM, CommonJS, source maps, and bundled declarations from one entry.
React, React DOM, and Base UI remain external; React packages are peers while Base
UI is a normal runtime dependency. An ESM-only package was considered, but dual
output gives the provisional package a wider first-release compatibility surface.

### Portable Tailwind CSS

Tailwind CLI compiles a single stylesheet. Theme and utilities are imported without
Preflight, and component styling is emitted behind `ib-` selectors. Component
values reference `--intibank-*` variables declared on `:root`; closer consumer
declarations naturally win. Shipping Tailwind source/config to consumers was
rejected because it violates the zero-Tailwind consumption contract.

### Design normalization and contrast

Descriptive prose wins over the conflicting YAML. The prose's 16px button radius is
used; the bordered tertiary becomes `outline`, while `ghost` is borderless. Amber
with indigo text passes at 7.44:1. Indigo replaces amber for the focus ring because
amber on white is only 2.15:1. Interactive outline uses muted brown-gray rather than
the 1.20:1 architectural border. Terracotta remains an accent because white on its
resting color is only 3.71:1 for normal text.

### Tests as catalog and package verification

Unit tests cover the component contract in jsdom. Stories are colocated but import
the built public package and CSS; Storybook's Vitest addon runs play functions and
axe checks in Chromium. A separate temporary npm consumer builds from the tarball
without Tailwind, catching missing files and incorrect exports.

### Delivery safety

CI is automatic. npm and Pages workflows use `workflow_dispatch` and protected
environments so configuring the files does not release anything. npm uses OIDC
Trusted Publishing rather than a long-lived token.

## Risks / Trade-offs

- [Stories rely on built output] → Root scripts build `@intibank/ui` before tests,
  Storybook, or type checks and keep it in watch mode during development.
- [Dual package exports can diverge] → Both formats come from one tsdown build and
  the tarball check verifies both entry points.
- [Browser tests require Chromium] → CI installs only the Playwright Chromium runtime.
- [Provisional npm scope may be unavailable] → Keep the name documented as provisional
  and require scope ownership before enabling the protected npm environment.
