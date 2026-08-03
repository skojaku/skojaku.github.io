---
layout: post
category: blog
date: 2026-08-02
title: The case for local LLMs
slug: localllm
---

*Note: This is an English version of a post I originally [wrote in Japanese](/localllm-jp.html). This blog is something I write in the limited time I have, and writing in Japanese is faster for me, so I write in Japanese first and have an AI turn it into English. I touch it up in places myself, but it is still largely AI-generated — which is why it may read a little AI-ish here and there. Do forgive me!*

Local LLMs are a lot of fun. So much fun that I have wasted hours on them.

A local LLM can touch data that I cannot let a cloud LLM touch, which means it can automate all sorts of everyday tasks. I am in the middle of automating various things right now, and I have learned a lot along the way, so today I want to write about what I learned.

### The problem with cloud LLMs

Frontier models are straight-A students that handle almost anything well. The recent ones in particular integrate smoothly with Office, Gmail, and Google Workspace; they are easy to set up and often ready to use right away.

Whether I may actually hand them my data, though, is a separate question. At my university, regulations forbid sharing many kinds of data, and I myself am reluctant to hand over personal information. So I split my data into what I send to frontier models and what I do not.

This is not paranoia; accidents have actually happened. At Samsung, employees pasted confidential source code and meeting notes into ChatGPT, and [the company ended up banning generative AI internally](https://www.forbes.com/sites/siladityaray/2023/05/02/samsung-bans-chatgpt-and-other-chatbots-for-employees-after-sensitive-code-leak/). ChatGPT's link-sharing feature put [thousands of conversations into Google search results](https://www.malwarebytes.com/blog/news/2025/08/openai-kills-short-lived-experiment-where-chatgpt-chats-could-be-found-on-google). Just recently, shared conversations and Artifacts from Anthropic's Claude [showed up in Google search](https://techcrunch.com/2026/07/27/psa-your-claude-shared-chats-and-artifacts-may-have-ended-up-on-google/) as well, and some of them reportedly contained [medical records of real patients and internal-only company documents](https://fortune.com/2026/07/27/a-trove-of-users-seemingly-private-conversations-with-anthropics-claude-ai-chatbot-showed-up-in-google-search-results/). DeepSeek went as far as [leaving a database of chat histories and API keys wide open on the internet](https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak). Once your data is on someone else's cloud, you no longer control what happens to it.

But once I split my data this way, some tasks can use an LLM and some cannot. And many of the small daily tasks are exactly the ones that deal with data I cannot send to someone's cloud, so those stay manual and tedious.

So there is plenty to gain from a local LLM.

### The problem with local LLMs

Can you use one as-is, then? Not really. A raw local LLM is completely useless. It hallucinates a lot, stalls in the middle of its reasoning, forgets the instructions partway through, and looks at the same file over and over.

The problems come down to roughly three.

First, it can only follow a limited number of instructions. Recent benchmarks report that frontier models can follow [around 2,000 instructions at once](https://arize.com/blog/llm-instruction-following-benchmark-2026/), while [small models fall apart exponentially as the instructions pile up](https://arxiv.org/abs/2507.11538). In my experience too, a local LLM can reliably keep to a few dozen instructions at most; beyond that, it loses track of them.

Second, it hallucinates easily. A local LLM has been trained on less data and holds less knowledge inside, so when it strains to produce an answer anyway, it makes things up. Its memory is not great either: pile enough turns on top of a piece of information it got early on, and it forgets it.

Third, it does not deal well with vague instructions. Given a vague instruction, a local LLM reasons its way to an interpretation and a plan, but the planning is often sloppy or wobbly, and the same input can produce completely different plans and fail.

Put these three together and you get a loop: the model forgets the original instruction in the middle of its reasoning, forgets the file it read at the start, reads the same file again, the reasoning gets longer, and it forgets the instructions even more.

Flip that around: if I can cover for these weaknesses by design, a whole lot of tasks become possible. This engineering problem is very fun.

### Documentation is automation

The principle at the root of how I solve this is Thomas A. Limoncelli's [Documentation Is Automation](https://cacm.acm.org/practice/documentation-is-automation/). It explains that automation happens in four stages. It is a guide for human engineering rather than for LLMs, but it is very helpful when building a system around a local LLM, so let me introduce it here.

1. **Document** — write down the steps
2. **Find equivalents** — replace each step with a command
3. **Automate** — chain the commands together
4. **Autonomous** — let it run unsupervised

Automate, and the time spent on repeated tasks goes down. It takes an upfront investment of time, of course, but I think of it as paying off a time debt that would otherwise stretch far into the future.

And the concrete way I ended up realizing these four stages is with command-line tools and skills. My system follows the four stages exactly, so let me walk through them in order.

#### 1. Document — record first, then write it down

To write things down, I first need a record of my daily work. For me, that record is the session with the LLM itself. As long as I save the sessions, every concrete step of the work stays there.

On top of that, whenever a piece of work comes up, I have made it a habit to first create a task on [Forgejo](https://forgejo.org/) (a GitHub-like thing you can host yourself). This lets me look back later and see what tasks there were. Each task is tied to its session, so if I want the concrete steps, I just go look at the session. I use this to hunt, after the fact, for spots that could be automated.

Then, for work that keeps coming back, I write a skill — a short instruction file that tells the model how to do that work smoothly. In other words, my documentation has two layers: Forgejo (the record of tasks and sessions) and skills (the written-down procedures).

#### 2. Find equivalents — turn steps and skills into commands

Next, I replace the documented steps and skills with command-line tools wherever I can.

A local LLM cannot be trusted, so if I hand it the whole job, tasks go unfinished, or it gets stuck in a loop somewhere unexpected. So whatever can be automated, I automate with command-line tools, to lighten the model's load. Concretely, I have command-line tools that look things up in Gmail, write email drafts, check my calendar for conflicts, access Google Drive, and so on.

#### 3. Automate — connect them with a meta-skill

Real tasks do not arrive politely one at a time. Some stretch across several tasks; some new tasks arrive with an existing task tucked inside. So I write what I call a meta-skill. A meta-skill is a skill for using the other skills and commands. It describes the overall flow of the work: which tool or skill to use at which moment.

There is a knack to writing skills. As I said above, a local LLM cannot follow many instructions. So I push most of the work into the command-line tools and keep the skills short.

Ideally, how to use a tool should all be written in the tool's own help text. But then the model has to run a command every time to read it, and that wastes time. So I deliberately write the usage into the skill.

On top of that, skill files written by an LLM are full of needless decoration and wordy instructions, which crowd the model's working memory. So I write skills in telegram style. This saves quite a lot of tokens.

I also keep skills in line with a project-wide policy. Once you start writing skills that stray from the policy, you end up scratching your head, and maintenance becomes a pain.

#### 4. Autonomous — let it run unsupervised

With all of this in place, the LLM can finally do tasks fully on its own. Hand it a Forgejo task, and it runs to the end, following the flow written in the meta-skill and calling the command-line tools along the way.

What matters most when running unsupervised is the safety net. I first decide which parts get automated and which parts do not, and then I put only the allowed operations into the command-line tools, deliberately leaving the rest out. For example, so that the local LLM cannot send an email by mistake, the mail tool simply has no send function. And so that it cannot invite people to meetings on its own, the calendar tool has no invitation function either.

My boundary line is whether the work can be redone. Work that can be redone gets automated; work that cannot be redone does not. Drawing the line inside the tools is far more reliable than pleading "never send" in a prompt — and in fact, the LLM has never once crossed that line on its own.

### In closing

All sorts of local LLMs are available now, and new models and checkpoints keep coming. The better local LLMs get, the more tasks I can hand over. I am very much looking forward to what comes next.
