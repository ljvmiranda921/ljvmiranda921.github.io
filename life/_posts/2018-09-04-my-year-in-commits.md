---
layout: post
type: post
title: "My year in commits: lessons and perspectives"
date: 2018-09-04
category: life
comments: true
author: "LJ MIRANDA"
summary: "My year in commits: examining my Github contribution graph"
tags: [github, contributions, software development, life, commits]
---

> Five-hundred twenty-five thousand, six-hundred minutes, how do you measure,
> measure a year?

As someone who's been working closely with software for the past two years, I'd
say in **git commits**:

![github](/assets/png/life/my-life-in-commits.png){:width="720px"}
{: style="text-align: center;"}

For those who aren't familiar with version-control systems (VCS), a git commit is
simply a log or savepoint in any software project. Each log keeps a history of
the things you've done so far, so that you can track them in the future. If
there is a commit history of my Tuesday, it would look like this:

```
Cook breakfast and lunch
Take a bath and dress up
Go to work
```

For software projects, They usually look like this (from my project, [PySwarms](https://github.com/ljvmiranda921/pyswarms)):

```
Add logging functionality in Reporter module
Update documentation in sphinx
Remove deprecated modules
```

The chart above shows how many logs I have done every single day for the past
year. Greener boxes mean more commits, whereas gray boxes are zero commits.
It's not necessarily a measure of productivity, more of an approximation of
one's tech life. 

In this post, I'd like to review my year in commits, then discuss in brief some
lessons I've learned and challenges I'll set for myself next year. I think,
that as I end my Masters degree and transition into a new phase in life, it's
good to look back on the things I've done so far.

## My year in commits: a review

First, let's have a brief tour of my life in commits. I've included my commit
history from January 2017 and added some annotations on significant life events
during the past year:

![github](/assets/png/life/my-life-in-commits-annot.png){:width="720px"}
{: style="text-align: center;"}


I realized that this commit graph covers a lot of things that happened during
grad school. Going through all of them may be too much, so let me give you some
highlights:

* **The programming bug (July 2017)**. Perhaps, the "programming bug" bit me
  when I started PySwarms back in July 2017. Although my blog has been set-up
  back then, I only started programming seriously with that library.
  Right now, the project is growing: we have two more maintainers and fourteen
  contributors all-in-all&mdash; not bad for my first soirée.
* **Building my research code (August 2017--)** Git commits for my thesis were
  usually done in 2-3 week bursts. PySwarms taught me a lot about software
  development, and I decided to apply them in my research code.
* **Long rests (Parts of July and August, December 2017)**. I took a good
  amount of breaks last year, but it seems that I worked non-stop since
  January. The last few trips I had were in Matsue and Miyazaki.  Then, the
  "final" long break happened during the Christmas holidays, when my mom and
  girlfriend came.  After that, all trips were just business trips: an
  internship in Kobe and a conference in Tokyo. 
* **LaTeX manuscript (February--June 2018)**. I did enjoy preparing my
  manuscript. I started five months before the deadline, so I think there was
  no pressure back then. Since we wrote some papers beforehand, I didn't start
  from scratch. With LaTeX, I devised a [git
  workflow](https://ljvmiranda921.github.io/notebook/2018/02/04/continuous-integration-for-latex/)
  for my thesis document. I'm really happy and proud of [how it turned out](https://github.com/ljvmiranda921/thesis-manuscript)!
* **Long road home (July--September 2018)**. The last three months were all
  dedicated to my other endeavors. I applied for an internship in [Preferred
  Networks (PFN)](https://www.preferred-networks.jp/en/), and did some
  preparations for my return. PFN had a coding exam, that's why you'll see a
  hefty amount of commits during that period. To be honest, the last few months
  were the most difficult months for me. I'd probably write more about that in
  the future.

Overall, I think that I had a good year in programming and software. With
PySwarms, it seems that I crossed an imaginary line from programming *just to
make things work* into being aware of design patterns, idiomatic code, and
software systems. The latter forced me to become more attuned to a software's
lifecycle and flow rather than just its logic.

I learned a lot, and realized that the tech world is really huge. Before, I
thought that knowing Python (or any programming language) is enough. But
there's a whole world of software practices that I'm not aware of:
continuous integration, deployment, testing, etc. New and exciting things to
discover!  

I still consider myself a newbie, and perhaps I'll always be a newbie for the
rest of my career in tech. Perhaps it would be nice to share some nuggets along
the way.

## Some lessons learned

As I've said before, I'm still starting out. I think I just got a lucky break
in PySwarms, for it accelerated my learning&mdash;mostly by necessity. In this
section, I'll write down some lessons I'd bring as I go forward in this journey
in software and tech. I may not be the most qualified person to give nuggets of
wisdom, but hey, maybe you'll find them useful: 

* **Strive to write readable and idiomatic code**. I think I will never
  consider myself as a 10x programmer, just a 1x programmer with good habits.
  One good habit is writing *readable and well-documented* code. They say that
  research code is frustratingly hard-to-read (just look at
  [OpenAI](https://www.reddit.com/r/MachineLearning/comments/95ft1j/d_are_openai_codes_difficult_to_read_or_is_it/)),
  but I think it's an opportunity for improvement.  Well-documented code
  doesn't just help other developers, it helps you as well.
* **Create a large volume of work**. As with all creative work, I think one way
  to acquire "taste" and improve one's craft is to keep on building things (see
  [Ira Glass on the Creative
  Process](https://www.youtube.com/watch?v=PbC4gqZGPSY)). I realized that every
  gist, commit, or project never goes to waste. It's always a chance to build
  something new, iterate, and improve. I'd love to maintain PySwarms because
  it's one of my very first breakthrough projects, but I'd love to see myself
  building new tools and products in the future. 
* **Find your heroes**. I realized that it's important to look for
  models to look up to. Much better if they're still actively participating in
  the craft. For me, I look up to [Scott Hanselman](https://www.hanselman.com/)
  (Software Eng'g), [Saron Yitbarek](https://www.codenewbie.org/) (Software
  Eng'g), [Reina Reyes](https://twitter.com/reina_reyes?lang=en) (Data
  Science), and [Neil Lawrence](http://inverseprobability.com/) (Machine
  Learning). One common denominator among them is that they go out of their way
  to make their craft accessible to everyone. Find your heroes and be inspired
  by them. 
* **Be nice**. Treat everyone with respect, be patient, and be chill. Be it in
  code reviews, answering issues, or teaching others, a little niceness goes a
  long way.

Two more things: a certain philosophy that I'm practicing right now
is to **always learn the stack immediately below and above mine.** There's no
need to become full-stack&mdash;as long as you can do your own thing with deep
expertise, and you're aware of the context of your field&mdash;you're already
fine.  It's difficult to learn everything, especially in a rapidly-growing
field. Strive to do one thing extremely well, while understanding the
peripheries in an intermediate capacity. With this in mind, you don't run the
risk of spreading yourself too thin nor becoming a one-trick pony.

For example: my current stack is in machine learning, then that means I need to
learn *how the data is being sourced* (stack below me), and *how my models can
affect an organization's decision* (stack above me). I don't need to fully-grok
all management principles nor ETL techniques, but *as long as I'm aware*, and I
can do them an intermediate person would, then I think I'm good. I can focus my
energy in machine learning, but still aware of the larger context of what I'm
doing. 

Lastly, I learned from a year of seriously doing software is to **treat it like
a craft**: there's really no level where I can say, "I've mastered this." Truth
is, tech is a moving target: the techniques that I know today might be
irrelevant tomorrow. Thus, the best way to set goals is to make short-term and
lean achievements.  

## Next steps

It's weird to put one's learning path in public, but maybe this would make me
more accountable in the future. Here are some things that I want to learn
in the short-to-medium term:

* **Scaling and deploying machine learning models**. I've been very interested
  in this problem since the [ScaledML conference](http://scaledml.org/).  How
  to deploy ML models at scale? How to reduce latency? How to update and train
  models online? Might be nice to learn technologies such as Kubernetes and
  Ansible for orchestrating reproducible containers.  
* **Agile and lean management**. I've been working with collaborators and
  contributors in PySwarms, and it would be nice to improve our workflow so
  that we don't go stale whenever everyone's busy. I want to learn how to
  manage IT projects.
* **Finally learn Haskell**. Yeah, this is something I've been putting off for
  quite some time. I actually started a [small project in
  Haskell](https://github.com/ljvmiranda921/pokemonad), might as well finish
  it. I also purchased [Get Programming with Haskell](https://www.manning.com/books/get-programming-with-haskell), hopefully it accelerates my learning. 
* **Less commits on weekends**. For the past few months, it seems that I've
  been writing code every day. Not that I'm complaining, but even if I love
  programming, doing it too much can lead to burnout. Grayed-out top and bottom
  rows should be in my commit graph next year.

## Conclusion

As a close, I think that doing this yearly review has helped me reflect on my
journey in tech and software. Looking back, just one year of programming has
provided me with new skills and perspectives. Now, tech has become more
than just code&mdash;it's design, community, and craft. As I transition to the next
phase of my life, I'm excited to see what the next few years will bring.

#### Changelog
* 10-02-2018: Update some grammar mistakes
