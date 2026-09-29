---
layout: post
category: blog
date: 2026-09-29
title: More is less
slug: more-is-less
lang_alt_url: /more-is-less-jp.html
lang_alt_label: 日本語(Japanese)
---

<p style="color: #888; font-style: italic;">Note: This blog is something I write in the limited time I have. I wrote it in Japanese (mother's tongue) and had an AI turn it into English, followed by light final touch. That is why it may read a little AI-ish here and there. Do forgive me!</p>

![Programming with an AI assistant](/assets/blog/2026-09-29-new-post/ai-assistant-comic.webp){: width="70%"}

Lately, I’ve been reading a lot of papers written by AI. I’ve also been using AI to write my own papers more often, which has made the process much easier. On the other hand, if you rely too heavily on AI to write papers, a very exhausting task awaits: the review process.

I thought that AI-generated text was easy to read when ChatGPT first came out, but when AI writes papers autonomously, the resulting text is very difficult to read. This isn’t limited to any specific AI model; every model produces text that’s hard to read.

I’ve been thinking about why this is so difficult. My hypothesis is this: Since AI can understand written text in minute detail, it seems to operate under the assumption that “the more information, the better.” However, humans have a limit to the amount of information they can process at once (a cognitive bottleneck). Too much information scatters our attention and hinders understanding. In other words, for humans, “More is less,” but for AI, “More is more.” This difference leads to various cognitive misalignments, resulting in text that is hard to read. Below, I’ll cite two typical examples where this occurs.

The first is the level of detail in the numbers. In papers written by AI, numbers are described in excruciating detail throughout the text. The AI picks out each number one by one and explains, “Therefore, this is the case.” The figures and tables are also densely packed and very colorful.

I have never written this way before. This is because, while writing a paper, new experiments may become necessary, or tables and figures may be completely revised. Each time this happens, I have to revise the entire main text, and it takes a great deal of effort to accurately transfer the numerical values from the tables into the text without errors. Furthermore, since I didn’t assume readers would necessarily pay attention to every minute detail, I’ve generally refrained from describing detailed results within the text. Instead, I’ve focused on integrating information—highlighting key trends and the sentences that explain them. This approach requires less text, keeps the big picture clear, and is easier to maintain from the author’s perspective.

The second point is to present all the material at the beginning. This makes the derivation of mathematical formulas easier to understand. When AI derives mathematical formulas, it usually follows this pattern: First, it defines all the symbols at once—“X is this, Y is that, and Z is this.” After that, it writes out the equations one after another using all those defined symbols. This is extremely difficult to read because humans cannot understand the equations until they have memorized all those symbols one by one. I believe the most understandable approach is to present information in small doses and build it up step by step. AI, on the other hand, seems to prefer a method where it lays out all the materials at the beginning and then presents the complete picture all at once.

The same structure can be seen in the “Results” chapter. When you have an AI write a paper, it first creates a chapter on experimental setup and data, and writes all the settings for subsequent experiments there. However, the settings for experiments the reader hasn’t seen yet simply don’t stick in their mind, no matter how many times they read them.

I believe both of these issues stem from the fact that while AI can understand all the information in minute detail, it fails to account for the limitations of human cognition.

Therefore, I make a point of conveying the following points to the AI:

- Ensure that new information presented can be understood based on what came before it.
- Avoid including detailed numbers in the text; instead, ensure that all results can be explained through tables and figures.
- Put the details in the appendix and focus the main text on the key points.

On the other hand, issues such as the use of undefined terms or software engineering jargon instead of academic terminology require me to read the paper and provide detailed instructions one by one; I haven’t yet found a way to get this right on the first try. I have to either read the paper myself and point out exactly what is difficult to understand or unclear, or simply correct it myself.

Doing this makes the text somewhat easier to read because it reduces the amount of information. However, I end up feeling as though I’m writing most of it myself, so I’d like to continue researching how to use AI writing tools more effectively.
