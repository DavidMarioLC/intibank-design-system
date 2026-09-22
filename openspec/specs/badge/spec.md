# Badge Specification

## Purpose

Defines a compact, accessible status label that communicates semantic state
through readable text, a decorative indicator, and Intibank's pill treatments.

## Requirements

### Requirement: Badge public API
The library SHALL export a ref-forwarding `Badge` that accepts consumer-provided
label content, a required semantic variant, consumer classes, and applicable
native element attributes.

#### Scenario: Consumer renders a status
- **WHEN** a consumer renders Badge with a semantic variant and label content
- **THEN** the label appears inside a non-interactive status pill

#### Scenario: Consumer forwards a ref and attributes
- **WHEN** a consumer supplies an element ref, native attribute, or custom class
- **THEN** each is preserved on the rendered Badge element

### Requirement: Semantic Badge variants
Badge SHALL provide success, warning, and danger variants that communicate state
with distinct background, foreground, border, and indicator treatments.

#### Scenario: Success status is rendered
- **WHEN** a consumer selects the success variant for an active status
- **THEN** the Badge uses the approved green treatment

#### Scenario: Warning status is rendered
- **WHEN** a consumer selects the warning variant for a pending status
- **THEN** the Badge uses the approved amber treatment

#### Scenario: Danger status is rendered
- **WHEN** a consumer selects the danger variant for a rejected status
- **THEN** the Badge uses the approved red treatment

### Requirement: Accessible Badge content
Badge SHALL expose its consumer-provided label as ordinary text content and
SHALL keep the circular status indicator out of the accessibility tree.

#### Scenario: Badge is announced
- **WHEN** assistive technology encounters a Badge
- **THEN** it announces the visible label without additional indicator content

#### Scenario: Badge is inspected for interaction
- **WHEN** a user navigates interactive controls
- **THEN** the Badge does not introduce a focusable or actionable element

### Requirement: Institutional Badge treatment
Badge SHALL render a 40px fully rounded pill with a 12px circular indicator,
20px semibold Hanken Grotesk text, 12px internal gap, and 24px inline padding
through documented semantic custom properties.

#### Scenario: Default theme is used
- **WHEN** Badge renders without theme overrides
- **THEN** its dimensions, typography, colors, borders, and spacing match the approved visual references

#### Scenario: Badge theme is customized
- **WHEN** a consumer overrides supported Badge custom properties on a subtree
- **THEN** Badges in that subtree use the customized treatments without rebuilding CSS
