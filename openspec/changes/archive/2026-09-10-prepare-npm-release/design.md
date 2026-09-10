## Context

See `proposal.md` for motivation. The package already builds ESM, CommonJS, declarations, and compiled CSS, and `pack:check` installs its tarball into a Tailwind-free application. The npm organization `intibank` now exists, while `@intibank/ui` has not been published and therefore cannot yet have a package-level Trusted Publisher configured. The current manual workflow has the required GitHub OIDC permission but invokes pnpm's publish command instead of npm CLI.

## Goals / Non-Goals

**Goals:**

- Make the `0.1.0` tarball self-describing, legally licensed, discoverable, and traceable to its canonical repository.
- Make the automated publication path use npm's documented OIDC client flow and retain explicit maintainer approval through a GitHub environment and manual dispatch.
- Define a safe one-time bootstrap publication and an unambiguous Changesets workflow for later versions.
- Verify release metadata and documentation alongside the existing runtime smoke test.

**Non-Goals:**

- Publishing, staging, deprecating, or modifying an npm package during implementation.
- Creating npm or GitHub environment settings on the user's behalf.
- Automating version pull requests or GitHub releases in this change.
- Changing component APIs, styling, dependencies, or the built artifacts.

## Decisions

### License the repository and package under MIT

Add an MIT license identifying the current copyright holder at the repository root and within `packages/ui`, because npm packs from the package directory and must not depend on an ancestor file being included. Declare `"license": "MIT"` in the package metadata. This favors broad reuse for a public component library. Keeping the project proprietary was rejected because the user selected public distribution; licenses with stronger copyleft requirements were not requested.

### Keep `@intibank/ui@0.1.0` as the initial baseline

The curated Phosphor exports are already part of the unpublished package. Remove their pending changeset instead of applying a minor bump to `0.2.0`; Changesets begins tracking public differences after `0.1.0` is published. Publishing `0.2.0` was rejected because there is no prior registry release to which the icon change must be communicated.

### Put registry documentation beside the package

Add `packages/ui/README.md` containing installation, required CSS import, peer requirements, theming, fonts, icons, and accessibility guidance. Add repository, homepage, issue tracker, license, and focused discovery keywords to `packages/ui/package.json`. The repository URL uses the canonical public GitHub URL and the metadata records `packages/ui` as its directory. Reusing only the monorepo README was rejected because the package tarball intentionally includes files from `packages/ui`, not arbitrary repository-root documentation.

### Publish through npm CLI in the package directory

Keep the workflow manually dispatched on a GitHub-hosted runner with `id-token: write`, but run `npm publish --access public` with `working-directory: packages/ui`. npm CLI is the documented Trusted Publishing client and automatically exchanges the GitHub OIDC identity for short-lived credentials. A persistent `NPM_TOKEN` and pnpm's publication wrapper are rejected for the automated path.

### Separate bootstrap from trusted releases

Document one authenticated local `npm publish --access public` for `0.1.0`, gated by the full repository checks and explicit user confirmation. After the package exists, configure its Trusted Publisher with GitHub user `DavidMarioLC`, repository `intibank-design-system`, workflow `release.yml`, environment `npm`, and direct `npm publish` permission. Later releases require a Changeset, version application, reviewed commit on `main`, and manual workflow approval.

### Verify package identity as part of `pack:check`

Extend the existing installed-tarball inspection to require the expected name/version, MIT declaration, canonical repository fields, non-empty keywords, `README.md`, and `LICENSE`. This keeps metadata checks attached to the exact archive consumers receive rather than only checking source files.

## Risks / Trade-offs

- [The first publication cannot use package-level Trusted Publishing before the package exists] → Require interactive npm authentication with 2FA for the bootstrap only, then configure OIDC immediately afterward.
- [Duplicated MIT text can drift between root and package] → Keep both files identical and verify the package copy is present in the tarball.
- [A manual workflow can attempt to republish an existing version] → Require Changesets versioning before every later dispatch and let npm reject duplicate versions without bypasses.
- [The public name or organization permissions may still be misconfigured] → Verify npm identity and `@intibank` ownership immediately before the separately authorized bootstrap publication.
- [Trusted Publisher fields are case-sensitive and immutable in place] → Document the exact values and require verification before saving them in npm settings.

## Migration Plan

1. Add license, package metadata, package README, workflow, verification, and release documentation changes.
2. Remove the pre-release icon changeset and verify that the candidate remains `0.1.0`.
3. Run all checks and inspect the generated tarball without publishing.
4. Commit and merge the preparation changes to `main`.
5. After separate authorization, authenticate to npm with 2FA and bootstrap `@intibank/ui@0.1.0` from the verified package directory.
6. Configure the npm Trusted Publisher and protected GitHub `npm` environment, then use the manual workflow for subsequent versions.

Before step 5, rollback is an ordinary code revert. After npm publication, versions cannot be reused; corrections require a new patch version, and severe mistakes may require deprecation or unpublish actions governed by npm policy.
