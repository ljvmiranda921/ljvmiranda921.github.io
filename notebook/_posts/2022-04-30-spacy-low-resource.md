---
layout: post
type: post
title: "Dependency parsing for a low-resource language (Tagalog)"
date: 2022-04-30
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [natural language processing, dependency parsing, nlp, low-resource, machine learning]
description: |
    Let me tell you about the amazing world of dependency parsing, especially
    for a low-resource language like Tagalog. Unlike English, Tagalog has a
    limited amount of labeled data, and presents a unique challenge to NLP. 
    How do we solve this? Read on to find out more.
excerpt: |
    Let me tell you about the amazing world of dependency parsing, especially
    for a low-resource language like Tagalog. Unlike English, Tagalog has a
    limited amount of labeled data, and presents a unique challenge to NLP. 
    How do we solve this? Read on to find out more.
---

<span class="firstcharacter">D</span>**ependency parsing** is one of the most
crucial tasks in natural language processing. It allows us to formally
understand the structure and meaning of a sentence based on the relationship of
its words. In this blogpost, I'll talk about how we can train and evaluate a
parser for a low-resource language like Tagalog, my native language. 

Parsing a sentence requires us to identify its **head** and **dependents**. The
head is usually the most important word, while the dependents exist just to
modify it. Take this sentence, *"That girl is my sister,"* for example:

<!-- example sentence: displaCy -->
![](/assets/png/dep-parsing/dep_example.svg){:width="800px"}
{:style="text-align: center;"}

- Each arrow represents the dependencies between words and how they're related,
i.e., X is $RELATION of Y (e.g., `det` for determiner, `poss` for possessive,
`nsubj` for nominal topic).
- The most important word in this sentence is `girl`. All other words are
    optional; they only exist to modify this essential word. I can leave the
    other bits out and just say "That girl," and it will still refer to the
    same subject.

You can do a lot of things with this information. For example, you can use the
dependency tree to hint a named-entity recognition (NER) model where the noun
phrases are. In sentiment analysis, you can use the head and its modifiers to
get a good idea of a text's overall polarity. In search, you can use the parsed
tree to improve the ranking of results. You can always see a dependency parser
as part of an NLP pipeline or as a main component of an NLP application.

## On treebanks and low-resource languages

As cool as they may be, training a dependency parser requires a lot of
annotated data. They're usually in the form of treebanks, and one of their
largest inventories is the [Universal Dependencies
(UD)](https://universaldependencies.org/) project. However, **not all languages
have the same amount of labeled information.** Low-resource languages (LRL)
often get the shorter end of the stick in terms of data availability and
volume.

For Tagalog, you only have two choices for treebanks:
[TRG](https://universaldependencies.org/treebanks/tl_trg/index.html)[^1]
([Schachtner and Otanes, 1983](#schachtner1983trg) and Samson, S., 2020) and
[Ugnayan](https://universaldependencies.org/treebanks/tl_ugnayan/index.html)
([Aquino and de Leon, 2020](#aquino2020parsing)).  The former contains 128
sentences and 734 tokens, while the latter has 94 sentences and 1011 tokens.
It's not much especially when you compare them to some English treebanks like
[Atis](https://github.com/UniversalDependencies/UD_English-Atis/blob/master/README.md)
or [ESL](https://universaldependencies.org/treebanks/en_esl/index.html), with
almost 50x the amount of tokens than us.[^2]


| Treebank | Sentences | Tokens | Source                         | Label Information                 |
|----------|-------------|----------|--------------------------------|-----------------------------------|
| [TRG](https://universaldependencies.org/treebanks/tl_trg/index.html)      | 128         | 734      | Tagalog Reference Grammar      | Lemmas, UPOS, Features, Relations |
| [Ugnayan](https://universaldependencies.org/treebanks/tl_ugnayan/index.html)  | 94          | 1011     | DepEd Learning Resource Portal | Lemmas, UPOS, Relations           |


This then begs the question: *how can we reliably train and evaluate a model
from a low-resource language?*
- For **training**, it seems that it's possible to train a parser and get decent
accuracy with just about 100 sentences ([Nivre, et al, 2017](#nivre2017tutorial)), so we'll stick with the treebanks that
we have. We will use spaCy's default training configuration which you can find
in [this
repository](https://github.com/ljvmiranda921/ud-tagalog-spacy/blob/master/configs/default.cfg).
- For **evaluation**, we'll perform both monolingual and cross-lingual checks for
our data. The first entails a simple 10-fold cross-validation
for our model (as recommended by the UD guide), while the latter involves a
pseudo-transfer learning approach where we train a parser from a larger
language model with the Tagalog treebank as our test set.

My overall goal is to demonstrate that it's possible to create a decent Tagalog
dependency parser with the amount of data that we had, and highlight the gaps
that keep us from achieving the same level of information density as other
languages.


### Training a dependency parser using spaCy

A Universal Dependencies (UD) treebank follows a specific format. For each sentence,
you'd usually find something like this:

```
# sent_id = schachter-otanes-60-0
# text = Gumising ang bata.
# text_en = The child awoke.
1	Gumising	gising	VERB	_	Aspect=Perf|Mood=Ind|Voice=Act	0	root	_	Gloss=awakened
2	ang	ang	ADP	_	Case=Nom	3	case	_	Gloss=the
3	bata	bata	NOUN	_	_	1	nsubj	_	Gloss=child|SpaceAfter=No
4	.	.	PUNCT	_	_	1	punct	_	_
```

- In the first few lines, you'll get some metadata such as a unique sentence ID,
    the full text, and its English translation.
- For the numbered lines, you'll see linguistic annotations per [token](https://universaldependencies.org/u/overview/tokenization.html) (e.g.,
    "Gumising", "ang", etc.). For each token, you'd usually be provided by its
    [lemmatization](https://nlp.stanford.edu/IR-book/html/htmledition/stemming-and-lemmatization-1.html)
    (base form), [part-of-speech (POS)
    tag](https://universaldependencies.org/u/pos/index.html), [lexical
    features](https://universaldependencies.org/u/overview/morphology.html#lexical-features),
    and other [morphological
    information](https://universaldependencies.org/u/overview/morphology.html).

These annotations are packaged in a [`.conllu` file
format](https://universaldependencies.org/format.html) which you can open using
any text editor. With [spaCy](https://spacy.io/), we can easily parse this into
a Python object that can be programmatically manipulated:

```sh
python -m spacy convert path/to/annotations.conllu path/to/save/ \
    --converter conllu
    --n-sents 1
    --merge-subtokens
```

You might notice that for the Tagalog annotations, we only have a test set,
i.e., the files were named as `tl_trg-ud-test` and `tl_ugnayan-ud-test`. This
is the [recommended
split](https://universaldependencies.org/release_checklist.html#data-split) by
the Universal Dependencies project, and is a common scenario for low-resource
languages.

> "If you have less than 20k words. Option A: Keep everything as test data.
Users will > have to do 10-fold cross-validation if they want to train on it."
([UD: Data Release
Checklist](https://universaldependencies.org/release_checklist.html#data-split))

There are many frameworks available for training,[^3] but we'll use spaCy to do
the job. We will be using the [config and project
system](https://spacy.io/usage/training) because I [personally find it to be
convenient and easy](/notebook/2021/11/20/spacy-v3/). You can find the full
project in [this Github
repository](https://github.com/ljvmiranda921/ud-tagalog-spacy). 

spaCy has an opinionated pipeline for training a dependency parser, and much of
it hinges from a [token-to-vector model (Tok2Vec)](https://spacy.io/api/tok2vec)
composed of an embedding and CNN network. The tagger, morphologizer, and parser
all listen to this Tok2Vec model. It's possible to replace this Tok2Vec model
with a Transformer-based one, but for the purposes of this blogpost, we'll use
the default option. If you want to learn more about this listener-pattern, I
highly recommend looking at the [developer
docs](https://github.com/explosion/spaCy/blob/master/extra/DEVELOPER_DOCS/Listeners.md).

<!-- show this image: https://spacy.io/models#design-cnn -->
![](/assets/png/dep-parsing/spacy_pipeline.svg){:width="800px"}
**Figure**: spaCy pipeline design (Source: spaCy website)
{:style="text-align: center;"}

If you are using [this spaCy
project](https://github.com/ljvmiranda921/ud-tagalog-spacy), then you can train
the parser by running `spacy project run [name]` until the `train` command.
This trains two dependency parsers for each treebank. You can even see the full
training configuration [in this
file](https://github.com/ljvmiranda921/ud-tagalog-spacy/blob/master/configs/default.cfg).

Lastly, you should be able to see the trained models in the `/training/${treebank}/model-best`
directory. You can access this similar to how you access other spaCy models:

```python
import spacy

nlp = spacy.load("training/UD_Tagalog-TRG/model-best")
text = "Nakakain ka na ba?"  # TN: Have you eaten?
doc = nlp(text)
```

From this, we can use [displaCy](https://spacy.io/usage/visualizers) to
visualize the dependencies for a given text:

```python
from spacy import displacy

displacy.render(doc, style="dep")  # https://localhost:5000
```

![](/assets/png/dep-parsing/trg_example_00.svg){:width="800px"}
*(transl.)* Have you eaten?
{:style="text-align: center;"}

Let's try it out to other sentences outside the training set):

![](/assets/png/dep-parsing/trg_example_01.svg){:width="800px"}
*(transl.)*: You don't have to ask me anymore.
{:style="text-align: center;"}

It checks out! And note that we're just using a small number of sentences
(almost a hundred) to train this parser. Of course, we're not in candy land,
and there are a few sentences where our parser doesn't perform well:

![](/assets/png/dep-parsing/trg_example_02a.svg){:width="800px"}
![](/assets/png/dep-parsing/trg_example_02b.svg){:width="800px"}
*(transl.)*: Look into my eyes, can't you see?
{:style="text-align: center;"}

In this example, words like *mata* (eye/eyes) and *aking* (my) were incorrectly
tagged. The former is supposed to be a noun while the latter should be a pronoun.
But it's quite interesting that aside from those two words, our parser is
already decent enough.

Of course, we want a better way to evaluate this model instead of trying out
random sentences.[^4] In the next section, we'll be doing both monolingual and
cross-lingual evaluation for our two models. This should give us an insight not
only of our models, but of our treebanks as well.

### Performing mono-lingual and cross-lingual evaluation

<!-- evaluation, we do a (1) mono lingual and (2) cross lingual approach-->
<!-- a few examples: where it works well and where it doesn't work well -->


## What can be done next?






### References

* <a id="aquino2020parsing">Aquino, A. and de Leon, F.</a> Parsing in the
    absence of related languages: Evaluating low-resource dependency parsers on
    Tagalog. In *Proceedings of the Fourth Workshoup on Universal Dependencies
    (UDW 2020)*, pages 8-15, ACL.
* <a id="nivre2017tutorial">Nivre, J., Zeman, D., Ginter F., Tyers, F.</a> Tutorial
    on Universal Dependencies: Adding a new language to UD. Presented at the *15th Conference
    of the European Chapter of the Association for Computational Linguistics*, 2017.
* <a id="schachtner1983trg">Schachter, P. and Otanes, F.</a>Tagalog Reference
    Grammar. *University of California Press*, 1983.


### Footnotes



[^1]:

    This treebank got its name from *Tagalog Reference Grammar* (TRG) by
    Schachter and Otanes. Most of the texts in the TRG treebank were lifted
    from this source.

[^2]:

    And we're just talking about Universal Dependencies treebanks for English.
    In the Linguistic Data Consortium inventory, you have the [Penn
    treebank](https://catalog.ldc.upenn.edu/LDC99T42) and  OntoNotes with
    almost more than a million words each!

[^3]:

    Other toolkits for dependency parsing include
    [UDPipe](https://cran.r-project.org/web/packages/udpipe/index.html) (which
    in my research is only available to R), and Stanford
    [Stanza](https://stanfordnlp.github.io/stanza/)'s [`depparse`
    pipeline](https://stanfordnlp.github.io/stanza/depparse.html). 

[^4]:

    Aside from the first sentence, the last two were song lyrics from a band
    called [*Eraserheads*](https://en.wikipedia.org/wiki/Eraserheads). The
    first one came from the song *Huwag mo nang Itanong* (), while the second
    came from *Alapaap*. I definitely botched the translations so I'm sorry for
    that!