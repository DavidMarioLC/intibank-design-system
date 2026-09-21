# Avatar Specification

## Purpose

Defines a reusable identity marker that presents user-provided initials with
consistent sizing, accessible semantics, and Intibank's warm visual language.

## Requirements

### Requirement: Avatar public API
The library SHALL export a ref-forwarding `Avatar` that accepts initials, a
supported size, consumer classes, and applicable native element attributes.

#### Scenario: Consumer renders initials
- **WHEN** a consumer renders Avatar with one or two initials
- **THEN** the initials appear centered inside a non-interactive identity marker

#### Scenario: Consumer forwards a ref and attributes
- **WHEN** a consumer supplies an element ref, native attribute, or custom class
- **THEN** each is preserved on the rendered Avatar element

### Requirement: Avatar sizes
Avatar SHALL provide small, medium, and large sizes while preserving a square
shape and proportional initials, with medium as the default.

#### Scenario: Size is omitted
- **WHEN** a consumer renders Avatar without a size
- **THEN** the medium dimensions and typography are applied

#### Scenario: Supported size is selected
- **WHEN** a consumer selects the small, medium, or large size
- **THEN** the matching dimensions and proportional initials are applied without changing the rounded-square silhouette

### Requirement: Accessible identity
Avatar SHALL remain non-interactive and SHALL expose a consumer-provided
accessible label as the identity description without duplicating the visible
initials for assistive technology.

#### Scenario: Accessible label is supplied
- **WHEN** a consumer supplies an accessible label naming the represented person or account
- **THEN** assistive technology identifies the Avatar by that label and does not announce the initials separately

#### Scenario: Accessible label is omitted
- **WHEN** a consumer does not supply an accessible label
- **THEN** the visible initials remain available as ordinary text content

### Requirement: Institutional Avatar treatment
Avatar SHALL render a warm ivory surface, soft neutral border, dark brown
initials, rounded-square corners, and centered Hanken Grotesk typography through
documented semantic custom properties.

#### Scenario: Default theme is used
- **WHEN** Avatar renders without theme overrides
- **THEN** its color, border, shape, and typography match the approved visual reference

#### Scenario: Avatar theme is customized
- **WHEN** a consumer overrides supported Avatar custom properties on a subtree
- **THEN** Avatars in that subtree use the customized treatment without rebuilding CSS
