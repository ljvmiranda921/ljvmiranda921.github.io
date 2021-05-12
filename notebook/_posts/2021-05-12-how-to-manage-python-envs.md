---
layout: post
type: post
title: "How to manage Python environments"
date: 2021-05-12
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [machine learning, python, virtualenv, make, makefile, software engineering, precommits]
description: |
    Here is an excerpt from a Python working session that I led about managing
    Python environments using virtualenv, make, and pip-tools. Found it a bit
    useful so I want to share it to everyone.
excerpt: |
    Here is an excerpt from a Python working session that I led about managing
    Python environments using virtualenv, make, and pip-tools. Found it a bit
    useful so I want to share it to everyone.
---

> This is from my Python working session on managing Python environments. I
> think this is helpful for researchers and data scientists who want to endow
> some structure in their workflows.

In this blogpost, we will be learning how we can manage Python environments and
isolate dependencies using various developer tools. Specifically, I'll
introduce:
- [virtualenv](https://docs.python-guide.org/dev/virtualenvs/): allows isolated Python environments
- [pip-tools](https://github.com/jazzband/pip-tools): a collection of useful utilities for managing dependencies
- [make](https://linoxide.com/linux-make-command-examples/): build automation tool that reads recipes called Makefiles

### Contents

* [Creating a virtual environment](#creating-a-virtual-environment)
* [Managing dependencies within your virtualenv](#managing-dependencies-within-your-virtualenv)
* [Using Makefile for automation](#using-makefile-for-automation)
    * [ Separating prod and dev dependencies](#separating-prod-and-dev-dependencies)
* [Conclusion](#conclusion)



## Creating a virtual environment

Virtual environment is like a sandbox. When you create one, it's still empty
(no numpy, pandas, etc.) aside from your Python interpreter. 

1. First, create a git repo:

    We first start our dev environment by putting everything under git.  I
    recommend this to be the first step, so that we know that we're working on git
    right away

    ```sh
    mkdir my_project
    cd my_project
    git init
    ```

2. Add a `.gitignore` file

    We don't want to track everything in Git (e.g. data, local editor configs, some
    MacOS directories, etc.), so we put them inside `.gitignore`.

    Since we're working with Python, I recommend copy-pasting [Github's
    template Python
    .gitignore](https://github.com/github/gitignore/blob/master/Python.gitignore):

    ```sh
    touch .gitignore
    # open this file with your favorite editor, then copy paste the
    # link above. In my case, I use the vim editor
    vim .gitignore  
    ```

3. Create a virtual environment

    A **virtual environment (env)** isolates your dependencies (and python version)
    from the rest of your machine. So if you install Pytorch within that
    environment, it will only "show up" within that env.

    ```sh
    python3 -m venv venv  # creates a virtual env called venv (gitignored)
    ```

    * `python3`: your runner
    * `-m`: run library module as a script
    * `venv`: run virtualenv library
    * `venv`: the name of the virtual env to be created

    It will create a folder called `venv`. Inside that folder you'll have a
    dedicated `venv/bin/python3` interpreter and `venv/bin/pip3` installer. You'll
    use that instead of your "global" python in your system.

4. Activate the virtual environment

    Once you've created the env, you need to explicitly activate it.

    ```sh
    source venv/bin/activate
    ```

    In some terminals, you'll see that `(venv)` will show up in your prompt. You
    can deactivate it by typing:

    ```sh
    # Don't do this for now
    deactivate
    ```

## Managing dependencies within your virtualenv

We often use [pip-tools](https://github.com/jazzband/pip-tools) for this step. It gives a nice interface to manage
dependencies.

1. Install `pip-tools` within your virtual env 

    ```sh
    venv/bin/pip3 install pip-tools
    ```

    Actually, once you activated the env, you don't need to explicitly
    specify the path. However, I think it's better to be explicit than implicit
    just-in-case!

    Installing pip-tools gives you access to two important commands: 
    * `pip-compile`: pins and resolves versions for your dependencies
    * `pip-sync`: installs dependencies and their exact versions in your env


2. Create a `requirements.in`

    Instead of installing dependencies one-by-one, we create a file that tracks
    them so that it's reproducible. Make a file called `requirements.in`, and
    let's put some of our favorite libraries:

    ```
    # requirements.in
    requests
    numpy
    pandas==1.1.3
    ```

    Assume that you need the `1.1.3` version of pandas and you "don't care"
    about whatever version requests and numpy will be.


3. Compile your requirements to get pinned versions

    In app development, it's super important that your versions are pinned.
    It's helpful for vulnerability-tracking, idempotence, reproducibility,
    and more.

    We use `pip-compile` for this, it will spit out a `requirements.txt`
    later on:

    ```sh
    venv/bin/pip-compile -o requirements.txt requirements.in
    ```

    Inspect `requirements.txt`, you need to commit these in `git`:

    ```sh
    git add requirements.in
    git add requirements.txt
    git commit -m "Add dependencies"
    ```


4. At this point, you haven't installed dependencies yet. Doing this, 

    ```python
    # venv/bin/python3
    >>> import pandas as pd
    ```

    Will result in a `ModuleNotFound` error. We'll use `pip-sync` to fix that:

   ```sh
   venv/bin/pip-sync requirements.txt
   ```

   You install `requirements.txt`, the pinned version, not `requirements.in`.

   It does basically what is says: it syncs whatever's in your
   `requirements.txt` in your git. So, if you open your Python interpeter:

   ```python
    # venv/bin/python3
    >>> import pandas as pd
    >>> pd.__version__
    '1.1.3'
   ```

## Using Makefile for automation

Usually, it's good practice to automate these steps. We do this by writing a
recipe called `Makefile` and executing it via `make`. The format is usually:

```sh
make {target}
```

Where `target` can be anything: `make venv`, `make dependencies`, etc. 
It's also a DAG, so you can run specific recipes first before running another.
To standardize things, here's how we often do it:

```sh
# Makefile
venv: ## create virtual environment if venv is not present
    python3 -m venv venv

requirements.txt:  venv requirements.in  ## generate requirements for release
    venv/bin/pip-compile -o requirements.txt requirements.in

dev:  ## creates a development environment, install deps
    venv/bin/pip-sync requirements.txt
    venv/bin/pre-commit install  # (out-of-scope for this session)
```

Later on, you'll see yourself adding new targets. Usually, I see things like:
* `make run`: runs a web server (maybe calling `gunicorn` or something)
* `make test`: runs all your tests using [pytest](https://docs.pytest.org/en/6.2.x/)
* `make clean`: remove artifact files like `__pycache__`, `.ipynb_checkpoints`


```sh
# Makefile
clean:  ## Remove general artifact files
    find . -name '.coverage' -delete
    find . -name '*.pyc' -delete
    find . -name '*.pyo' -delete
    find . -name '.pytest_cache' -type d | xargs rm -rf
    find . -name '__pycache__' -type d | xargs rm -rf
    find . -name '.ipynb_checkpoints' -type d | xargs rm -rf

format: dev ## Scan and format all files with pre-commit
    venv/bin/pre-commit run --all-files

test: dev ## Run all tests with coverage
    venv/bin/pytest tests --cov=src -v --cov-report=term-missing
```

### Separating prod and dev dependencies

Sometimes we also separate the dependencies only needed to run the app (app
dependencies) and those that are needed to develop the app (dev dependencies).
A good example is `pytest` It's a library for running tests and reporting
coverage. You don't really need it unless you're the developer or part of the
dev team.

Here's how I set them up. I have a file, `requirements-dev.in`, that contains
all these extra dependencies:

```
# requirements-dev.in
-r requirements.txt
pytest
```

Then I have separate targets for building dev and production environments in
the application:

```sh
prod:  # creates a production environment
    venv/bin/pip-sync requirements.txt

dev:  ## creates a development environment, install deps
    venv/bin/pip-sync requirements-dev.txt

requirements.txt:  venv requirements.in  ## generate requirements for release
    venv/bin/pip-compile -o requirements.txt requirements.in

requirements-dev.txt:  venv requirements-dev.in  ## generate requirements for dev
    venv/bin/pip-compile -o requirements-dev.txt requirements-dev.in
```

## Conclusion

In this blogpost, we learned about managing Python environments using tools
such as virtualenv, pip-tools, and make. From scratch, we created a git
repository, added dependencies, and automated build steps using a recipe. Hope
you learned something new today!
