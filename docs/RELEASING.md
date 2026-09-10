# Release and deployment

Repository preparation and verification never publish automatically. npm and
documentation deployments remain explicit maintainer actions.

## Initial npm release: `@intibank/ui@0.1.0`

The first publication creates the package, so package-level Trusted Publishing
cannot be configured beforehand. Complete this one-time bootstrap locally with
an npm account that owns the `intibank` organization and has two-factor
authentication enabled.

From the repository root:

```sh
npm login
npm whoami
pnpm check
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
```

Inspect the dry-run contents without publishing:

```sh
pnpm --filter @intibank/ui publish --dry-run
```

Only after the checks and contents are approved, publish from the package
directory with an interactive 2FA confirmation:

```sh
cd packages/ui
npm publish --access public
```

Publishing is irreversible at the version level. Confirm that the candidate is
still named `@intibank/ui` with version `0.1.0` before running the final command.

## Trusted Publishing setup

After the package exists, open its settings on npm and add a GitHub Actions
Trusted Publisher with these case-sensitive values:

| Field | Value |
| --- | --- |
| Organization or user | `DavidMarioLC` |
| Repository | `intibank-design-system` |
| Workflow filename | `release.yml` |
| Environment name | `npm` |
| Allowed actions | Direct `npm publish` |

Enter only the workflow filename, not `.github/workflows/release.yml`.

In the GitHub repository, create an environment named `npm` and configure its
required reviewers and branch restrictions before enabling releases. The
workflow uses a GitHub-hosted runner and `id-token: write`; npm CLI exchanges
that OIDC identity for short-lived credentials. Do not add `NPM_TOKEN` or another
persistent publish credential to repository, organization, or environment
secrets.

After verifying the OIDC publication path, configure npm package publishing
access to require two-factor authentication and disallow traditional tokens.

## Subsequent package releases

Every public change after `0.1.0` must include a Changeset:

```sh
pnpm changeset
```

To prepare a release branch or pull request:

```sh
pnpm changeset version
pnpm install
pnpm check
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
```

Review and commit the version, changelog, consumed changesets, and lockfile.
After that commit reaches `main` and CI succeeds, an authorized maintainer can
run **Actions → Publish npm package → Run workflow**. The protected `npm`
environment supplies the approval gate; the workflow verifies the candidate
again and publishes through Trusted Publishing.

Never dispatch the workflow for a version that already exists in npm. This
repository does not yet automate version pull requests or GitHub releases.

## Storybook on GitHub Pages

Trigger `storybook-pages.yml` only after GitHub Pages is configured to use
GitHub Actions and the `github-pages` environment has the desired reviewers. The
workflow uploads `apps/storybook/storybook-static` and deploys it through the
official Pages actions.
