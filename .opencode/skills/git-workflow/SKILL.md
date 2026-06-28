---
name: git-workflow
description: |-
  General git workflow assistant covering commit message writing,
  branching strategy, rebasing vs merging, pushing, PR/MR descriptions,
  and merge conflict resolution. Includes safety checks: secret scanning
  before commit, stash protection before syncing, safe force-pushes, and
  conflict-marker verification.
  Use whenever the user asks to commit changes, write a commit message,
  create or name a branch, check if a branch is up to date, push a
  branch, decide between rebase/merge, squash commits, prepare a pull
  request description, or resolve a merge/rebase conflict. Also trigger
  on staging/diff review before a commit.
  Examples:
  - user: "commit this" → first check branch is up to date, scan for secrets, then stage and write conventional commit message
  - user: "is my branch up to date" → git fetch + compare against base/remote, stash if dirty, report divergence
  - user: "what should I name this branch" → suggest branch name from task type
  - user: "push this branch" → use git push --set-upstream origin <branch>, not plain push
  - user: "should I rebase or merge here" → recommend based on branch state
  - user: "write a PR description for this" → generate structured PR body, link issue number if branch name has one
  - user: "I have a merge conflict" → list all conflicted files, show ours/theirs per file, check markers before commit
  - user: "explain a bug in this code" → should NOT trigger (not git-related)
---

# Git Workflow Assistant

## 1. Before committing or pushing: check branch is up to date

Always run this check before staging a commit or pushing, so stale local state doesn't cause surprises later:

1. `git fetch origin` — get latest remote refs without merging anything
2. Compare local branch against its remote counterpart:
   - `git status` will show "Your branch is behind/ahead/up to date with 'origin/<branch>'" if upstream is already tracked
   - If no upstream yet (first push not done), instead compare against the base branch: `git log origin/main..HEAD` and `git log HEAD..origin/main` to see divergence in both directions
3. **Stash safety net**: if `git status` shows uncommitted changes (staged or unstaged) and the branch is behind, do NOT pull/rebase on top of dirty state.
   - `git stash push -u -m "pre-sync stash"` first (`-u` includes untracked files)
   - Pull/rebase as needed (step 4)
   - `git stash pop` afterward, and explicitly flag if the pop produced conflicts — don't assume it applied cleanly
4. If behind the base branch (`main`/default) or its own remote:
   - Behind own remote tracking branch → `git pull` (or `git pull --rebase` if following rebase-first convention) before continuing
   - Behind `main` but not yet diverged in a conflicting way → offer to rebase onto latest `main` (or merge it in) before committing further work, per the rebase/merge rules below
5. Only proceed to staging/committing/pushing once the branch is confirmed up to date or the user has explicitly chosen to proceed anyway (e.g. mid-feature, not ready to sync yet)
6. Never silently stash/pull/rebase/merge without telling the user what was found and what action is being taken — surface the divergence (how many commits behind/ahead) before acting

## 2. Commit messages (Conventional Commits)

Format: `<type>(<scope>): <short summary>`

Types: `feat`, `fix`, `refactor`, `perf`, `style`, `docs`, `test`, `chore`, `build`, `ci`

Rules:
- Summary in imperative mood, lowercase, no trailing period, ≤72 chars
- Scope is optional, lowercase, names the affected module/feature (e.g. `auth`, `course-player`, `filter-bar`)
- Body (optional, blank line after summary): explain *why*, not just *what* — the diff already shows what changed
- Footer: reference issues (`Closes #12`) or note breaking changes (`BREAKING CHANGE: ...`) — see Section 7 for auto-detecting the issue number from the branch name

Before writing the message:
1. First run the up-to-date check from Section 1 — don't commit on top of a stale branch without flagging it
2. Run `git status` and `git diff --staged` (or `git diff` if nothing staged yet) to see actual changes
3. **Secret scan**: before staging, grep the diff for likely secrets — `.env` values, `api[_-]?key`, `secret`, `password`, AWS-style keys (`AKIA[0-9A-Z]{16}`), private key headers (`-----BEGIN.*PRIVATE KEY-----`), bearer tokens, and long base64-looking strings assigned to suspicious variable names. If anything matches, stop and warn the user instead of staging/committing — don't auto-exclude silently, since they may need to rotate the secret regardless of whether it's committed.
4. **Whitespace/line-ending check**: run `git diff --check` on the change; flag trailing whitespace or mixed line-endings before committing rather than after.
5. If unstaged changes span unrelated concerns, propose splitting into multiple commits rather than one large commit
6. Stage only what belongs to the logical change being committed (`git add <files>`, not blind `git add .`)
7. Draft the message, show it to the user before running `git commit` unless they've asked you to just commit directly

Example:
```
feat(audiobook): add R2-backed streaming for chapter playback

Switches storage backend from local files to Cloudflare R2 to cut
hosting cost on Render's free tier. Falls back to YouTube embed when
R2 credentials are absent.
```

## 3. Branch naming

Format: `<type>/<short-description>`, kebab-case, no ticket-number-only names unless the user's repo convention requires it.

- `feature/...` — new functionality
- `fix/...` — bug fixes
- `refactor/...` — internal restructuring, no behavior change
- `chore/...` — tooling, deps, config

If the team uses issue/ticket numbers, prefer `feature/123-short-description` so the number is parseable later (see Section 7).

Infer the type from what the user describes wanting to do; ask only if genuinely ambiguous (e.g. "fix" vs "refactor" for the same change).

## 4. Pushing a branch

**Remote awareness**: if the repo has more than one remote (e.g. `origin` + `upstream` for a fork), check with `git remote -v` first and confirm which remote the user means before pushing — don't assume `origin` is always correct.

**First push of a branch**: when pushing any branch that is **not** `main` (or the repo's default branch) for the first time, never run a plain `git push`. Always use:

```bash
git push --set-upstream origin <branch-name>
```

Reasoning: a plain `git push` on a branch with no upstream tracking fails or silently doesn't make the branch visible remotely, so teammates can't see it and a PR can't be opened from it. `--set-upstream` (or `-u`) registers the tracking relationship and ensures the branch shows up on the remote so a pull request can be created immediately after.

**Subsequent pushes**: once upstream is tracked, plain `git push` is fine — unless history was rewritten (rebase/squash/amend), in which case use a **safe force-push**:

```bash
git push --force-with-lease
```

Never use bare `--force`. `--force-with-lease` refuses to push if the remote branch has commits you haven't fetched yet — i.e. it won't clobber a teammate's work you haven't seen. If `--force-with-lease` is rejected, that's a signal to `git fetch` and look at what changed remotely before deciding how to proceed — don't escalate straight to `--force`.

Workflow:
1. Check current branch: `git branch --show-current`
2. If it's not `main`/the default branch, and this is the first push of the branch (or `git status` shows no upstream configured), push with `git push --set-upstream origin <branch-name>` — substitute the actual branch name, never alias it
3. If history was rewritten since the last push, use `git push --force-with-lease` instead of plain push
4. If the user's git host supports it (GitHub/GitLab CLI available), offer to open the PR/MR right after the push (e.g. `gh pr create` or `glab mr create`) so the branch's existence and the PR are both visible without a separate manual step

## 5. Rebase vs merge

Default guidance:
- **Local feature branch, not yet pushed/shared** → rebase onto latest base branch to keep history linear
- **Branch already pushed and others may have pulled it** → do NOT rebase (rewrites shared history); merge instead, or coordinate a `--force-with-lease` push if rebase is truly necessary
- **Merging a finished feature branch into main** → prefer a merge commit (or squash merge if the repo convention favors a clean single-commit history per feature) rather than fast-forward, so the feature boundary stays visible
- Before any rebase: confirm working tree is clean (`git status`) — stash first per Section 1 if not — and warn the user this rewrites commit hashes

If unsure which the user's repo prefers, check `git log --oneline --graph` for existing patterns (linear history → rebase culture; visible merge bubbles → merge culture) before deciding.

## 6. Squashing commits

When asked to squash a feature branch before merging:
1. `git log --oneline <base>..HEAD` to show the commits being squashed
2. Use `git rebase -i <base>` and squash into one commit with a consolidated Conventional Commits message
3. If the branch is already remote, push the rewritten history with `git push --force-with-lease` (see Section 4) — confirm with the user first

## 7. PR / MR descriptions

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

**Issue auto-link**: if the branch name contains an issue/ticket number (e.g. `feature/123-audiobook-streaming`), append `Closes #123` (or the host's equivalent keyword) to the PR description footer automatically instead of asking the user to type it.

**Draft vs ready**: scan the commit messages being included (`git log <base>..HEAD --oneline`). If any contain markers like `wip`, `WIP`, `fixup!`, or `temp`, default to opening the PR as a **draft** and say why; otherwise open it as ready for review. Let the user override either way.

**CI status before suggesting merge**: if `gh` or `glab` CLI is available, check the PR's CI status (`gh pr checks <number>` / `glab mr show <number>`) before telling the user the PR looks mergeable. If CI is failing or pending, say so rather than declaring it ready.

## 8. Conflict resolution

**Step 1 — survey before touching anything**: list every conflicted file up front so there are no surprises mid-resolution:
```bash
git diff --name-only --diff-filter=U
```

**Step 2 — per file, show both sides clearly**: for each conflicted file, extract and label the two sides explicitly rather than vaguely "explaining the hunk":
- `--ours` version (current branch / target of rebase)
- `--theirs` version (incoming branch / commit being applied)
You can pull each side directly with `git show :2:<file>` (ours) and `git show :3:<file>` (theirs) if needed for clarity.

**Step 3 — lockfiles and other generated/binary files**: do not hand-resolve conflicts in files like `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, or binary assets. Instead, take one side, delete the lockfile, and regenerate it (e.g. `rm package-lock.json && npm install`) — resolving these line-by-line produces a lockfile that doesn't match any real dependency resolution.

**Step 4 — propose and confirm**: for each non-generated file, propose a resolution combining intent from both sides where applicable, and show it before applying. For genuinely ambiguous business-logic conflicts (e.g. two Ateion contributors changing the same component differently), present both versions and ask which intent should win rather than guessing.

**Step 5 — conflict marker check (hard gate)**: after resolving and before staging, grep every previously-conflicted file for leftover markers:
```bash
grep -n -E '^(<{7}|={7}|>{7})' <file>
```
If any markers remain, treat the file as unresolved — do not stage or commit it. This is the most common way broken code slips through a "resolved" merge.

**Step 6 — build/test gate (hard gate)**: once markers are clear, run the project's build/test command if known. Do not run `git rebase --continue` / `git merge --continue` / commit the merge until it passes. If no build/test command is known, ask the user for one rather than skipping the check silently.

**Step 7 — escape hatch**: at any point this gets confusing or risks losing track of intent across many files, surface the abort option rather than pushing through:
```bash
git merge --abort
# or
git rebase --abort
```
This returns to the pre-conflict state cleanly — better to abort and re-approach than to guess on unfamiliar code under conflict pressure.
