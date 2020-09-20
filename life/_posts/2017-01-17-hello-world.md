---
layout: post
type: post
title: "Hello world!"
date: 2017-01-16
category: life
comments: true
author: "LJ MIRANDA"
tags: [github pages, github, jekyll, ruby, wordpress, wordpress to github pages]
---

Hello world! 

I'm now transferring my blog from Wordpress into Github pages &mdash;the former
site will be deleted soon. So, if you cannot access
[this](https://ljvmiranda.wordpress.com) link anymore, then that means I have
already done the deed. It seems that I have some pretty popular articles in my
Worpress site, so perhaps I'll start migrating them here.

Here are some reasons why I decided to go for Github pages:

- **Integration to my dev workflow**. I have been using Git extensively, and I
    enjoy versioning my work. That also includes pushing/pulling changes to my
    remote, and practicing continuous integration or deployment. Github pages
    enables me to do just that: I just need to push to `master`, and my page
    will be deployed in no time. *I can also work offline*, and push upstream
    changes to my repository. In summary, I just want a "hack-ish" user-experience.
- **I want to try some web development**. Web developers may scoff at what they
    just read, but migrating to Github Pages enabled me to learn a bit of web
    dev. Even with just a static site generator like Jekyll, I was able to dip
    my toes on the Rails ecosystem, SCSS, and the like.
- **Open-source experience**. I realized that if readers found any mistakes,
    either from grammar or content, they can just go ahead and open up a Pull Request. 
    They don't need to point them out in the comments and wait for me to
    correct them myself. Github integration is pretty good, and I'd love to
    leverage that[^1].

On the other hand, there are still some things that may need some improvement:

- **Plugins require setup**. For Wordpress, I just virtually need to
    drag and drop plugins I want to have. SEO and Analytics are automatically
    available. With Github Pages, I need to setup Disqus for comments, Google 
    Analytics for stats, and other things. *Github pages doesn't support
    plugins out-of-the-box*, so if I want to do that, I need to push the
    locally generated files instead [^2].
- **No databases, etc.**. That's definitely expected, especially on static-site
    generators. If you want the full blogging experience, I'd say stick to
    other services for that. If you want a clean and lightweight experience,
    then Github pages is a good solution for you.

With that in mind, I won't suggest Jekyll + Github Pages for non-developers who
don't want to roll-up their sleeves and tinker around their site. If you want
an easy and no-ops way of blogging, use other providers such as Medium or
Wordpress. But, if you find joy in building things and making things work, then
Github pages is definitely the best solution for you!

### Footnotes
[^1]: Of course, the source code is available [on Github](https://github.com/ljvmiranda921/ljvmiranda921.github.io)
[^2]: I solved this problem by integrating Travis-CI in my workflow. Whenever the checks on the `master` passed, it automatically deploys the **locally-generated files** to `gh-pages`, and is deployed to the website.
