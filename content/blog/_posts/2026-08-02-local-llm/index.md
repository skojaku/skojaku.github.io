---
layout: post
category: blog
date: 2026-08-02
title: Local LLMs are fun!
slug: localllm
---

### The data I can't paste

There is a class of tasks I will never hand to a cloud model.

My inbox has my students' grades, my family's medical appointments, a colleague's unpublished draft. My notes have half-formed ideas I'd rather not have indexed by anyone. It's not that I distrust a particular vendor. It's that most of this data isn't only mine to share.

So for years the answer was: don't automate it. Read the email myself, draft the reply myself, dig up the context myself.

Then the open-weight models — DeepSeek, Qwen, gpt-oss and friends — got good enough that a 30B-class mixture-of-experts model runs on my laptop, on battery, with nothing leaving the machine. Suddenly the answer changes. Email triage, drafting replies in my own voice from my own wiki, pulling together everything I know about a task before I sit down to it — all of it becomes possible without a single byte crossing the network.

That's worth learning now, while it's still slightly awkward.

### They are not smart

Let me be honest about what you get. A local model fails in three ways:

1. **Slow.** A cloud model answers before you finish reading the question. A local one thinks out loud for a minute.
2. **Hallucination.** It invents command-line flags. It invents email addresses. It invents URLs that look exactly right and go nowhere.
3. **Reasoning loops.** It re-plans, re-searches, re-reads the same file, and spirals until the context window is full of its own confusion.

Every one of these is real. None of them is fatal, and this is the interesting part.

**Slow stops mattering when nobody is waiting.** If the unit of work is "by the time I wake up," latency is free. So I stopped thinking of the local model as a chat partner and started thinking of it as a batch worker: a queue, a cron line, a job that either finished or didn't. I don't sit and watch it. I read what it produced.

**Hallucination and looping are design problems, not model problems.** A model invents a flag because your tool has too many. It loops because you gave it a task with no obvious next step. Both are fixed by the thing around the model, not the model.

### Documentation is automation

I keep coming back to Thomas A. Limoncelli's ["Documentation Is Automation"](https://cacm.acm.org/practice/documentation-is-automation/), which I wrote about [before](/snaketail.html). His four phases on the road to automation:

1. **Document** the steps
2. **Find equivalents** — translate each step into a command
3. **Automate** — chain the commands
4. **Autonomous** — it runs without supervision

With a local model, this ladder reads differently. The model isn't going to leap to phase 4. It lives in phases 2 and 3: it can run your commands and chain them, if the commands exist and the doc is short enough to hold in its head.

Which means writing the documentation *is* building the harness. Not a metaphor — the doc file is the prompt. A skill file is documentation that happens to be read by a colleague who reads fast, follows instructions literally, and forgets everything the moment the job ends.

### The harness

My harness is two things: a **CLI tool** and a **skill file**. That's it. The skill file says what the workflow is and which command to run. The CLI does everything else. Mine is called `hq`, and it fronts my mail, calendar, drive, and wiki. What it does isn't the point here — how it's *shaped* is, because the shape is what I got wrong for months.

Six rules I converged on.

**1. The skill file is 100 lines, hard cap.**

Local models degrade fast as context grows. Not gracefully — they fall off a cliff and start ignoring the middle of what you told them. Every line in the skill file competes for attention with the actual task.

So compress. Telegraphese. Drop articles, drop hedging, drop the paragraph explaining why. Show the invocation instead of describing it:

> ~~"If you would like to look for messages from a particular person within the last week, you can use the find subcommand together with the --from flag, which accepts an email address or a name..."~~
>
> `hq mail find --from someone --newer-than 7d` — one precise query beats broad scans.

Twenty words instead of a hundred, and the second version is the one the model actually copies.

**2. Keep the verbose junk out of the context.**

API keys, account IDs, calendar IDs, absolute paths. None of it should ever appear in the model's context. It all goes into a `config.yaml` that the CLI loads itself.

A 40-character opaque ID is a dozen tokens spent on nothing, plus a chance to typo it, plus a failed call, plus a repair attempt, plus a loop. Multiply by every command in a session. The model should type `hq cal free --from today`, never an ID.

**3. Speak the model's dialect.**

This is the one that surprised me most.

Every model has priors about what subcommands are named. Ask one to search your email and it types `mail search`. Another types `mail find`. A third confidently tries `mail list`. If your CLI disagrees, you get an error, then a repair attempt, then a re-read of the help text, then a spiral — and the context window is gone to a naming disagreement.

The fix costs five lines:

```python
# whatever the model reaches for, it lands in the same place
sub.add_parser("find", aliases=["search", "query", "grep", "list"])
```

Either rename to match what your model reaches for, or accept all of them. This removed more failures than any prompt tuning I did.

**4. Put retrieval inside the tool.**

Never let the model run `grep`. One grep on a real corpus returns a wall of text, and the context is gone — along with the plan, the instructions, and any hope of finishing the task.

Give it a search command instead, with a hard result cap and an embedding index behind it. Semantic search matters more here than you'd expect: a weak model is bad at guessing the exact keyword a note was written with, and good at describing what it wants.

And return small JSON that admits what it hid:

```json
{"count": 143, "shown": 5, "truncated": true, "results": ["..."]}
```

`truncated: true` tells the model it didn't see everything, so it narrows the query instead of confidently summarizing five items as if they were all of them.

**5. Test by watching it fail.**

The test is not "was the answer good." The test is **what did it type**.

Give the model a task, then read the transcript line by line and look only at the commands. Every wrong invocation is a bug — in your CLI's naming, in your skill file's wording, in a default you didn't set. Almost never in the model. Fix the harness, rerun, watch again. Two or three rounds of this beat a week of prompt tweaking.

**6. Boundaries go in the code, not the prompt.**

My agent can read anything and draft anything. It cannot send email, book a meeting, or delete a note.

Not because I asked it nicely. Because **there is no send verb in the CLI**. It doesn't exist. No amount of confusion, hallucination, or misread instruction produces a sent email, because the capability isn't there to be reached. Ten lines of prompt saying "never send" is a suggestion. A missing subcommand is a fact.

Everything the model produces is a draft in my drafts folder, a proposal on a task card, a comment I read. The machine collects; I decide.

### Scope, before you point it at your life

Two questions worth answering deliberately before a model touches your personal data:

**What sits on disk in plaintext?** A local model doesn't protect you if the index it searches is a world-readable pile of your email in a repo you might one day push somewhere. Decide what gets extracted to disk, and what stays in the source system.

**Can it reach the internet?** A model with your inbox and a network connection is a different risk than a model with your inbox alone. Mine has neither an outbound send path nor a browser.

If you're experimenting and not sure yet, run it in a container, or start with a small model on a restricted directory. The blast radius of a confused agent is whatever you handed it.

### Why this is fun

Here's the part I didn't expect: the weak model made me build a better system.

A frontier model in the cloud papers over a badly designed tool. It guesses the right flag, recovers from the error, finds the file anyway. You never learn that your interface is bad. A small model on your laptop has no slack. It fails loudly on every rough edge, and each failure is a precise, reproducible bug report about your own design.

What you end up with is a set of commands that are short, well-named, hard to misuse, and documented in a hundred readable lines. That's just a good tool. The model was the excuse to finally build one — and it runs on hardware I own, over data I never had to hand to anyone.

That's the fun part.
