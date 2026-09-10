## ADDED Requirements

### Requirement: Registry-ready package identity
The published package SHALL identify itself as `@intibank/ui`, declare the MIT license, link to the canonical public GitHub repository, provide npm discovery keywords, and include package-specific usage documentation and the license text.

#### Scenario: Maintainer inspects the release tarball
- **WHEN** the package verification command inspects a release candidate
- **THEN** the tarball contains the declared metadata, package README, license, executable exports, declarations, and compiled stylesheet

#### Scenario: User discovers the package on npm
- **WHEN** a user finds `@intibank/ui` in the npm registry
- **THEN** the registry page provides accurate source, issue, documentation, license, and installation information
