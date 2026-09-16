## Context

See `proposal.md` for motivation and `specs/money-field/spec.md` for observable
behavior. TextField already owns accessible labels, messages, adornments, native
states, and institutional focus styling. Its current design deliberately excludes
formatting, masking, parsing, and validation. `DESIGN.md` separately calls for
monetary prefixes and tabular financial figures.

MoneyField must therefore add a monetary value layer without changing TextField's
generic native-input contract. The package supports React 18 and 19, ships no
global reset, and exposes compiled CSS separately from JavaScript.

## Goals / Non-Goals

**Goals:**

- Keep application and submitted values free of currency and grouping tokens.
- Support controlled and uncontrolled entry without converting monetary values
  through JavaScript `number`.
- Make PEN in `es-PE` effortless while allowing other ISO currencies and locales.
- Reuse the existing field accessibility, state, theming, and public-export
  architecture.

**Non-Goals:**

- Arithmetic, exchange-rate conversion, account balance limits, or domain
  validation such as available-funds checks.
- Live grouping after every keystroke or a generalized input-mask framework.
- Arbitrary precision beyond the active currency's fraction digits.
- Non-ISO assets such as cryptocurrencies in the first version.

## Decisions

### Compose TextField instead of adding a formatting mode

MoneyField will render TextField as its visible control and own the monetary state
adapter around it. It will forward its ref to the visible input, combine stable
`ib-money-field` classes with consumer classes, and delegate label, helper/error,
invalid, disabled, read-only, required, and focus behavior. This keeps TextField's
native value contract unchanged and avoids duplicating Base UI Field wiring.

A `format="money"` TextField option was rejected because it would make the
meaning of native `value`, `defaultValue`, `onChange`, and `name` conditional.
A new low-level field shell may be extracted later only if a second specialized
field proves composition insufficient.

### Use a decimal draft string as the public value

`value`, `defaultValue`, and `onValueChange` will use an ASCII decimal draft such
as `"1250.50"`, `"1250."`, or `""`. MoneyField will not expose native `onChange`
or accept native `type`, `inputMode`, or adornment overrides; it owns those
details. A blur normalizes incomplete but recoverable drafts, removes redundant
leading zeros, and pads to the currency fraction precision, notifying controlled
consumers when normalization changes the value.

This contract preserves user intent during editing and avoids binary
floating-point arithmetic. A `number` API was rejected because even UI-only
conversion encourages consumers to reuse imprecise values in financial logic.
Minor-unit integers were considered but make empty and in-progress decimal entry
awkward and require consumers to know each currency exponent.

### Separate the visible input from canonical form submission

When `name` is supplied, MoneyField will give that name to a hidden input whose
value is the canonical accepted decimal; the visible TextField will remain
unnamed. This prevents localized text such as `1,250.50` from reaching FormData.
The hidden value will be derived without focus or blur dependency so an Enter-key
submission remains canonical.

### Format on blur and ungroup on focus

While focused, the visible input will contain ungrouped digits and the active
locale's decimal separator. On blur it will contain grouped digits padded to the
currency's fraction precision. The currency token remains a non-interactive
TextField adornment in the prefix or suffix position reported by
`Intl.NumberFormat.formatToParts`.

Avoiding live grouping keeps caret movement, deletion, mobile keyboards, and IME
behavior predictable. Paste handling will remove the active currency token,
spaces, and grouping separator, translate the locale decimal separator to `.`,
and accept the result only when it matches the supported draft grammar and
fraction precision. Excess precision and disallowed negative signs leave the last
accepted draft unchanged instead of rounding silently.

Formatting will pass decimal strings to `Intl.NumberFormat` so presentation does
not require application values to pass through `number`. Locale punctuation,
currency placement, and fraction metadata come from `formatToParts` and
`resolvedOptions`, not hard-coded PEN assumptions.

### Expose currency context without polluting the value

The visible currency adornment remains `aria-hidden` through TextField. MoneyField
will append visually hidden ISO context such as `(PEN)` to the supplied label, so
the accessible name identifies the currency while the input value and FormData do
not include the symbol. Consumers may still provide helper or error text for
domain-specific explanations.

### Reuse TextField variables and add only monetary typography

MoneyField will use the existing `--intibank-text-field-*` semantic variables and
state selectors. A prefixed `ib-money-field` hook will enable `font-variant-numeric:
tabular-nums` for the input and currency adornment. No duplicate surface, border,
focus, or disabled variables will be introduced.

## Risks / Trade-offs

- [Controlled consumers may reject the blur normalization update] → Keep the
  display derived from the received value and document that controlled owners
  must accept `onValueChange` updates, matching normal controlled-input rules.
- [Some locales use non-Latin numerals or unusual spacing] → Scope editable input
  to ASCII digits plus active locale punctuation while using Intl for display;
  add broader digit transliteration only with a concrete product requirement.
- [A currency symbol such as `$` is ambiguous] → Include the ISO code in the
  accessible name and keep `currency` explicit in the public API.
- [Intl support varies for malformed currency or locale identifiers] → Treat
  unsupported configuration as a developer error and let construction fail
  clearly instead of silently falling back to another currency.
- [TextField composition may expose styling coupling] → Limit selectors to stable
  public `ib-` classes and introduce a shared internal shell only if duplication
  or override pressure appears during implementation.
