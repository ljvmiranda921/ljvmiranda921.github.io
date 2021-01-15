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

<!-- TODO: an illustration of MVC might work -->


### Pointers to functions
<!-- TODO: talk about passing pointers to a function -->
<!-- One technique I often see in Pico-8 code is the use of function pointers. -->

One pattern that I often see in Pico-8 code is the use of *function pointers*.
You can assign a function name to a variable, and call it in another line. For
example:

```lua
function move_entity()
    -- calls whatever function 
    -- is referenced into _mov
    _mov()
end

function move_player()
   if path_is_clear then
        _mov = move_normal
   elseif path_is_blocked then
        _mov = move_with_bump
   end
end
```

The `move_entity` function just calls a generic `_mov`, whatever its definition
will be. How `_mov` behaves is manipulated by the `move_player` function. Based
on which condition is true, `_mov` can be `move_normal` or `move_with_bump`.
Because the game-loop always calls `_update` for every tick, then the move
conditions are always checked.

This technique is often used on the built-in `_update()` and `_draw()`
functions. My guess is that it makes the game-loop functions much cleaner.
My worry is that it may be a bit harder to track what's happening, but perhaps
this technique lessens the tokens we'll write in the end.

## Basic sprite movement

First, let's introduce our sprite character, Picollino! The imagery of
the word evokes a derpy tomato so we'll stick with that:

<!-- TODO: insert sprite image with animation -->

Picollino's movement will follow the style of an overworld adventure game
rather than a platformer. Thus, we don't need to factor in gravity or friction.
In an overworld grid, our character's position is defined by its
**tile-coordinates** $$x$$ and $$y$$. 

<!-- TODO: aseprite image that differentiates tile and pixel coordinates -->

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

<!-- TODO: insert pico8-js of current output -->

## Smoother tile transition

Picollino's movement still looks a bit jarring: he seems to "teleport" from one
tile to another. This is because we are moving 8 pixels right away, a large
distance in my opinion. I'll improve animation by doing the following:
1. Flip the sprite when moving to the opposite direction
2. Add a "smoother" to ease the transition from one tile to the next.
3. Sprite animation

### Flip sprite based on direction

The first one is easy. Recall that in our `make_player()` function, we have
a `flip` attribute. We set that as `true` when our sprite is moving to the left,
i.e. when `dx < 0`. We'll update the `move_player()` function to account for
this change.

```lua
-- move_player updates player coordinates
-- @param dx change in the x-axis 
-- @param dy change in the y-axis
function move_player(dx, dy)
    local destx, desty = p.x + dx * 8, p.y + dy * 8
    ------------------NEW CODE---------------------
    if dx < 0 then
        p.flip = true
    elseif dx > 0 then 
        p.flip = false
    end
    -----------------------------------------------
    p.x, p.y = destx, desty
end
```

We use `elseif` instead of `else` so that the sprite won't immediately
face `right` if our last action was `left` and we decide to move `up` or
`down`.

### Tile transition

In order to understand LazyDev's technique for smoother tile transition,  let
me  illustrate an example. Suppose we want to move a sprite to the right from
tile $$T(3,2)$$ to $$T(4,2)$$. In pixel coordinates, we are essentially
"teleporting" from $$P(24,16)$$ to $$P(32,16)$$, a huge distance that doesn't
look like walking. Instead, we want to traverse the $$x$$ axis in small
increments, i.e. $$24, 24.8, 25.6, 26.4, \ldots$$, until it reaches its
destination.

<!-- TODO: insert gif -->

We accomplish this by defining an offset that will incrementally move the
sprite from its old coordinate to the new one, i.e. $$P_{x_2,y_2} = P_{x_1,y_1} + o_{x,y}$$. The rate in which the offset updates is controlled by a new
variable, $$p_t$$, that dictates how fast the transition will be animated.

Because we want to save tokens, we precompute the destination and subtract the
offset as we go along. So in our earlier example, we will set $$P_{x,y}$$ to
its new value, $$P(32,16)$$, and perform subtraction when calling the `spr()`
function. 

The offset $$o_{x,y}$$ starts with a value $$s_{x,y}$$ and grows smaller as it
reaches $$0$$:

$$
o_{x,y} = s_{x,y} * (1 - p_t), s_{x,y} = -d_{x,y}
$$

where $$s_{x,y}$$ is the start value for the offset. The transition speed,
$$p_t$$ is then defined and updated as:

$$
p_t \Leftarrow min(p_t+\delta,1), p_0 = 0
$$

where $$\delta$$ controls how fast it can be. Notice that it is clipped to
$$1$$. To be honest, I find it a bit convoluted, but I think these are
optimizations to reduce token count, a very important resource in Pico-8. 

Below is a table of values so you can see the relationship between $$p_t$$, the
offset $$o_{x,y}$$, and what is actually drawn or sent to the `spr()` function.
Note that here, we're moving in pixel coordinates from $$P(24,16)$$ to
$$P(32,16)$$, with $$\delta=0.1$$ and $$s_x=-dx*8=-1*8=-8$$. I'll only list down
the values in the $$x$$-axis, because we only move in that direction:

| $$p_t$$, transition speed | 0.0    | 0.1      | 0.2      | 0.3      | 0.4      | 0.5    | 0.6      | ... | 1.0    |
|---------|--------|----------|----------|----------|----------|--------|----------|-----|--------|
| $$o_x$$, size of move-offset | -8     | -7.2     | -6.4     | -5.6     | -4.8     | -4.0   | -3.2     | ... | 0      |
| `spr()`, drawn on-screen | **24** | **24.8** | **25.6** | **26.4** | **27.2** | **28** | **28.8** | ... | **32** |

<!-- implementation in code -->









<!-- do the transition first before going to the sprite animation -->


### Sprite animation





## Input buffering


