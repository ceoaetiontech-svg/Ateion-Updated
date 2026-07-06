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
  on staging/diff review before a commit. Proactively catches the
  mistakes a junior dev makes and a senior dev has learned to check for:
  committing to a protected branch, discarding uncommitted work with a
  destructive command, force-pushing without a safety check, confusing
  ours/theirs in a rebase, believing a bad reset is unrecoverable, and
  committing a large binary that bloats history forever.
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

## Scope and ground rules

This skill handles git mechanics — inspecting diffs, staging, drafting commit messages, pushing, and resolving conflicts. It does **not** rewrite or "clean up" the substantive content of the file(s) being committed as a side effect of a git task. If something about a file's content looks off while running this workflow (a false-positive scan hit, a stray line, anything), say so and ask the user — an unrequested edit is itself the kind of mistake this skill exists to prevent, not a fix for one.

**If an edit happens anyway and needs to be undone**: undo only that specific edit, using the same mechanism used to make it (the edit tool, not git). Do NOT reach for `git checkout -- <file>`, `git restore <file>`, or `git reset --hard` as the "undo" — those reset the file to its last *commit*, discarding every uncommitted change in it, not just the one being undone. If the file had other legitimate uncommitted work before the mistake, that work is destroyed too, and — per Section 10 — nothing that was never staged or committed can be recovered from `git reflog` or `git fsck`. This is the exact trap Section 11 warns the user about; it applies with equal force here, to the assistant's own actions.

**Snapshot before touching a dirty file**: before this workflow writes to any file that `git status` already shows as modified, capture its current content or diff first (keep it in context, or copy it to a scratch path). That's what makes a precise undo possible later, instead of falling back on a git command whose blast radius is "everything uncommitted in this file."

## 1. Before committing or pushing: check branch is up to date

Always run this check before staging a commit or pushing, so stale local state doesn't cause surprises later:

1. `git fetch origin` — get latest remote refs without merging anything
2. Compare local branch against its remote counterpart using explicit ref comparison (do NOT rely solely on `git status`, which can report stale "up to date"):
   - Run `LOCAL=$(git rev-parse HEAD)` and `REMOTE=$(git rev-parse @{upstream} 2>/dev/null || echo "")`
   - If `$REMOTE` is empty (no upstream), compare against the base branch instead: `git log origin/main..HEAD` and `git log HEAD..origin/main`
   - If `$LOCAL == $REMOTE`, the branch is truly up to date
   - If they differ, show how many commits behind/ahead with `git log --oneline HEAD..@{upstream}` and `git log --oneline @{upstream}..HEAD`
3. **Stash safety net**: if `git status` shows uncommitted changes (staged or unstaged) and the branch is behind, do NOT pull/rebase on top of dirty state.
   - `git stash push -u -m "pre-sync stash"` first (`-u` includes untracked files)
   - Pull/rebase as needed (step 4)
   - `git stash pop` afterward, and explicitly flag if the pop produced conflicts — don't assume it applied cleanly
4. If behind the base branch (`main`/default) or its own remote:
   - Behind own remote tracking branch → `git pull` (or `git pull --rebase` if following rebase-first convention) before continuing
   - Behind `main` but not yet diverged in a conflicting way → offer to rebase onto latest `main` (or merge it in) before committing further work, per the rebase/merge rules below
5. Only proceed to staging/committing/pushing once the branch is confirmed up to date or the user has explicitly chosen to proceed anyway (e.g. mid-feature, not ready to sync yet)
6. Never silently stash/pull/rebase/merge without telling the user what was found and what action is being taken — surface the divergence (how many commits behind/ahead) before acting

## 2. Sanity checks before any commit (hard gates)

Run these before drafting a commit message, every time — they're cheap and catch the mistakes that are annoying to undo later.

**Protected branch guard**: check the current branch name (`git branch --show-current`) against `main`, `master`, `develop`, or whatever the repo's default branch is (`git remote show origin | grep 'HEAD branch'` if unsure). If the user is about to commit or force-push directly to a protected branch, stop and flag it explicitly — ask whether they meant to be on a feature branch instead. Don't silently comply.
*Why this matters*: committing straight to `main` is the single most common way a beginner accidentally ships unreviewed code or breaks the branch everyone else builds on. Experienced devs check `git branch --show-current` almost reflexively before typing `git commit` for exactly this reason — it costs one second and prevents a genuinely annoying afternoon of cleanup.

**Detached HEAD check**: run `git symbolic-ref -q HEAD` — if it fails (empty/error), HEAD is detached (mid-rebase, or a commit was checked out directly rather than a branch). Committing here creates commits with no branch pointing at them, easy to lose. Flag this and confirm the user wants to proceed (or suggest creating a branch first: `git switch -c <name>`) before committing.
*Why this matters*: a branch is really just a name that points at a commit and moves forward automatically as you commit. In detached HEAD, there's no name following you around — so new commits are real and valid, but nothing references them, and they become unreachable (and eventually garbage-collected) the moment you check out something else. This trips up almost every junior dev at least once, usually after `git checkout <some-hash>` — the fix is cheap (branch off before committing) but only if you notice *before* you commit, which is why the check happens up front.

**Empty-commit guard**: before drafting a commit message, confirm something is actually staged (`git diff --staged --stat` is non-empty). If nothing is staged but there are unstaged changes, stage them first (Section 3) rather than proceeding to write a message for an empty commit.
*Why this matters*: it's a small thing, but writing a thoughtful commit message for a commit that turns out to be empty (usually because the intended files were never staged) wastes a round trip and is confusing to debug later — "why doesn't my change show up?" is a classic junior-dev support question that traces back to this.

**Identity check**: if the user works across multiple projects or accounts on the same machine (personal repos and work repos side by side), check `git config user.email` against what the remote expects before the first commit of a session.
*Why this matters*: a commit made under the wrong identity is easy to create and mildly annoying to fix (`git commit --amend --reset-author` if unpushed, `filter-repo` if it's buried in history) — the kind of mistake that's invisible until someone notices a work commit authored by a personal email, or a professional contribution history with unrelated commits mixed in. One check up front avoids the cleanup entirely.

**Large file / binary check**: before staging, scan `git diff --staged --stat` for big deltas on binary or asset files (images, video, archives, models, build output). If the repo doesn't already use Git LFS and something large is about to be committed, flag it and ask whether it belongs in LFS instead.
*Why this matters*: a junior dev commits the file, then "fixes" the mistake by deleting it in a later commit — but the blob is still sitting in every clone's `.git` history forever; deleting the file doesn't delete the object. Undoing this later means `git filter-repo` (or BFG) rewriting the entire history and force-pushing, which every collaborator then has to deal with by re-cloning. It's a five-second check before the first commit versus a genuinely disruptive afternoon later.

**`.gitignore` doesn't retroactively untrack**: if a pattern was just added to `.gitignore` and the file still shows as modified, that's expected — `.gitignore` only affects files that aren't tracked yet. An already-tracked file needs `git rm --cached <file>` (removes it from tracking, leaves it on disk) followed by a commit.
*Why this matters*: this is one of the most common "wait, why isn't this working" moments for anyone new to git — the mental model of `.gitignore` as "hide this file" is wrong; it's actually "never start tracking this file," which is a one-way door once a file's already committed.

**OS/editor cruft**: if `.DS_Store`, `Thumbs.db`, `.idea/`, or `.vscode/` (with machine-specific paths) show up as untracked noise, don't just patch the project's `.gitignore` each time it happens — set a global gitignore once (`git config --global core.excludesFile ~/.gitignore_global`) so this entire category of file never touches any repo on that machine again.

**`--no-verify` is a red flag, not a shortcut**: if the user asks to commit or push with `--no-verify` to get past a failing hook, don't just comply — ask what's actually failing first.
*Why this matters*: hooks exist to catch lint errors, secrets, or failing tests before they land. Bypassing the check doesn't fix the underlying problem, it just moves the discovery from "now, on your machine" to "later, in CI or code review, on someone else's time." The senior-dev instinct is to treat a failing hook as information, not an obstacle.

## 3. Commit messages (Conventional Commits)

Format: `<type>(<scope>): <short summary>`

Types: `feat`, `fix`, `refactor`, `perf`, `style`, `docs`, `test`, `chore`, `build`, `ci`

Rules:
- Summary in imperative mood, lowercase, no trailing period, ≤72 chars
- Scope is optional, lowercase, names the affected module/feature (e.g. `auth`, `course-player`, `filter-bar`)
- Body (optional, blank line after summary): explain *why*, not just *what* — the diff already shows what changed
- Footer: reference issues (`Closes #12`) or note breaking changes (`BREAKING CHANGE: ...`) — see Section 8 for auto-detecting the issue number from the branch name

Before writing the message:
1. First run the up-to-date check from Section 1 and the sanity checks from Section 2 — don't commit on top of a stale branch, a protected branch, or detached HEAD without flagging it
2. Run `git status` and `git diff --staged` (or `git diff` if nothing staged yet) to see actual changes
3. **Secret scan**: before staging, grep the diff for likely secrets — `.env` values, `api[_-]?key`, `secret`, `password`, AWS-style keys (`AKIA[0-9A-Z]{16}`), private key headers (`-----BEGIN.*PRIVATE KEY-----`), bearer tokens, and long base64-looking strings assigned to suspicious variable names. If anything matches, stop and warn the user instead of staging/committing — don't auto-exclude silently, since they may need to rotate the secret regardless of whether it's committed.
   *Why this matters*: once a secret is pushed, `git revert` or deleting the line in a later commit does **not** remove it from history — anyone who ever clones the repo can dig it out of an old commit. The only real fix after the fact is rotating the credential and rewriting history, both painful. Catching it before the first commit is dramatically cheaper than catching it after.
   *False positives on documentation about secrets*: if the file being committed is itself documentation that discusses secret scanning or credential patterns — this file included — the same keywords will appear throughout as prose, not as real credentials. Read the matched line before flagging: `Secret scan:` or "scan for likely secrets" in explanatory text is not a hit; a real hit looks like one of those keywords immediately followed by an assignment to an actual high-entropy value. Don't block a commit on a bare keyword match in prose.
4. **Whitespace/line-ending check**: run `git diff --check` on the change; flag trailing whitespace or mixed line-endings before committing rather than after.
   *Why this matters*: this is a small thing that becomes a big thing on a team — mixed line endings make every future diff on that file noisy (every line looks changed even when only one word changed), which makes code review painful for everyone downstream.
5. If unstaged changes span unrelated concerns, propose splitting into multiple commits rather than one large commit. Use `git add -p` (or `git add -p <file>` for a specific file) to stage hunks selectively rather than whole files — walk the user through accepting (`y`), skipping (`n`), or splitting further (`s`) each hunk if they want to do it interactively, or do it directly if they've asked you to just handle it.
   *Why this matters*: `git add -p` is the tool that separates people who think in commits from people who think in files. A commit should tell one coherent story ("fix the auth bug") — if it also quietly includes an unrelated formatting change or a debug `console.log` you forgot to remove, that becomes very hard to review, revert, or `git blame` later. Staging by hunk instead of by file is how you keep commits honest even when your actual editing session was messy.
6. Stage only what belongs to the logical change being committed (`git add <files>` or `git add -p`, not blind `git add .`)
7. Draft the message, show it to the user before running `git commit` unless they've asked you to just commit directly

**Amending**: `git commit --amend` is safe when the commit hasn't been pushed yet — treat it as the default way to fix "oops, forgot a file" or "typo in message" on the most recent local commit. Once a commit has been pushed, amending rewrites history: only do it if the user confirms the branch isn't shared, and always follow up with `git push --force-with-lease` (Section 5), never a plain push.
*Why this matters*: locally, a commit is just a draft — nobody else has seen it, so changing it costs nothing. The instant it's pushed, other people's clones may reference that exact commit hash, so "amending" it doesn't edit the old commit, it creates a new one with a different hash and abandons the old one. If someone else already pulled the original, they now have a hash that no longer exists upstream, which is exactly the kind of confusing "why is my branch diverged" problem this whole skill exists to prevent.

Example:
```
feat(audiobook): add R2-backed streaming for chapter playback

Switches storage backend from local files to Cloudflare R2 to cut
hosting cost on Render's free tier. Falls back to YouTube embed when
R2 credentials are absent.
```

## 4. Branch naming

Format: `<type>/<short-description>`, kebab-case, no ticket-number-only names unless the user's repo convention requires it.

- `feature/...` — new functionality
- `fix/...` — bug fixes
- `refactor/...` — internal restructuring, no behavior change
- `chore/...` — tooling, deps, config

If the team uses issue/ticket numbers, prefer `feature/123-short-description` so the number is parseable later (see Section 8).

Infer the type from what the user describes wanting to do; ask only if genuinely ambiguous (e.g. "fix" vs "refactor" for the same change).

**Deleting a branch**: `git branch -d <branch>` refuses to delete a branch with unmerged commits — that refusal is a safety net, not a bug to route around. If asked to force it with `-D`, treat that as worth a second confirmation rather than doing it silently, since it discards the last thing standing between the user and losing unmerged work (recoverable via `git reflog` per Section 10, but only for a limited window, and only if you know to look).
*Why this matters*: junior devs commonly hit the `-d` refusal, assume git is being overly cautious, and reach for `-D` to "make the error go away" without reading why it refused. The refusal is usually correct.

After a PR merges, it's fine to delete both the local branch and its remote counterpart (`git push origin --delete <branch>`) to keep things tidy — but confirm the PR is actually merged (check via `gh pr view --json state` if available) rather than trusting the branch name or the user's memory alone.

## 5. Pushing a branch

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
1. Check current branch: `git branch --show-current`. If it's a protected branch (Section 2), stop and confirm before pushing, especially before any force-push.
2. If it's not `main`/the default branch, and this is the first push of the branch (or `git status` shows no upstream configured), push with `git push --set-upstream origin <branch-name>` — substitute the actual branch name, never alias it
3. If history was rewritten since the last push, use `git push --force-with-lease` instead of plain push
4. If the user's git host supports it (GitHub/GitLab CLI available), offer to open the PR/MR right after the push (e.g. `gh pr create` or `glab mr create`) so the branch's existence and the PR are both visible without a separate manual step

## 6. Rebase vs merge

Default guidance:
- **Local feature branch, not yet pushed/shared** → rebase onto latest base branch to keep history linear
- **Branch already pushed and others may have pulled it** → do NOT rebase (rewrites shared history); merge instead, or coordinate a `--force-with-lease` push if rebase is truly necessary
- **Merging a finished feature branch into main** → prefer a merge commit (or squash merge if the repo convention favors a clean single-commit history per feature) rather than fast-forward, so the feature boundary stays visible
- Before any rebase: confirm working tree is clean (`git status`) — stash first per Section 1 if not — and warn the user this rewrites commit hashes

If unsure which the user's repo prefers, check `git log --oneline --graph` for existing patterns (linear history → rebase culture; visible merge bubbles → merge culture) before deciding.

**Repeated conflicts across a long rebase or cherry-pick sequence**: if the same conflict is likely to reappear commit-after-commit (e.g. a long-lived feature branch rebasing onto an actively-changing file), enable `git rerere` (`git config rerere.enabled true`) before starting. It records how each conflict was resolved and auto-applies the same resolution next time it recurs — mention this as an option rather than making the user re-resolve the identical hunk repeatedly.
*Why this matters*: a rebase replays your commits one at a time onto the new base, so if commit 1 and commit 3 both touch the same line, you can end up resolving the *same conflict* two or three times in one rebase. That feels like Git being broken, but it isn't — it's just re-doing work. `rerere` ("reuse recorded resolution") is the tool built specifically for this, and it's the kind of thing a senior dev reaches for without a second thought but a junior dev usually doesn't know exists.

## 7. Squashing commits

When asked to squash a feature branch before merging:
1. `git log --oneline <base>..HEAD` to show the commits being squashed
2. Use `git rebase -i <base>` and squash into one commit with a consolidated Conventional Commits message
3. If the branch is already remote, push the rewritten history with `git push --force-with-lease` (see Section 5) — confirm with the user first

**Multiple authors on the branch**: if `git shortlog -sne <base>..HEAD` shows more than one author, squashing collapses them into a single commit authored by whoever runs the squash — the other contributors quietly lose attribution. Add a `Co-authored-by: Name <email>` trailer for each other author in the final commit message rather than dropping them, if the team's convention cares about that (most do).

## 8. PR / MR descriptions

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

## 9. Conflict resolution

**Step 1 — survey before touching anything**: list every conflicted file up front so there are no surprises mid-resolution:
```bash
git diff --name-only --diff-filter=U
```

**Step 2 — per file, show both sides clearly**: for each conflicted file, extract and label the two sides explicitly rather than vaguely "explaining the hunk":
- `--ours` version (current branch / target of rebase)
- `--theirs` version (incoming branch / commit being applied)
You can pull each side directly with `git show :2:<file>` (ours) and `git show :3:<file>` (theirs) if needed for clarity.

**The ours/theirs flip**: this is the single most common source of confusion in conflict resolution. During a **merge**, `ours` = the branch you're currently on, `theirs` = the branch being merged in — matches intuition. During a **rebase**, it's reversed: git internally checks out the base branch and replays your commits on top of it one at a time, so `ours` = the branch being rebased *onto* (the base), and `theirs` = the commit from your own branch being replayed. State explicitly which operation is in progress before saying "take ours" or "take theirs" — don't assume the merge meaning carries over, and don't let the user assume it either.

**Step 3 — lockfiles and other generated/binary files**: do not hand-resolve conflicts in files like `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, or binary assets. Instead, take one side, delete the lockfile, and regenerate it (e.g. `rm package-lock.json && npm install`) — resolving these line-by-line produces a lockfile that doesn't match any real dependency resolution.
*Why this matters*: a lockfile isn't hand-written — it's a computed snapshot of exactly which dependency versions resolve together. Manually splicing together conflict markers in it produces a file that's syntactically valid but describes a dependency graph nobody actually computed, which can install fine locally and then break in CI or production in ways that are miserable to trace back to "someone hand-merged the lockfile." Regenerating it is strictly safer than editing it, even though it feels like the "lazier" option.

**Step 4 — propose and confirm**: for each non-generated file, propose a resolution combining intent from both sides where applicable, and show it before applying. For genuinely ambiguous business-logic conflicts (e.g. two Ateion contributors changing the same component differently), present both versions and ask which intent should win rather than guessing.

**Step 5 — conflict marker check (hard gate)**: after resolving and before staging, grep every previously-conflicted file for leftover markers:
```bash
grep -n -E '^(<{7}|={7}|>{7})' <file>
```
If any markers remain, treat the file as unresolved — do not stage or commit it. This is the most common way broken code slips through a "resolved" merge.

**Step 6 — build/test gate (hard gate)**: once markers are clear, run the project's build/test command if known. Do not run `git rebase --continue` / `git merge --continue` / commit the merge until it passes. If no build/test command is known, ask the user for one rather than skipping the check silently.

**Step 7 — repeated conflicts**: if this is one conflict in a long rebase/cherry-pick chain and similar conflicts are likely to recur, mention `git rerere` (Section 6) as a way to avoid re-resolving the same hunk on every subsequent commit.

**Step 8 — escape hatch**: at any point this gets confusing or risks losing track of intent across many files, surface the abort option rather than pushing through:
```bash
git merge --abort
# or
git rebase --abort
```
This returns to the pre-conflict state cleanly — better to abort and re-approach than to guess on unfamiliar code under conflict pressure.

## 10. Recovery: a bad commit or reset is rarely gone for good

This is the mental model that separates confidence from panic. A junior dev sees `git reset --hard` land on the wrong commit, or a rebase go sideways, and assumes the previous state is gone. It almost never is — as long as it was **committed at some point**.

**`git reflog`** records every place `HEAD` and branch tips have pointed, including commits that no longer belong to any branch. Default retention is 90 days, local-only (never pushed, never shared, never visible to anyone else).

Recovery pattern:
1. `git reflog` — find the entry from just before the mistake (e.g. `HEAD@{3}: commit: ...` right before a bad `reset --hard` or rebase)
2. Recover it either by resetting back: `git reset --hard HEAD@{3}`, or non-destructively by branching off it without touching current state: `git checkout -b recovered-work HEAD@{3}`
3. If a branch itself was deleted, its last commit is still findable in the reflog of `HEAD` around the time it existed, or via `git fsck --lost-found` if it's aged out of the reflog entry for that branch specifically

**The one real limit**: reflog only helps for things that were *committed*. Uncommitted working-tree changes that get discarded (see Section 11) were never recorded anywhere, so there's nothing for reflog to point back to. This is exactly why Section 1's stash-before-sync habit and Section 11's "commit or stash before anything destructive" exist — they're what make the state recoverable in the first place.

*Why this matters*: knowing reflog exists is one of the biggest confidence gaps between a junior and a senior dev. A senior dev's response to "I think I just destroyed three days of work" is "let's check the reflog" — calmly — not panic. Worth explicitly telling the user this exists the first time it's relevant, since not knowing it's an option is what turns a two-minute recovery into a re-done afternoon.

## 11. Destructive commands: confirm before running

A small set of git commands discard state with no undo, because the state they discard was never committed anywhere for reflog (Section 10) to fall back on. Treat these as requiring explicit confirmation before running, not just a note afterward:

- **`git reset --hard`** — discards all uncommitted changes (staged and unstaged) in the working tree, permanently. If there's anything uncommitted and the user hasn't clearly said they want it gone, stash it first (`git stash push -u`) instead of resetting straight past it — a stash is trivially recoverable, a hard reset over uncommitted work is not.
- **`git checkout -- <file>`** / **`git restore <file>`** — discards uncommitted changes to that specific file, permanently. This includes when the assistant itself made an unwanted edit: `checkout`/`restore` can't selectively undo just that edit — they reset the whole file to the last commit, taking any other legitimate uncommitted work in it down with them. There is no git command for "revert to one edit ago"; only the edit tool that made the change can undo precisely that change.
- **`git clean -fd`** — deletes untracked files and directories, permanently. Always run `git clean -n` (dry run) first and show the user what would be deleted before running the real thing — `clean` has no concept of "oops" once it runs.

The pattern in all three: git is very good at protecting *committed* history and much less forgiving about *uncommitted* work, because uncommitted work was never recorded anywhere to protect. When in doubt about whether something's needed later, the cheap move is always to commit or stash it first and clean up after — never discard first and ask questions later.
