## Purpose

Defines a controlled, accessible card for presenting a short-lived dynamic
token, its current validity, remaining time, and resend action.

## ADDED Requirements

### Requirement: DynamicToken public API
The library SHALL export a ref-forwarding `DynamicToken` that accepts a
consumer-provided six-digit code, heading, description, status label, remaining
seconds, expiry label, resend label, resend callback, native section attributes,
and consumer classes.

#### Scenario: Consumer renders a dynamic token
- **WHEN** a consumer supplies the required content and controlled values
- **THEN** DynamicToken presents them inside a single token card

#### Scenario: Consumer forwards a ref and section attributes
- **WHEN** a consumer supplies an element ref, native attribute, or custom class
- **THEN** each is preserved on the rendered DynamicToken section

### Requirement: Controlled security data
DynamicToken SHALL present the code and remaining seconds exactly from consumer
state and SHALL NOT generate, persist, rotate, schedule, validate, or transmit
authentication data.

#### Scenario: Consumer updates the token
- **WHEN** the consumer supplies a different code or remaining-seconds value
- **THEN** DynamicToken reflects the new controlled value

#### Scenario: Component renders without side effects
- **WHEN** DynamicToken is mounted or unmounted
- **THEN** it starts no countdown, stores no token, and makes no network request

### Requirement: Accessible token presentation
DynamicToken SHALL visually group the six digits as two groups of three while
exposing the code as one ordered, digit-by-digit text value to assistive
technology. Decorative lock, timer, separator, and digit-cell treatments SHALL
remain outside the accessibility tree.

#### Scenario: Assistive technology reads the code
- **WHEN** a screen reader encounters the token value
- **THEN** it receives the six digits once and in their visible order

#### Scenario: Visual token is inspected
- **WHEN** a sighted user views the code
- **THEN** six distinct cells and a non-semantic separator make the two groups legible

### Requirement: Status, expiry, and resend behavior
DynamicToken SHALL present an active or expired status through the existing
semantic Badge treatment, format non-negative remaining seconds as `MM:SSs`,
and expose a native button that invokes the consumer resend callback unless the
consumer disables it.

#### Scenario: Active token is rendered
- **WHEN** the consumer selects active status with remaining time
- **THEN** the card shows the supplied active label with the success treatment and the formatted remaining time

#### Scenario: Expired token is rendered
- **WHEN** the consumer selects expired status
- **THEN** the card shows the supplied expired label with the danger treatment

#### Scenario: User requests another code
- **WHEN** the user activates the enabled resend control
- **THEN** the consumer resend callback runs once

#### Scenario: Resend is unavailable
- **WHEN** the consumer disables the resend control
- **THEN** the native button is disabled and cannot invoke the callback

### Requirement: Institutional DynamicToken treatment
DynamicToken SHALL use the approved bordered card, indigo heading, muted
guidance, warm digit cells, amber timing accent, divider, and text action through
documented semantic custom properties, and SHALL reflow without horizontal
overflow on narrow viewports.

#### Scenario: Default theme is used
- **WHEN** DynamicToken renders without theme overrides
- **THEN** its hierarchy, colors, spacing, typography, and grouped code match the approved reference

#### Scenario: Narrow viewport is used
- **WHEN** the available inline size cannot fit the desktop arrangement
- **THEN** the header, digits, and footer reflow while the six-digit order and controls remain usable

#### Scenario: DynamicToken theme is customized
- **WHEN** a consumer overrides supported DynamicToken custom properties on a subtree
- **THEN** cards in that subtree use the customized treatment without rebuilding CSS
