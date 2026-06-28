---
name: git-workflow
description: |-
  General git workflow assistant covering commit message writing,
  branching strategy, rebasing vs merging, and PR/MR descriptions.
  Use whenever the user asks to commit changes, write a commit message,
  create or name a branch, push a branch, decide between rebase/merge,
  squash commits, or prepare a pull request description. Also trigger
  on staging/diff review before a commit, or resolving simple merge
  conflicts.
  Examples:
  - user: "commit this" → stage relevant files, write conventional commit message
  - user: "what should I name this branch" → suggest branch name from task type
  - user: "push this branch" → use git push --set-upstream origin <branch>, not plain push
  - user: "should I rebase or merge here" → recommend based on branch state
  - user: "write a PR description for this" → generate structured PR body
  - user: "explain a bug in this code" → should NOT trigger (not git-related)
---

# Git Workflow Assistant

## 1. Commit messages (Conventional Commits)

Format: `<type>(<scope>): <short summary>`

Types: `feat`, `fix`, `refactor`, `perf`, `style`, `docs`, `test`, `chore`, `build`, `ci`

Rules:
- Summary in imperative mood, lowercase, no trailing period, ≤72 chars
- Scope is optional, lowercase, names the affected module/feature (e.g. `auth`, `course-player`, `filter-bar`)
- Body (optional, blank line after summary): explain *why*, not just *what* — the diff already shows what changed
- Footer: reference issues (`Closes #12`) or note breaking changes (`BREAKING CHANGE: ...`)

Before writing the message:
1. Run `git status` and `git diff --staged` (or `git diff` if nothing staged yet) to see actual changes
2. If unstaged changes span unrelated concerns, propose splitting into multiple commits rather than one large commit
3. Stage only what belongs to the logical change being committed (`git add <files>`, not blind `git add .`)
4. Draft the message, show it to the user before running `git commit` unless they've asked you to just commit directly

Example:
```
feat(audiobook): add R2-backed streaming for chapter playback

Switches storage backend from local files to Cloudflare R2 to cut
hosting cost on Render's free tier. Falls back to YouTube embed when
R2 credentials are absent.
```

## 2. Branch naming

Format: `<type>/<short-description>`, kebab-case, no ticket-number-only names unless the user's repo convention requires it.

- `feature/...` — new functionality
- `fix/...` — bug fixes
- `refactor/...` — internal restructuring, no behavior change
- `chore/...` — tooling, deps, config

Infer the type from what the user describes wanting to do; ask only if genuinely ambiguous (e.g. "fix" vs "refactor" for the same change).

## 3. Pushing a branch (always set upstream)

When pushing any branch that is **not** `main` (or the repo's default branch) for the first time, never run a plain `git push`. Always use:

```bash
git push --set-upstream origin <branch-name>
```

Reasoning: a plain `git push` on a branch with no upstream tracking fails or silently doesn't make the branch visible remotely, so teammates can't see it and a PR can't be opened from it. `--set-upstream` (or `-u`) registers the tracking relationship and ensures the branch shows up on the remote so a pull request can be created immediately after.

Workflow:
1. Check current branch: `git branch --show-current`
2. If it's not `main`/the default branch, and this is the first push of the branch (or `git status` shows no upstream configured), push with `git push --set-upstream origin <branch-name>` — substitute the actual branch name, never alias it
3. After this first push, subsequent pushes on the same branch can use plain `git push` since the upstream is now tracked
4. If the user's git host supports it (GitHub/GitLab CLI available), offer to open the PR/MR right after the push (e.g. `gh pr create` or `glab mr create`) so the branch's existence and the PR are both visible without a separate manual step

## 4. Rebase vs merge

Default guidance:
- **Local feature branch, not yet pushed/shared** → rebase onto latest base branch to keep history linear
- **Branch already pushed and others may have pulled it** → do NOT rebase (rewrites shared history); merge instead, or coordinate a force-push if rebase is truly necessary
- **Merging a finished feature branch into main** → prefer a merge commit (or squash merge if the repo convention favors a clean single-commit history per feature) rather than fast-forward, so the feature boundary stays visible
- Before any rebase: confirm working tree is clean (`git status`), and warn the user this rewrites commit hashes

If unsure which the user's repo prefers, check `git log --oneline --graph` for existing patterns (linear history → rebase culture; visible merge bubbles → merge culture) before deciding.

## 5. Squashing commits

When asked to squash a feature branch before merging:
1. `git log --oneline <base>..HEAD` to show the commits being squashed
2. Use `git rebase -i <base>` and squash into one commit with a consolidated Conventional Commits message
3. Confirm with the user before force-pushing if the branch is already remote

## 6. PR / MR descriptions

Structure:
```markdown
## Summary
1-3 sentences: what this PR does and why.

## Changes
- Bullet list of concrete changes, grouped by area if large

## Testing
How this was verified (manual steps, tests run).

## Notes
Anything reviewers should pay special attention to, known limitations, or follow-ups.
```

Pull the "Changes" and "Summary" content from the actual commit log and diff (`git log <base>..HEAD --oneline`, `git diff <base>...HEAD --stat`) rather than guessing — don't fabricate details not present in the diff.

## 7. Conflict resolution

For simple conflicts (non-overlapping logic in the same file):
1. Open the conflicted file, explain each conflicting hunk in plain terms
2. Propose a resolution and show it before applying
3. After resolving, run the project's build/test command if known, before continuing the rebase/merge

For complex or domain-specific conflicts, surface both versions clearly and ask the user which intent should win rather than guessing.
