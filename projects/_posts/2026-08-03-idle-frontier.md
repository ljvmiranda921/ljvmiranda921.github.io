---
layout: post
type: post
title: "Postscript: Idle Frontier and on developing games with AI"
date: 2026-08-03
category: projects
comments: true
author: "LJ V. MIRANDA"
published: true
tags:
  [
    nlp,
    language technology,
    natural language processing,
    games,
    godot,
    claude,
    aseprite,
    pixel art,
    game development,
    development log
  ]
description: |
    Idle Frontier is a clicker game that challenges you to build a frontier language model in 1000 days!
    In this blog post, I'll talk about some reflections on developing a game with the help of Opus 5 from Anthropic.
excerpt: |
---

<span class="firstcharacter">C</span>an you bootstrap your way from annotating data to training a frontier model in one thousand days? Play Idle Frontier!

<div style="text-align: center;" markdown="0">
<iframe frameborder="0" src="https://itch.io/embed-upload/18643386?color=183f39" allowfullscreen="" width="360" height="640"><a href="https://ljvmiranda921.itch.io/idle-frontier">Play Idle Frontier on itch.io</a></iframe>
</div>

&nbsp;

In this blog post, I want to share my experience developing this game with the aid of Opus 5 (which I'll just call Claude from now on).
My goal is to give a tempered perspective on AI-aided game development: 
something in between those [zero-shot-three-js games](https://somethingbig.ai/games) that are popular recently and the [no-AI-in-my-workflow](https://www.gamesradar.com/games/why-so-many-game-developers-dont-want-to-use-generative-ai/) crowd.
Note that I'm just a hobbyist game developer.
I learned pixel art and Godot and made [four games before](https://ljvmiranda921.itch.io), but nothing too fancy.
I will talk about my experience with Claude regarding programming, art, and gameplay.

## Programming

Language models have been really good at coding tasks recently, and I think this is where Claude helped me the most.
The [last time I made a game](https://ljvmiranda921.itch.io/better-together) was back in 2022 using Godot 3, and in the four years since, Godot has shipped a major update.
In addition, I am not quite proud of my GDScript coding hygiene: most of my game dev projects have spaghetti code or random patches here and there.[^1]
Working with Claude has helped me with two things: migrating my rusty Godot 3 knowledge to the new version and learning actual game design patterns. 
Yes, I did learn a few new tricks just by reading Claude's code!

[^1]: Although I consider myself proficient in Python, the design space in Godot is quite different and took me some time to even wrap my head around.

One example of this is in my use of signals.
I learned that signals are now objects and we call them using `await` in Godot 4 instead of `yield(...)` in Godot 3.
In addition, I also learned about the event bus pattern when handling multiple signals together:

```python
signal data_changed(total: int)
signal mission_claimed(mission: Mission)
signal grant_claimed(grant: GpuGrant)

func add_data(amount: int) -> void:
    data += amount
    EventBus.data_changed.emit(data)

func _ready() -> void:
    EventBus.data_changed.connect(_refresh)
```

So instead of keeping track of every signal I created, I can just use the `EventBus` as the handler for any changes&mdash;awesome!

My workflow for *Idle Frontier* was to start constructing the scene in the Editor and write the functions for the interaction I want.
Initially, I asked Claude to help me with bugfixes and debugging, but I've been quite impressed with its skill in interacting with Godot (without any add-ons!).
In fact, some of the [Screens](/notebook/2021/04/19/godot-nodes-and-scenes/) (e.g., the mission screen) were done by Claude end to end.
Although I can definitely imagine a Godot game done by Claude with minimal human input (similar to those zero-shot three-js games), there are still a lot of details that Claude missed.
For example, there are many moments when implementing a new feature breaks another, or like the screen has elements that are spaced weirdly.
What I found helpful is to always have the general "shape" or context of the codebase in your head, and let Claude implement the details.
The challenge usually is that when you vibe-code a lot, you lose your understanding of the organization of your codebase, and you're left with a frustrating whack-a-mole of patches.

Despite these limitations, Claude has helped me get reacquainted with Godot faster.
To be honest, this was one of the reasons I hadn't gone back to game dev in the past few years.
Relearning a framework is kind of a bummer, but Claude has helped me ease into Godot again!

## Art & Assets

Claude, through its tool use capabilities, can already interact with Aseprite to [draw pixel art](/notebook/2025/07/20/draw-me-a-swordsman/).
But from my experience, I don't think it's quite there yet.
For example, it had a hard time drawing and animating a llama&mdash;so instead, I drew it myself.
I tried many things to nudge Claude such as giving it a reference picture or describing it in a verbose manner.
One thing I learned about my process is that there's a *specific* vibe that I'm aiming for, and it is hard to express this vibe into words, as "I'll know it when I see it." 
Perhaps, that's why it's easy for me to iterate on Aseprite rather than in a chat box.

Despite this limitation, Claude has been quite good in drawing very simple icons for the UI:

{% include figure.html
   src="/assets/images/idle-frontier/blog_icons.png"
   width="500"
   caption="User interface icons made by Claude using Aseprite" %}

This one is quite useful because I can just describe what I need (e.g., "can you draw a chip?") and it will be exported immediately. 
Claude is also quite good in workflow-related tasks such as creating a canvas, exporting to PNG/GIF, or creating a spritesheet.
It's actually very cool, I can just say "create a lightbulb and an 8-cycle animation of it turning on."
Again, it's pretty good at these basic time-saving activities.

> I am not really sure if Claude's drawing limitations is due to its harness.

I am not really sure if Claude's drawing limitations is due to its harness. 
When I counted the number of tool calls in Aseprite, here's what I got:

| Function | Number of Calls | Percentage |
|---|---|---|
| `run_lua_script` | 145 | 64.4% |
| `export_sprite` | 39 | 17.3% |
| `export_spritesheet` | 20 | 8.9% |
| `create_canvas` | 14 | 6.2% |
| `get_sprite_info` | 6 | 2.7% |
| `set_palette` | 1 | 0.4% |

It seems that most operations are Claude just passing Lua scripts to Aseprite instead of using granular drawing tools (e.g., `draw_line`, `draw_polygon`, `draw_pixels`, etc.).
So in some way, it is actually circumventing the "spririt" of the tool-call and relying on its coding capabilities.
When I inspect the Lua call, its full of for-loops and shifts, which is reasonable in retrospect:
although there is a `draw_pixels` tool, using it will require sending hundreds of tool-calls (one for each coordinate) to Aseprite. Perhaps, Claude found that just sending a Lua code with the for-loop is much more efficient.




<!-- Tone is often wry and condescending -->
<!-- You need to nudge it properly, still bad at art. but good at simple art (a few mistakes that are fixable) -->
<!-- The art looks a bit too streamlined... i think in some way it loses the indie game clunky charm -->

## Gameplay


<!-- Claude isn't good with ideation, not too novel -->
<!-- but really good at mechanics and balancing -->


## Conclusion
