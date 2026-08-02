---
layout: post
type: post
title: "Postscript: Idle Frontier"
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

Language models have been really good at coding tasks recently, and I think that this is where Claude helped the most.
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






<!-- really good at programming -->
<!-- i'm also rusty at Godot: version changed from 3 -> 4, learning new techniques and patterns. not even proud of my own Godot code -->

## Art & Writing

<!-- Tone is often wry and condescending -->
<!-- You need to nudge it properly, still bad at art. but good at simple art (a few mistakes that are fixable) -->
<!-- The art looks a bit too streamlined... i think in some way it loses the indie game clunky charm -->

## Gameplay


<!-- Claude isn't good with ideation, not too novel -->
<!-- but really good at mechanics and balancing -->


## Conclusion
