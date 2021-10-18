---
layout: post
type: post
title: "Understanding spaCy's configuration and project system"
date: 2021-11-05
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img: /assets/png/ph-clip/header.png
tags: [machine learning, nlp, spacy, explosion, natural language processing]
description: |
    The advent of spaCy v3 introduced a new way of managing your NLP projects.
    This time, you don't even have to write your own training loop! Read on to find out more.
excerpt: |
    The advent of spaCy v3 introduced a new way of managing your NLP projects.
    This time, you don't even have to write your own training loop! Read on to find out more.
---

<span class="firstcharacter">B</span>ack then, when I want to train my own NER
model using [spaCy](https://spacy.io), I'd write my own training loop.
Something like this:

```python
import random

import spacy
from spacy.training import Example

from my_scripts import load_datasets

# Load model and datasets
nlp = spacy.load("en_core_web_lg")
train_set = load_datasets()

# Configure
epochs = 20
other_pipes = [pipe for pipe in nlp.pipe_names if pipe != "ner"]

# Training proper
with nlp.disable_pipes(*other_pipes):
  for i in range(epochs):
    random.shuffle(train_set)
    for text, entity_offsets in train_set:
      example = Example.from_dict(doc, {"entities": entity_offsets})
      nlp.update([example], drop=0.5)
```
__Code:__ A simple training loop for NER.  
Adapted from [Duygu Altinok](https://duygua.github.io/)'s book, ["Mastering spaCy"](https://www.packtpub.com/product/mastering-spacy/9781800563353)
{: style="text-align: center;"}

It was pretty good until I started handling multiple NLP projects. Things
become unwieldy&mdash;I rewrite the same code over and over again, teams develop
different standards as to what a "training loop" comprises, and integration
with third-party services becomes challenging. 

Lastly, the snippet above will still blow-up: we haven't written our evaluation
step, there's no control on how we do minibatches, and so much more. As with any
machine learning project, the codebase can be hairy if left untended.

This year, [spaCy released v3](https://explosion.ai/blog/spacy-v3#config)
and introduced a more convenient system for NLP projects. If there's one key
takeaway from this blogpost, then it's that **you don't have to write your own
training loop anymore**.  With that said, here's how I think about the "spaCy
stack" now:

![](/assets/png/modern-spacy/spacy_stack_full.png){:width="380px"}  
__Figure:__ My view of the spaCy stack.  
Abstraction increases as you go up.
{: style="text-align: center;"}

In this blogpost, we'll go through the stack in increasing levels of
abstraction. First, we'll look into the [configuration
system](https://spacy.io/usage/training#quickstart), and see how it abstracts
our custom-made training loop. Then, we'll look into [spaCy
projects](https://spacy.io/usage/projects), and see how it abstracts our
configuration and NLP workflow as a whole. Lastly, I'll share a few thoughts as
a spaCy user and developer. 

- [The spaCy configuration system](#the-spacy-configuration-system)
- [The spaCy project system](#the-spacy-project-system)
- [Final thoughts](#final-thoughts)

I'll be focusing more on the configuration system, but I'll give a brief
overview on how spaCy projects work.

## The spaCy configuration system

If I were to redo my NER training project again, I'll start by generating a
`config.cfg` file:

```sh
python -m spacy init config --pipeline=ner config.cfg
```
__Code:__ Generating a config file for training a NER model
{: style="text-align: center;"}

Think of **`config.cfg` as our main hub.** It's a complete manifest of how our
training procedure will work out. We update it using our text editor, and "run"
it through the [spaCy command-line interface (CLI)](https://spacy.io/api/cli).

![](/assets/png/modern-spacy/user_intxn_config.png){:width="800px"}  
__Figure:__ I can interact with the config via the spaCy CLI.  
It is already included whenever I install spaCy
{: style="text-align: center;"}

It's about 140 lines long, and is full of knobs and buttons. I'll talk about my
way of managing them later, but first, let's continue by setting-up our train
and dev datasets. Note that it's still `null` in our config:

```toml
# ... excerpt
[paths]
train = null
dev = null
# ... excerpt
```
__Code:__ At first, the paths to our training and evaluation data is still null.  
We need to provide valid paths for each.
{: style="text-align: center;"}

Even if we don't need to write our training loop anymore,  we *might* still
need to write our data preprocessing step. I said "might" because if your data
format follows the common ones like CoNLLU, then you can easily convert it
using the [`spacy convert`](https://spacy.io/api/cli#convert) command. 

![](/assets/png/modern-spacy/user_intxn_data.png){:width="800px"}  
__Figure:__: Unless your dataset follows common formats, you need to write a data processing script
to convert them into `DocBin`, then into the disk.
{: style="text-align: center;"}

Each data preprocessing step is tightly-coupled to one's dataset. Even then,
spaCy prefers that your dataset will eventually be saved as a
[`DocBin`](https://spacy.io/api/docbin) object (with a `.spacy` extension).
Below is a sample recipe adapted from
[explosion/projects](https://github.com/explosion/projects/blob/9d5fce5f95ddf5f35c3370b2074b25e995525f51/pipelines/ner_demo_replace/scripts/convert.py):

```python
import srsly
import typer
import warnings
from pathlib import Path

import spacy
from spacy.tokens import DocBin

def convert(lang: str, input_path: Path, output_path: Path):
    """Convert a pair of text annotations into DocBin then save"""
    nlp = spacy.blank(lang)
    db = DocBin()
    for text, annot in srsly.read_json(input_path):
        doc = nlp.make_doc(text)
        ents = []
        for start, end, label in annot["entities"]:
            span = doc.char_span(start, end, label=label)
            if span is None:
                msg = "Skipping"
            else:
                ents.append(span)
        doc.ents = ents
        db.add(doc)
    db.to_disk(output_path)

if __name__ == "__main__":
    typer.run(convert)
```
__Code:__ Here's one way of converting files into a `DocBin` object.
{: style="text-align: center;"}

Once we're done, we should have a `.spacy` or `.json` file for both our
training and evaluation datasets.  We can go ahead and provide the paths in our
`config.cfg` file:

```toml
[paths]
train = "path/to/train.spacy"
dev = "path/to/dev.spacy"
# ... rest of the configuration
```
__Code:__ We now have the `.spacy` files in our configuration. It's also
possible to override them via CLI using `--paths.train` or `--paths.dev` parameters.
{: style="text-align: center;"}

Just to be sure, I'd usually run `debug` commands before training. My favorite
is `debug data`, which informs me of invalid annotations, imbalanced labels,
and more:

```sh
python -m spacy debug data config.cfg
```
__Code:__ Check if there are any data inconsistencies
{: style="text-align: center;"}

Once everything checks out, training my NER model becomes as easy as running:

```sh
python -m spacy train config.cfg --output ./output
```
__Code:__ Training via the spaCy CLI becomes straightforward
{: style="text-align: center;"}

After training, the `./output` folder will contain both the best model and the
model learned at the latest iteration. I can now use it just like any typical
spaCy model. I could either pass the path to
[`spacy.load`](https://spacy.io/usage/models#quickstart), or get some metrics
by using the [`spacy evaluate`](https://spacy.io/api/cli#evaluate) command.


![](/assets/png/modern-spacy/user_intxn_full.png){:width="800px"}  
__Figure:__ Common user workflow for spaCy CLI and its configuration system
{: style="text-align: center;"}

And that's it. Again, we don't need to write our training loop anymore. In
fact, you even remove the need to write auxiliary scripts for training&mdash;
say, a custom CLI using [click](https://click.palletsprojects.com/en/8.0.x/) or
[typer](https://typer.tiangolo.com/). **It all boils down to your `config.cfg`
file and (optional) data preparation script.** The spaCy CLI handles
everything.

![](/assets/png/modern-spacy/spacy_stack_config.png){:width="380px"}
{: style="text-align: center;"}

However, if you're just like me who feels secure knowing which code runs when a
command is executed, then feel free to check the [train loop
function](https://github.com/explosion/spaCy/blob/b3192ddea3aef2f55c47bfcaba1614e3fd79bd1d/spacy/training/loop.py#L24)
from [explosion/spaCy](http://github.com/explosion/spacy).  Of course, the
implementation details differ based on what's written in our configuration, so
it's still important to understand what goes inside our `config.cfg` file.

### How to manage your config

At first glance, the `config.cfg` file may look overwhelming. You are presented
with a large array of settings right off the bat. Most of these are [reasonable
defaults from best
practices](https://spacy.io/usage/training#quickstart-source), and it ensures
that [there are no hidden defaults](https://www.youtube.com/watch?v=BWhh3r6W-qE)
when running an experiment.[^1]

However, if you prefer a config with minimal set of options, then create a
`base_config.cfg` with a partial list of options you just need, and fill it with the
`fill-config` subcommand:


![](/assets/png/modern-spacy/user_intxn_partial.png){:width="700px"}  
__Figure:__ You can manage your config by filling a partial set of values
first,  
then hydrating them with the full set of options.
{: style="text-align: center;"}


```toml
# base_config.cfg contains a partial list of options
[paths]
train = "path/to/train.spacy"
dev = "path/to/dev.spacy"

[nlp]
lang = "en"
pipeline = []
batch_size = 5000
```
__Code:__ Base config with a partial list of options
{: style="text-align: center;"}


When running `spacy train`, you should still pass the config with the full list
of options, i.e `config.cfg`. So even if my `base_config.cfg` only contains
settings for `batch_size` (because maybe that's what I only care about for now)
the resulting `config.cfg` will still include all parameters and defaults to
successfully train our model.

Personally, I still prefer to work with the full configuration itself. I don't
have to maintain two files, and remember to run `fill-config` everytime I
change one. 


### How to understand your config

One thing I like about the configuration file is that there are no hidden
settings to secretly mess up my model. Whenever I come across an unfamiliar
parameter, what I usually do is **follow the breadcrumbs in the spaCy
documentation.**

> Whenever I come across an unfamiliar parameter (in my configuration file), 
> what I usually do is follow the breadcrumbs in the spaCy documentation.

Take a look at this example. Let's say I want to know more about the
`compounding.v1` schedule in `[training.batcher.size]`:

```toml
# ... excerpt
[training]
seed = 42
gpu_allocator = "pytorch"
dropout = 0.1
accumulate_gradient = 1
patience = 1600
max_epochs = 0
max_steps = 20000

[training.batcher]
@batchers = "spacy.batch_by_words.v1"
discard_oversize = false
tolerance = 0.2
get_length = null

[training.batcher.size]
@schedules = "compounding.v1"
start = 100
stop = 1000
compound = 1.001
t = 0.0
# ... excerpt
```
__Code:__ An excerpt of a configuration file focused on the training step. We
will be looking at how the `batcher` was configured for the rest of this
section.
{: style="text-align: center;"}

The first thing I'd do is check the section a config belongs to. You'll find it
inside the brackets&mdash;in our case it's `training`. Then, I'll head over [spaCy's
Data Formats documentation](https://spacy.io/api/data-formats#config) and go to
the ["training" section](https://spacy.io/api/data-formats#config-training).
From there, multiple parameters are presented:

![](/assets/png/modern-spacy/training_section.png){:width="700px"}
__Figure__: Notice that the `batcher` is a function (a `Callable`).
{: style="text-align: center;"}

Here, you'll either find parameters (1) directly under the `[training]` section
(e.g. `seed`, `gpu_allocator`, etc.) or (2) having its own subsection (e.g.
`batcher`, `logger`, etc.). What differentiates the two is that the latter can
still be configured further. Parameters that take in functions or dictionaries
often have its own subsection.

If we zoom into the `batcher` option, we'll notice that it is a
function (i.e., of type
[`Callable`](https://docs.python.org/3/library/typing.html#typing.Callable)).
We can configure this further, that's why it has its own subsection. Under
it, we specify the *exact* function to use for batching&mdash;
`spacy.batch_by_words.v1`.  


![](/assets/png/modern-spacy/batcher_demo_00.png){:width="680px"}  
__Figure__: The `batcher` parameter for training can still be configured further,  
so it earns its own subsection.
{: style="text-align: center;"}

Now, we can go deeper into this batching method. We can find the full spec of
the `batch_by_words` method by looking at spaCy's [top-level API
documentation](https://spacy.io/api/top-level#batchers): 

![](/assets/png/modern-spacy/training_batchers.png){:width="700px"}
{: style="text-align: center;"}

Notice that the same pattern repeats: `discard_oversize` and `tolerance` can't
be configured further, so we just snug them under the same subsection. On the
other hand, `size` can refer to a scheduler *function*, so it has its own
subsection:

```toml
# ... excerpt
[training.batcher.size]
@schedules = "compounding.v1"
start = 100
stop = 1000
compound = 1.001
t = 0.0
# ... excerpt
```


![](/assets/png/modern-spacy/batcher_demo_01.png){:width="680px"}  
__Figure__: Similar to `batcher`, we can configure the `size` further.
{: style="text-align: center;"}

If we still want to learn more about the `compounding.v1` schedule, then we can
check the [Thinc
documentation](https://thinc.ai/docs/api-schedules#compounding).
[Thinc](https://thinc.ai) powers spaCy, and sits a layer below it:
:

![](/assets/png/modern-spacy/thinc_stack.png){:width="300px"}  
__Figure__: [Thinc](https://thinc.ai) is a layer that powers spaCy's compute capabilities. It offers a refreshing take on deep learning frameworks via a functional paradigm. It also
exists as [a standalone library](https://github.com/explosion/thinc)
{: style="text-align: center;"}


Notice that the way we traversed the configuration is from top to bottom: we
started with the main components of the training workflow (`training`), then
peeled layers of abstraction until we reach more specific settings
(`compounding.v1`).  By doing so, we have also traversed the spaCy stack. 

In the next section, we'll move up the stack to [spaCy
projects](https://spacy.io/usage/projects). If the config file governs your
training loop, then spaCy projects govern your [entire machine learning
lifecycle.](/notebook/2021/05/10/navigating-the-mlops-landscape/)

## The spaCy project system

An abstraction above spaCy's configuration system is [spaCy
projects](https://spacy.io/usage/projects): if the config system is just about
training models, then spaCy projects is about the larger machine learning
workflow (i.e., training, packaging, productionizing, etc.). 

> If the config system is just about training models, then spaCy projects is
> about the larger machine learning workflow.

<!-- insert image of stack -->
![](/assets/png/modern-spacy/spacy_stack_projects.png){:width="340px"}
{: style="text-align: center;"}

I lied a bit earlier: if I were to start an evergreen NLP project, then I'll
start by cloning [one of the prebuilt
projects](https://github.com/explosion/projects) for my use-case. For my NER
example, I'd use the [NER demo
pipeline](https://github.com/explosion/projects/tree/v3/pipelines/ner_demo):  

```sh
python -m spacy project clone pipelines/ner_demo
```

From here on in, everything is up to us. Our main point of interaction is the
`project.yml` file, which acts like your typical CI config (think Azure
Pipelines or Github Actions). It gives us enough flexibility while imposing
some structure.

![](/assets/png/modern-spacy/user_intxn_projects.png){:width="640px"}  
__Figure__: The spaCy project now abstracts our training config file. You can
use the `project.yml` file to manage our whole machine learning workflow. We
can then use the `spacy project run <STEP>` to execute
[steps](https://spacy.io/usage/projects#run) or
[workflows](https://spacy.io/usage/projects#run-workfow).
{: style="text-align: center;"}

If I am working on a typical NLP use-case, I'd first check if there's an
equivalent pipeline in
[explosion/projects](https://github.com/explosion/projects), and clone that.
NER and text-categorization already have pre-made templates that are
well-optimized for said task. The remaining thing to do is adapt my dataset
into the `DocBin` format.

If I were to start from scratch, I'd first outline what I want to do in the
`commands` section. I won't start coding right away. For example, in text
categorization, I might just have something like this:

```yaml
# ... excerpt
commands:
- name: "preprocess"
  help: "Serialize raw inputs to spaCy formats"
  script:
  - "python scripts/preprocess.py assets/train.txt corpus/train.spacy"
  - "python scripts/preprocess.py assets/dev.txt corpus/dev.spacy"

- name: "train"
  help: "Train the model"
  script:
  - "python -m spacy train configs/config.cfg"

- name: "evaluate"
  help: "Evaluate the best model"
  script:
  - "python -m spacy evaluate training/model-best corpus/test.spacy"
# ... excerpt
```
__Code:__ I'd usually start by outlining the general steps of my pipeline,  
and draw out the typical workflow I want to accomplish.
{: style="text-align: center;"}

I also went further and wrote "dummy commands" that haven't been implemented
yet. It is like scaffolding your project before building it. I like it because
it's convenient, I am writing the human-to-computer API first&mdash; very top
to bottom.

In addition, the `project.yml` file also provides `deps` and `outputs` keys so
I can explicitly define the expected inputs and outputs of a given step. For
example:


```yaml
# ... excerpt
commands:
- name: "evaluate"
  help: "Evaluate the best model"
  script:
  - "python -m spacy evaluate training/model-best corpus/test.spacy --output metrics/best_model.json"
  deps:  
  # the spaCy cli will expect that corpus/test.spacy exists
  # before running the command
  - "corpus/test.spacy"
  outputs: 
  # the spaCy cli will expect that metrics/best_model.json is produced
  # after running the command
  - "metrics/best_model.json"
# ... excerpt
```
__Code:__ I take advantage of spaCy's dependency checks: it gives me a clear
sense of what data or  model goes in and out of each step.
{: style="text-align: center;"}

By doing this, I can easily see the dependencies and its command chain. This is
one of my favorite features because I often get bitten by missing files or
hidden requirements.

The good thing about `project.yml` is that it supports this way of thinking:
one can outline a big-picture view of their project first&mdash; with all its
dependencies and outputs&mdash; then work one's way backwards.

Lastly, it also has some conveniences like [automatically generating
documentation](https://spacy.io/usage/projects#custom-docs), and [integrations
with popular tools](https://spacy.io/usage/projects#integrations).[^2] By using
one of the premade pipelines in spaCy projects, it becomes easier to tap into
the larger ML ecosystem.

## Final thoughts

As someone who has used spaCy since they learned NLP, it's awesome to see how
convenient and well-integrated it is with other tools! Of course, migrating a
project is not easy, especially if a dependency had a major change. There are
use-cases where spaCy's config and project system work best, and I'd like to
outline them here:

| Use-case                                             | spaCy version | Suggestion                                                                                              |
|------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------------------|
| Starting a new NLP project                           | use v3        | Start using v3 and take advantage of the project templates and config system.                            |
| NLP project in production and using the train config | v3            | Awesome! You can marginally adapt the project system, but of course if it ain't broke, don't change it. |
| NLP project in production with custom training loop  | v3            | Try using atleast the config system and evaluate the results with your current model as baseline.        |
| NLP project in production, but using spaCy v2        | v2            | If possible, migrate to v3 (while being mindful of your model versions). Or [seek help from Explosion](https://form.typeform.com/to/vMs2zSjM)!   |

As usual, standard software engineering practices still apply: always pin your
dependencies, ensure your environments are reproducible, and [if it ain't broke
don't, fix
it](https://www.merriam-webster.com/dictionary/if%20it%20ain%27t%20broke%2C%20don%27t%20fix%20it).
However, if you are intent on making the jump, be sure to check out the
[migration guide](https://spacy.io/usage/v3#migrating) from the spaCy docs. The
[old v2 docs](https://v2.spacy.io/) are also up so you can reference them from time to time.



## Footnotes

[^1]: I highly recommend watching [spaCy v3: Design concepts explained (behind the scenes)](https://www.youtube.com/watch?v=BWhh3r6W-qE) to see the philosophy for each design decision. 
[^2]: This includes tools like DVC, Weights and Biases, Huggingface, Streamlit, and Ray.
