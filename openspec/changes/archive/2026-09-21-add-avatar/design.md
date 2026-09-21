## Context

See `proposal.md` for motivation. The package currently exposes small,
ref-forwarding React primitives with stable `ib-` classes, semantic
`--intibank-*` variables, public-import tests and stories, and a compiled
Tailwind stylesheet without Preflight. Avatar is a static identity marker, so it
does not need Base UI behavior or a new dependency.

The supplied 328px reference is treated as a scaled presentation of the
component rather than its runtime dimensions. Its visible treatment aligns with
the prose design language: a warm container, structural neutral border, and
dark warm foreground. The implementation normalizes that reference to the
existing 8pt-oriented component scale instead of reproducing screenshot pixels.

## Goals / Non-Goals

**Goals:**

- Keep Avatar composable, ref-forwarding, themeable, and free of behavioral
  dependencies.
- Preserve the reference's proportions across three practical component sizes.
- Avoid duplicate screen-reader output when a full accessible identity is
  supplied.
- Make the component verifiable through the same public API and package paths as
  existing components.

**Non-Goals:**

- Deriving initials from a person's name or modifying consumer-provided text.
- Loading profile images, handling image errors, presence indicators, badges,
  Avatar groups, or interactive behavior.
- Enforcing a product-specific identity or privacy policy.

## Decisions

### Render a native `span` with an explicit initials prop

`Avatar` will accept `initials: string`, `size?: "sm" | "md" | "lg"`, and
native `span` attributes while forwarding an `HTMLSpanElement` ref. A native
element is sufficient for a non-interactive marker and keeps the public surface
small. Accepting arbitrary children was rejected because it would make the
initials and accessibility contract ambiguous.

The root receives `ib-avatar`, `ib-avatar--<size>`, and the consumer class in a
stable order. It contains an `ib-avatar__initials` child so visual content can be
hidden from assistive technology only when necessary.

### Make accessible labeling additive and avoid duplicate initials

When `aria-label` is present, the root receives `role="img"` and the initials
child receives `aria-hidden="true"`; assistive technology announces the full
identity once. Without `aria-label`, no image role or hidden state is added, so
the initials remain ordinary text. The component does not invent a name from
initials.

An always-present image role was rejected because unlabeled image semantics
would reduce the usefulness of the visible text. Automatically expanding
initials was rejected because the component has no reliable identity source.

### Scale the reference on the existing component grid

The three square sizes will be 40px, 56px, and 72px, with medium as the default.
Initials will use 14px, 20px, and 28px type respectively, Hanken Grotesk,
semibold weight, and a unit line height. A 25% radius preserves the distinctly
rounded-square silhouette at every size; a 1px border preserves the reference's
hairline appearance when scaled down.

The default variables will be:

- `--intibank-avatar-background: #f5ece6`
- `--intibank-avatar-foreground: #744300`
- `--intibank-avatar-border: #e7e5e4`
- `--intibank-avatar-radius: 25%`

These choices reuse the repository's warm surface and structural-border
language while matching the screenshot's ivory, dark brown, and soft gray. A
fully circular avatar was rejected because it would not match the reference.

### Extend existing verification surfaces

Unit tests will cover default and selected sizes, initials, refs, native
attributes, class preservation, and both accessibility paths. Storybook will
show the reference-style `ME` default, all sizes, a labeled identity, and theme
overrides through the public package export. Documentation, `DESIGN.md`, and the
packed consumer will describe and exercise the same contract.

## Risks / Trade-offs

- [Long or non-initial text can crowd the fixed square] → Document the intended
  one- or two-character usage and keep overflow contained without silently
  rewriting consumer content.
- [A consumer may omit the full accessible identity] → Preserve the initials as
  text rather than converting them into an unlabeled image.
- [A percentage radius can render differently if external CSS breaks the square]
  → Set equal inline and block sizes plus `aspect-ratio: 1` in the stable base
  class; structural overrides remain a consumer responsibility.
- [Font fallback changes glyph metrics] → Center with flex layout and use the
  existing system fallback stack.

## Migration Plan

This is additive. Export Avatar and its types, ship its CSS in the existing
stylesheet, and extend documentation and package verification. Rollback consists
of removing the new export, source, styles, stories, tests, and documentation;
no existing component API or stored data changes.
