---
layout: post
type: post
title: "How I dealt with a nagging ingestion problem in Redisgraph"
date: 2021-02-28
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [redis, redisgraph]
description: |
    An obvious solution to a nagging ingestion problem
---

> Sometimes blogging means lots of long form essays that take weeks to write and drop lots of wisdom.
> However, many times blogging is just keeping track of a fix for a nagging problem. There may just be 5 or 6 of us with this issue, but if you're that person, this blog post is for you! Welcome to the solving of the issue you just googled for ([S. Hanselman](https://www.hanselman.com/blog/fix-for-elgato-key-light-not-found-by-control-center)).

## Problem

Here's a quick-fix for a nagging ingestion problem that I had for a few months.

I have a cron-job that ingests data into Redisgraph every day. To simplify the
ingestion logic, I delete the graph and ingest everything all over again. That
works, but there are two problems:
* There is downtime during ingestion, and
* If ingestion fails, the process must be rerun manually.


## Solution

However, I realized that there's a better way to solve this: 

> Instead of having one graph (*main*) for both the client and the
> ingestion process, it's better to have separate ones for the caller (*main*) and
> the sink (*staging*). We only ingest on *staging*. Once successful, we simply
> copy the contents of *staging* to *main*.

![](/assets/png/redisgraph/redisgraph.gif)

Yup, the oldest trick in the book. It solved my headaches because:

* **Downtime is reduced from minutes to milliseconds.** Since I never touch nor
    delete *main* in the entire duration of the ingestion process, then data is
    acccessible all throughout.

* **Data integrity is maintained even if ingestion fails.** By exposing and probing a
    success-signal in the ingestion process, I can write some logic to avoid
    copying over the *main* graph in case of failure.


### Quick implementation

As it turns out, each graph is stored under a single Redis key! This means you can
use most key operations from Redis to Redisgraph graphs. For me, I take
advantage of the [`RENAME`](https://redis.io/commands/rename) operation[^1]:


```python
from redis import Redis
from redis.exceptions import ResponseError

def rename_graph(redis_client: Redis, src_key: str, dest_key: str):
    try:
        redis_client.rename(src_key, dest_key)
    except ResponseError as e:
        print("RENAME operation failed")
        raise
    else:
        print(f"Success! {src_key} -> {dest_key}")
```

Yeah, it's just one command, but it saved a lot of time! This function is then
called whenever ingestion was successful. If it fails, then it logs an error
but does nothing. Lastly, since the *staging* graph is ephemeral, you don't
really need to set a permanent name for it. It can be as simple as
`staging-{randomly_generated_uuid}`. 

What's also interesting is that even if my graph contains thousands of nodes,
the `RENAME` operation takes only a few milliseconds. I may have expected it to
be a bit longer but, well, what do I know.

## Conclusion

Saved a lot of headaches. There may be other ways to solve the same
problem: do staging on the data-side, use `COPY` with `REPLACE` and have the
staging graph `EXPIRE`, and more! There may be five or six people who will
have the same problems as I did, hope this short note helps you out!


#### Footnotes

[^1]: You can also use [`COPY`](https://redis.io/commands/copy) with `REPLACE`, but it doesn't exist yet in my Redisgraph version (2.2.13, Redis v6.0.5)
