## MODIFIED Requirements

### Requirement: Consumable package exports
The package SHALL expose executable JavaScript for ESM and CommonJS consumers,
TypeScript declarations, and a separately importable compiled stylesheet.

#### Scenario: Consumer imports the public API
- **WHEN** an application imports `Avatar`, `Badge`, `Button`, `TextField`, or `MoneyField` from `@intibank/ui`
- **THEN** its bundler resolves executable code and TypeScript resolves declarations

#### Scenario: Consumer imports styles
- **WHEN** an application imports `@intibank/ui/styles.css`
- **THEN** it receives ready-to-use CSS without processing Tailwind directives

### Requirement: Runtime theming
The package SHALL express its semantic palette, typography, shapes, disabled
state, institutional Button treatments, TextField states, Avatar treatment, and
Badge treatments through documented `--intibank-*` custom properties with
accessible defaults.

#### Scenario: Palette is customized on a subtree
- **WHEN** a consumer redefines supported variables on a container
- **THEN** every Avatar treatment, Badge treatment, Button treatment, and TextField state inside that container uses the new palette without rebuilding CSS

#### Scenario: Default theme is used
- **WHEN** a consumer loads the stylesheet without overriding custom properties
- **THEN** Avatar, Badge, Button, and TextField treatments use the documented accessible Intibank defaults
