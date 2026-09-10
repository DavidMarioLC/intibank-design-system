## MODIFIED Requirements

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
