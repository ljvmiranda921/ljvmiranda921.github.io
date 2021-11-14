---
layout: post
type: post
title: "How to make word vectors from scratch"
date: 2021-12-20
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, word vectors, spacy, machine learning]
description: |
    Ever wondered how those numbers in Word2Vec and Fasttext were produced? In
    this blogpost, we'll try to create our own crude set of word vectors! 
excerpt: |
    Ever wondered how those numbers in Word2Vec and Fasttext were produced? In
    this blogpost, we'll try to create our own crude set of word vectors!
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

![](/assets/png/word-vectors/leggedness.png){:width="560px"}
{:style="text-align: center;"}


That's not yet informative, all the animals were stacked on top of each other.
Perhaps we can add another feature, how about *tameness*?

![](/assets/png/word-vectors/tameness.png){:width="500px"}
{:style="text-align: center;"}

What we just did is that  we came up with features and encoded them into our
vectors.  As a result, we can now say that a dog is similar to a cat, entirely
different from a gecko, and so on.  

However, **we don't want to think of all the possible features that we can
find**.  Instead, we want to use existing knowledge to do that for us. **We
also don't want to encode them manually**, as that would be very time
consuming. 

From here, we can see that we need two (2) ingredients to create word vectors:
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
We'll start from a small text corpus and end with a set of word vectors. The
process is as follows:

<!-- insert image of the process -->

![](/assets/png/word-vectors/process.png){:width="800px"}
{:style="text-align: center;"}

### Preliminary: the text corpus

Earlier, we manually encoded our knowledge into some mathematical format. When
we spoke of *tameness*, we assigned values to each of our animals and plotted them
into the graph. This method is great if you only deal with one or two features.
But when you want to capture the nuance and meaning ascribed to those words,
it's not enough.

Instead, **we'll extract knowledge from other sources**: books, the Internet,
Reddit comments, Wikipedia, and more. In NLP, we call this collection of texts
as the *corpus*. We won't be scraping any text for now. Instead, we'll come up
with our own:

```python
sentences = [
    "A dog is an example of a canine",
    "A cat is an example of a feline",
    "A gecko can be a pet.",
    "A cat is a warm-blooded feline.",
    "A gecko is a cold-blooded reptile.",
    "A dog is a warm-blooded mammal.",
    "A gecko is an example of a reptile.",
    "A mammal is warm-blooded.",
    "A reptile is cold-blooded.",
    "A cat is a mammal.",
]
```

What you see above are factual statements about animals. You can think of them
as a small sample of sentences you can find in a text corpus. In reality, ten
sentences aren't enough to generate a good model, you'd want a larger corpus
for that. For example, the [GloVe word
embeddings](https://nlp.stanford.edu/projects/glove/) used Wikipedia, news
text, and the Internet ([CommonCrawl](https://commoncrawl.org/)) as its corpus.

### 1. Clean the text


### 2. Create word pairs
### 3. Encode to one-hot vectors
### 4. Train a model

### Post: model weights as vectors

<!-- do jay alammar-esque viz of our word vectors -->
<!-- then maybe compare it with GloVE? -->


## Conclusion


<!--

Note that the techniques demonstrated here only serve as an illustration. In
production, it's recommended to use common pretrained models like
[Word2Vec](https://arxiv.org/abs/1301.3781),
[GloVe](https://nlp.stanford.edu/projects/glove/), or
[FastText](https://fasttext.cc/). 

-->

