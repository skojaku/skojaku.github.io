---
layout: post
category: blog
date: 2026-02-24
title: The pod that won't let you fail
slug: snakerail
---

### There are logs. Let's try again.

In *NieR: Automata*, your android body is not your only copy. When 2B or 9S dies, their memories upload to the Bunker — and they come back. Different body, same data. The mission continues.

What makes this haunting is not the dying. It's the *resumption*. The system keeps trying. And at the very end, after everything has collapsed, Pod 042 defies its shutdown order and decides to reconstruct 2B and 9S from scattered server fragments. The justification is almost clinical:

> "Proposal: Reconstruct YoRHa unit data using remaining server logs."

Not hope. Not emotion. Just: there are logs, and there is a way to try again.

### Babysitting snakes

Anyone who has run a [Snakemake](https://snakemake.readthedocs.io/) pipeline across different machines knows the feeling. You hand off a workflow to a collaborator — or come back to one after six months — and it breaks. Missing module. Wrong path. Conda environment that exists on your laptop but nowhere else.

You become a babysitter. You read the traceback, patch the rule, rerun. It fails again on a different error. You patch that one. Repeat until it finally runs clean, or until you shrug and call it "environment-specific."

This is not science. This is plumbing.

The worst part is that the errors are usually trivial — a renamed file, a missing import, a path that differs between machines. You know exactly what's wrong the moment you read the traceback. The problem isn't difficulty; it's tedium. You're not thinking, you're translating error messages into edits.

### Snakerail

I wanted a Pod. Something that watches the pipeline, reads the error, fixes it, and tries again — while I do something else.

So I made **snakerail**, a shell wrapper around Snakemake that uses Claude Code to auto-heal failures:

```bash
#!/bin/bash
# snakerail — run Snakemake, auto-fix errors with Claude Code, repeat until done
# Usage: ./snakerail.sh [--max-retries N] [--branch NAME] [snakemake args...]
set -uo pipefail

CHILD_PID=""
trap 'echo "Interrupted."; [ -n "$CHILD_PID" ] && kill -9 "$CHILD_PID" 2>/dev/null; exit 1' INT TERM

DIR="$PWD"
MAX_RETRIES=10
BRANCH="snakerail/$(date '+%Y%m%d-%H%M%S')"
PASS=()

while [ $# -gt 0 ]; do
  case "$1" in
    --max-retries) MAX_RETRIES="$2"; shift 2 ;;
    --branch)      BRANCH="$2";      shift 2 ;;
    *)             PASS+=("$1");     shift ;;
  esac
done

run_snakemake() {
  snakemake --unlock 2>/dev/null
  snakemake "${PASS[@]}" 2>&1 | tee "$DIR/.snakerail_run.log" & CHILD_PID=$!
  wait "$CHILD_PID"; local exit=$?; CHILD_PID=""
  return $exit
}

heal() {
  local error
  error=$(grep -E "Error|Traceback" "$DIR/.snakerail_run.log" -B3 -A10 2>/dev/null | tail -60)
  [ -z "$error" ] && error=$(tail -60 "$DIR/.snakerail_run.log")
  claude -p "Fix the Snakemake error below. Edit the code, then git add and commit. Do not restart Snakemake.
Project: $DIR

$error" \
    --allowedTools "Bash,Read,Edit,Write,Grep,Glob,WebFetch,WebSearch" \
    --dangerously-skip-permissions & CHILD_PID=$!
  wait "$CHILD_PID"; CHILD_PID=""
}

cd "$DIR"
current=$(git branch --show-current 2>/dev/null)
if [[ "$current" != snakerail/* ]]; then
  git checkout -b "$BRANCH"
  current="$BRANCH"
fi
echo "Starting on branch $current"

for attempt in $(seq 1 $MAX_RETRIES); do
  run_snakemake && { echo "Pipeline complete."; git log --oneline "$current"; exit 0; }
  echo "Attempt $attempt/$MAX_RETRIES failed — healing..."
  heal
done

echo "Giving up after $MAX_RETRIES attempts."
exit 1
```

The loop is simple: run Snakemake, capture the output, pass the error to Claude Code with instructions to fix and commit, repeat up to `MAX_RETRIES` times. If it succeeds, it prints the git log of everything that was changed.

### The edit log

Every fix is committed to a dedicated git branch (`snakerail/YYYYMMDD-HHMMSS`). After a run, you get a clean history of what was broken and what was patched:

```
a3f1c2e fix: add missing pandas import in rule aggregate
b7e09d1 fix: update input path to use config['data_dir']
c12a8f0 fix: pin python=3.10 in environment.yml
```

This matters because snakerail is not opaque. You can review every edit, merge what's useful, and discard what isn't. It's not replacing your judgment — it's doing the mechanical part so you can apply your judgment to the result.

### When it helps (and when it doesn't)

Snakerail is well-suited for two situations:

1. **After refactoring** — you've reorganized files, renamed variables, or updated dependencies. You know the pipeline *should* still work, but you need to find all the places that broke. Snakerail finds them faster than you would by hand.

2. **On a new machine** — environment-specific failures are exactly the kind of tedious, fixable errors that snakerail handles well. Missing packages, different default paths, version mismatches.

What it can't fix: logic errors in the science, missing input data, or anything that requires understanding what the workflow is actually trying to do. Snakerail fixes *plumbing*, not reasoning. The distinction matters.

### Conclusion

Pod 042's logic is blunt: there are logs, and there is a way to try again. It doesn't deliberate. It just runs the reconstruction loop until it succeeds or runs out of material.

Snakerail works the same way. The pipeline isn't finished — it just hit an error. Read the log, patch the issue, run again. Keep going until it passes or the retry budget runs out.

You still have to do the science. But you shouldn't have to babysit the plumbing.
