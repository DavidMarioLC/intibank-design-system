## Purpose

Defines an accessible, editable one-time-password field for entering a six-digit
verification code received through a separate trusted channel.

## ADDED Requirements

### Requirement: Controlled six-digit value
OtpInput SHALL expose a controlled value containing zero through six ASCII
digits and SHALL request updates through a value-change callback without
generating, verifying, persisting, or transmitting the code.

#### Scenario: Consumer supplies a partial value
- **WHEN** a consumer renders OtpInput with a value containing fewer than six digits
- **THEN** the supplied digits appear in order and the remaining visual positions stay empty

#### Scenario: User enters a digit
- **WHEN** the editable field receives an ASCII digit while fewer than six digits are present
- **THEN** OtpInput requests the resulting canonical digit string from the consumer

#### Scenario: Unsupported characters are entered
- **WHEN** input, paste, or autofill includes non-ASCII-digit characters or more than six digits
- **THEN** OtpInput requests at most the first six ASCII digits and does not expose unsupported characters as its value

#### Scenario: Consumer updates the value
- **WHEN** the controlled value changes after user input, reset, or external application logic
- **THEN** every visual position reflects the new value without retaining an independent code value

### Requirement: Familiar editing behavior
OtpInput SHALL support native text selection and replacement, forward and
backward caret movement, deletion, complete-code paste, and one-time-code
autofill through one logical editable field.

#### Scenario: User types consecutive digits
- **WHEN** the user enters digits without manually moving the caret
- **THEN** each digit fills the next visual position in sequence

#### Scenario: User navigates or deletes
- **WHEN** the user uses arrow keys, Backspace, Delete, Home, or End
- **THEN** the caret and value change according to familiar single-field editing behavior

#### Scenario: User replaces selected content
- **WHEN** the user selects part or all of the code and enters new digits
- **THEN** the selected range is replaced and the canonical result is reported to the consumer

#### Scenario: User pastes a code
- **WHEN** the user pastes a value containing six digits
- **THEN** all six visual positions are populated in order through one value-change request

#### Scenario: Mobile or platform autofill is available
- **WHEN** the platform offers a numeric keyboard or one-time-code autofill
- **THEN** the underlying field exposes the appropriate native input and autocomplete hints

### Requirement: One accessible field with segmented presentation
OtpInput SHALL present six visible positions while exposing one labelled input
to assistive technology so the code, requirement state, and supporting message
are not announced as six unrelated fields.

#### Scenario: Assistive technology explores the component
- **WHEN** a user navigates to OtpInput with a screen reader
- **THEN** one textbox is announced with its visible label, current value, requirement state, and applicable helper or error description

#### Scenario: Visual positions are rendered
- **WHEN** OtpInput displays its segmented treatment
- **THEN** the six visual positions are hidden from the accessibility tree and do not duplicate the editable value

#### Scenario: Focus enters the field
- **WHEN** any visual position is clicked or the field receives keyboard focus
- **THEN** the single editable field receives focus and the segmented presentation exposes a visible focus treatment

### Requirement: Form and validation semantics
OtpInput SHALL support native form naming, required, disabled, and read-only
behavior plus consumer-managed invalid state and localized helper or error text.

#### Scenario: Named value is submitted
- **WHEN** a named OtpInput participates in form submission
- **THEN** the form contributes one canonical six-digit-or-shorter string under the supplied name

#### Scenario: Field is required
- **WHEN** OtpInput is required and has no value
- **THEN** the underlying input exposes native required semantics

#### Scenario: Field is disabled or read-only
- **WHEN** a consumer marks OtpInput disabled or read-only
- **THEN** editing is prevented and the corresponding native input semantics and visual treatment are exposed

#### Scenario: Field is invalid
- **WHEN** a consumer provides invalid state or an error message
- **THEN** the field is exposed as invalid, the localized error replaces helper text, and the message is programmatically associated with the input

### Requirement: Consumer extension contract
OtpInput SHALL forward an input ref and supported native input attributes, append
consumer classes to stable prefixed component classes, and use documented
semantic custom properties without relying on host Tailwind configuration.

#### Scenario: Consumer focuses through a ref
- **WHEN** a consumer calls focus on the forwarded ref
- **THEN** the editable OTP field receives focus

#### Scenario: Consumer extends the component
- **WHEN** a consumer supplies supported native attributes or custom classes and overrides documented OtpInput variables
- **THEN** the attributes, classes, and theme overrides apply without removing stable component behavior or rebuilding the distributed CSS

### Requirement: Security responsibility boundary
OtpInput SHALL remain a presentation and input component and SHALL NOT own code
delivery, verification, retry policy, expiration, analytics, or secret storage.

#### Scenario: A code reaches six digits
- **WHEN** the controlled value becomes six digits long
- **THEN** OtpInput reports the value change but does not automatically submit, verify, store, or transmit the code
