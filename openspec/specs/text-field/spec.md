# Text Field Specification

## Purpose

Defines a reusable, accessible single-line field that gives Intibank forms
consistent labeling, messaging, adornments, and institutional visual states.

## Requirements

### Requirement: TextField public API
The library SHALL export a ref-forwarding `TextField` that accepts a label,
optional marker, helper text, error message, non-interactive leading and trailing
adornments, consumer classes, and applicable native input properties.

#### Scenario: Consumer renders a basic field
- **WHEN** a consumer renders `TextField` with a label and native input properties
- **THEN** the component renders a single-line input with those properties and the label visible above it

#### Scenario: Field is optional
- **WHEN** the `optional` option is enabled
- **THEN** the visible label includes the localized `(Opcional)` marker without changing native required semantics

#### Scenario: Consumer forwards a ref and classes
- **WHEN** an input ref, input class, or field container class is supplied
- **THEN** the ref addresses the rendered input and each class is preserved on its documented element

#### Scenario: Consumer controls the value
- **WHEN** native controlled or uncontrolled value properties and change handlers are supplied
- **THEN** the input follows normal React text-input behavior

### Requirement: Accessible labeling and messaging
TextField SHALL associate its label and visible supporting message with the input,
expose invalid state to assistive technology, and preserve native disabled,
read-only, required, name, and autocomplete semantics.

#### Scenario: Identifier is omitted
- **WHEN** a consumer does not provide an input identifier
- **THEN** the component generates a stable identifier and associates the visible label with the input

#### Scenario: Helper text is present
- **WHEN** helper text is supplied and the field is valid
- **THEN** the helper text is visible and included in the input's accessible description

#### Scenario: Validation error is present
- **WHEN** an error message is supplied or the field is marked invalid
- **THEN** the field exposes invalid semantics and the visible error message replaces helper text in the accessible description

#### Scenario: Label is activated
- **WHEN** a user activates the visible label
- **THEN** focus moves to the associated input

### Requirement: Prefix and suffix adornments
TextField SHALL render optional, non-interactive prefix and suffix content inside
the control boundary without changing the submitted input value or accessible
name.

#### Scenario: Currency prefix is supplied
- **WHEN** a consumer provides `S/.` as a leading adornment
- **THEN** the prefix is visible before the editable value and is excluded from the submitted value

#### Scenario: Trailing adornment is supplied
- **WHEN** a consumer provides a trailing adornment
- **THEN** it remains aligned inside the field without covering editable text

### Requirement: Institutional visual states
TextField SHALL use Hanken Grotesk, fill its container, and render the approved
white surface, warm hairline border, dark text, 12px radius, spacious 64px control,
and explicit hover, focus-visible, invalid, disabled, and read-only states.

#### Scenario: Field is at rest
- **WHEN** an enabled editable TextField is not focused
- **THEN** it has a white surface, one-pixel warm border, dark text, and the label appears above the control

#### Scenario: Field receives keyboard or pointer focus
- **WHEN** the input receives focus
- **THEN** the control boundary displays a two-pixel Solar Amber focus treatment without changing layout

#### Scenario: Field is invalid
- **WHEN** the field is invalid
- **THEN** the control and error message use the documented critical emphasis with sufficient contrast

#### Scenario: Field is disabled
- **WHEN** the input is disabled
- **THEN** the field uses the shared warm disabled treatment and remains non-editable

#### Scenario: Field is read-only
- **WHEN** the input is read-only
- **THEN** its value remains selectable, cannot be edited, and has a visually distinct read-only treatment
