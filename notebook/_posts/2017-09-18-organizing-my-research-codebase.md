---
layout: post
title: "Organizing my research codebase"
date: 2017-09-18
category: notebook
comments: true
author: "LJ MIRANDA"
---

Last summer, I spent most of my time reorganizing my thesis codebase. It
was a mess back then: random scripts here, Jupyter notebooks there, and
config files scattered everywhere. Perhaps one aspect of grad school is
not just about learning how to do research, but also learning how to maximize
productivity when doing research.

Thus, I did some cleaning-up and restructured a huge chunk of my codebase.
Now that summer is over, and hundreds of experiments are waiting in the
pipeline, I saw how effective my reorganization was. In this post, I
will be sharing some notes on how I achieved it, and some
tools/libraries that I found really effective.

## Table of Contents

- [The 3R's of a Research Codebase](#the-3rs-of-a-research-codebase)
  - [Readability](#readability)
  - [Reusability](#reusability)
  - [Reproducibility](#reproducibility)
- [Making my codebase more readable](#making-my-codebase-more-readable)
  - [Setting up my own documentation](#setting-up-my-own-documentation)
  - [Idiomatic code](#idiomatic-code)
- [Enabling reusability for my system](#enabling-reusability-for-my-system)
  - [Treating everything like a library](#treating-everything-like-a-library)
  - [Making sure that everything is in-sync](#making-sure-that-everything-is-in-sync)
  - [Building on different platforms](#building-on-different-platforms)
- [Reproducible research](#reproducible-research)
  - [Random seeds](#random-seeds)
  - [Being confident in my code](#being-confident-in-my-code)
  - [Tracing the flow in my system](#tracing-the-flow-in-my-system)

__Disclaimer:__ my experience might be different from yours, so not everything I
did will be applicable to your _very specific_ case. I will try my best
to be as general as possible: starting from more abstract concepts to specific
libraries. Lastly, I develop mainly in Python, so most of the libraries
I'm recommending will be Python-specific.

A little bit more about myself. I'm a Masters student doing research in
applied machine learning for proteomics. This means that I need to store
huge chunks of protein data, and must be able to access them in and out
of my pipeline. I develop various models, and their parameters must be
optimized and changed without much effort. Moreover, I need to benchmark
various techniques in literature to compare their performance with
respect to my models. Thus, I require an efficient system for storing
and retrieving data, accessing scripts rapidly, and documenting them so
that I will remember how they work in the future.

## The 3R's of a Research Codebase

![3Rs](/assets/png/org/banner-3rs.png)

I define the research codebase as "a set of software artifacts
(scripts, documents, data files, etc.) that enables you to perform
research." In my case, these artifacts range from
Jupyter notebooks, bash scripts, `.JSON` and `.CSV` files, Python code,
and the like. Because these files tend to grow over the course of your
research, it is important to organize them effectively.

For an effective research codebase, I believe three R's are important:
(1) readability, (2) reusability, and (3) reproducibility. This 3R rule
serves as my "design requirements" in restructuring my work. In all
brevity, your codebase should be:

- __Readable__, so that other researchers (or you yourself) will be able
    to understand your code, without much frustration and hair-pulling.
- __Reusable__, so that you can run your system, or even parts of your
    system, in different environments and platforms.
- __Reproducibile__, not just for results, but also for errors. You don't
    want to be debugging a lot during crunch time.

### Readability

This design principle requires that the codebase should be as understandable
as possible: both for you and your fellow researchers. As they all say,
your publication is just the advertisement, for the actual product is your
codebase. Inasmuch as we take great effort to make our publications readable,
it is also important to invest the same amount of work in our code.

Benefits of having a readable codebase include an increased understanding
of your own code, a lower barrier of entry for other researchers looking
at your work, and a saving grace when you take that 2-week vacation and
forget about all you've written for the past 6 months.

In practice, readability translates to setting up your own documentation,
writing idiomatic code, and creating a detailed `README`. If your publication
describes the steps you took while investigating your research problem,
your documentation should describe how your tools are helping you accomplish
your work.

### Reusability

This principle speaks on how various elements in your codebase can be used
multiple times, without rewriting them over and over again. I've seen
brilliant people (who are not _yet_ effective coders) use Jupyter
notebooks to build deep neural networks. If you ask them to change some
hyperparameters, they will scroll back to a specific cell, delete some
characters, then write new ones. When training, web browsers hang for they
cannot handle the memory being loaded from the dataset. _The horror!_

Don't get me wrong, I love Jupyter notebooks. But there is an effective
way of using them (which I'll write about later on). The principle of
reusability treats various chunks of code, usually with similar purpose or
function, into its own module that can be called easily without much hassle.
This could mean building an easy API to load datasets, train models, and
save results.

Another aspect of reusability is being able to execute and implement
various parts of your code in any environment/operating system. This
also translates to good versioning and reliable backup.

### Reproducibility

Reproducibility comes in two flavors: results and errors. It is important
to have the capability to recreate charts and results from your research.
This may mean a liberal use of `RANDOM_SEED` to have atleast a controlled
setting where your parameters are being generated. A good repository of
data is also important so that your pipeline is more streamlined.

On the other hand, it is also important to reproduce your errors. One good
practice for such is via unit testing, where you build checks for each element
of your codebase. This is important to help you anticipate the errors before
they actually happen, and be able to reproduce them in a controlled setting.

Lastly, it is important to have a trace of all the steps happening when we
run our pipeline. We should be able to know the status whenever a dataset is
loaded, a model is trained, the loss is calculated, or an error has occurred.
Normally, we use `print()` methods to view them in our console. But it is
much better to have all of these be stored in a log file, so we can organize
them and see them even after we close our program.

## Making my codebase more readable

I find it important to make time writing documentation for my research
codebase. Normally I do this when I'm too lazy to code but I don't want
to end the day unproductive. Writing documentation is also a nice way to
mentally prepare myself into _development mode_, as I get to review
specific parts of my code and inspect what they do and how they contribute
in the whole system.

The best way to write documentation is to put yourself in the shoes of a
clueless first-year grad student who will look at your codebase the first
time. I know it is counter-intuitive, because we, the
almighty-experts-of-our-very-specific-fields should know the intricacies of
our research like the back of our hands. But hear me out: we write our
documentation not for our present selves, but to our future selves. Most
of the codebase that we have written six months ago may be indistinguishable
from now, or maybe after a week of vacation. A good docs will always come
in handy.

Moreover, some of the major conferences (atleast in my field) require not
just the submission of your paper, but also of a code repository. It will
help your reviewers, and save them the frustration of running your work, if
documentation is present.

What should be written in your documentation?

- Introduction to your codebase
- Dependencies, how to set-up/install
- Basic usage
- API documentation for all methods/classes

Lastly, we have to understand that a readable codebase doesn't rely only
in a strong documentation. It is also important to learn how to write
readable code. In Python, we have this pretty vague adjective called
_pythonic_. It roughly means a particular set of styles in programming
that is more efficient when writing Python code. In a general sense, it's
also useful to write idiomatic code, that is, something that is understandable
in terms of structure and overall design.

For the next few sections, I will be discussing some tools that helped me
in making my codebase more readable.

### Write idiomatic code

I find it useful as a researcher to learn how to write code that adheres
to a certain style guide. I haven't been in the software development industry,
so I don't know what my peers (my classmates from undergrad who went on to
take jobs) mean when they say "X writes better code than Y." Perhaps there
are many factors for comparison, but I realized that one of them is on
how one writes more idiomatic code.

For Python, we have a style guide more known as
[PEP8](https://www.python.org/dev/peps/pep-0008/). These are recommendations
that help you achieve a code style that embodies the
[Zen of Python](https://www.python.org/dev/peps/pep-0020/). Some notable
things that I've picked up includes: (1) use of spaces instead of tabs,
(2) a line length limited to 72 or 79, and (3) chopping equations to make
it look elegant.

For some of us encountering PEP8 for the first time, it may be difficult
to absorb everything in our head at day one. Luckily, there is such thing
as linting. In linting, you run a tool against your code and it will
automatically check code syntax and give instructions on how to clean it.

One of the most useful linting tools available in the Python environment
is [`flake8`](flake8.pycqa.org/en/latest/). It is a more convenient wrapper
to "lower-level" linting tools such as [`pep8`](https://pypi.python.org/pypi/pep8)
and [`pyflakes`](https://pypi.python.org/pypi/pyflakes). For the sake
of completeness, the former checks code style and errors while the latter
checks logistical errors (unused imports, variables, etc.). It may be
a hassle to switch between `pep8` and `pyflakes` in your workflow, thus
`flake8` is born. There is also another tool, [`pylint`](https://pypi.python.org/pypi/flake8),
but I personally find this very pedantic and quite distracting.

Suppose we're given a _smelly_ Python code:

```python
class FooClass(object):
    """A sample class with many style errors"""
@property
    def foo(self, arg1):
        if arg1 > 5.0: return arg1
        else: return 0

def bar(self, arg1, arg2):
    return arg1 + arg2
```

If we run `flake8 sample.py`, we get something similar to:

![Flake8 Demonstration](/assets/gif/flake8-demo.gif)

For those using text editors and IDEs, there are various options to install
linters that highlights smelly code as you write it. For PyCharm, there is
a [code inspection feature](https://www.jetbrains.com/help/pycharm/code-inspection.html)
that works decently. For VSCode, `pylint` is used as default when you install
the Python package.

#### Tools mentioned and other resources

- [The Zen of Python](https://www.python.org/dev/peps/pep-0020/)
- [Python Style Guide Documentation](https://www.python.org/dev/peps/pep-0008/)
- [`pep8`, a Python linter to check code style and errors](https://pypi.python.org/pypi/pep8)
- [`pyflakes`, another linter for logistical error-checking](https://pypi.python.org/pypi/pyflakes)
- [`flake8`, a convenient wrapper for `pep8` and `pyflakes`](flake8.pycqa.org/en/latest/)
- [PyCharm code inspection tool](https://www.jetbrains.com/help/pycharm/code-inspection.html)

### Add docstrings

Due to my Philosophy minor, and probably because of my liberal arts
undergrad, I enjoyed writing docstrings as much as I write code. For
starters, docstrings are helpful descriptors that provides an outline of
what a specific function or class is doing. They are often the first
statement seen in any package, module, class or function. These strings
can be extracted automatically via the `__doc__` member of the object.

There, you can write the inputs, expected return values, and possible
error messages. In Python, we simply write them inside triple double
quotes (`"""`):

```python
class NeuralNetwork(object):
    """A simple multi-layer perceptron class"""

    def __init__(self, input, hidden, output):
        """Initializes the network

        Arguments
        ---------
        input : list
            nb. of units in input layer
        hidden : list
            nb. of units in hidden layer
        output : list
            nb. of units in output layer
        """
        pass
```

The example above is a simple neural network class with an `init` method. As
you can see, even if I haven't written the actual implementation, you already
have a good idea of what this function will do. Of course, you can have
your own format for your docstrings, but in Python, it is highly-recommended
to use [Sphinx docstring format](https://pythonhosted.org/an_example_pypi_project/sphinx.html)
(or personally, the [numpy](https://github.com/numpy/numpy/blob/master/doc/HOWTO_DOCUMENT.rst.txt)
or [Google-style](http://www.sphinx-doc.org/en/stable/ext/example_google.html) format).

It is often important to have your documentation be compiled into a single
document that you can access everytime. Of course, writing them and setting
it up will be a hassle if we don't know the proper tools for the job. During
that summer, the Sphinx package became of great help. Because our docstrings
are easily accessible in Python, it is much easier to organize them
programatically. Moreso, you can even put them inside a webpage that is
served locally in your browser. Below is a sample documentation generated
into an `html` file by Sphinx:

![Sphinx Demonstration](/assets/gif/sphinx-demo.gif)

#### Tools mentioned and other resources

- [Sphinx set-up and documentation](http://www.sphinx-doc.org/en/stable/tutorial.html)
- [Sphinx docstring format](https://pythonhosted.org/an_example_pypi_project/sphinx.html)
- [Numpy-style docstring format](https://github.com/numpy/numpy/blob/master/doc/HOWTO_DOCUMENT.rst.txt)
- [Google-style docstring format](http://www.sphinx-doc.org/en/stable/ext/example_google.html)
- [Python style guidelines](https://www.chromium.org/chromium-os/python-style-guidelines)

## Enabling reusability for my system

According to research, reusability lowers your _hair-pulling-index_ by
a hundred fold. 

### Treating everything like a library

<!---
Modules and whatnots

show your directory structure
-->

### Making sure that everything is in-sync

<!---
Versioning. Github. LFS for large files
-->

### Building on different platforms

<!---
Travis-CI
-->

<!---
Python future
-->

## Reproducible research

<!---
Same as above
-->

### Random seeds

<!---
Why randomseds are important
-->

### Being confident in my code

<!---
Unit testing
-->

### Tracing the flow in my system

<!---
logging
-->