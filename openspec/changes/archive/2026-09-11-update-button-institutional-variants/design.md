## Context

The Button currently passes its `variant` directly into an `ib-button--*` class
and styles `solid`, `outline`, and `ghost` in one compiled stylesheet. Existing
consumers may still pass those values. The approved reference and `DESIGN.md`
define a broader action hierarchy and require variant-specific state colors.

The implementation must remain Base UI-backed, work without Tailwind in consumer
applications, compose arbitrary SVG children, and retain the existing size and
ref contracts.

## Goals / Non-Goals

**Goals:**

- Give each action intent a stable semantic variant name.
- Reproduce the reference's flat fills, hairline borders, tonal surface, focus
  separation, and disabled treatment through themeable tokens.
- Keep existing variant values compiling and rendering through documented aliases.
- Make each canonical treatment inspectable in Storybook and verifiable through
  the existing test and package workflows.

**Non-Goals:**

- Add loading behavior, icon slots, full-width layout, or new sizes.
- Bundle new icons or infer a variant from button copy or icon choice.
- Remove legacy variant values in this change.

## Decisions

### Use semantic variants with compatibility aliases

`ButtonVariant` will accept the canonical values `primary`, `secondary`,
`hairline`, `danger`, and `soft`. The default changes from the legacy name
`solid` to `primary` without changing its institutional amber appearance.

Legacy values map as follows:

| Legacy value | Canonical treatment |
| --- | --- |
| `solid` | `primary` |
| `outline` | `hairline` |
| `ghost` | `hairline` |

Both neutral legacy variants converge because the approved component definition
uses the bordered hairline treatment for the neutral tertiary action. Keeping the
strings avoids a TypeScript and runtime break; documenting them as aliases directs
new usage toward the semantic API. Preserving three separate legacy visuals was
rejected because it would keep an unsupported borderless treatment in the system.

### Resolve variants to canonical styling classes

The component will resolve legacy values to a canonical treatment before building
its class list. This keeps state selectors and theme tokens defined once per
institutional treatment. The consumer-provided `className` remains appended so
structural exceptions retain their current override path.

Keeping duplicate CSS rule sets for every legacy name was rejected because those
rules can drift as states evolve.

### Model state colors as semantic custom properties

The root theme will expose documented variables for each treatment's background,
foreground, border, hover background, and focus color, plus shared disabled
background, foreground, and border variables. Existing general palette variables
remain supported and may back the new defaults where their roles already match.

Explicit state properties are preferred over color mixing or opacity. This makes
the reference reproducible, keeps disabled content legible, and gives alternate
themes control over each result. A global opacity-only disabled rule was rejected
because it produces different blended colors on different surfaces.

The secondary Button uses `#C24A16` at rest and `#A73A00` on hover with white
text. The reference's brighter `#DE5C22` produces only 3.71:1 contrast at the
existing label size; the normalized pair preserves the terracotta hierarchy and
meets the 4.5:1 WCAG AA threshold.

### Treat focus as a separate interaction state

Hover changes the fill or tonal surface. `:focus-visible` adds a two-pixel outline
in the variant's emphasis color with a two-pixel gap, without changing layout.
Forced-colors mode continues to replace decorative colors with system colors.
Pointer focus does not display the keyboard focus ring.

### Keep layout and icon composition stable

All variants share the existing 40px, 48px, and 56px heights, 16px radius,
typography, spacing, and direct-SVG sizing. Variants express action intent only;
children remain the mechanism for composing labels and icons.

## Risks / Trade-offs

- [The `ghost` alias gains a hairline border] -> Document the mapping and cover it
  in automated compatibility tests; defer removal of the alias to a separately
  versioned change.
- [More theme variables increase the public styling surface] -> Name variables by
  semantic role, document all supported variables, and reuse general palette
  tokens for defaults where possible.
- [Static unit tests cannot prove visual parity] -> Keep focused stories for every
  canonical treatment and exercise state and accessibility checks in Chromium.
- [Variant-colored focus rings may lose contrast on custom themes] -> Document the
  3:1 requirement and keep focus behavior covered by automated accessibility
  tests.

## Migration Plan

1. Add canonical variant types, alias resolution, and semantic state variables.
2. Update stories, tests, documentation, and the example to use canonical names.
3. Keep aliases available throughout the release and document their mappings.
4. Roll back by restoring the previous default and selectors; no stored data or
   consumer migration is required.
