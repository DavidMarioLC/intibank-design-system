---
name: commit
description: Creates git commits following Conventional Commits. Use when the user asks to "commit", "commit this", "make a commit", or equivalent.
---

# Commit

Create commits following [Conventional Commits](https://www.conventionalcommits.org/) for the `intibank-design-system` repo.

## Steps

1. Run in parallel: `git status`, `git diff` (staged and unstaged), `git log --oneline -10`.
2. If nothing is staged, review `git status` and run `git add <specific files>` — never `git add -A` or `git add .`. Never include files that look like they contain secrets (`.env`, credentials, keys).
3. Write the message using this format:

   ```
   <type>(<optional scope>): <short summary, imperative, lowercase, no trailing period>

   <optional body: the why, not the what — 1-3 lines>
   ```

   Allowed types:
   - `feat` — new feature or component
   - `fix` — bug fix
   - `refactor` — code change with no behavior change
   - `style` — formatting/lint changes (not product CSS)
   - `docs` — documentation only (`DESIGN.md`, `CLAUDE.md`, Fumadocs)
   - `test` — adding or fixing tests
   - `chore` — maintenance tasks (deps, config, tooling)
   - `build` — build system changes (tsdown, turbo, changesets)

   Suggested scope based on the monorepo: `ui`, `docs`, `storybook`, `tokens`, or the component name (e.g. `button`, `input`).

4. If the change warrants a changeset (a change in `packages/ui` that gets published to npm), remind the user to run `pnpm changeset` — don't create it automatically unless asked.
5. Create the commit with the message via heredoc, ending with:
   ```
   Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
   ```
6. Run `git status` afterward to confirm the commit was created and nothing was left staged unintentionally.

## Rules

- Never use `--no-verify` or `--no-gpg-sign`, and never skip hooks.
- Never use `--amend` unless the user explicitly asks for it.
- If a pre-commit hook fails, fix the actual issue and create a **new** commit — don't force a bypass.
- If the diff mixes unrelated types/scopes (e.g. a bug fix bundled with an unrelated large refactor), suggest splitting them into separate commits before committing everything together.
- The message describes the *why*, not a mechanical list of touched files.
