---
layout: post
type: post
title: "How to improve software engineering skills as a researcher"
date: 2020-11-15
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [software development, debugging, python, software engineering, life]
description: |
    This blogpost is for researchers or data scientists who ask me how to
    improve their software engineering knowledge. I'll talk about a particular
    exercise that you can do to improve your skillset.
excerpt: |
    This blogpost is for researchers or data scientists who ask me how to
    improve their software engineering knowledge. I'll talk about a particular
    exercise that you can do to improve your skillset.
---


Hello! You're probably here because I linked this right after rambling upon how
you can improve your software skills as a researcher. Maybe our conversation
went this way:

<!-- illustrate this instead?? -->

> "Learn git! Modularize your code! Then uhm, try to reproduce your
> experiments along the way, also deploy your stuff to some cloud platforms
> along the way? Try using notebookes less often, Also, check PEP8! And learn git!"

You get it already...the field is quite huge and you can get started in so many
ways&mdash; I got overwhelmed before. *However*, as an opinionated
advice, I think that there's one exercise that introduces you to all 
relevant skills and focuses them into a tangible output:

> Create a machine learning application that can receive HTTP requests
> and can optionally be deployed as a containerized app.

#### Table of Contents

- [Um, what?](#um-what)
- [Wait, but why an ML service?](#wait-but-why-an-ml-service)
- [Ok, so how?](#ok-so-how)
- [In conclusion](#in-conclusion)
    - [What's next](#whats-next)
    - [Notes for the engineers](#notes-for-the-engineers)


## Um, what?

Let's break it down a bit:

1. **"Create a machine learning application..."**: this should be a model that
    receives an input, applies the necessary transformations, and returns an
    output. This can be anything, and it depends on what you're comfortable
    with. It could be a language model that measures sentiment, an OCR model
    that gives bounding boxes or a standard classifier given an arbitrary set of
    inputs. You decide! 

2. **"...that can receive HTTP requests..."**: if this is the first time you've
    encountered this, then don't fret! In Python, this may be as simple as
    learning a new library. HTTP is a standard that allows computers to talk to
    one another. Allowing your ML application to receive HTTP requests means
    that you're setting-up the "language" between your app and other
    users, so that they know how to talk (give/receive data) to your model.

3. **"...can optionally be deployed..."**: this means that you allow your
    application to be accessible outside your own computer! If the previous
    step defines how others can communicate to your app, this step allows
    others to communicate to it! There are many platforms that does this, and
    I'll list them down later.

4. **"...as a containerized app."**: this packages your application, all of its
   dependencies, and necessary setup in a single container&mdash;currently the
   most ubiquitous way of putting things into production. Containerization
   makes your app idempotent, avoiding the "it works on my machine" problem.

<!-- show the final product in illustration form: a fully-fledged machine -->

In short, I'm asking you to create a **Machine Learning (ML) Service.** You
will hear this term many times in the industry: software-as-a-*service*,
micro*service* architecture, API *services*, kubernetes *service*, and more. I assure
you that there is some relation among these terms. However, before we jump into
the *how*, I want to talk about *why creating an ML service is a perfect
introduction to learning software for researchers and data scientists*.

Lastly, note that **this blogpost is not a tutorial.** Instead, I'll touch upon
a skill roadmap that will enable you to build an ML service&mdash; i.e., "how
to get there." There are many resources available nowadays, and I'll talk about
my recommendations here!

## Wait, but why an ML Service?

There are three reasons why creating an  ML service is a researcher's perfect
introduction to software engineering:

* **Improves engineering sensibilities.** In most applications, ML services
    are treated as software components: each with an expected input and
    output. Learning how to build ML services gives us a unique perspective on
    how our ML models are used outside of the train-eval loop. 

    In addition, the competencies needed to create an ML service covers alot of the
    essential software skills to collaborate with engineers: (1)
    version-control, (2) proper software modularity, (3) knowledge of APIs, (4)
    dependency management, and so on. 

    <!-- Illustration here? -->
* **Increases familiarity with the ML workflow.** We're familiar with the ML
    experimentation workflow: label, train, evaluate, tuning, then so on. However,
    there is also a productization workflow where we deploy our models, perform
    A/B testing, take care of concept drift, and more. I even imagine it as two
    cycles syncing together (probably a new blogpost about this in the future).

    <!-- Illustration of a workflow here -->
    Building an ML Service gives us a glimpse on how ML models are productized. 
    We'll start to think about artifact versions, model dependencies, and
    so on. As a researcher, being able to see a model end-to-end, from
    conception to production, can give us an insight on how to improve the
    products we work on.

    As an aside, my fearless forecast is that the productization workflow will
    be democratized by up-and-coming ML Platforms and services. However,
    learning how they work, "to the metal," while they are still relevant can be
    a good experience.
* **Another tool under your belt to create more cool stuff.** Even if you won't
    be working as a full-fledged ML Engineer or Developer, the technologies
    you'll learn while building an ML Service enables you to do more things!

    As an academic, learning how to use Docker paves way for reproducibility.
    In addition, being more organized in writing code, in contrast to writing
    janky scripts here and there, can aid you in your research in the long-run.
    There's alot of things we can learn from software engineering to enhance
    our research workflows. For example, [I used containers, version-control,
    and LaTeX to write my Masters thesis before](http://localhost:4000/notebook/2018/02/04/continuous-integration-for-latex/)! 
    The opportunities are endless!

    <!-- Illustration of a person with a toolbox here -->

## Ok, so how?

Now that we've established **what** we are going to do and **why** we're doing
it, let's talk about the **how**. In this section, I'll talk about a roadmap on
how to build an ML Service, and some resource recommendations that once helped
me along the way

1. **Be comfortable with a version-control system like Git**

    [Git](https://git-scm.com/) is almost fundamental to the software
    development lifecycle. There's a bit of a learning curve involved, but the
    benefits are worth it. As a bonus, create a profile on your preferred
    Git-hosting server&mdash;Github, Gitlab, etc.&mdash; and enjoy the
    full-suite of version control!

    Key Activities:

    - Learn how the standard commands work: *git status*, *git add*, *git
      commit*, *git push/pull*. I highly-recommend [Github's Git
      introduction](https://guides.github.com/introduction/git-handbook/) for this.
      In addition, explore git using this [visualization tool](http://git-school.github.io/visualizing-git/).

    - Learn the basics of Git branching. Understand the difference between
      [rebase and merge](/notebook/2018/10/25/git-workflow/), and
      learn the merge policies within your team. In addition, try-out this fun
      [branching visualization tool](https://learngitbranching.js.org/) to see various ways to move 
      around your Git history.

    - Cap-off your Git proficiency by learning how to write good commit
      messages. Chris Beams wrote a [nice blogpost](https://chris.beams.io/posts/git-commit/)
      on how to structure and word them. It's something I always recommend to
      anyone learning git!

    Another course that I highly-recommend is [Software Carpentry's Git
    fundamentals](http://swcarpentry.github.io/git-novice/). It is aimed
    primarily to researchers and scientists like us, and introduces
    version-control in the context of [open science and reproducibility](http://swcarpentry.github.io/git-novice/10-open/index.html).

2. **Structure your Python project in a modular fashion**

    For most of us in Machine Learning or Data Science, our introduction to
    Python programming is often through Jupyter notebooks. That is fine, but
    for software development, we should learn how to slowly migrate our scripts
    into a more modular structure. That means pure Python `.py` files, properly
    directed directories, and well-defined dependencies.

    Key Activities:

    - Learn different Python application layouts from this [Real Python
        tutorial](https://realpython.com/python-application-layouts/). For our
        Machine Learning Service, we will ascribe to the [Flask
        layout](https://realpython.com/python-application-layouts/#flask) (also
        applicable if we're using other web server libraries like FastAPI).

    - Study the more expressive [layout
        with internal
        packages](https://realpython.com/python-application-layouts/#application-with-internal-packages).
        In my opinion, it catches all use-cases if you want to write a library,
        a web application, or a command-line tool. 

    - Learn from open-source project structures by including a sensible README,
        changelog, and documentation. I highly-recommend [Hitchhiker's Guide to
        Python](https://docs.python-guide.org/writing/structure/) as an
        entrypoint for these practices. Furthermore, I encourage you to
        checkout best practices from open-source repositories like
        [fastai](https://github.com/fastai/fastai), [huggingface's
        transformers](https://github.com/huggingface/transformers), and
        [streamlit](https://github.com/streamlit/streamlit). Learning how to
        read and learn from other's code can help improve your "code-sense."

    - Write your ML application in a modular fashion. Again, follow the
        guidelines on project structure from the recommendations above, but if
        you wish to have an opinionated structure, I often opt for this layout:

        ```
        my_project/
        ├── api
        ├── docs
        ├── experiments
        ├── README.md
        ├── requirements.txt
        ├── src
        │   ├── entrypoint.py
        │   └── my_module
        │       └── module_file.py
        └── tests
            ├── my_module
            │   └── test_my_module.py
            └── test_entrypoint.py
        ```

    During this step, I also encourage you to write a small utility library for
    the common functions that you use in your day-to-day. You can, for example,
    extract all repeated functions from your Jupyter notebooks, refactor them,
    and reuse them anywhere. After accomplishing all the activities at this
    point, I'm confident that your software engineering skills have grown by a
    lot!

3. **Learn how to write an API on top of your model using Flask or FastAPI**

    For this step, the goal is to learn how to create simple web servers. More
    often than not, the primary mode of communication between two applications
    is through HTTP. What we're virtually doing here is exposing an interface
    for other users (computers or humans), to talk to our machine learning
    app.

    Key Activities:

    - Learn [`requests`](https://requests.readthedocs.io/en/master/), a
    commonly-used library for interacting with web servers. More particularly,
    understand when to use GET and POST requests, different [HTTP status
    codes](https://www.restapitutorial.com/httpstatuscodes.html), and various
    types (read: [mimetypes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)) returned by a web-server.

    - Create a web-server using a [framework](https://wiki.python.org/moin/WebFrameworks) of your choice. Right now I recommend learning
    [FastAPI](https://github.com/tiangolo/fastapi): it's fully-featured,
    easy-to-use, and powerful. Create GET and POST endpoints that returns your
    model's output in accordance to the relevant mimetype. Another good option
    is [Flask](https://github.com/pallets/flask), it's an "older" framework,
    thus widely-used.

    Optionally, I'd recommend that you also learn [socket programming](https://realpython.com/python-sockets/), and
    understand the tradeoffs between web-sockets and HTTP. Here's a good
    [StackOverflow answer that highlights their
    differences](https://stackoverflow.com/questions/14703627/websockets-protocol-vs-http)&mdash;
    there's a latency advantage for web-sockets, but I think for our most
    common use-case&mdash;and by way of introduction&mdash; learning HTTP is
    enough. 


4. **"Containerize" your application using Docker**

    After structuring your Python application in Step #2, and having your server
    up-and-running in Step #3, the next step is to package your application
    with all its dependencies using [Docker](https://www.docker.com/resources/what-container). 

    Docker images are built using a [Dockerfile](https://docs.docker.com/engine/reference/builder/#:~:text=A%20Dockerfile%20is%20a%20text,command%2Dline%20instructions%20in%20succession.)&mdash; think of it as a recipe.
    It contains a series of steps to install all necessary dependencies (gather
    ingredients) and run specific commands (simmer, fry, mix and match) to
    faithfully reproduce your application.

    You want to use Docker for two things: (1) reproducibility and (2)
    isolation. The former ensures that everytime you "cook" (build the Docker
    Image), it's always the same food all throughout (same Image). The latter
    provides you with a "sandbox kitchen" where only the ingredients you
    specified exist: I only need a pot, chicken, vinegar, and soy sauce.
    There's no chance that an extra ingredient, say sugar, that will
    inadvertently mess up my cooking. 

    Key Activities:

    - Learn the differences between an Image and a Container. There is a good
        [StackOverflow
        answer](https://stackoverflow.com/questions/21498832/in-docker-whats-the-difference-between-a-container-and-an-image)
        that explains their use, and how to reason about them. These two terms
        are often used in the software engineering world that it is important
        to get the fundamentals right. Also, before you start, I
        highly-recommend this [Docker
        roadmap](https://vsupalov.com/docker-learning-roadmap/) to fill-in your
        learning needs regarding the technlogy. Vladislav's blogpost is also
        rich with information about anything Docker.
    
    - Learn basic docker commands by playing on the Python Docker image. More
        specifically, learn the most common ones: `pull/push`, `build`, `tag`,
        `run/exec`, `ps/log`. I highly-recommend the [Docker Curriculum
        website](https://docker-curriculum.com/) that puts you up to speed on
        using Docker in action.

    - Write a Dockerfile for your web application. Now that you know how to
        play around a Docker image, it is time to make your own! Again, the
        Docker Curriculum gives you an overview on [how to make your own Docker
        image through a
        Dockerfile](https://docker-curriculum.com/#our-first-image).  Learn the
        basic directives such as `FROM`, `RUN`, `COPY`, and `CMD`, then build
        your image and play with it similar to the previous step! Also, check
        the [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) from the official docs.

    - Ideally, the output for this step is to run your web-server similar to Step
    3, but through Docker. In Step 3 you probably ran your server by typing
    some commands in your terminal (`gunicorn...`). On this step, it should
    just be as easy as `docker run my-image`. 

    Once you get the hang of using Docker, you might want to expand your
    knowledge by learning:

    * **Args and environment variables**, to fully parametrize your images. [This
        blogpost](https://vsupalov.com/docker-arg-env-variable-guide/) (and the
        blog in general) is my go-to reference for anything that confuses me
        regarding these directives.

    * **Multi-stage builds**, this mostly solves the problem of keeping the
        image sizes down. It is a good-to-know, and a cool "trick" to show-off
        Docker mastery. My go-to reference is always the [official docs](https://docs.docker.com/develop/develop-images/multistage-build/).

    * **Docker Compose**. How about running multiple containers at once?
        Compose allows you to "orchestrate" containers that relate to one
        another. For example in a web app, I have an image for the Frontend
        (made with Vue), and an image for the Backend (Python). In order for
        me to control them together, I use Compose. The [official
        docs](https://docs.docker.com/compose/) are already a good resource,
        but if you wish to see an example, check-out my [Sprites-as-a-Service
        project](https://github.com/ljvmiranda921/sprites-as-a-service).
        
5. **Learn how to deploy to a Cloud Platform**

    At this point, we can hopefully see the benefits of containerization: the
    build process of our app is *idempotent*. Your application can virtually
    run on any machine that has Docker installed&mdash;it could be my laptop, or a
    *server in the Cloud*!

    Deploying to the cloud often depends on the platform you're bringing your
    application onto. For this step, I recommend looking into container-based
    managed services like [Google Cloud Run](https://cloud.google.com/run),
    [AWS Fargate](https://aws.amazon.com/fargate/), or [Azure Container
    Instances](https://azure.microsoft.com/en-us/services/container-instances/)
    Instances. 

    Sometimes deployment is vendor-dependent. There's a [NewStack comparison
    among the
    three major cloud platforms](https://thenewstack.io/comparison-aws-fargate-vs-google-cloud-run-vs-azure-container-instances/)
    so I'll let you choose. Personally, I've been quite happy with Google Cloud
    Run: it's easy to set-up, has a free tier, and pretty fast startup time!
    As an example, my [Sprites-as-a-Service
    application](https://ljvmiranda921.github.io/sprites-as-a-service/) was
    deployed to Cloud Run!

    Other options include
    [Heroku](https://devcenter.heroku.com/categories/deploying-with-docker) and
    [OpenFaaS](https://www.openfaas.com/). Heroku often has its preferred
    repository structure, while OpenFaaS still needs to be set-up. Anyhow, I
    can't fully vet on them but I've heard good things about the two.



<!-- this is the how, when illustrating these things, build-up the "final
machine" -->
<!-- for each point, write down what should they learn or the activities that
they should do + relevant resources: in learn git {learn
proper commit messages, learn git flow, etc.} -->

<!-- learn git => learn the tools -->
<!-- learn how to modularize your code => show that the components now look
better -->
<!-- learn flask => an interface for the machine -->
<!-- learn docker => the "frame" or the common interface into which these
things will fit in -->

## In conclusion

<!--
> At this point, I can say that you can already be productive as you
> collaborate with the software engineers of your team. If you're an academic
> researcher, you can start seeing how you can improve your research workflow
> using software best practices. Congrats!
-->

<!-- obviously this is not a weekend project -->


## What's next?

<!-- if they enjoyed this, they can now do a lot of things: deployment,
devops,e tc. --> 
<!-- maybe there's an illustrative component for each? -->
<!-- more ways to improve the app -->
<!-- learn OOP or functional programming -->
<!-- i don't use FP religiously, but there are some principles I try to abide
to -->

### Notes for the engineers

<!-- they're definitely making a containerized web server -->
<!-- why not django? -->
