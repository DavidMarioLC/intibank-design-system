## Purpose

Defines a consistent, accessible, and independently consumable icon vocabulary
for Intibank React interfaces without exposing an unbounded upstream catalog.

## ADDED Requirements

### Requirement: Curated public icon API
The package SHALL expose `ArrowRightIcon`, `CheckIcon`, `PlusIcon`, and `XIcon`
from the `@intibank/ui/icons` subpath with executable ESM and CommonJS code and
TypeScript declarations.

#### Scenario: Consumer imports a supported icon
- **WHEN** an application imports a named icon from `@intibank/ui/icons`
- **THEN** its bundler resolves executable code and TypeScript resolves the icon props

#### Scenario: Consumer requests the upstream catalog
- **WHEN** an application needs an icon outside the curated Intibank exports
- **THEN** the documented integration directs it to depend on Phosphor explicitly rather than exposing every upstream icon through Intibank UI

### Requirement: Composable visual conventions
Curated icons SHALL inherit text color through `currentColor`, accept SVG and
Phosphor presentation props, and default to the regular visual weight. Button
SHALL continue accepting arbitrary React children rather than requiring a curated
icon type.

#### Scenario: Curated icon is composed inside Button
- **WHEN** a consumer places a curated icon and label inside Button
- **THEN** the icon inherits the button color and uses the button's normalized icon size and spacing

#### Scenario: Consumer supplies another icon source
- **WHEN** a consumer supplies a compatible SVG or third-party icon as Button children
- **THEN** Button renders it without requiring conversion to an Intibank icon

### Requirement: Accessible icon usage
Documentation and examples SHALL hide decorative icons from assistive technology
and SHALL give an explicit accessible name to any button whose visible content is
only an icon.

#### Scenario: Icon accompanies a visible label
- **WHEN** an icon is rendered next to text that already communicates the action
- **THEN** the icon is excluded from the accessibility tree

#### Scenario: Button contains only an icon
- **WHEN** a Button has no visible text label
- **THEN** the Button exposes an accessible name and the decorative icon does not create a duplicate name

### Requirement: Tailwind-independent package consumption
Curated icons SHALL install and render through the packed `@intibank/ui` package
without requiring the consumer to install or configure Tailwind CSS.

#### Scenario: Packed package is installed in the smoke application
- **WHEN** the Tailwind-free consumer imports Button, a curated icon, and the compiled stylesheet
- **THEN** the production application builds successfully with icon runtime code, declarations, and styles resolved from public exports
