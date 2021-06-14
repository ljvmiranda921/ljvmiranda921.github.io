---
layout: post
type: post
title: "What can Avengers: Endgame teach us about Git?"
date: 2021-06-05
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [git, avengers, marvel, endgame, software engineering]
header-img: /assets/png/git-avengers/header.png
description: |
    Avengers and Git? The most ambitious crossover event in history.  In this
    blog post, I will explain crucial plot points in Avengers: Endgame in five
    Git concepts!
excerpt: |
    Avengers and Git? The most ambitious crossover event in history.  In this
    blog post, I will explain crucial plot points in Avengers: Endgame in five
    Git concepts!
---


<span class="firstcharacter">W</span>hen I first saw *Avengers: Endgame* in
theaters, I noticed that **their time travel rule is quite similar to the Git
branching model.** Referred to as the [*time
heist*](https://marvelcinematicuniverse.fandom.com/wiki/Time_Heist), our heroes
travelled through time to recover the stones and undo the effects of the
snap&mdash; thereby saving all. 

> The Ancient One: "The Infinity Stones create what you experience as the flow
> of time. Remove one of the stones, and the flow splits."

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/RNBKKGM1w88?start=57" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

Creating branches and alternate realities...*isn't that vaguely familiar with
Git?* As it turns out, software developers are doing their own version of
time-travel in their day jobs! Let me demonstrate that in this blogpost by
**explaining the plot of *Avengers: Endgame* in five git concepts!**

* [Fast-forward merge](#fast-forward-merge)
* [Checkout a point in the past](#checkout-a-point-in-the-past)
* [Headless and stray branches](#headless-and-stray-branches)
* [Merge conflict](#merge-conflict)
* [Rewriting history (?) with rebase](#rewrite)

<p style="border:3px; border-style:solid; border-color:#FF0000; padding: 1em;">
<b>Spoilers alert!</b><br>
Really now, you haven't watched Avengers: Infinity War and Avengers: Endgame? </p>


<!-- Note to Lj: remember, these five are happening in sequence! -->


## Fast-forward merge

<!-- five years later -->
This one is straightforward so let's get it out of the way. After that
shocking decapitation of Thanos and with no hope in sight, we were then
transported five years into the future.

![](/assets/png/git-avengers/five_years_later.png){:width="460px"}
{: style="text-align: center;"}

This is a classic example of a fast-forward merge. This occurs when 
there is *a linear path* from where we are now (i.e., death of Thanos) to our
target branch (i.e., five years later). No time-travel shenanigans, just
straightforward combination of histories. 

<!-- excalidraw example -->
![](/assets/png/git-avengers/fast_forward.png){:width="460px"}
{: style="text-align: center;"}

You can do this by:

```sh
# Prepare a branch that contains all the events five years later
git checkout -b five-years-later master
git add <file>
git commit -m "Add new events in the history"

# Switch back to master and perform merge
git checkout master
git merge five-years-later
```


## Checkout a point in the past 

With the stones reduced to atoms, our heroes decided to conduct a time heist.
First, they need to identify when in their shared history the stones are within
reach. 

In Git, you can view an object's full history by typing:

```sh
# Get full history of a specific file
git log --all --full-history <path/to/file>
```

This also allowed them to pinpoint the exact location of the stones.  After
determining those crucial points, they used the remaining Pym particles to
traverse the quantum realm. 

<!-- excalidraw example -->
![](/assets/png/git-avengers/checkout_commit.png){:width="460px"}
{: style="text-align: center;"}

Turns out, we can also do the same thing! The `log` command from above will then
give you a unique hash so that you can reference it as you time-travel:

```sh
# Supply your unique hash 
git checkout <SHA> -- <path/to/file>
```

## Headless and stray branches 

Whenever our heroes travel to the past and tamper with the stones, they get
into a state outside the context of time. It's a state of limbo where a
potential new reality may be born. In Git, it's like being in a state where
`HEAD` is detached&mdash; a *headless branch*:

<!-- excalidraw example -->
![](/assets/png/git-avengers/headless_state.png){:width="320px"}
{: style="text-align: center;"}

By procuring the stones from an earlier timeline, they then create an alternate
reality:

```sh
git checkout <SHA>
git checkout -b feat/get-stone  # or git switch -c feat/get-stone
```

...and procure the stones from earlier timelines. As with the clip above, we
had Hulk successfully obtaining the Time Stone from The Ancient One:


<!-- excalidraw example -->
![](/assets/png/git-avengers/hulk_time_stone.png){:width="520px"}
{: style="text-align: center;"}

```sh
# Checkout a previous state in time, Avengers I
git checkout avengers-1
git checkout -b feat/get-time-stone

# Move time stone from the Ancient One to the Hulk
mv the_ancient_one/time_stone hulk

# Commit the change and go back to the present
git add .
git commit -m "Retrieve time stone from Ancient One"
git checkout master
git merge feat/get-time-stone
```

Iron Man and Captain America weren't so lucky. Their first attempt to get the
Space Stone failed, with the past Loki escaping with it. By doing so, they've
inadvertently created a *stray branch*:


![](/assets/png/git-avengers/stray_branches.png){:width="640px"}
{: style="text-align: center;"}

```sh
# Checkout a previous state in time, Avengers I
git checkout avengers-1
git checkout -b feat/get-space-stone

# Loki escaped with the Space stone
mv shield/space_stone loki
git add .
git commit -m "Escape using the Space Stone"
# ... 
```

This branch didn't merge to `master` and it's currently living its own life.
We'll probably know of this Loki's fate in his standalone Disney+ series!

Nevertheless, our two main protagonists managed to obtain the Space Stone by
going back to 1970&mdash; also leading us to a heartfelt conversation between
Tony Stark and his father:

![](/assets/png/git-avengers/tony_space_stone.png){:width="640px"}
{: style="text-align: center;"}



## Merge conflict

After successfully obtaining all the infinity stones, our heroes built their
own gauntlet to undo the snap. In the `master` branch, we have:

```sh
./infinity_gauntlet snap --no-dry-run
```

A few seconds later, we hear birds chirping and see Hawkeye's snapped wife
calling him. The sun shines and it seems that our heroes have saved the day!

But, a pull request from another reality came in...it's Thanos from the
`feat/get-power-stone` branch! The changeset he's bringing ensued a merge
conflict!


![](/assets/png/git-avengers/merge_conflict.png){:width="640px"}
{: style="text-align: center;"}

```sh
$ git merge feat/get-power-stone
Auto-merging plan_for_the_future_of_humanity.txt
CONFLICT (content): Merge conflict in plan_for_the_future_of_humanity.txt
Automatic merge failed; fix conflicts and then commit the result.
```

Conflicts happen when two developers updated same lines in a file, or if one
developer deleted a file while another is modifying it (Atlassian,
["Understanding Merge
Conflicts"](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)).
Because Git cannot easily determine which change is correct, it's the
responsibility of the developers to resolve it.

**And resolved it they did!** After a climactic battle that set our heroes
against the bulk of Thanos's army, Iron Man got hold of the stones and ran the
following command:

```sh
./infinity_gauntlet snap
# Resolve merge conflicts in  plan_for_the_future_of_humanity.txt
git add .
git commit -m "I am Iron Man"
```

We see Thanos and his army disappearing, and Tony Stark in his final moments. 
The question still remains, what is the effect of Iron Man's snap?
* **Is it a Pull Request rejection?**: Thanos and his army were simply sent
    back to their original branch. They still exist in that alternate reality.
* **or an actual file deletion?**: Thanos of that timeline is fully deleted.
    I'm curious as to how the `feat/get-power-stone` reality will play-out with
    a Thanos-less universe.

Perhaps we'll never know, but thanks to our Git-model, we were able to surface
such questions!

## <a id="rewrite"></a> Rewriting history (?) with rebase 

In the epilogue of Endgame, we see Captain America returning the stones in
their original timelines. However, instead of going back to `HEAD`, he stayed
in a particular commit to pursue a committed relationship with Peggy Carter. 

```sh
git checkout <SHA>
```

All is well, but we see him again back in `HEAD` as an older version of
himself. Initially, I thought that he decided to live in an alternate reality,
but did he *perhaps* rewritten history by rebasing?

```sh
git checkout <SHA>
echo "Decided to stay with Peggy" >> steve_rogers_life_plan.txt
git add steve_rogers_life_plan.txt
git commit -m "Try some of that life Tony was telling me to get"
```

![](/assets/png/git-avengers/git_rebase.png){:width="640px"}
{: style="text-align: center;"}


This definitely opens up a lot of questions:
* **Did two copies of the same object exist at the same time?** Steve Roger's
    body will still be discovered in the iceberg years later, so are there two
    Captain Americas, `steve_rogers_prime` and `steve_rogers`, running around
    in our timeline?
* **Did Cap rebased with minimal intrusions as possible?** Did our prime Cap
    hid successfully and try not to tamper with the timeline? It's hard to
    imagine Cap not trying to stop Bucky in killing Tony's parents, or prevent
    any major disasters given his capabilities. 

Using our Git model, rebasing with minimal intrusions seems to be the logical
explanation. We've also seen our Cap grew from being a naive idealist, so
perhaps he also learned to respect the timeline. *That's really hard* But I
guess only the *worthy* can pull it off.


## Final thoughts

In this blogpost, I talked about different ways we can explain certain plot
points in *Avengers: Endgame* using the Git model. I've been reading up a lot
on various [rules of time travel in
fiction](https://www.youtube.com/watch?v=d3zTfXvYZ9s), and it's exciting to
apply it here. I hope you enjoyed reading this as much as I did.

Of course, I'm aware that time travel in *Endgame*  doesn't map exactly to the Git
model. So let me know if there's a better way I should represent some plot
points! 


*If you liked this, you might enjoy:*
* [Git team workflow: merge or rebase?](/notebook/2018/10/25/git-workflow/): highlights the pros and cons for each git merge workflow
* [Automate Python workflow using pre-commits: black and flake8](/notebook/2018/06/21/precommits-using-black-and-flake8/): automatically format and check your code whenever you commit!


### References

* Atlassian, "Getting Git Right", Available: [https://www.atlassian.com/git](https://www.atlassian.com/git). [Accessed June 5 2021]
* Minute Physics, "Time Travel in Fiction Rundown", Available: [https://www.youtube.com/watch?v=d3zTfXvYZ9s](https://www.youtube.com/watch?v=d3zTfXvYZ9s). [Accessed June 5 2021]


