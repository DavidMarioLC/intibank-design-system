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
The package SHALL express its semantic palette, typography, shapes, disabled
state, and institutional Button treatments through documented `--intibank-*`
custom properties with accessible defaults.

#### Scenario: Palette is customized on a subtree
- **WHEN** a consumer redefines supported variables on a container
- **THEN** every Button variant and interaction state inside that container uses the new palette without rebuilding CSS

#### Scenario: Default theme is used
- **WHEN** a consumer loads the stylesheet without overriding custom properties
- **THEN** primary, secondary, hairline, danger, soft, focus, hover, and disabled treatments use the documented Intibank defaults

### Requirement: Consumer-managed fonts
The package SHALL use Hanken Grotesk when available and SHALL NOT initiate a font
download from component JavaScript or distributed CSS.

#### Scenario: Font is not installed
- **WHEN** a consumer renders a component without loading Hanken Grotesk
- **THEN** the component uses the documented system font fallback

### Requirement: Registry-ready package identity
The published package SHALL identify itself as `@intibank/ui`, declare the MIT license, link to the canonical public GitHub repository, provide npm discovery keywords, and include package-specific usage documentation and the license text.

#### Scenario: Maintainer inspects the release tarball
- **WHEN** the package verification command inspects a release candidate
- **THEN** the tarball contains the declared metadata, package README, license, executable exports, declarations, and compiled stylesheet

#### Scenario: User discovers the package on npm
- **WHEN** a user finds `@intibank/ui` in the npm registry
- **THEN** the registry page provides accurate source, issue, documentation, license, and installation information
