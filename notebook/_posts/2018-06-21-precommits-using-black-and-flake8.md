---
layout: post
title: "Automate Python workflow using pre-commits: black and flake8"
date: 2018-06-21
category: notebook
comments: true
highlight: true
author: "LJ MIRANDA"
tags: [python, black, precommit, flake8, git, automation, workflow]
---

> Before I commit my staged Python files, `black` formats my code and `flake8`
> checks my compliance to PEP8. If everything passes, the commit is made. If
> not, then I the perform necessary edits and `commit` again. Less time is
> spent on code formatting so I can focus more on code logic.

<span class="firstcharacter">C</span>ode reviews are fun! They enable me to learn from other's code while
providing an opportunity to teach what I know. However, there are still some
things I wish to improve when facilitating reviews in my open-source
projects:

- Less time commenting on code format, and more time discussing code logic
- Less hassle spotting format errors ("can you really see that trailing
  whitespace on Line 76?")
- Stop sounding nitpicky ("Please put two blank lines between function
  definitions")

If I could automate the processes above and remove the human-in-the-loop, we
can focus more on code logic and implementation. Good thing, I learned about
[Git hooks](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks),
specifically pre-commit hooks. It enables you to automatically run a short script
before `commit`ting. This script can be a checking tool or a formatter. If the
script passes, then the commit is made, else, the commit is denied.

In this short post, I'll describe how I created a pre-commit pipeline in
[PySwarms](https://github.com/ljvmiranda921/pyswarms) using the
[black](https://github.com/ambv/black) code formatter,
[flake8](https://pypi.org/project/flake8/) checker, and the
[pre-commit](https://github.com/pre-commit/pre-commit) Python framework. The
entire pipeline looks like this:

![Diagram](/assets/png/tuts/precommit_pipeline.png){:width="640px"}  
__Figure:__ _Pre-commit pipeline with `black` and `flake8` for checking my `.py` files_
{: style="text-align: center;"}

I'll first discuss the `pre-commit` framework, then add components one-by-one:
first is `black`, and then `flake8`. I will show the dotfiles present
in my project, so feel free to adopt them into your own!

## The pre-commit Python framework

We can run shell files all we want to dictate how our pre-commit process goes,
but this [pre-commit framework written in
Python](https://github.com/pre-commit/pre-commit) got us covered. It even comes
with a set of pre-commit hooks out of the box (batteries included!). To adopt
`pre-commit` into our system, we simply perform the following actions:

1. Install pre-commit: `pip install pre-commit`
2. Add `pre-commit` to `requirements.txt` (or `requirements-dev.txt`)
3. Define `.pre-commit-config.yaml` with the hooks you want to include.
4. Execute `pre-commit install` to install git hooks in your `.git/` directory.

The YAML file configures the sources where the hooks will be taken from. In our
case, `flake8`'s already been included in this framework so we just need
to specify its id. On the other hand, we need to define where to source `black`
using few lines of code. Below is a sample `.pre-commit-config.yaml` file that I
use in my project:

```yaml
repos:
-   repo: https://github.com/psf/black
    rev: stable
    hooks:
    - id: black
      language_version: python3.6
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v1.2.3
    hooks:
    - id: flake8
```

**Update (03-04-2020)** You can also add `flake8` from its own repo like so:

```yaml
repos:
-   repo: https://github.com/psf/black
    rev: stable
    hooks:
    - id: black
      language_version: python3.6
-   repo: https://gitlab.com/pycqa/flake8
    rev: 3.7.9
    hooks:
    - id: flake8
```

In the next section, I will discuss my code formatter (`black`) and checker
(`flake8`). As usual, I will provide my config files for each component.

## Code Formatter: black

The black code formatter in Python is an opinionated tool that formats your
code in the best way possible. You can check its design decisions in the
[repository itself](https://github.com/psf/black). Some notable formatting
decisions, in my opinion:

- Unlike in PEP8, code length is 88 characters, not 79.
- Use of double-quotes than single-quotes in strings.
- If there are many function args, each arg will be [wrapped per line](https://github.com/psf/black#how-black-wraps-lines).

I'd rather maintain the recommended 79 character length. Good thing, they have
an option to do so. I just need to configure my `pyproject.toml` to
`line-length=79` and everything is all set. Here's my `.toml` file for
configuring `black`:

```
[tool.black]
line-length = 79
include = '\.pyi?$'
exclude = '''
/(
    \.git
  | \.hg
  | \.mypy_cache
  | \.tox
  | \.venv
  | _build
  | buck-out
  | build
  | dist
)/
'''
```

If you are not a fan of black, there's always `autopep8`&mdash; a formatter
more faithful to PEP8. Good thing, the pre-commit framework already has a hook
on this tool, so there's no need to source from another repository.

## Flake8 checker

Flake8 is a powerful tool that checks our code's compliance to PEP8. In order
for black to work nicely with flake8 (or prevent it from spewing out various
errors and warnings), we need to list down some error codes to ignore. You can
check my `.flake8` configuration below:

```
[flake8]
ignore = E203, E266, E501, W503, F403, F401
max-line-length = 79
max-complexity = 18
select = B,C,E,F,W,T4,B9
```

## Results

So what we have is a pipeline that safeguards my project against
wrongly-formatted code. In my project's [CONTRIBUTING
page](https://pyswarms.readthedocs.io/en/development/contributing.html#get-started),
I explicitly mentioned to use pre-commits (or run flake8 and black on their code
manually) before submitting a Pull Request.

![Diagram](/assets/png/tuts/precommit_pipeline.png){:width="640px"}  
__Figure:__ _Pre-commit pipeline with `black` and `flake8` for checking my `.py` files_
{: style="text-align: center;"}

Now that we have a pre-commit framework set-up with black and flake8, let's see
it in action! Here we'll see how black formats a Python file automagically: 

![Diagram](/assets/png/tuts/precommit_demo.gif){:width="640px"}  
__Figure:__ _Short demo on pre-commit hooks_
{: style="text-align: center;"}

Awesome right? Hope you learned something new today!

#### Changelog
* 03-04-2020: Add setup for including flake8 from its own repo. Thanks, Alex Plugaru!
* 07-25-2019: Update github link of black from `ambv` to `psf`. Thanks, Peter Schutt!
* 09-15-2018: Featured in [Episode #95](https://pythonbytes.fm/episodes/show/95/unleash-the-py-spy) of Python Bytes! Thank you [Mike](https://twitter.com/mkennedy?lang=en) and [Brian](https://twitter.com/brianokken?lang=en)! 
* 06-05-2018: Update pre-commit config filename (by [@asottile](https://github.com/asottile))

