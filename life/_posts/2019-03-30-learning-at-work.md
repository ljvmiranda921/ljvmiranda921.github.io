---
layout: post
title: "Learning at work"
date: 2019-03-30
category: life
comments: true
author: "LJ MIRANDA"
summary: "Learning a new programming language while doing my 9-to-5 job"
tags: [go, learning at work, software development, life, golang, tiffany, geospatial]
---

This year, I've set myself a **personal goal of learning the Go programming
language**. However, learning a new language while maintaining a healthy
work/life balance[^1] is difficult. In this post, I'll talk about some of my
meta-learnings while learning at work.

## The Challenge: finding time to learn

For starters, this is what I meant when I said I want to learn Golang:

- Learn the code syntax and its proper idioms 
- Learn the production-level build toolchain
- Learn how to use the standard library effectively
- Learn how to use third-party libraries related to my domain
- ... and so much more!

That's definitely overwhelming, and given my current schedule and workload,
seems impossible to do in a short span of time. There are a lot of challenges
that I need to overcome

1. Finding time to really focus on learning Go
2. Getting tangible results in my learning journey (a project, a tool, etc.)
3. Learn a new thing fast and deep without affecting my actual work

My natural instict is to start a full-blown side-project. This definitely
worked for me before: [PySwarms](https://github.com/ljvmiranda921/pyswarms)
taught me how to write prod-level Python,
[Gym-Lattice](https://github.com/ljvmiranda921/gym-lattice) became my platform
for reinforcement learning, and this blog is a practice on basic web
development. However, I did all of these during grad school, where I have all
the time in the world.

During grad school, I've been given the luxury of total freedom and control of
my time[^2]. I can definitely do whatever I want and enjoy (or suffer) because
of it. 

This definitely is not the case in the industry&mdash; you can't just slack
off. To be fair, our company probably provides one of the most generous
learning packages in its industry: time-budgeting for learning endeavours, an
annual learning allowance, and multiple internal learning sessions with my
talented workmates. Thinking Machines has really spoiled us (and if you like
this you should definitely apply)! 

But yeah, I can't just check myself out for a week and expect my workmates and
clients to be happy that I've done nothing work-related; that means **I need to
change my learning strategy**. 

## The Solution: 

I still want to have a tangible project built on Go. This, for me, serves as a
proof-point that I can speak the language. It's like attempting a Japanese essay
just to prove I can speak Japanese.

Then one thing hit me: what if I studied Golang and apply it at work? Turns
out, we have a geospatial workflow that can be better automated via a
command-line tool, so I decided to work on that:

* I'm actually learning Go.
* There's an incentive because if it works, we get to reduce our work's
    complexity
* It's low-risk, if it doesn't work, we can just use our current workflow.

Enter [tiffany](https://github.com/thinkingmachines/tiffany), a command-line
tool to render to tiff any Google Static Maps image. I built this tool because
of the hassle of manually georeferencing images through QGIS. The tool takes in
a center coordinate, downloads an image tile from Google Static Maps, and
georeferences it using a Golang-binding of GDAL/OGR.

![tiffany demo](https://i.imgur.com/miWZcKp.png)

It even allows us to create training labels for our machine learning tasks. All
of these just from the command-line:

```s
$ tiffany 14.546943935986324 121.01974525389744
```





### Footnotes

[^1]: Work/life balance for me is being able to achieve my professional goals/tasks while having an adequate amount of sleep (yes, sleep is important for me) and time for my family and side-projects. This means not working after 5pm, no work-related commits on Saturdays, and no commits on Sundays. 
[^2]: Ok, this depends on which stage of grad school you are on. After I've done all our course requirements, the last few sems were dedicated for research and lab work.

<!--
## Things to write about
- How different learning is during grad school and while at work
- What was your first approach in learning? Why it didn't work?
- How are you learning Golang right now?
- Some tips
 -->

