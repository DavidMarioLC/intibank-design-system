# Design normalization

For the first release, the descriptive sections of `DESIGN.md` take precedence
over its initial YAML block.

- The semantic palette is amber `#F59E0B`, amber hover `#D97706`, terracotta
  `#DE5C22`, indigo `#1E1B4B`, and the documented warm neutral scale.
- The button's `rounded-xl` instruction is normalized to 16px, matching the prose
  shape scale. Token names describe semantic use rather than preserving the
  conflicting YAML labels.
- The bordered “Ghost / Tertiary” design becomes the `outline` variant. The v1
  `ghost` variant is intentionally borderless.
- Architectural borders stay `#E7E5E4`. Interactive outlines use `#78716C`
  because the architectural border does not provide a perceptible 3:1 boundary
  against white or warm-stone surfaces.

## Contrast decisions

WCAG relative-luminance calculations used for the shipped combinations:

| Combination | Ratio | Decision |
| --- | ---: | --- |
| Amber / indigo | 7.44:1 | Solid button |
| Amber hover / indigo | 5.02:1 | Solid hover |
| Muted text / background | 4.59:1 | Allowed normal text |
| Terracotta / white | 3.71:1 | Not used for normal-size text |
| Terracotta hover / white | 4.90:1 | Available for future interactive use |
| Amber / white | 2.15:1 | Not used as a focus indicator |
| Indigo / white | 15.99:1 | Focus and Nightfall palette |

The focus outline is indigo with a 2px offset. Disabled controls use reduced
opacity; WCAG exempts inactive controls from minimum contrast, while their native
disabled semantics remain intact.

The 40px small button is intended for dense desktop interfaces. Mobile primary
actions should use the 48px medium size or 56px large size.
