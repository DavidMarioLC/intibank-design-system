## Purpose

Defines predictable, accessible monetary entry that separates localized visual
presentation from the decimal value consumed by Intibank applications and forms.

## ADDED Requirements

### Requirement: MoneyField public API
The library SHALL export a ref-forwarding `MoneyField` with `PEN` and `es-PE`
defaults, configurable ISO 4217 currency and locale, controlled and uncontrolled
decimal-string values, and applicable TextField labeling, message, class, and
native interaction properties.

#### Scenario: Consumer renders the default field
- **WHEN** a consumer renders MoneyField with a label and no currency or locale override
- **THEN** the component renders an editable PEN field using Peruvian presentation conventions

#### Scenario: Consumer selects another currency
- **WHEN** a consumer supplies another supported ISO 4217 currency and locale
- **THEN** the field uses that currency's symbol placement and fraction precision for the selected locale

#### Scenario: Consumer forwards a ref and classes
- **WHEN** an input ref, input class, or field container class is supplied
- **THEN** the ref addresses the visible editable input and each class is preserved on its documented element

### Requirement: Predictable editing and localized presentation
MoneyField SHALL keep an ungrouped localized decimal draft while focused and
display a grouped localized amount when blurred, without applying currency or
grouping characters to the consumer value.

#### Scenario: Field receives focus
- **WHEN** a field displaying `S/ 1,250.50` receives focus
- **THEN** its editable numeric text becomes `1250.50` while the currency adornment remains visible

#### Scenario: Field loses focus
- **WHEN** the user finishes editing the PEN draft `1250.5` and blurs the field
- **THEN** the field displays `1,250.50` and emits the normalized decimal string `1250.50`

#### Scenario: Locale uses a decimal comma
- **WHEN** the locale uses a comma decimal separator
- **THEN** the focused draft accepts the locale separator while the consumer value uses an ASCII period

#### Scenario: User pastes a formatted amount
- **WHEN** the user pastes an amount containing the active currency symbol, grouping, spacing, and decimal separator
- **THEN** the field extracts the equivalent canonical decimal draft without including presentation characters

#### Scenario: User enters excessive fractional precision
- **WHEN** an edit would exceed the active currency's supported fraction digits
- **THEN** the field rejects the excess edit without rounding or changing the last accepted draft

### Requirement: Decimal-string value contract
MoneyField SHALL expose monetary values as decimal strings and SHALL NOT require
consumers to convert them through binary floating-point numbers.

#### Scenario: Consumer controls the value
- **WHEN** a consumer supplies `value` and handles `onValueChange`
- **THEN** editing follows normal controlled behavior using an unformatted ASCII decimal draft

#### Scenario: Consumer uses a default value
- **WHEN** a consumer supplies `defaultValue` without `value`
- **THEN** the field maintains its own decimal-string value and reports subsequent changes

#### Scenario: Field is cleared
- **WHEN** the user removes all numeric content
- **THEN** the consumer value and submitted value are empty rather than zero

#### Scenario: Negative entry is not enabled
- **WHEN** a user enters a negative sign without the `allowNegative` option
- **THEN** the sign is rejected and the existing draft is preserved

### Requirement: Canonical form submission
MoneyField SHALL submit its canonical decimal value under the supplied name while
keeping localized display text out of submitted form data.

#### Scenario: Named field is submitted while blurred
- **WHEN** a named field displays a localized grouped amount and its form is submitted
- **THEN** the form entry contains only the normalized ASCII decimal value

#### Scenario: Named field is submitted while focused
- **WHEN** a named field is submitted while an accepted decimal draft is focused
- **THEN** the form entry excludes the currency symbol and grouping separator

### Requirement: Monetary accessibility and visual behavior
MoneyField SHALL preserve TextField labeling, messaging, invalid, disabled,
read-only, hover, and focus behavior, identify the active ISO currency to
assistive technology, and render numeric content with stable tabular figures.

#### Scenario: Currency adornment is rendered
- **WHEN** the field shows a localized currency symbol
- **THEN** the symbol is presentational and the associated field name includes the ISO currency code without duplicating the symbol

#### Scenario: Field receives pointer or keyboard focus
- **WHEN** an editable or read-only MoneyField receives focus by clicking its control or using the keyboard
- **THEN** the same Solar Amber focus treatment is displayed without layout shift

#### Scenario: Field is invalid
- **WHEN** the field has an error message or external invalid state
- **THEN** invalid semantics and the documented critical visual treatment are exposed

#### Scenario: Field is disabled or read-only
- **WHEN** MoneyField is disabled or read-only
- **THEN** it preserves the corresponding TextField semantics and distinct visual state
