---
layout: post
type: post
title: "Picollino: rough Pico-8 study notes on movement"
date: 2021-01-31
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [pico8, games, movement, roguelike, programming, software]
description: |
    Picollino contains some of my study notes as I learn Pico-8. Here, I
    wrote about the basics of movement: walk direction, smoother transitions,
    and button buffering.
excerpt: |
    Picollino contains some of my study notes as I learn Pico-8. Here, I
    wrote about the basics of movement: walk direction, smoother transitions,
    and button buffering.
---

> Picollino is a series of short notes that walks through a specific aspect of
> game development in Pico-8. I wrote Picollino for myself but maybe someone
> out there will find this useful!

Today, I'm learning about *movement* in Pico-8 and other *optimizations to
improve game feel*. This includes the following:
* [**Basic sprite movement**](#basic-sprite-movement). How I move an 8x8 sprite
  on four directions from a button-press.
* [**Smoother tile transition**](#smoother-tile-transition). How to remove the
  jarring effect of moving from tile to tile.
* [**Input buffering**](#input-buffering). How to improve game feel so that
  button inputs are rendered properly.

These are my study notes while going through LazyDev's roguelike tutorial, so
be sure to check that one out! I'll try to post my code on Github and build
some minimal examples in the process. Lastly, these posts assume a basic
knowledge of Pico-8 (e.g., game loop, basic Lua, etc.), so I'll skip over some
parts.

## Game loop revisited

Pico-8's primary mechanism is defined by the [game
loop](https://pico-8.fandom.com/wiki/GameLoop). I see this to be akin to the
[model-view-controller (MVC) pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) in software design (with the addition of
`_init()`)
- **`_init()`** is called once. Sets up the data structures and initializes
    all variables.
- **`_update()`** is the Model. All compute, logic, and rules are defined
    here.
- **`_draw()`** is the View. Displays the information based from what was
    computed by the Model.

The Controller, in my opinion, is Pico-8's  standard library. It accepts
keyboard or controller input, and transforms them into something understandable
by the model.

<!-- an illustration might work -->

## Basic sprite movement

First, let's introduce our sprite character, Picollino! The imagery of
the word evokes a derpy tomato so we'll stick with that:

<!-- insert sprite image with animation -->

Picollino's movement will follow the style of an overworld adventure game
rather than a platformer. Thus, we don't need to factor in gravity or friction.
In an overworld grid, our character's position is defined by its
**tile-coordinates** $$x$$ and $$y$$. 

<!-- aseprite image that differentiates tile and pixel coordinates -->

Token optimization aside, let's define a function that initializes a player:

```lua
-- initialize a player at game start
-- @return player table with init values
function make_player()
    local p = {
        -- initial coordinates
        x=32,
        y=32,
        -- animation attributes
        flip=false,
        anim={
            idle={1,2},
            walk={3,4},
        }
    } 
    return p
end
```

Movement is now a matter of changing these $$x$$ and $$y$$ coordinates
in response to a button press. I learned that in Pico-8, this change is often
denoted by $$dx$$ and $$dy$$ for the $$x$$ and $$y$$ coordinates respectively.

Thus, moving right is just $$x \Leftarrow x + dx$$, and down is $$y \Leftarrow
y + dy$$ (yup it's positive going down). Going to the opposite direction is
achieved by inverting the signs.

I prefer writing a function, `move_player(dx, dy)`, that takes in the
corresponding change in position. Then, it updates the player coordinates with
the new values. Ideally, I'd like to add a `player` argument in this function
(a la `move_player(p, dx, dy)`), but it costs alot of tokens so we have to make
do with global variables.

```lua
-- move_player updates player coordinates
-- @param dx change in the x-axis 
-- @param dy change in the y-axis
function move_player(dx, dy)
    -- we multiply by 8 because 1 tile = 8 pixels
    -- moving a player on a single tile is actually a movement of 8 pixels
    local destx, desty = p.x + dx * 8, p.y + dy * 8
    p.x, p.y = destx, desty
end
```

For our button-press, I'd like to write two more functions. The first,
`update_game()`, will be called every time to check for button presses and/or
resolve variables and computations. The second, `exec_btn(b)`, takes in a
[button's numerical value](https://pico-8.fandom.com/wiki/Btn) and call the
handler function. Let's write the first one:

```lua
-- update_game checks for button-presses and perform calculations
function update_game()
    for i=0,5 do  -- btn(5) is X, for opening menu?
        if btnp(i) then
            exec_btn(i)
        end
    end
end
```

For the second one, instead of writing `if` statements for each directional
button, we can store $$dx$$ and $$dy$$ values in an array, and call them
whenever their respective [button-number](https://pico-8.fandom.com/wiki/Btn)
is called.

```lua
-- exec_btn handles button calls
-- @param b is the button number from pico8.fandom.com/wiki/Btn
function exec_btn(b)
    -- preload (L=0,R=1,U=2,D=3)
    local dirx = {-1,1,0,0}
    local diry = {0,0,-1,1}

    if b>=0 and b<4 then
        move_player(dirx[b+1], diry[b+1])
        return
    end
end
```

To explain `dirx` and `diry`, here's an example: moving left requires a
negative offset in the x-coordinate ($$x_2 = x_1 + dx$$ where $$dx=-1$$) while
$$y$$ stays the same ($$y_2=y_1+dy$$ where $$dy=0$$). Now, the left button
(<kbd>&larr;</kbd>) is numerically-assigned in Pico-8 as button `0`. Hence, in
the zeroth-index of `dirx` and `diry`, we have `-1` and `0`. Note that in Lua,
**arrays start at 1**, so we just add `1` when providing the index.

Awesome! With the functions above, we now have a rudimentary system for
movement. This works, but we just need to draw the sprite! In the `_draw()`
function, just call the [`spr()` function](https://pico-8.fandom.com/wiki/Spr):

```lua
-- draw_game is a handler for all drawing events
function draw_game()
    cls(0)
    map()
    spr(1, p.x, p.y, 1, 1, p.flip)
end
```

### Sprite animation



## Smoother tile transition


## Input buffering


