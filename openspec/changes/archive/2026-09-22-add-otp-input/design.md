## Context

See `proposal.md` for motivation. The package already provides labelled native
form controls, semantic CSS variables, and a read-only six-cell DynamicToken.
OtpInput needs similar visual language while preserving browser editing,
autofill, form, and accessibility semantics. The package supports React 18 and
19 and ships compiled CSS without Preflight.

## Goals / Non-Goals

**Goals:**

- Represent six visual positions with one real native input and one accessible
  value.
- Preserve native caret, selection, paste, autofill, form, and ref behavior.
- Keep the value fully controlled and canonicalized to at most six ASCII digits.
- Reflow within compact containers while retaining a clear focus indicator and
  practical pointer target.

**Non-Goals:**

- Generating, sending, verifying, expiring, encrypting, persisting, or
  automatically submitting a code.
- Replacing DynamicToken or combining token display and OTP entry into one API.
- Supporting variable-length, alphanumeric, masked, or multi-field OTPs in the
  first version.

## Decisions

### Use one native input behind six presentational cells

OtpInput will render a single native text input as the semantic and interactive
control, with six `aria-hidden` cells mirroring its controlled value. The input
occupies the segmented control's hit area and the visual cells expose focus and
active-position styling.

This approach was chosen over six independent inputs because native selection,
caret navigation, paste, mobile one-time-code autofill, form submission, and
screen-reader output remain coherent without scripting focus transitions across
multiple fields. It also gives consumers one stable input ref and form value.

### Keep the code controlled and normalize at the input boundary

The public API will require `value` and `onValueChange`. User edits, paste, and
autofill will be normalized to the first six ASCII digits before the callback.
The rendered value will use the same normalization defensively, but the
component will not retain a separate code state. The consumer remains
responsible for accepting updates and for completion or verification logic.

This follows the existing controlled MoneyField pattern while avoiding a
default-value mode that could retain a sensitive value longer than expected.

### Model support and validation after TextField

The API will provide a visible `label`, optional `helperText` and `errorMessage`,
an explicit `invalid` flag, and native `name`, `required`, `disabled`, and
`readOnly` behavior. Error copy replaces helper copy and is connected through
`aria-describedby`; `aria-invalid` reflects the resolved invalid state. The
forwarded ref targets the native input.

### Preserve native one-time-code hints

The input will use text rather than number semantics so leading zeroes, exact
length, selection, and string form values remain intact. Defaults will be
`inputMode="numeric"`, `autoComplete="one-time-code"`, and a numeric pattern,
while compatible native input attributes remain consumer-extensible.

### Use component-local semantic styling

Stable `ib-otp-input` classes and `--intibank-otp-input-*` variables will cover
label, cell surface, border, foreground, focus, invalid, disabled, read-only,
and supporting text. Container queries will reduce gaps and cell dimensions for
narrow parents without changing the six-position order. Forced-colors rules
will retain boundaries and focus visibility.

The visual baseline will reuse the white input surface, warm-neutral border,
deep indigo digits, 0.75rem input radius, institutional amber focus with a
high-contrast indigo outline, red invalid state, and minimum 48px control height
described in `DESIGN.md`, rather than copying the larger read-only DynamicToken
card cells.

## Risks / Trade-offs

- **[Risk] Transparent native text can expose a platform caret that does not
  align with the mirrored cells.** → Hide the text and caret visually while
  styling the active cell and overall focus state; keep the input itself in the
  accessibility tree and full hit area.
- **[Risk] Consumer rejection of controlled updates can make typing appear
  unresponsive.** → Document that consumers must feed `onValueChange` results
  back through `value`, matching other controlled components.
- **[Risk] Password managers and OTP autofill differ across platforms.** → Use
  standard native hints, exercise paste/autofill-shaped input in tests, and do
  not emulate platform services.
- **[Risk] Narrow containers can make six 48px cells exceed available width.** →
  use container-based gap and size reductions while keeping the overall input
  hit area at least 48px high and avoiding horizontal overflow.

## Migration Plan

This is additive. Export OtpInput alongside DynamicToken, update documentation
and package verification, and retain DynamicToken unchanged. Rollback consists
of removing the new export, styles, stories, tests, and documentation before a
release; no stored data or consumer migration is involved.
