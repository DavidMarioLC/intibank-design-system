## MODIFIED Requirements

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
