---
layout: post
type: post
title: "A review on word vectors"
date: 2021-12-05
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, word vectors, spacy, machine learning]
description: |
    Ever wondered how those numbers in Word2Vec, Fasttext, and spaCy's en_core_web_lg
    are produced? In this blogpost, we'll try to create our own crude set of word vectors!  
    A good learning exercise to understand the nuances of these vectors.
excerpt: |
    Ever wondered how those numbers in Word2Vec, Fasttext, and spaCy's en_core_web_lg
    are produced? In this blogpost, we'll try to create our own crude set of word vectors!  
    A good learning exercise to understand the nuances of these vectors.
---

Word vectors are representations of words into numbers. Once words are in this
form, it becomes straightforward for a computer to understand them. Of course,
you can't just arbitrarily assign numbers into words!

<!-- fun figure of cats and dogs with numbered indices -->

These numbers should have some meaning, or **semantics**. And that meaning must
be **encoded** into its numbered representation. If we're in the realm of numbers,
a common way to show meaning is to see how far one number is from another:

<!-- a number line -->
<!-- distance between two points -->

The hope is, words should also be represented as such. In the case of animals, 
one trait, or **feature**, that we can encode is its *leggedness:*


<!-- animal number line: wolf, cat, dog, bird, gecko -->

That's not yet informative. Perhaps we can add another feature, how about
*tameness*?

<!-- animal number line: two dimensions -->

We can even talk about its taxonomy: canines are similar,
felines are similar, and so on&mdash;

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
2. An **encoding mechanism** to transfom that corpus into numbers. Back then we
   used a crude method, but we want to do this programmatically, via an
   algorithm.


