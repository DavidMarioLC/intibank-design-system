## Context

See `proposal.md` for motivation. The package exposes ref-forwarding React
primitives through `@intibank/ui`, styles them with stable `ib-` selectors and
semantic custom properties, and verifies them through public-import tests,
Storybook, and a Tailwind-free packed consumer. Badge is a static status label,
so it does not need Base UI behavior or another dependency.

The three screenshots use different presentation scales. Their shared geometry
is normalized to a single runtime component: a 40px pill with generous inline
padding, a small circular indicator, and 20px label type. The semantic hues are
preserved while text colors are darkened from the screenshot samples where
needed for readable contrast on pale surfaces.

## Goals / Non-Goals

**Goals:**

- Keep Badge non-interactive, ref-forwarding, content-flexible, and themeable.
- Preserve the success, warning, and danger visual identities from the supplied
  references.
- Ensure the visible text carries the status meaning and the indicator does not
  create duplicate accessibility output.
- Make the component verifiable through the same public API and package paths as
  existing primitives.

**Non-Goals:**

- Hard-code Spanish labels, derive a variant from label text, or translate
  consumer content.
- Add neutral, informational, removable, clickable, notification-count, or
  multi-size Badge behavior.
- Announce status changes as a live region; consumers own live-update semantics.

## Decisions

### Render a native span with required semantic variant

`Badge` will accept `children: ReactNode`, a required
`variant: "success" | "warning" | "danger"`, native span attributes, and a
forwarded `HTMLSpanElement` ref. The required variant prevents an accidental
default state from conveying the wrong meaning. Consumer content keeps the
component reusable across languages and domains.

The root receives `ib-badge`, `ib-badge--<variant>`, and the consumer class in a
stable order. A nested `ib-badge__indicator` span is always rendered with
`aria-hidden="true"`. A separate text wrapper is unnecessary because children
can remain ordinary accessible content.

Hard-coded `active`, `pending`, and `rejected` props were rejected because state
names and localized copy belong to product flows. An interactive element was
rejected because the references communicate status rather than an action.

### Normalize the screenshot geometry to one component size

The component will use a 40px minimum height, 24px inline padding, 12px gap,
12px circular indicator, 20px/24px semibold Hanken Grotesk label, and fully
rounded corners. Width remains content-driven and text stays on one line. A
transparent 1px border on success preserves identical geometry across variants.

The screenshots were not treated as literal CSS pixel dimensions because their
canvas sizes and zoom levels differ. The normalized values preserve their
relative dot, type, padding, and pill proportions on the existing component
grid.

### Separate readable text from brighter indicator accents

Each variant will expose background, foreground, border, and indicator
variables:

- Success: `#EAF6ED`, `#0F7A37`, transparent, `#16A34A`
- Warning: `#FFF7E6`, `#9A5D00`, `#F8DCA3`, `#F5B400`
- Danger: `#FEE2E2`, `#B91C1C`, `#FCA5A5`, `#DC2626`

The indicator retains the bright hue visible in each reference. The text uses a
darker hue because the bright warning sample in particular does not provide
reliable text contrast on its pale background. Using a single color for both
elements was rejected in favor of readable copy while preserving the intended
visual character. Forced-colors mode will map the pill and indicator to system
colors.

### Extend existing verification surfaces

Unit tests will cover every variant, consumer content, decorative indicator,
refs, native attributes, and class preservation through the public export.
Storybook will show `Activo`, `Pendiente`, and `Rechazado` individually and
together, plus a semantic theme override. Documentation, `DESIGN.md`, the
Tailwind-free example, and the packed consumer will use the same public
contract.

## Risks / Trade-offs

- [Color alone could be misunderstood] → Require consumer-provided visible text
  and keep the dot decorative.
- [Long labels can produce wide pills] → Preserve readable, untruncated content
  and document that Badge is intended for concise status copy.
- [The darker text differs slightly from the screenshot accents] → Keep the
  brighter hue on the indicator and border while prioritizing readable text.
- [Consumers may need live status announcements] → Permit native ARIA
  attributes without assigning a live-region role by default.

## Migration Plan

This is additive. Export Badge and its types, ship its CSS in the existing
stylesheet, and extend documentation and package verification. Rollback consists
of removing the new export, source, styles, stories, tests, and documentation;
no existing component API or stored data changes.
