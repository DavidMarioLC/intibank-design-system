## Context

See `proposal.md` for motivation. The package currently exposes Button as its only
form control and already ships Base UI, React 18/19-compatible ref forwarding,
prefixed component CSS, semantic custom properties, and public-export Storybook
tests. `DESIGN.md` defines a white input surface, warm hairline border, 12px radius,
and Solar Amber active border. The supplied visual reference adds a bold label,
spacious single-line control, and large inset text.

The proposal intentionally expands the original Button-only delivery boundary at
the user's request while preserving the existing package architecture.

## Goals / Non-Goals

**Goals:**

- Provide one composed TextField API that is easy to use correctly in application
  forms and forwards native input behavior.
- Keep labels, descriptions, errors, and external validation state connected by
  Base UI Field semantics.
- Let consumers theme every meaningful visual state without rebuilding CSS.
- Match the reference at flexible widths without encoding its captured viewport.

**Non-Goals:**

- Formatting, masking, parsing, or validating currency and other domain values.
- Multiline text, password reveal controls, clear buttons, or interactive
  adornments.
- A public compound-component API in this first version.

## Decisions

### Compose Base UI Field behind a single Intibank component

`TextField` will compose `Field.Root`, `Field.Label`, `Field.Control`,
`Field.Description`, and `Field.Error` from the installed Base UI dependency. This
keeps accessible relationships and field state aligned with the existing behavior
layer while presenting consumers with one stable API. A native-only composition
was considered, but it would duplicate identifier, description, and validation
wiring that Base UI already provides.

The public props will extend applicable native input properties and add `label`,
`optional`, `helperText`, `errorMessage`, `startAdornment`, `endAdornment`, and
`fieldClassName`. `className` applies to the input itself, and the forwarded ref
targets that input. `errorMessage` implies invalid state; an explicit `invalid`
option supports external validators that do not yet expose message copy.

### Put adornments and the input inside one visual control

A non-semantic control wrapper will own the border, surface, radius, focus, and
horizontal alignment. Base UI's input remains borderless inside it, while
presentational adornment spans sit before or after the input. The adornments are
non-interactive and hidden from the accessibility tree so content such as `S/.`
does not pollute the field name or value. Interactive buttons inside adornments
are deferred because they require a separate keyboard and labeling contract.

### Prefer generated associations with consumer override

The component will use the consumer's `id` when present and otherwise create a
stable React identifier. Base UI will associate label, description, and error
parts with the control. When an error is visible it replaces helper text, avoiding
two competing support messages. Native `required`, `disabled`, `readOnly`, `name`,
and autocomplete properties pass through unchanged.

### Normalize the screenshot into reusable dimensions

The default root fills its available inline size. The visual control is 64px high,
uses 24px horizontal padding, 20px input text, and a 12px radius. The label uses the
existing typeface and a strong 16px treatment with 12px separation. These values
preserve the screenshot's proportions while following the explicit 12px input
radius in `DESIGN.md`.

Default borders remain 1px. Focus is drawn as a 2px inset treatment so layout does
not move. Invalid focus uses critical emphasis; disabled and read-only treatments
remain distinguishable without relying on opacity alone. All colors and state
styles resolve through `--intibank-text-field-*` custom properties under prefixed
`ib-text-field` selectors.

### Verify behavior through public exports

Unit tests will cover refs, classes, native value behavior, label activation,
message semantics, invalid state, adornments, disabled, and read-only behavior.
Focused Storybook stories will exercise visual states and run axe in Chromium.
The example and packed temporary consumer will import TextField from
`@intibank/ui`, proving declarations, JavaScript, and compiled CSS work without
Tailwind in the consuming app.

## Risks / Trade-offs

- [A 64px default is intentionally spacious and may be large in dense layouts] →
  Keep the component width easy to constrain and add a compact size only when a
  concrete design is approved.
- [Presentational adornments cannot contain usable controls] → Document the
  boundary and introduce interactive end actions through a separate future API.
- [External validators may supply invalid state before message text] → Support an
  explicit invalid option while keeping error-message behavior deterministic.
- [Consumer CSS could reduce focus or error contrast] → Ship accessible defaults
  and run Storybook axe checks against all documented states.
