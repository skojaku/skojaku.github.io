---
layout: post
category: blog
date: 2026-09-29
title: More is less
slug: more-is-less
published: false
lang_alt_url: /more-is-less-jp.html
lang_alt_label: 日本語(Japanese)
---

<p style="color: #888; font-style: italic;">Note: This blog is something I write in the limited time I have. I wrote it in Japanese (mother's tongue) and had an AI turn it into English, followed by light final touch. That is why it may read a little AI-ish here and there. Do forgive me!</p>

Lately I have been reading a lot of papers written by AI. I also write papers with AI myself now, and it has made writing much easier. The flip side is that if you let AI write too much, a very tiring job awaits: review.

When ChatGPT came out, I thought AI-written text was easy to read. But when an AI writes a paper autonomously, the text is very hard to read. This is not tied to a particular model; whichever model I try, the output is hard to read. My students also use AI to write lots of papers and ask me to review them, and reading them is a real burden.

I tried to work out why. My hypothesis is this. AI can understand the written text in fine detail, so it seems to believe that the more information, the better. But humans can hold only so much information in their heads at once (a cognitive bottleneck). Given too much, we lose focus and understand less. For humans, more is less. Here are two typical examples.

The first is the level of detail in numbers. AI-written papers spell out numbers in fine detail. They pick up the numbers one by one and explain "therefore this holds." The figures and tables are dense and very colorful, too.

I have never written this way. A paper changes while it is being written: new experiments become necessary, and tables and figures get replaced entirely. Each time, the whole text has to be fixed, and copying table values into the text without error is laborious. I also doubted that readers pay close attention to fine results. So I have generally kept detailed results out of the prose and focused on integrating information: the key trends, and sentences that explain them. This takes less text, keeps the big picture in focus, and is easier for the author to maintain.

The second is laying out all the ingredients first. Derivations of equations show it clearly. When asked to derive an equation, AI usually follows a fixed pattern. It first defines all the symbols at once: "X is this, Y is that, Z is this." Then it writes out equations using all of them. This is very hard to read, because a human has to memorize every symbol before understanding any equation. I think the easy-to-follow form is to release information in small pieces and build up step by step. AI seems to prefer laying out all the ingredients first and then taking a single snapshot of the whole.

The same structure appears in the Results section. AI first makes a section on the experimental setup and data, and puts all the settings for the later experiments in it. But the settings of experiments I have not yet seen do not stay in my head.

I think both come from the fact that AI can take in all the information in detail, while it does not account for the human cognitive bottleneck.

So I tell the AI the following:

- Make new information understandable from the information that came before it.
- Do not write detailed numbers in sentences; let tables and figures carry all the results.
- Put fine details in the appendix, and keep only the important points in the main text.

Undefined terms, and software-engineering vocabulary used in place of academic terms, are a different matter. To fix them I have to actually read the paper and give detailed instructions one by one, and I have not yet found a way to get this right in one shot. I either have to point out what is hard to follow and what is unclear, or fix it myself.

Doing these things makes the text somewhat more readable, since there is less information in it. But I still feel I end up writing most of it myself. I want to keep studying how to use AI for writing.
