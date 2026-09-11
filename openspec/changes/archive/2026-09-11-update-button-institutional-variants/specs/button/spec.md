## MODIFIED Requirements

### Requirement: Button public API
The library SHALL export a ref-forwarding Button accepting native button behavior,
children, `className`, `disabled`, variants `primary`, `secondary`, `hairline`,
`danger`, `soft`, and compatibility aliases `solid`, `outline`, `ghost`, plus
sizes `sm`, `md`, `lg`.

#### Scenario: Defaults are omitted
- **WHEN** a consumer renders a Button with only children
- **THEN** it renders as a medium primary button with `type="button"`

#### Scenario: Consumer selects an institutional variant
- **WHEN** a consumer selects `primary`, `secondary`, `hairline`, `danger`, or `soft`
- **THEN** the Button renders the corresponding institutional treatment

#### Scenario: Consumer uses a compatibility alias
- **WHEN** a consumer selects `solid`, `outline`, or `ghost`
- **THEN** the Button remains type-safe and renders the mapped institutional treatment

#### Scenario: Consumer composes an icon
- **WHEN** a consumer supplies an SVG and text as children
- **THEN** both are rendered in an aligned button without requiring an icon package

#### Scenario: Consumer forwards a ref and class
- **WHEN** a ref and `className` are supplied
- **THEN** the ref addresses the rendered button and the class is preserved

### Requirement: Accessible activation and focus
The Button SHALL retain native/Base UI keyboard behavior, disabled semantics, and
a visible variant-appropriate focus indicator with at least 3:1 contrast against
adjacent surfaces.

#### Scenario: Keyboard activation
- **WHEN** a focused enabled Button receives Enter or Space
- **THEN** its activation handler runs once

#### Scenario: Disabled activation
- **WHEN** a disabled Button is clicked or activated from the keyboard
- **THEN** its activation handler does not run

#### Scenario: Keyboard focus
- **WHEN** keyboard navigation focuses an enabled Button
- **THEN** a two-pixel focus outline in the active variant's emphasis color is visible with separation from the control

### Requirement: Normalized Intibank design
The Button SHALL implement institutional primary, secondary, hairline, danger,
and soft treatments using the approved Solar Amber, Andean Terracotta, warm
neutral, critical, and amber-tonal palette; Hanken Grotesk; a 16px radius; and
explicit default, hover, focus-visible, and disabled states.

#### Scenario: Supported size is selected
- **WHEN** `sm`, `md`, or `lg` is selected
- **THEN** the rendered control height is respectively 40px, 48px, or 56px

#### Scenario: Variant is selected
- **WHEN** a supported canonical variant or compatibility alias is selected
- **THEN** the Button renders the mapped institutional treatment and its defined interaction states

#### Scenario: Primary variant is enabled
- **WHEN** an enabled primary Button is rendered or hovered
- **THEN** it uses an amber fill with indigo text at rest and a darker amber fill on hover

#### Scenario: Secondary variant is enabled
- **WHEN** an enabled secondary Button is rendered or hovered
- **THEN** it uses a terracotta fill with white text at rest and a darker terracotta fill on hover

#### Scenario: Hairline variant is enabled
- **WHEN** an enabled hairline Button is rendered or hovered
- **THEN** it uses a light border and dark text on a transparent or white surface and a warm neutral hover surface

#### Scenario: Danger variant is enabled
- **WHEN** an enabled danger Button is rendered or hovered
- **THEN** it uses critical text and border colors and a subtle critical hover surface

#### Scenario: Soft variant is enabled
- **WHEN** an enabled soft Button is rendered or hovered
- **THEN** it uses an amber-tonal surface with dark amber text and a stronger tonal hover surface

#### Scenario: Any variant is disabled
- **WHEN** a Button is disabled
- **THEN** it uses the shared warm disabled surface and muted foreground while preserving disabled semantics
