---
layout: post
category: blog
date: 2026-08-02
title: Local LLMs are fun!
slug: localllm
---

### Local LLMs are a rabbit hole

Local LLMs are fun to play with. They hallucinate, ignore instructions, and stop in the middle of no where. But if I can get one to run properly, a lot of automation becomes possible.

I took that as an engineering challenge and spent a while on it, trying many local models and many harness designs. Here is what I learned.

### Why not simply use cloud LLMs?

Part of the motivation is to connect an LLM to protected data like emails, my wikis, and calender, which I cannot send to someone else's servers (e.g., ChatGPT, Cluade, etc). There are a lot of attractive LLM app and skills like Obsidian Cluade and Google Workspace skill. But I cannot simply use them due to this regulation.   

So anything touching that data has to be done manually, and remain almost unchanged since 2022. In the age of AIs I have grown less tolerant of it, and I keep looking for ways to hand it off and spend the time on the creative work I actually want to do.

Local LLMs are a very attractive answer. The model runs on my own hardware, so it can read my wiki and my email without leaving my laptop.

In its bare form, though, a local LLM fails a lot.

### They are not smart

There are roughly three ways a local model fails.

First, it is slow. A cloud model answers almost instantly, while a local model spends a minute thinking out loud before it starts typing.

Second, it hallucinates. It makes up command-line flags, email addresses, and URLs that look plausible but do not exist.

Third, it loops. It re-plans, searches again, and reads the same file again, until the context window is filled with its own confusion.

The slowness stopped bothering me once I stopped chatting with the model. If the deadline is "by the time I wake up," a minute per step costs nothing. So I run the model as a batch worker: a queue, a cron job, a task that either finished or did not. I don't watch it work. I just read what it produced in the morning.

The other two are design problems, I believe. The model invents a flag because the tool has too many flags. It loops because the task has no clear next step. Waiting for a smarter model fixes neither of them.

### Documentation is automation

Thomas A. Limoncelli's ["Documentation Is Automation"](https://cacm.acm.org/practice/documentation-is-automation/), which I wrote about [before](/snaketail.html), describes four phases on the road to automation:

1. **Document** the steps
2. **Find equivalents** — translate each step into a command
3. **Automate** — chain the commands
4. **Autonomous** — it runs without supervision

A local model cannot reach phase 4 on its own. But it is good at phases 2 and 3: it can run commands and chain them, as long as the commands exist and the document is short enough to hold in its head.

This changed how I write documentation. Writing the documentation is building the harness, because the document is the prompt itself. I write it for a colleague who reads fast, follows instructions literally, and forgets everything once the job is done.

### The harness

My harness consists of a CLI tool and a skill file. The skill file describes the workflow and which command to run at each step, and the CLI does everything else. My CLI is called `hq`, and it wraps my mail, calendar, drive, and wiki. What it does is not so important here. What matters is its shape, which took me months to get right.

**Keep the skill file short.** Mine is 100 lines, and I treat that as a hard cap. Local models degrade quickly as the context grows, and not gracefully. They fall off a cliff and start ignoring the middle part of the instructions. Every line in the skill file competes with the actual task for attention.

So I compress the file aggressively, almost like a telegram. No articles, no hedging, no paragraphs explaining why. Where possible, I show the command instead of describing it:

> ~~"If you would like to look for messages from a particular person within the last week, you can use the find subcommand together with the --from flag, which accepts an email address or a name..."~~
>
> `hq mail find --from someone --newer-than 7d` — one precise query beats broad scans.

The model copies the second version, not the first.

**Long opaque strings go into a config file.** API keys, account IDs, calendar IDs, absolute paths: none of these should enter the model's context. They all live in a `config.yaml` that the CLI reads by itself. A 40-character ID costs a dozen tokens for nothing, and the model may typo it, fail the call, and then try to repair it. With the config file, the model just types `hq cal free --from today` and never sees an ID.

**Match the model's vocabulary.** This one surprised me. Every model has its own prior about what subcommands should be called. When I ask it to search my email, one model types `mail search`, another types `mail find`, and another `mail list`. If the CLI disagrees with the model's guess, I get an error, a repair attempt, a re-read of the help text, and often a loop. All of this is paid from the context window.

The fix is five lines:

```python
# whatever the model reaches for, it lands in the same place
sub.add_parser("find", aliases=["search", "query", "grep", "list"])
```

Rename the command to whatever your model likes to type, or just accept all of them. This one change removed more failures than anything else I tried.

**Retrieval belongs inside the tool.** I do not let the model run `grep`. A single grep over a real corpus returns a wall of text, and the context is gone, together with the plan and the instructions.

Instead, I give the model a search command with a result cap and an embedding index behind it. Semantic search matters more than I expected here. A weak model is bad at guessing the exact keyword a note was written with, but it is fine at describing what it is looking for.

The output should also be honest about what it hid:

```json
{"count": 143, "shown": 5, "truncated": true, "results": ["..."]}
```

Without the `truncated` field, the model happily summarizes five results as if they were all 143.

**Test by reading what it typed, not what it answered.** I give the model a task and read the transcript, looking only at the commands it typed. Almost every wrong invocation turns out to be a bug on my side: the CLI's naming, the skill file's wording, or a default I forgot to set. It is almost never the model's fault. I fix it, rerun, and read again. Two or three rounds of this improved things more than a week of rewording prompts.

**Boundaries live in the code, not in the prompt.** My agent can read anything and draft anything. But it cannot send an email, book a meeting, or delete a note, simply because the CLI has no such commands. I never wrote them. A prompt saying "never send" works only if the model reads it correctly every single time. A missing subcommand does not depend on that.

So what comes out of the agent is a draft in my drafts folder or a comment on a task card. The agent collects and drafts, and I make the final call.

### Scope

Before letting a model touch your personal data, I think two questions are worth asking.

First, what sits on disk in plaintext? Running the model locally does not help much if the search index is a readable pile of your emails, sitting in a repo you might push somewhere one day. It is worth deciding what gets extracted to disk and what stays in the source system.

Second, can it reach the internet? A model with your inbox and a network connection is a different risk from a model with your inbox alone. Mine has no way to send anything out, and no browser.

If you are still experimenting, run it in a container, or start with a small model on a restricted directory. A confused agent can only break what you handed to it.

### Why this is fun

The weak model forced me to build a better system.

A frontier model in the cloud covers up a badly designed tool. It guesses the right flag, recovers from errors, and finds the file anyway, so I never notice that my interface is bad. A small local model has no such slack. It fails at every rough edge, and each failure is a reproducible bug report about my own design.

What I ended up with is a handful of commands that are short, well named, hard to misuse, and documented in a hundred lines. That is simply a good tool. The weak model was a good excuse to finally build one.
