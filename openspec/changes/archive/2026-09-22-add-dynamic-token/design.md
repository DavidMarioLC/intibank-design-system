## Context

See `proposal.md` for motivation and `specs/dynamic-token/spec.md` for the
behavior contract. The package already exposes ref-forwarding React primitives,
semantic custom properties, a success/danger Badge, and Phosphor as a pinned
runtime dependency. DynamicToken is a security-data presentation surface, so it
must not imply ownership of token generation, countdown scheduling, storage, or
transport.

The supplied 1075×500 screenshot is a presentation reference rather than a
fixed viewport contract. Its desktop proportions will be normalized to the
existing 8px grid and paired with a compact layout that preserves digit order,
readability, and a 48px resend target on narrow containers.

## Goals / Non-Goals

**Goals:**

- Keep DynamicToken controlled, ref-forwarding, localized by the consumer, and
  themeable at runtime.
- Preserve the reference hierarchy: identity and status, guidance, grouped
  code, then expiry and resend action.
- Make the visible code, status, time, and action understandable without
  depending on decorative icons or color.
- Reuse existing package behavior and verification surfaces without adding a
  dependency.

**Non-Goals:**

- Generate, validate, rotate, persist, copy, reveal, or submit a token.
- Own a timer, expiration policy, resend cooldown, API request, retry state, or
  authentication result.
- Add arbitrary token lengths, alphanumeric codes, editable OTP inputs, or a
  general-purpose card primitive.

## Decisions

### Use a controlled, domain-specific public API

`DynamicToken` will accept `code: string`, `remainingSeconds: number`,
`status: "active" | "expired"`, `heading: ReactNode`, `description: ReactNode`,
`statusLabel: ReactNode`, `expiryLabel: ReactNode`, `resendLabel: ReactNode`,
`onResend: MouseEventHandler<HTMLButtonElement>`, and optional
`resendDisabled`. It will extend applicable native `section` attributes while
omitting conflicting children, and forward an `HTMLElement` ref.

The code contract is exactly six ASCII digits. The component formats a finite,
non-negative `remainingSeconds` value as zero-padded `MM:SSs`; values below zero
are displayed as zero. Consumers update both props on their own schedule.
Keeping the component controlled avoids hidden timers, stale callbacks, and the
false impression that a design-system primitive owns authentication state.

Default Spanish copy was rejected because all product text should remain
localizable. An internally ticking timer was rejected because it couples
presentation to policy and produces avoidable test and hydration complexity.

### Render one semantic card and one accessible code value

The root will be a `section` labelled by an internally generated heading id and
will receive `ib-dynamic-token` plus the consumer class. The heading row uses a
decorative lock icon, an `h2`, and the existing Badge with success for `active`
or danger for `expired`. Consumers choose the status wording.

Six visual digit cells and the center dash will use `aria-hidden="true"`. A
visually hidden text node will expose the digits separated by spaces so screen
readers announce each digit once and in order. The time will use `role="timer"`
with `aria-live="off"` to avoid interrupting users on every consumer update.
The resend action will be a native `button type="button"` with normal disabled,
focus, keyboard, and click behavior. Lock and timer icons will be imported
internally from the installed Phosphor dependency and will not expand the
curated public icon subpath.

A row of individually accessible digit nodes was rejected because it creates a
noisy browsing experience. A live countdown announcement was rejected because
per-second output is disruptive; consumers can add higher-level expiry
announcements when their flow requires them.

### Normalize the reference to a responsive system treatment

The desktop card will use a 24px radius, 1px neutral border, white surface, 48px
padding, and no resting shadow. The heading uses the 32px/40px semibold role;
the description uses 20px/28px regular text. Digit cells use a 88×104px target
size, warm `#FFF8F4` surface, neutral border, 24px radius, and 48px/56px
semibold indigo numerals. Flexible group spacing preserves the two groups of
three across a wide card.

Below 640px, padding becomes 24px, the header and footer may stack, and digit
cells use `clamp()` down to a 40×56px minimum with tighter gaps. The six cells
stay on one row because a line break could obscure digit order; the responsive
minimums fit a 320px content width. The resend control retains at least 48px of
block size.

Semantic `--intibank-dynamic-token-*` variables will cover surface, border,
heading, description, digit surface/border/foreground, divider, timer accent,
action foreground/hover/focus, and radius. Existing Badge variables remain the
status theming contract. Forced-colors mode will map the card, cells, divider,
icons, and action focus to system colors.

### Extend the established verification path

Public-import unit tests will cover controlled rendering, digit order,
formatting and clamping, active/expired Badge mapping, ref and native attribute
forwarding, resend and disabled behavior, accessibility structure, and lack of
timer side effects. Storybook will include the supplied active state, expired
and disabled states, a narrow viewport, and a theme override. Documentation,
`DESIGN.md`, the Tailwind-free example, and the packed consumer will exercise
the same public contract.

## Risks / Trade-offs

- [A six-digit value could be passed in an invalid shape] → Document the strict
  input contract and cover representative valid values; authentication-domain
  validation remains with the consumer.
- [Screen readers may pronounce grouped numbers inconsistently] → Expose a
  separate digit-spaced text value and hide the visual cells.
- [Large reference dimensions do not fit phones] → Normalize to the design grid
  and use container-responsive cell dimensions and stacked metadata.
- [Frequent consumer updates could create noisy announcements] → Keep the timer
  live region off and leave milestone announcements to the product flow.
- [Internal icons increase the main component bundle] → Import only the two
  tree-shakeable icon modules already covered by the pinned dependency.

## Migration Plan

This is additive. Export DynamicToken and its types, ship its CSS in the existing
stylesheet, and extend documentation and package verification. Rollback consists
of removing the new export, source, styles, stories, tests, and documentation;
no existing component API or stored authentication data changes.
