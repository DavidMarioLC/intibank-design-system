## Purpose

Defines reproducible quality, documentation, packaging, and guarded delivery
behavior for maintainers of the Intibank component library.

## ADDED Requirements

### Requirement: Reproducible developer workflows
The repository SHALL provide locked commands for development, static checking,
type checking, tests, and production builds without a monorepo orchestrator.

#### Scenario: Clean installation
- **WHEN** a maintainer installs with the frozen pnpm lockfile on Node 24
- **THEN** all workspace dependencies resolve without modifying the lockfile

#### Scenario: Quality commands run
- **WHEN** the documented root check, typecheck, test, and build commands execute
- **THEN** each exits successfully or reports an actionable failure

### Requirement: Public-API Storybook
Storybook SHALL render colocated component stories using only the package's public
JavaScript and compiled stylesheet exports.

#### Scenario: Catalog is built
- **WHEN** the Storybook production build runs
- **THEN** variants, sizes, disabled, icon, interaction, and alternate-palette stories are present

#### Scenario: Accessibility tests run
- **WHEN** Storybook tests execute in Chromium
- **THEN** interaction play functions and configured axe checks fail on violations

### Requirement: Tailwind-free package smoke test
The repository SHALL install its packed tarball into a temporary consumer that has
React and a bundler but does not depend on Tailwind.

#### Scenario: Packed consumer builds
- **WHEN** the package verification command runs
- **THEN** the temporary application installs the tarball, imports Button and CSS, and builds successfully

### Requirement: Guarded future delivery
Release and Pages workflows SHALL be manually triggered and SHALL document all
required external configuration so this delivery publishes or deploys nothing.

#### Scenario: Repository changes are merged
- **WHEN** CI runs on a pull request or main
- **THEN** it verifies formatting, types, tests, builds, and package consumption without publishing
