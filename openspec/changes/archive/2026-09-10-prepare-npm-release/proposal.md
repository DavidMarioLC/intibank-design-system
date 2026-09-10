## Why

The `@intibank/ui` package is technically packable but is not yet ready for its first public npm release: it lacks a declared license, registry-facing metadata and package README, and its release workflow does not use npm CLI directly for the configured OIDC trust path. The `@intibank` npm organization now exists, so these remaining contracts can be completed before publishing version `0.1.0`.

## What Changes

- Adopt the MIT license and include license and package-specific documentation in the published tarball.
- Add npm discovery and source metadata for the public GitHub repository while preserving the package name `@intibank/ui` and initial version `0.1.0`.
- Treat the already-implemented Phosphor icon catalog as part of the initial release baseline rather than incrementing an unpublished package to `0.2.0`.
- Update the manual GitHub Actions release workflow to publish with npm CLI through Trusted Publishing/OIDC after running the package verification gates.
- Document the one-time bootstrap publication, exact npm Trusted Publisher fields, protected GitHub environment, and subsequent Changesets workflow.
- Extend package verification to assert required registry metadata and documentation are present in the tarball.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `component-library-contract`: Require registry-facing metadata, license, package documentation, and source links in the published package.
- `quality-and-delivery`: Replace the future-only delivery contract with a guarded first-publication and npm Trusted Publishing workflow.

## Impact

- Affects `packages/ui/package.json`, package documentation and license files, the package verification script, Changesets state, `.github/workflows/release.yml`, and release documentation.
- Establishes MIT as the public license and `@intibank/ui@0.1.0` as the initial release baseline.
- Requires external npm configuration for the `intibank` organization and package, plus a GitHub `npm` environment; implementation will prepare but not perform publication.
