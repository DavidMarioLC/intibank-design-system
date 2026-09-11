## MODIFIED Requirements

### Requirement: Public-API Storybook
Storybook SHALL render colocated component stories using only the package's public
JavaScript and compiled stylesheet exports.

#### Scenario: Catalog is built
- **WHEN** the Storybook production build runs
- **THEN** individual canonical variant, sizes, hover, focus-visible, disabled, icon, and interaction stories are present

#### Scenario: Accessibility tests run
- **WHEN** Storybook tests execute in Chromium
- **THEN** interaction play functions and configured axe checks fail on violations

### Requirement: Tailwind-free package smoke test
The repository SHALL install its packed tarball into a temporary consumer that has
React and a bundler but does not depend on Tailwind.

#### Scenario: Packed consumer builds
- **WHEN** the package verification command runs
- **THEN** the temporary application installs the tarball, imports Button and CSS, uses an institutional variant and a compatibility alias, and builds successfully
