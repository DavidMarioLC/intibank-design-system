# Button Specification

## Purpose

Defines the observable visual and interaction behavior of the initial accessible
Button component across supported variants, sizes, and states.

## Requirements

### Requirement: Button public API
The library SHALL export a ref-forwarding Button accepting native button behavior,
children, `className`, `disabled`, variants `solid`, `outline`, `ghost`, and sizes
`sm`, `md`, `lg`.

#### Scenario: Defaults are omitted
- **WHEN** a consumer renders a Button with only children
- **THEN** it renders as a medium solid button with `type="button"`

#### Scenario: Consumer composes an icon
- **WHEN** a consumer supplies an SVG and text as children
- **THEN** both are rendered in an aligned button without requiring an icon package

#### Scenario: Consumer forwards a ref and class
- **WHEN** a ref and `className` are supplied
- **THEN** the ref addresses the rendered button and the class is preserved

### Requirement: Accessible activation and focus
The Button SHALL retain native/Base UI keyboard behavior, disabled semantics, and
a visible focus indicator with at least 3:1 contrast against adjacent surfaces.

#### Scenario: Keyboard activation
- **WHEN** a focused enabled Button receives Enter or Space
- **THEN** its activation handler runs once

#### Scenario: Disabled activation
- **WHEN** a disabled Button is clicked or activated from the keyboard
- **THEN** its activation handler does not run

#### Scenario: Keyboard focus
- **WHEN** keyboard navigation focuses an enabled Button
- **THEN** an indigo two-pixel focus outline with separation is visible

### Requirement: Normalized Intibank design
The Button SHALL use the prose/component specifications from `DESIGN.md`, including
an amber solid action with indigo text, defined hover color, warm surfaces, crisp
borders, Hanken Grotesk, and a 16px radius.

#### Scenario: Supported size is selected
- **WHEN** `sm`, `md`, or `lg` is selected
- **THEN** the rendered control height is respectively 40px, 48px, or 56px

#### Scenario: Variant is selected
- **WHEN** a supported variant is selected
- **THEN** solid is filled, outline has a perceptible border, and ghost is borderless
