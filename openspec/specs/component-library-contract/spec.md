# Component Library Contract Specification

## Purpose

Defines the stable package and styling contract that lets React applications use
Intibank components without installing or configuring Tailwind CSS.

## Requirements

### Requirement: Consumable package exports
The package SHALL expose executable JavaScript for ESM and CommonJS consumers,
TypeScript declarations, and a separately importable compiled stylesheet.

#### Scenario: Consumer imports the public API
- **WHEN** an application imports `Button` from `@intibank/ui`
- **THEN** its bundler resolves executable code and TypeScript resolves declarations

#### Scenario: Consumer imports styles
- **WHEN** an application imports `@intibank/ui/styles.css`
- **THEN** it receives ready-to-use CSS without processing Tailwind directives

### Requirement: Isolated styles
The distributed stylesheet SHALL style Intibank components without resetting or
changing unrelated host application elements.

#### Scenario: Styles are loaded into an existing application
- **WHEN** a consumer loads the distributed stylesheet
- **THEN** selectors target prefixed Intibank classes and no global reset is applied

### Requirement: Runtime theming
The package SHALL express its semantic palette, typography, shapes, and disabled
state through `--intibank-*` custom properties with documented defaults.

#### Scenario: Palette is customized on a subtree
- **WHEN** a consumer redefines supported variables on a container
- **THEN** buttons inside that container use the new palette without rebuilding CSS

### Requirement: Consumer-managed fonts
The package SHALL use Hanken Grotesk when available and SHALL NOT initiate a font
download from component JavaScript or distributed CSS.

#### Scenario: Font is not installed
- **WHEN** a consumer renders a component without loading Hanken Grotesk
- **THEN** the component uses the documented system font fallback
