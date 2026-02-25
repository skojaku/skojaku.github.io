---
layout: post
category: blog
date: 2026-02-24
title: The snake that eats its own tail
slug: snaketail
---

### More automation, more babysitting

The more I automate, the more frequent I babysit them.

Automation promises to free up time. And it does — until something breaks. An automaton is designed to work on a predictable path, but the real world is full of unexpected. When an automation fails, it needs a human to fix and rerun. 

One automation is manageable. Five automations mean five things that can silently fail while I'm looking elsewhere. So more automation can lead to more babysitting a machine paradoxically.

### The four phases

An article ["Documentation Is Automation"](https://cacm.acm.org/practice/documentation-is-automation/) describes four overlapping phases on the road to full automation:

1. **Document** the steps
2. **Find equivalents** — translate each step into a command or script
3. **Automate** — chain the commands into a pipeline
4. **Autonomous** — the system runs without supervision 

The promise of automation is that once you get to Phase 4, you and future yourself are free from the task to be automated.
But there is a new cost to pay, i.e., maintenance. The automated system that initially works can break when the environment changes and dependencies update.  
They need a regular checkup and repair. They need babysitting. 

### The Ouroboros idea

![Ouroboros](/assets/blog/2026-02-24-ouroboros-idea/ouroboros.jpg){: width="70%"}

The Ouroboros is a snake eating its own tail — a symbol of self-reflexivity and cyclicality.

The idea here is to feed the tail (the error log) back to the head (the system itself), so it can read the error, fix itself, and resume. The intermediary is an agentic coder like Claude Code: it reads the log, understands the error, edits the code, commits the fix, and hands control back.

### Example

![snakemake](/assets/blog/2026-02-24-ouroboros-idea/snakemake.png){: width="70%"}

My main use case is [Snakemake](https://snakemake.github.io), a workflow manager for automating experiment pipelines. You define rules — inputs, outputs, commands — and Snakemake handles execution order, parallelism, and skips already-completed steps. This is an indispensable tool for me.

But Snakemake pipelines break in predictable and tedious ways:

1. you rename a variable or move a file, and rules quietly point to the wrong path
2. conda environment is missing a package, or Python version differs, or a dependency was installed globally on your laptop but nowhere else
3. a package updates and breaks an API

None of these errors are hard to fix. All of them require you to stop what you're doing, read a traceback, make a small edit, and rerun. Multiply by many pipelines and you've spent a morning on health checking. 

This is mentally hard not because it's difficult, but because it's *interruptive*. Every fix pulls you out of whatever you were actually thinking about.

### Snaketail

I made a small tool called [snaketail](https://github.com/skojaku/snaketail) to handle this loop automatically.

```bash
#!/bin/bash
# snaketail — run Snakemake, auto-fix errors with Claude Code, repeat until done
# Usage: ./snaketail.sh [--max-retries N] [--branch NAME] [snakemake args...]
set -uo pipefail

CHILD_PID=""
trap 'echo "Interrupted."; [ -n "$CHILD_PID" ] && kill -9 "$CHILD_PID" 2>/dev/null; exit 1' INT TERM

DIR="$PWD"
MAX_RETRIES=10
BRANCH="snaketail/$(date '+%Y%m%d-%H%M%S')"
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
  snakemake "${PASS[@]}" 2>&1 | tee "$DIR/.snaketail_run.log" & CHILD_PID=$!
  wait "$CHILD_PID"; local exit=$?; CHILD_PID=""
  return $exit
}

heal() {
  local error
  error=$(grep -E "Error|Traceback" "$DIR/.snaketail_run.log" -B3 -A10 2>/dev/null | tail -60)
  [ -z "$error" ] && error=$(tail -60 "$DIR/.snaketail_run.log")
  claude -p "Fix the Snakemake error below. Edit the code, then git add and commit. Do not restart Snakemake.
Project: $DIR

$error" \
    --allowedTools "Bash,Read,Edit,Write,Grep,Glob,WebFetch,WebSearch" \
    --dangerously-skip-permissions & CHILD_PID=$!
  wait "$CHILD_PID"; CHILD_PID=""
}

# ── main ────────────────────────
cd "$DIR"
current=$(git branch --show-current 2>/dev/null)
if [[ "$current" != snaketail/* ]]; then
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

This runs Snakemake, captures the log, passed the error to Claude Code with instructions to fix and commit, repeat. If it succeeds, it exits.

Every repair is committed to a dedicated branch (`snaketail/YYYYMMDD-HHMMSS`), so I can review exactly what was changed.

One caveat is that self-healing trades reproducibility for convenience. Each run may produce different code changes. Use it only when you understand the codebase well enough to review the fixes. But I see a lot of practical values for early development or testing on a new machine.

### Conclusion

Snaketail closes that gap for a specific class of failures. The idea---feed the error log back to the healer, patch the issue, restart---can be applied to systems that often breaks. The snake eats its own tail and keeps going.

You still have to do your creative jobs. You shouldn't have to babysit the machines.
