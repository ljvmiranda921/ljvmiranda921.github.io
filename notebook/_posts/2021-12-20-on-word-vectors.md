---
layout: post
type: post
title: "Word vectors from scratch"
date: 2021-12-20
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, word vectors, spacy, machine learning]
description: |
    Ever wondered how those numbers in Word2Vec and Fasttext were produced? In
    this blogpost, we'll try to create our own crude set of word vectors!  A
    good learning exercise to understand their nuances.
excerpt: |
    Ever wondered how those numbers in Word2Vec and Fasttext were produced? In
    this blogpost, we'll try to create our own crude set of word vectors!  A
    good learning exercise to understand their nuances.
---

<span class="firstcharacter">W</span>ord vectors are representations of words
into numbers. Once words are in this form, it becomes straightforward for a
computer to understand them. Of course, you can't just arbitrarily assign
numbers into words!

<!-- fun figure of cats and dogs with numbered indices -->
![](/assets/png/word-vectors/some_arbitrary_numbers.png){:width="520px"}
{:style="text-align: center;"}

We need to satisfy two conditions: first, is that these numbers should have
some meaning, or **semantics**. Second, that meaning must be **encoded** into
a numerical representation. If we're in the realm of numbers, a common way to
show meaning is to see how far one number is from another:

![](/assets/png/word-vectors/dope.png){:width="500px"}
{:style="text-align: center;"}

The hope is, words can also be represented as such. In the case of animals, 
one trait, or **feature**, that we can encode is its *leggedness:*

![](/assets/png/word-vectors/leggedness.png){:width="520px"}
{:style="text-align: center;"}


<!-- animal number line: wolf, cat, dog, bird, gecko -->

That's not yet informative. Perhaps we can add another feature, how about
*tameness*?

<!-- animal number line: two dimensions -->

We can even talk about its taxonomy: canines belong to the same group,
felines..., and so on:

<!-- 3d number line -->

As you can see, we came up with features and encoded them into our vectors.
Because of that, we can say that a dog is (1) similar to a cat, (2) quite
related to a wolf, and (3) entirely different from a gecko. 

However, we don't want to think of all the possible features that we can find.
Instead, we want to use existing knowledge to do that for us. We also don't
want to encode them manually, as that would be very time consuming. 

From here, we now see two (2) ingredients to create word vectors:
1. An existing **corpus of knowledge** to get the features automatically. Here, we
   can use newspaper clippings, scrape all the text in the web, scientific
   journals, and so on.
2. An **encoding mechanism** to transfom that corpus into numbers. Earlier, we
   used a crude method, but now we want to do this programmatically, perhaps
   with the help of some algorithm.


## Word vectors from scratch

In this section, we'll use these two ingredients&mdash; the corpus and encoding
algorithm&mdash; to create **word vectors from scratch.** Some of these were
adapted from  [this
blogpost](https://towardsdatascience.com/creating-word-embeddings-coding-the-word2vec-algorithm-in-python-using-deep-learning-b337d0ba17a8).
Note that the techniques demonstrated here only serve as an illustration. In
production, it's recommended to use common pretrained models like
[Word2Vec](https://arxiv.org/abs/1301.3781),
[GloVe](https://nlp.stanford.edu/projects/glove/), or
[FastText](https://fasttext.cc/). 





## In-depth look at our vectors

<!-- do jay alammar-esque viz of our word vectors -->
<!-- then maybe compare it with GloVE? -->

### Footnotes

[^1]: [Thinc](https://thinc.ai) is a deep learning framework that offers a functional (as in functional programming) approach to building neural networks. You can even use it to "wrap" your favorite frameworks like [Pytorch](https://pytorch.org) and [Tensorflow](https://www.tensorflow.org). 
