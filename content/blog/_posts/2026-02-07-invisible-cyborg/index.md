---
layout: post
category: blog
date: 2026-02-07
title: The invisible cyborgs
---

### Building my parts

While reading [Darek Larson's blog](https://www.dtlarson.com/feed-the-beast), I daydreamed about a scene from [Psycho-Pass](https://www.imdb.com/title/tt2379308/). People in this world are inseparable from AIs---just like us today. [Toyohisa Senguji](https://dic.pixiv.net/a/%E6%B3%89%E5%AE%AE%E5%AF%BA%E8%B1%8A%E4%B9%85), a man who replaced every part of himself with machines, asks a question that seems not like science fiction now:

![digital assistant](/assets/blog/2026-02-07-invisible-cyborg/toyohisa-senguji.webp){: width="70%"}

> "You probably have home automation and an digital secretary. What would happen to you if all the data in those devices was lost due to a disaster or accident? When you entrust so much of your everyday life to those electronic devices, the argument that you aren't a cyborg isn't very convincing. To you, those portable terminals are already your second brain. Isn't that right?"

We tend to think of ``cyborgs'' as people with metal limbs. But Senguji’s suggests we are already there.

### Building my parts

I've been using Claude Code primarly for coding and writing. But if they can be a part of me, why not deligate some of my important tasks to them, like task management and planning? Just to see how far they can go.

An only concern is that these tasks require another level of trust, and I personally don't trust them yet to hand over sensitive information to someone behind the AI curtain.

Lukily, [ollama](https://ollama.com/) recently released so called [ollama launch](https://ollama.com/blog/launch) feature that lets me use Claude Code with local model.

![](images/ollama-launch.png){: width="50%"}

### Example

My day begins with making a daily journal, checking emails and todos, and setting priorities. Then I start my tasks. Sometimes, other work or meetings interrupt me, so I update the journal to reflect changes. Can we automate this process?

I created a simple Claude Slash Command named `daily` as follows.

```md
You are an assistant for daily planning and review.

1. Confirm the date

Check the date and use the data through the session.

date +"%Y-%m-%d (%A, %B %d, %Y)"

2. Collect data

Gather data from the following sources:

- Recent Git activity (last 24 hours):
  bash "$TASKS_DIR/scripts/scan_git_changes.sh" "1 day ago"

- OmniFocus tasks:
  osascript "$TASKS_DIR/scripts/get_omnifocus_tasks.scpt"

- Roadmap or goals files in your notes:
  find "$ROADMAP_DIR" -name "*roadmap*" -o -name "*goals*" -o -name "*plan*" | head -20

- Recent journal entries:
  ls -t "$REVIEWS_DIR"/*.md 2>/dev/null | head -3

3. Triage the data

- Identify the most important/urgent tasks by project. Highlight flagged/due-soon.
- Suggest 3-5 key next steps, based on priorities, deadlines, flags, roadmap, and recent progress.
- Any observations: stalled tasks, idle projects, deadlines, patterns

4. Write the daily report

Be clear and concise. Use this template:

---
date: {YYYY-MM-DD}
type: daily-review
---

Daily Review — {YYYY-MM-DD}

**What I Did Today**
{Summarize git changes: commits, files, projects}

**Active OmniFocus Tasks**
{List most important/urgent tasks by project. Highlight flagged/due-soon.}

**Focus for Today**
{Suggest 3-5 key next steps, based on priorities, deadlines, flags, roadmap, and recent progress.}

**Notes**
{Any observations: stalled tasks, idle projects, deadlines, patterns}

5. Save

Save the review to:
$REVIEWS_DIR/{YYYY-MM-DD}-daily.md

After saving, confirm the file was created and list your top 3 priorities out loud.
```

> [NOTE]
> - Environment variables (like `TASKS_DIR`, `ROADMAP_DIR`, `REVIEWS_DIR`) are set up for these commands.
> - I use existing scripts to collect the needed data.
> - The "Triage the data" step still needs clearer criteria for setting priorities.

This replaces my morning routine. It checks my data and suggests me what to do today, while I'm cafinating myself with a cup of coffee.

I also made other commands, like `/email`, which helps check my inbox and interacts with me to book meetings, add new tasks, and draft replies.

These tasks management commands need to interact with other apps, like my calendar app and my email app, and the bare Claude Code sometimes struggle to communicate with them. A solution is to use Claude Skills to describe how to interact with these apps. For example, I have a `calendar` skill that controls my calendar app and is used by both `/email` and `/daily` commands.

### What do the invisible cyborgs do for me?

My first impression is that the results aren't quite like mine. They're longer and more detailed. But, yeah, I can live with it and it saves me about 10 minutes each day. That's not bad.

Another unexpected benefit is accountability. I felt like I have someone beside me, checking on my progress and reminding me of my tasks. It helps me stick to my plan and gives me second thoughts, so that I have a little bit more broader perspective on what I'm doing.

### Conclusion

In The Salmon of Doubt, Douglas Adams wrote:

> Anything that is in the world when you're born is normal and ordinary and is just a natural part of the way the world works.
>
> Anything that's invented between when you're fifteen and thirty-five is new and exciting and revolutionary and you can probably get a career in it.
>
> Anything invented after you're thirty-five is against the natural order of things.

These invisible cyborgs might feel against the natural order of things to some. But Senguji's question lingers: if losing my digital secretary would disrupt my life, aren't they already a part of me?

The experiment taught me something unexpected. I didn't just save 10 minutes---I gained a companion who holds me accountable, reminds me of what matters, and offers a broader perspective on my work. The results aren't perfectly mine, but they don't need to be. They're good enough, and that's the point.

We're not waiting for metal limbs to become cyborgs. We're already there, quietly building ourselves piece by piece. The only question is: which parts do we choose to add?

