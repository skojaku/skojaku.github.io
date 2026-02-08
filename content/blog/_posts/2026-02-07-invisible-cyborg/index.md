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

### Daily reports

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

> [!NOTE]
> - Environment variables (like `TASKS_DIR`, `ROADMAP_DIR`, `REVIEWS_DIR`) are set up for these commands.
> - I use existing scripts to collect the needed data.
> - The "Triage the data" step still needs clearer criteria for setting priorities.
