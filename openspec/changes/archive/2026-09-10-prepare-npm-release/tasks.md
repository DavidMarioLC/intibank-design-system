## 1. Package identity and release baseline

- [x] 1.1 Add identical MIT license files for the repository and publishable package using the 2026 Intibank contributors attribution.
- [x] 1.2 Add license, repository, homepage, issue tracker, and focused npm discovery keywords to `packages/ui/package.json` without changing version `0.1.0`.
- [x] 1.3 Add a package-specific README covering installation, CSS, peers, theming, fonts, icons, accessibility, and public exports.
- [x] 1.4 Remove the pending Phosphor changeset so the existing icon catalog remains part of the unpublished `0.1.0` baseline.

## 2. Trusted release workflow

- [x] 2.1 Change the manual npm workflow to run `npm publish --access public` from `packages/ui` while retaining GitHub OIDC permissions, the protected `npm` environment, and verification gates.
- [x] 2.2 Update release documentation with the one-time 2FA bootstrap, exact Trusted Publisher fields, required GitHub environment, Changesets steps for later versions, and explicit no-token policy.

## 3. Package verification

- [x] 3.1 Extend `pack:check` to validate package name and version, MIT metadata, canonical repository links, keywords, README, and license in the installed tarball.
- [x] 3.2 Confirm the tarball still excludes stories, tests, source files, Tailwind tooling, and unrelated monorepo files.

## 4. Release-candidate validation

- [x] 4.1 Run OpenSpec validation, formatting/lint checks, type checking, unit and Storybook tests, and full production builds.
- [x] 4.2 Run the Tailwind-free tarball installation check and inspect the npm dry-run contents without publishing.
- [x] 4.3 Verify the repository remains at `@intibank/ui@0.1.0` and document all external steps that remain before the first publication.
