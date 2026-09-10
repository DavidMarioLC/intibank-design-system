## Context

The package currently has one tsdown entry point and exposes Button plus compiled
CSS. Button already sizes direct SVG children and intentionally accepts arbitrary
React children. Its story and the Tailwind-free example currently duplicate an
inline arrow SVG. See `proposal.md` for the motivation and
`specs/icon-system/spec.md` for the consumer contract.

Phosphor's React package contains thousands of modules and supports tree-shaking,
but its documentation notes that importing through the aggregate module can make
some development bundlers process the full export graph. The package also relies
on React at runtime, which must remain a consumer peer rather than being bundled a
second time.

Tarball verification found that Phosphor 2.1.10 maps CommonJS deep imports to its
aggregate `index.cjs.js`. Because the package declares `type: module`, Node 24
loads that target without exposing its CommonJS assignments, so `require()`
returns no icon exports. Its ESM per-icon paths work correctly.

## Goals / Non-Goals

**Goals:**

- Add a stable, small icon surface without changing Button's existing API.
- Preserve tree-shaking and the library's dual-format/type package contract.
- Establish visual and accessibility usage rules that can scale to later components.
- Prove the icon subpath works from the actual npm tarball without Tailwind.

**Non-Goals:**

- Export the complete Phosphor catalog.
- Add an `IconButton` component, an icon-name registry, dynamic icon loading, or an
  application-wide icon provider.
- Wrap every icon merely to rename upstream props or prevent supported Phosphor
  customization.
- Publish the package as part of this change.

## Decisions

### Publish a curated `@intibank/ui/icons` entry point

The initial catalog is `ArrowRightIcon`, `CheckIcon`, `PlusIcon`, and `XIcon`.
These cover navigation, confirmation, creation, and dismissal while keeping the
first addition bounded. New icons are deliberate public API additions made as
components require them.

Alternative: re-export the complete package. Rejected because it makes Intibank's
supported visual vocabulary indistinguishable from the upstream catalog and
unnecessarily couples consumers to all upstream names.

### Use format-specific Phosphor packaging as a regular dependency

`@phosphor-icons/react` is pinned in `packages/ui` dependencies. The ESM icon
entry keeps the direct Phosphor modules external for native tree-shaking. The
CommonJS icon entry bundles only the four selected implementations because the
upstream CommonJS export target does not expose them under Node 24. React remains
external in both formats and stays the peer shared by both packages.

The regular dependency ensures ESM consumers receive the runtime implementation
without a separate peer-install step and retains upstream licensing metadata.
The build uses separate format configurations so the workaround cannot pull the
complete catalog into either output.

Alternative: omit CommonJS for the icon subpath. Rejected because it would violate
the package's dual-format contract. Switching libraries is also disproportionate
to a contained upstream packaging defect.

### Use direct icon module imports in the local entry

The icon entry imports only the selected client-renderable modules from
Phosphor's documented per-icon paths. tsdown produces dedicated ESM, CommonJS,
and declaration files for the subpath. This avoids traversing the aggregate module
during Storybook and consumer development.

Alternative: named imports from `@phosphor-icons/react`. Although valid and
tree-shakeable for production, Phosphor documents slower development transforms
in bundlers that eagerly process its full module graph.

### Preserve upstream icon behavior and Button composition

Curated exports retain Phosphor's defaults: regular weight, `currentColor`, ref
support, and SVG presentation props. Button's scoped `> svg` rule continues to
normalize icon dimensions to `1.25em`; icons outside Button keep their caller-set
or upstream size. Examples set `aria-hidden="true"` for decoration, while the
interactive element receives the accessible name.

Alternative: introduce an Intibank wrapper and context now. Rejected because a
wrapper adds runtime and API surface without a component-level requirement that
needs globally enforced weight or size.

## Risks / Trade-offs

- [A curated catalog can initially feel small] → Add icons alongside concrete
  component or product needs, keeping each addition reviewable.
- [Deep import paths can change in a future Phosphor major release] → Pin the
  dependency and let typecheck, build, Storybook, and tarball verification catch
  path changes during intentional upgrades.
- [CommonJS contains a small copy of Phosphor's selected implementations] → Bundle
  only four direct modules, inspect the artifact, and keep React external. Revisit
  the exception after an upstream release fixes Node 24 CommonJS exports.
- [An icon-only control can be unnamed] → Include an accessible Storybook
  example and automated assertion for the Button name.

## Migration Plan

Add the dependency and entry point, then replace only the existing duplicated
arrow SVGs in documentation/example code. There is no breaking consumer migration:
existing arbitrary SVG children continue to work. Rollback removes the new
subpath and restores the two inline SVG examples before any release includes it.
