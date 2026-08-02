---
layout: post
category: blog
date: 2026-08-02
title: Local LLMs are fun!
slug: localllm
---

### The data I can't paste

There are tasks I won't hand to a cloud model. My inbox has student grades, family medical appointments, a colleague's unpublished draft. My notes have half-formed ideas I'd rather not have indexed anywhere. This isn't about distrusting a particular vendor. Most of that data isn't only mine to share.

So I never automated any of it. I read the email myself, drafted the reply myself, dug up the context myself.

Open-weight models changed the arithmetic. A 30B-class mixture-of-experts model now runs on my laptop, on battery, with nothing leaving the machine. Email triage, drafting replies from my own notes, gathering what I already know about a task before I sit down to it. These are now possible without a byte crossing the network.

### They are not smart

A local model fails in three ways.

It is slow. A cloud model answers before I finish reading the question; a local one spends a minute thinking out loud first.

It hallucinates. It invents command-line flags, email addresses, and URLs that look right and go nowhere.

It loops. It re-plans, re-searches, and re-reads the same file until the context window is full of its own confusion.

The first one stopped bothering me when I stopped chatting with it. If the deadline is "by the time I wake up," a minute per step costs nothing. So I run the model as a batch worker: a queue, a cron line, a job that either finished or didn't. I don't watch it work, I read what it produced.

The other two are design problems. A model invents a flag because the tool has too many flags. It loops because the task has no obvious next step. Neither is fixed by waiting for a better model.

### Documentation is automation

Thomas A. Limoncelli's ["Documentation Is Automation"](https://cacm.acm.org/practice/documentation-is-automation/), which I wrote about [before](/snaketail.html), describes four phases on the road to automation:

1. **Document** the steps
2. **Find equivalents** — translate each step into a command
3. **Automate** — chain the commands
4. **Autonomous** — it runs without supervision

A local model won't get you to phase 4 on its own. It works in phases 2 and 3: it can run your commands and chain them, provided the commands exist and the document is short enough to hold in its head.

So writing the documentation is building the harness. The document *is* the prompt. It is written for a colleague who reads fast, follows instructions literally, and forgets everything when the job ends.

### The harness

My harness is a CLI tool plus a skill file. The skill file describes the workflow and which command to run for each step. The CLI does everything else. Mine is called `hq`, and it fronts my mail, calendar, drive, and wiki. What it does isn't the point here; how it is shaped is, because the shape took me months to get right.

**The skill file is 100 lines, hard cap.** Local models degrade fast as the context grows, and not gracefully. They fall off a cliff and start ignoring the middle of what you told them. Every line in the skill file competes for attention with the actual task.

So I compress, close to telegraphese. Articles dropped, no hedging, no paragraph explaining why. Where I can, I show the invocation instead of describing it:

> ~~"If you would like to look for messages from a particular person within the last week, you can use the find subcommand together with the --from flag, which accepts an email address or a name..."~~
>
> `hq mail find --from someone --newer-than 7d` — one precise query beats broad scans.

The second version is the one the model copies.

**Verbose strings go in a config file.** API keys, account IDs, calendar IDs, absolute paths: none of it should reach the model's context. It all sits in a `config.yaml` that the CLI loads by itself. A 40-character opaque ID is a dozen tokens spent on nothing, plus a chance to typo it, plus a failed call, plus a repair attempt. The model types `hq cal free --from today` and never sees an ID.

**Match the model's vocabulary.** This one I didn't expect. Every model has a prior about what subcommands are called. Asked to search my email, one model types `mail search`, another `mail find`, another `mail list`. When the CLI disagrees, you get an error, a repair attempt, a re-read of the help text, and then a loop, all of it paid for out of the context window.

The fix is five lines:

```python
# whatever the model reaches for, it lands in the same place
sub.add_parser("find", aliases=["search", "query", "grep", "list"])
```

Rename the command to whatever your model reaches for, or accept all of them. This removed more failures than anything else I tried.

**Retrieval belongs inside the tool.** Don't let the model run `grep`. One grep over a real corpus returns a wall of text and the context is gone, along with the plan and the instructions.

A search command with a result cap and an embedding index behind it works much better. Semantic search matters more here than I assumed. A weak model is bad at guessing the exact keyword a note was written with, and fine at describing what it is looking for.

The output should also admit what it hid:

```json
{"count": 143, "shown": 5, "truncated": true, "results": ["..."]}
```

Without `truncated`, the model summarizes five results as if they were all 143.

**Test by reading what it typed, not what it answered.** Give the model a task and read the transcript, looking only at the commands. Every wrong invocation is a bug in the CLI's naming, in the skill file's wording, or in a default I forgot to set. Almost never in the model. Fix, rerun, read again. Two or three rounds of this did more than a week of rewording prompts.

**Boundaries live in the code, not the prompt.** My agent reads anything and drafts anything. It cannot send email, book a meeting, or delete a note, because there is no send verb in the CLI. I never wrote one. A prompt saying "never send" works only if the model reads it correctly every time, and a missing subcommand doesn't depend on that.

What comes out is a draft in my drafts folder or a comment on a task card. The machine collects, I decide.

### Scope

Two questions worth answering before a model touches your personal data.

What sits on disk in plaintext? Running the model locally doesn't help if the index it searches is a readable pile of your email in a repo you might push somewhere one day. Decide what gets extracted to disk and what stays in the source system.

Can it reach the internet? A model with your inbox and a network connection is a different risk from a model with your inbox alone. Mine has no outbound send path and no browser.

If you are still experimenting, run it in a container, or start with a small model on a restricted directory. A confused agent's blast radius is whatever you handed it.

### Why this is fun

The weak model made me build a better system.

A frontier model in the cloud papers over a badly designed tool. It guesses the right flag, recovers from the error, and finds the file anyway, so you never learn that your interface is bad. A small local model has no slack. It fails on every rough edge, and each failure is a reproducible bug report about your own design.

What I ended up with is a handful of commands that are short, well named, hard to misuse, and documented in a hundred lines. That is just a good tool. The weak model was the excuse to finally build one.
