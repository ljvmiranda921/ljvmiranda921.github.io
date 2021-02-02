---
layout: post
type: post
title: "How I dealt with a nagging ingestion problem in Redisgraph"
date: 2021-02-28
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [redis, redisgraph]
---


Here's a quick-fix for a nagging ingestion problem that I had for a few months.

I have a cron-job that ingests data into Redisgraph every day. To simplify the
ingestion logic, I delete the graph and ingest everything all over again. That
works, but there are two problems:
* There is downtime during ingestion, and
* If ingestion fails, the process must be rerun manually.

<!-- Insert some fun pixel art for the two problems -->

However, I realized that there's a better way to solve this: 

> Instead of having one graph (*main*) for both the client and the
> ingestion process, it's better to have separate ones for the caller (*main*) and
> the sink (*staging*). We only ingest on *staging*. Once successful, we simply
> copy the contents of *staging* to *main*.

<!-- Insert some fun pixel art on how it works -->

Yup, the oldest trick in the book. It solves our headaches because:

* **Downtime is reduced from minutes to milliseconds.** Since I never touch nor
    delete *main* in the entire duration of the ingestion process, then data is
    acccessible all throughout.

* **Data integrity is maintained even if ingestion fails.** By exposing and probing a
    success-signal in the ingestion process, I can write some logic to avoid
    copying over the *main* graph in case of failure.
















<!-- 
> Sometimes blogging means lots of long form essays that take weeks to write and drop lots of wisdom.
> However, many times blogging is just keeping track of a fix for a nagging problem. There may just be 5 or 6 of us with this issue, but if you're that person, this blog post is for you! Welcome to the solving of the issue you just googled for.
-->
