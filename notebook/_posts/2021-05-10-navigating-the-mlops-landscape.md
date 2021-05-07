---
layout: post
type: post
title: "Navigating the landscape of MLOps tools (Part 1: The Lifecycle)"
date: 2021-05-10
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
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
> I’ll talk about the ML Lifecycle, and the personas or roles that pushes it
> the way it is.

<span class="firstcharacter">A</span> few years ago, I wished that more tools supporting ML in production become
mainstream. Back then, [models usually get stuck in Jupyter
Notebooks](/notebook/2020/03/06/jupyter-notebooks-in-2020/), and they often
require an engineer to deploy them. A self-service solution is *the* dream.

It seems that my wish was granted, as slew of startups pop-up, promising a
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
    by asking who will benefit from adopting these tools. Here, I'll introduce
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
increase the quality-of-life of ML Researchers and software engineers.
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

## What's Next

* [Navigating the MLOps Landscape (Part 2: The Ecosystem)](/notebook/2021/05/15/navigating-the-mlops-landscape-part-2)
* [Navigating the MLOps Landscape (Part 3: The Strategies)](/notebook/2021/05/30/navigating-the-mlops-landscape-part-3)

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

[^1]: I admit that there's some level of bias here. I describe myself as an ML Researcher that *knows* software engineering, not necessarily an ML Engineer (lol to be honest I don't know!). From my experience, I gained some validation primarily because I know how to write software, that's why I hugely advocate learning software eng'g.
[^2]: I'm well aware that I simplified these two personas (hopefully not to the point of caricature), for the roles inside a data science team differs from one company to the other. Thanks for bearing with me! If there's a better way to think about these personas so that my analysis becomes richer, please let me know in the comments below!
[^3]: I know, "People over process. Individuals and interactions over processes and tools." I want to follow a *reverse progression* of this philosophy to give myself an easier launching pad to discuss the tooling landscape.
