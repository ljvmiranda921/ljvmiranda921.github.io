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
some meaning, or **semantics**. Second, is that we should **encode** meaning
into a numerical representation. If we're in the realm of numbers, a common way
to show meaning is to see how far one number is from another:

![](/assets/png/word-vectors/dope.png){:width="500px"}
{:style="text-align: center;"}

The hope is, words can also be represented as such. In the case of animals, 
one trait, or **feature**, that we can encode is its *leggedness.* Let's plot
our animals on a number line depending on the number of their legs:

![](/assets/png/word-vectors/leggedness.png){:width="560px"}
{:style="text-align: center;"}

That's not yet informative, all the animals were stacked on top of each other.
Perhaps we can add another feature, how about *tameness*? Let's create another
axis, *tameness*, and place our animals across our two features:

![](/assets/png/word-vectors/tameness.png){:width="500px"}
{:style="text-align: center;"}

What we just did is that  we came up with features and encoded them into our
vectors.  As a result, we can now say that a dog is similar to a cat, entirely
different from a gecko, and so on.  

> [To create word vectors] we don't want to think of all the possible features
> we can find... we want to use existing knowledge to [encode] for us.

However, **we don't want to think of all the possible features that we can
find**.  Instead, we want to use existing knowledge to do that for us. **We
also don't want to encode them manually**, as that would be very time
consuming. 

This leads us to two (2) necessary ingredients to create word vectors:
1. An existing **corpus of knowledge** to get the features automatically. Here, we
   can use newspaper clippings, scrape all the text in the web, scientific
   journals, and so on.
2. An **encoding mechanism** to transfom that corpus into numbers. Earlier, we
   used a crude method, but now we want to do this programmatically, perhaps
   with the help of some algorithm.

<div style="border:3px; border-style:solid; border-color:#a00000; padding: 1em;">
<b>Contents</b>
<ul>
    <li><a href="#">On assigning numbers to words</a></li>
    <li><a href="#word-vectors-from-scratch">Word vectors from scratch</a></li>
    <ol>
        <li><a href="#corpus">Preliminary: the text corpus</a></li>
        <li><a href="#clean">Clean the text</a></li>
        <li><a href="#pairs">Create word pairs</a></li>
        <li><a href="#vectors"> Encode to one-hot vectors</a></li>
        <li><a href="#train">Train the model</a></li>
        <li><a href="#weights">Post: model weights as vectors</a></li>
    </ol>
    <li><a href="#conclusion">Looking back to what we can do now</a></li>
</ul>
</div>

## Word vectors from scratch

We'll use these two ingredients&mdash; the corpus and encoding
algorithm&mdash; to create **word vectors from scratch.** Some of these were
adapted from  [this
blogpost](https://towardsdatascience.com/creating-word-embeddings-coding-the-word2vec-algorithm-in-python-using-deep-learning-b337d0ba17a8).
We'll start from a small text corpus and end with a set of word vectors. The
process is as follows:

<!-- insert image of the process -->

![](/assets/png/word-vectors/process.png){:width="720px"}
{:style="text-align: center;"}

### <a id="corpus"></a> 0. Preliminary: the text corpus

Earlier, we manually encoded our knowledge into some mathematical format. When
we spoke of *tameness*, we assigned values to each of our animals and plotted them
into the graph. This method is great if you only deal with one or two features.
But when you want to capture the nuance and meaning ascribed to those words,
it's not enough.

> In practice, we extract knowledge from other sources: books, the Internet, Reddit
> comments, Wikipedia, and more.

In practice, **we'd want to extract knowledge from other sources**&mdash;books,
the Internet, Reddit comments, Wikipedia&mdash; rather than providing it
ourselves. In NLP, we call this collection of texts as the *corpus*.[^1] We
won't be scraping any text for now. Instead, we'll come up with our own:

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

What you see above are factual statements about animals. Think of them as a
sample of sentences you'll typically find in any corpus. In reality, ten
sentences aren't enough to generate a good model, you'd want a larger corpus
for that. For example, the [GloVe word
embeddings](https://nlp.stanford.edu/projects/glove/) used Wikipedia, news
text, and the Internet ([CommonCrawl](https://commoncrawl.org/)) as its source.

### <a id="clean"></a> 1. Clean the text

We clean the texts by removing stopwords and punctuations.  In NLP, stopwords
are low-signal words that are uninformative and frequent.[^2]   A few examples
include articles (*a*, *an*, *the*), some adverbs (*actually*, *really*), and a
few pronouns (*he*, *me*, *it*).

Most libraries like [spaCy](https://spacy.io), [nltk](https://www.nltk.org/),
and [gensim](https://radimrehurek.com/gensim/) provide their own list of
stopwords. For us however, we'll stick to writing our own:

```python
STOP_WORDS = [
    "the",
    "a",
    "an",
    "and",
    "is",
    "are",
    "in",
    "be",
    "can",
    "I",
    "have",
    "of",
    "example",
    "so",
    "both",
]
```

We also write our own blacklist of punctuations:

```python
PUNCTUATIONS = r"""!()-[]{};:'"\,<>./?@#$%^&*_~"""
```

We can now write our text cleaning function, `clean_text`. This function first
removes the punctuation by scanning each character and checking if it belongs
to our list. Then, it removes a stop word by scanning each word in the text.
A sample implementation is seen below:

```python
from typing import List

def clean_text(
    text: str, 
    punctuations: str = PUNCTUATIONS, 
    stop_words: List = STOP_WORDS,
) -> List[str]:

    # Simple whitespace tokenization
    tokens = text.split()
    
    # Remove punctuations for each token
    tokens_no_puncts = []
    for token in tokens:
        for char in token.lower():
            if char in punctuations:
                token = token.replace(char, "")
        tokens_no_puncts.append(token)

    # Remove stopwords
    final_tokens = []
    for token in token_no_puncts:
        if token not in stop_words:
            final_tokens.append(token)

    return final_tokens
```

There's one step that we haven't talked about&mdash; **tokenization**. You can
see it subtly happening when we invoked `text.split()`. The goal of
tokenization is to segment our text into known boundaries. The easiest way to
achieve that is to split our sentence based on the whitespace, just like what
we did. 

```python
text = "A cat is a mammal."
print(clean_text(text))  # ["A", "cat", "is", "a", "mammal"] 
```

Note that **whitespace tokenization is not foolproof.** This method won't work
on languages that aren't dependent on whitespace (e.g., Chinese, Japanese,
Korean) or languages with different morphological rules (e.g., Arabic,
Indonesian). In fact, informal English also has a lot of special cases that
whitespace tokenization cannot solve (e.g. "Gimme" -> "Give me"). 

```python
# Cases where whitespace tokenization won't work
jp_text = "私の専門がコンピュタア工学 です"
kr_text = "비빔밥먹었어?"
```

In practice, you'd want to use more robust tokenizers for your language. For
example, spaCy offers a [Tokenizer API](https://spacy.io/api/tokenizer) that
can be customized to any language, special-case, and use-case. spaCy uses its
[own tokenization
algorithm](https://spacy.io/usage/linguistic-features#how-tokenizer-works) that
performs way better than a naive whitespace splitter. 


<!-- get the vocabulary -->
If we run our `clean_text` function to all our sentences and obtain all unique
words, we'll come up with a **vocabulary**:

```python
# Clean each sentences first. We'll get a list of lists inside the 
# all_text variable.
all_text = [clean_text(sentence) for sentence in sentences]

# We "flatten" our list and use the built-in set() function to get
# all unique elements of the list.
unique_words = set([word for text in all_text for word in text])
print(unique_words)  # ['canine', 'cat', 'coldblooded', ...]
```

From our small corpus, we obtained a measly vocabulary size of 10.  On the
other hand, the CommonCrawl dataset has 42 billion tokens of web data. Well,
beggars can't be choosers, so let's continue on!

### <a id="pairs"></a> 2. Create word pairs

As John Rupert Firth, a famous linguist, once said: *"You shall know a word by
the company it keeps."*[^3] In this step, we create pairs consisting of each word
in our vocabulary and its context ("the company it keeps"). We call the former
as the **center word** and the latter as the **context word**. 


<!-- a few image illustration of a sentence and center + context -->

![](/assets/png/word-vectors/context.png){:width="520px"}  
__Figure__: Demonstration of center and context words. Note that we skip
"a" and "is" because they're stopwords. The `clean_text` function should've
removed them at this point.
{:style="text-align: center;"}

> You shall know a word by the company it keeps - John Rupert Firth

Context is important to understand meaning. Take the word *bat* for 
example. We don't know what it means in isolation, but in a sentence, its
meaning becomes crystal clear:

<!-- a few image illustrate of bat as animal and bat as baseball bat -->
![](/assets/png/word-vectors/bat.png){:width="720px"}
{:style="text-align: center;"}

We can stretch this further: do you know what the words *frumious*,
*Jabberwock*, and *Jubjub* mean? Well, we can only guess. But in the context of
other words (in this case a poem), we can infer their meaning:

> Beware the Jabberwock, my son!  
> The jaws that bite, the claws that catch!  
> Beware the Jubjub bird, and shun  
> The frumious Bandersnatch!  

By looking at the context of each word, we now know that *Jabberwock* is a noun
and can be something dangerous because of the word 'beware.' It also has 'jaws'
and 'claws' that bite and catch.  *Frumious*, on the hand, is an adjective that
describes a *Bandersnatch*. Lastly, *Jubjub* could be a type of bird that one
should be beware of.

Truth is, these words were just made up! I lifted it from Lewis Carroll's
poem, ["Jabberwocky"](https://www.poetryfoundation.org/poems/42916/jabberwocky)
in the novel [*Through the
Looking-Glass*](https://en.wikipedia.org/wiki/Through_the_Looking-Glass). Even
so, because of context, we were able to uncover their meaning.

We can also control the neighbors of a word through the **window size**
parameter. A window size of 1 means that a word only sees adjacent words as its
neighbor. Too high a window and your context becomes less informative, too low and 
you fail to capture all of its nuance.

> Too high a window and your context becomes less informative, too low and you
> fail to capture all of its nuance.

Now, we write a function to get word pairs from a sentence:

```python
def create_word_pairs(
    text: List[str],
    window: int = 2
) -> List[Tuple[str, str]]:
    word_pairs = []
    for idx, word in enumerate(text):
        for w in range(window):
            if idx + 1 + w < len(text):
                pair = tuple([word] + [text[idx + 1 + w]])
                word_pairs.append(pair)
            if idx - w - 1 >= 0:
                pair = tuple([word] + [text[idx - w - 1]])
                word_pairs.append(pair)
    return word_pairs
```

Note that at this stage, we've already cleaned and tokenized our sentences.
We now pass a string of tokens and obtain a list of pairs.

```python
text = "A cat is a warm-blooded feline."
cleaned_tokens = clean_text(text)  # ["cat", "warm-blooded", "feline"]

# Get word pairs
create_word_pairs(cleaned_tokens)
```

From here we obtain six pairs:

```python
[('cat', 'warmblooded'),
 ('cat', 'feline'),
 ('warmblooded', 'feline'),
 ('warmblooded', 'cat'),
 ('feline', 'warmblooded'),
 ('feline', 'cat')]
```

We do this step for each text in our corpus. In the end, we obtain a large list
of pairs containing every word in our vocabulary and their corresponding
neighbor. The larger the corpus, the larger the expressivity of our word pairs. 

In the next section, we'll 







### <a id="vectors"></a> 3. Encode to one-hot vectors


### <a id="train"></a> 4. Train a model



### <a id="weights"></a> 5. Post: model weights as vectors

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


## Postscript

<!--

Relearning the fundamentals
Refining fundamentals

-->

### Footnotes

[^1]: 

    *Corpus* literally means body, as in "a body of text." Also, its plural form is *corpora*, not "corpi." Fun!

[^2]: 

    Writing tip: I use stopwords to gauge how clear my writing is. Sometimes,
    when I use a lot of stopwords my writing becomes full of fluff.


[^3]:

    This quote by Firth in the 1950s is one of the foundational ideas of [distributional semantics](https://en.wikipedia.org/wiki/Distributional_semantics)
    and modern statistical NLP as a whole!