# Release and deployment

No package or documentation site is published by this initial delivery.

## Package releases

1. Add a changeset with `pnpm changeset` for every public change.
2. Merge the generated version PR after CI succeeds.
3. Trigger the npm workflow from the protected `npm` environment.
4. The workflow builds and verifies the exact tarball before `npm publish`.

Before enabling the workflow, create or claim the `@intibank` npm scope, create
the package, register `release.yml` as its GitHub Actions Trusted Publisher, and
allow direct publishing. npm Trusted Publishing requires GitHub-hosted runners,
`id-token: write`, npm 11.5.1+, and Node 22.14+; CI uses Node 24. No persistent npm
token is used.

Choose and add a public license before the first publication. Until then, the
repository should be treated as proprietary.

## Storybook on GitHub Pages

Trigger `storybook-pages.yml` only after GitHub Pages is configured to use GitHub
Actions and the `github-pages` environment has the desired reviewers. The workflow
uploads `apps/storybook/storybook-static` and deploys it through the official Pages
actions.
