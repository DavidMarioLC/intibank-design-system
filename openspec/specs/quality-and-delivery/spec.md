# Quality and Delivery Specification

## Purpose

Defines reproducible quality, documentation, packaging, and guarded delivery
behavior for maintainers of the Intibank component library.

## Requirements

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
- **THEN** focused Avatar, Badge, Button, TextField, and MoneyField stories cover their documented variants, states, formatting, focus, and interactions

#### Scenario: Accessibility tests run
- **WHEN** Storybook tests execute in Chromium
- **THEN** interaction play functions and configured axe checks fail on violations

### Requirement: Tailwind-free package smoke test
The repository SHALL install its packed tarball into a temporary consumer that has
React and a bundler but does not depend on Tailwind.

#### Scenario: Packed consumer builds
- **WHEN** the package verification command runs
- **THEN** the temporary application installs the tarball, imports Avatar, Badge, Button, TextField, MoneyField, and CSS, and builds them successfully without Tailwind

### Requirement: Guarded future delivery
Release and Pages workflows SHALL remain manually triggered, SHALL run verification before external delivery, and SHALL use short-lived npm Trusted Publishing credentials for automated package releases without storing a persistent publish token.

#### Scenario: Repository changes are merged
- **WHEN** CI runs on a pull request or main
- **THEN** it verifies formatting, types, tests, builds, and package consumption without publishing

#### Scenario: Initial package release is prepared
- **WHEN** maintainers prepare the first public npm release
- **THEN** documentation distinguishes the one-time authenticated bootstrap publication from subsequent Trusted Publishing releases and preserves version `0.1.0` as the initial baseline

#### Scenario: Automated npm release is requested
- **WHEN** an authorized maintainer triggers the release workflow after Trusted Publishing is configured
- **THEN** the workflow verifies the release candidate and invokes npm CLI from the package directory using GitHub Actions OIDC

#### Scenario: Release workflow lacks external trust
- **WHEN** the npm package, trusted publisher, or protected GitHub environment is not configured
- **THEN** the repository documentation identifies the missing external prerequisite and no persistent npm publication token is required
