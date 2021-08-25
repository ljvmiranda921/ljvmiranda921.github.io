---
layout: post
type: post
title: "Navigating the MLOps tooling landscape (Part 1: The Lifecycle)"
date: 2021-05-10
highlight: true
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img: /assets/png/mlops-shop/header_part_01.png
tags: [machine learning, ml, mlops, software engineering, ml engineering, mle, data science, data engineering, mlops tools]
description: |
    It's hard to keep up with the MLOps landscape! In this three-part series,
    we will navigate the ecosystem and understand the benefits, types, and
    adoption stragies for MLOps.
excerpt: |
    It's hard to keep up with the MLOps landscape! In this three-part series,
    we will navigate the ecosystem and understand the benefits, types, and
    adoption stragies for MLOps.
---

> This is the first of a three-part blog post on the MLOps landscape. Here,
> I’ll talk about the ML Lifecycle, and the personas or roles that pushed it
> the way it is.

<span class="firstcharacter">A</span> few years ago, I wished that more tools supporting ML in production become
mainstream. Back then, [models usually get stuck in Jupyter
Notebooks](/notebook/2020/03/06/jupyter-notebooks-in-2020/), and they often
require an engineer to deploy them. A self-service solution is *the* dream.

It seems that my wish was granted, as slew of startups pop up, promising a
better way to productionize ML. The major cloud platforms are taking a stab on
it too. Now, I face the opposite problem: **there are too many options, and it's
difficult to choose!**

![](/assets/png/mlops-shop/mlops-landscape.png){:width="640px"}  
**Figure**: It's hard to shop when you're presented with too many options
(source: [MLReef](https://about.mlreef.com/blog/global-mlops-and-ml-tools-landscape))
{: style="text-align: center;"}

Welcome to MLOps, a very exciting field that marries software
engineering and machine learning. There's an [academic
field](https://arxiv.org/abs/1904.03257) for it (Ratner, et al, [2019](#ratner2019mlsys)), and *wow*, the [industry is
booming](https://huyenchip.com/2020/12/30/mlops-v2.html).

## Contents

**In this three-part blogpost, I'll attempt to navigate the MLOps
landscape**. I'll be focusing on the commercial side, i.e., the tools,
startups, and frameworks that I've seen while I answer three key questions:

* [**Who/what will benefit?**](#who-or-what-will-benefit): we'll set the stage
    by asking who will benefit by adopting these tools. Here, I'll introduce
    my version of the  ML lifecycle. *(This page)*
* [**What do you want?**](/notebook/2021/05/15/navigating-the-mlops-landscape-part-2): I'll describe a framework for 
   categorizing MLOps tools, and outline a specific adoption strategy for each group. *(Will be published on May 15)*
* [**What do I recommend?**](/notebook/2021/05/30/navigating-the-mlops-landscape-part-3): I'll list down some
    decision frameworks I recommend based from experience and research. *(Will be published on May 30)*


![](/assets/png/mlops-shop/banner_00.png){:width="640px"}  
{: style="text-align: center;"}

Note that I won't be reviewing each and every tool in existence! Instead, I'll
provide a framework for thinking about these groups, and in addition, a
strategy for adopting them. I may recommend some based from my experience, but
[your mileage may vary](https://dictionary.cambridge.org/us/dictionary/english/ymmv). 

## How is this different?

There are already tons of [resources](#resources) exploring the MLOps
landscape. The most notable ones are from Chip Huyen, where she [surveyed
tools](https://huyenchip.com/2020/12/30/mlops-v2.html), [explored
case-studies](https://huyenchip.com/mlops/), and [analyzed
trends](https://huyenchip.com/2020/06/22/mlops.html). I highly recommend that
you read them&mdash; they're insightful and informative!

However, like most resources, they are **most effective if you already know
what you want**. 

I liken this to eating in a new restaurant. You sit at a table, the waiter
approaches, and he presents you a menu. They're all neatly
categorized with brief descriptions and price points. If you don't know
what you want, the menu is going to be overwhelming&mdash;simply an effect of the
[paradox of choice](https://en.wikipedia.org/wiki/The_Paradox_of_Choice).

![](/assets/png/mlops-shop/paradox_of_choice.jpg){:width="640px"}  
Paradox of choice: look at this menu, and look at the MLOps landscape above
{: style="text-align: center;"}

In that situation, what I'd usually do is ask the waiter: "what's the
bestseller?," "I want something light and cheap," "what's perfect for this hot
weather?" Then he narrows down my choices into something palatable. What he
just did is to:

* *Meet me where I am:* understand is my current situation
* *Identify what I may want:* assess my situation and bridge it to the menu
* *Recommend food based on my wants:* make an opinionated statement based on collected info

The waiter helped me narrow-down my choices into two to three most
relevant dishes. That's enough for me to choose what I'll eat, and be on my
merry way. It's just a three-step process of cutting things down, but it
eliminated my paralysis brought by having too many options.

For the keen-eyed, you'll notice that each step maps to each post of this
series. Part One will describe the current state of most ML orgs today. Part
Two will use that info to bridge us into a more understandable landscape.
Lastly, Part three will recommend strategies for adopting these tools.

Hopefully, this series can be that waiter for the MLOps ecosystem.

## Who or what will benefit?

![](/assets/png/mlops-shop/banner_01.png){:width="640px"}  
{: style="text-align: center;"}

To set the stage, I want to discuss the use-cases MLOps can solve and the roles
affected by them. **MLOps satisfies two personas: (1) the machine learning
researcher, and (2) the software engineer**. These roles tend to work closely
with one another, yet a gap often exists in their dynamic:

| Persona           | Wants                                                                                                      | Frustrations                                                                                | Needs                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| Machine Learning Researcher     | I want to focus on what I do best: training models, deriving features, etc.          | Bringing a model to production takes considerable effort | Eliminate lead time for productionizing models                   |
| Software Engineer | I want a seamless way of putting models into production | It's counter-productive to keep translating / integrating research code to our systems | Ensure best-practices are followed right off-the-bat |


Most organizations employ two tactics to quell their frustrations:

* *Hire a hybrid of the two&mdash;the ML Engineer.* They can be software
    engineers that are looking to do more ML, or researchers interested in
    flexing their software engineering muscles.
* *Upskill ML Researchers with SWE skills.* Teach researchers how to use git, basic 
    CI/CD practices, and modularization. I am still [a big
    proponent](/notebook/2020/11/15/data-science-swe/) of this idea.[^1] 

The table above helps clarify the use-cases MLOps tools provide. By looking at
their needs, we have:

1. *Self-serve machine learning*: the goal is to **cut the middleman between
   experimental and production artifacts**. A model
   trained from a notebook should be no more difficult to deploy than a model
   built from production code. 
2. *Follow software best practices*: **ML can be treated as a software
   component, so it must be created with the same rigor**. This has an
   underlying assumption that following software best practices is always
   good&mdash;of course, that may or may not always be true for ML.

**Together, they bring about the ML lifecycle**. Improving this process should
increase the quality of life of ML Researchers and software engineers.
Investing on MLOps tools should benefit the ML lifecycle.

### On the machine learning lifecycle

The **machine learning lifecycle describes a model's journey from
experimentation to deployment.** Usually, I observe that: 
* There is an emphasis on ML models as the final artifact for most teams, and 
* Deployment often means exposing said artifact as a software component.

Each person may have a different way of defining and describing its processes,
but I always imagine it as **two cycles looping together**:

<!-- two cycles coming together -->
![](/assets/png/mlops-shop/ml-lifecycle.png){:width="680px"}  
{: style="text-align: center;"}

> I always imagine the machine learning process as two cycles looping together

The leftmost loop caters most to software engineers, whereas the rightmost loop
is for researchers. In some organizations, you might see researchers getting
involved in the SWE loop&mdash; they babysit the training of their models, then
accompany them to production. 

I won't belabor describing each component in the lifecycle, as I'm sure you'll
find better explanations for them in the interwebs. However, there are some key
observations that I want to surface:

* *The ML lifecycle involves a loop for both software and model development*:
    They often map to our two personas above, but you might see an ML Engineer
    or Researcher doing both.
* *The ML lifecycle involves discrete components that work together*: as a
    lookahead, we'll see that MLOps tools provide solutions that can improve the
    lifecycle by piecemeal, or as a whole.

This will serve as our lens in navigating the MLOps landscape. It describes how
our two personas&mdash;the software engineer and the researcher&mdash;
interact with one another. A good MLOps tool should provide their needs, answer
their wants, and quell their frustrations.[^2] 

> A good MLOps tool should provide [our researchers' and engineers'] needs, answer their
> wants, and quell their frustrations.

## Conclusion

In this section, we asked the question "who will benefit?" to motivate this
endeavour.  We learned of two personas: the ML Researcher and the Software
engineer. They work closely together, yet their dynamic is not always seamless.

We examined their Wants, Needs, and Frustrations, then came upon my
interpretation of the ML Lifecycle, i.e., two interlocking loops catering to
each of our personas. The ML lifecycle provides a lens to navigate the MLOps
landscape:
* When asked, "who will benefit?", our answer is researchers and engineers. 
* When asked, "what will benefit?", our answer is the ML lifecycle.

We will look into this further in the [next
section](/notebook/2021/05/15/navigating-the-mlops-landscape-part-2), as we
describe tools that (1) are software-focused or model-focused, and (2) provides
a piecemeal or all-in-one solution. Remember, all of these will always bring us
back to the ML lifecycle, and again, to our two personas.


### Changelog

* 06-01-2021: This blog series was featured in [Issue 19 of the MLOps Roundup Newsletter](https://mlopsroundup.substack.com/p/issue-19-mlops-tooling-vertex-ai)!
* 05-28-2021: This blog series was [featured in Analytics Vidhya!](https://medium.com/analytics-vidhya/10-amazing-mlops-learning-resources-378804c418be)
* 05-22-2021: Added a section explaining how this differs to other analyses
* 05-22-2021: Fix some minor grammar and usage issues.

## Next Sections

* [Part II: Navigating the MLOps Landscape&mdash;The Ecosystem](/notebook/2021/05/15/navigating-the-mlops-landscape-part-2)
* [Part III: Navigating the MLOps Landscape&mdash;The Strategies](/notebook/2021/05/30/navigating-the-mlops-landscape-part-3)


If you like this, you'll enjoy:

* [How to use Jupyter Notebooks in 2020 (Part 1: the data science
    landscape)](/notebook/2020/03/06/jupyter-notebooks-in-2020)


## Resources

* <a id="huyen2020sysdesign">Huyen, Chip</a> (2020). "CS 329S: Machine Learning
    Systems Design". In: *stanford-css329s.github.io*
* <a id="ratner2019mlsys">Ratner, Alexander, Alistarh, Dan, Alonso, Gustavo et al</a> (2019). "MLSys: The New
    Frontier of Machine Learning Systems". In: *arXiv:1904.03257 [cs.LG]*
* <a id="sculley2015debt">Sculley, G. Holt, D. Golovin, E. Davydov, T.
     Phillips, D. Ebner, V. Chaudhary, M. Young, J. Crespo, and D. Dennison</a>,
     "Hidden technical debt in machine learning systems", in *Advances in Neural
     Information Processing Systems* 28: Annual Conference on Neural Information
     Processing Systems 2015, December 7-12, 2015, Montreal, Quebec, Canada, 2015,
     pp. 2503–2511. [Online]. Available:
     [http://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems](http://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems
)
* <a id="zinkevich2018rules">Zinkevich, Martin</a>. (2017). "Rules of machine learning:
    best practices for ML Engineering". Available: [https://developers.google.com/machine-learning/guides/rules-of-ml](https://developers.google.com/machine-learning/guides/rules-of-ml
)


### Footnotes

[^1]: I admit that there's some level of survivorship bias here. 
[^2]: I'm well aware that I simplified these two personas (hopefully not to the point of caricature), for the roles inside a data science team differs from one company to the other.
