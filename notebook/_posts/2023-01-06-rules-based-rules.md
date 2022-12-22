---
layout: post
type: post
title: "spaCy Internals: Rules-based rules!"
date: 2023-01-06
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, spacy, machine learning, nlproc, natural language processing]
description: |
    spaCy has a comprehensive way to define rules for matching tokens, phrases,
    entities (and more!) to enhance statistical models. In this blog post, I'll share
    a few design patterns to write and organize your rules.
excerpt: |
    spaCy has a comprehensive way to define rules for matching tokens, phrases,
    entities (and more!) to enhance statistical models. In this blog post, I'll share
    a few design patterns to write and organize your rules.
---

<span class="firstcharacter">O</span>ne aspect of the spaCy library that I enjoy
is its [robust pattern-matching
system](https://spacy.io/usage/rule-based-matching). Yes, rules-based. Because
sometimes, all you need is a hard and fast rule to cover relevant aspects of
your problem. In this blog post, I'll discuss **design patterns** I learned while
working on these components. I will focus on token and entity matching in the
form of the [Matcher](https://spacy.io/api/matcher).

First things first, an overview of the spaCy Matcher. You can define patterns
as a list of dictionaries, where each dictionary inscribes a rule to match a
single token.  A rule is often in the form of `{TOKEN_ATTRIBUTE: RULE}`, which
roughly translates as: *"match if this token attribute passes this
rule."* There are [multiple attributes](https://spacy.io/usage/rule-based-matching#adding-patterns-attributes)
to choose from, but let's demonstrate a simple case.


Suppose I want to look for tokens with the form `language`. What I'll do is
write this pattern:

```python
pattern = [{"LOWER": "language"}] 
```

This line translates as *"match tokens where the lowercased form is equal to
`language`."* Using the `LOWER` attribute allows me to match instances like
`Language` or `language`, irrespective of the case. If I want to match in
verbatim, I might use `TEXT` or `ORTH` instead.

Now, if we want to match the term `natural language processing`, a common
mistake is to write a pattern like the one below. It won't match anything in our
text:

```python
# This is incorrect. The matcher works for each token.
pattern = [{"LOWER": "natural language processing"}]
```
Remember, each dictionary must match a single token. Instead, we'll write them
in separate dictionaries like so:

```python
# This is correct. We match each token separately.
pattern = [
    {"LOWER": "natural"}, 
    {"LOWER": "language"}, 
    {"LOWER": "processing"},
]
```

These are the basics for pattern-matching in spaCy.  With multiple attributes,
operators, and syntax, we have enough tools to express rules for matching almost
any kind of text.  I won't be delving too much into it here since the
[documentation](https://spacy.io/usage/rule-based-matching) is comprehensive
enough for that. Instead, I want to share **tips and design patterns** for
writing and organizing rules. 

##  Tip #1: you can reference patterns from a configuration file

One way to store patterns for the [SpanRuler](https://spacy.io/api/spanruler) or
[EntityRuler](https://spacy.io/api/entityruler) is through the `patterns.jsonl`
file. But if you find a JSONL file too unwieldy, then it's also possible to
store patterns in a Python object and reference them from a configuration file.
This approach makes your rules readable as you can annotate them however you
wish. 

Suppose we're extracting degree programs from some corpus. We start by creating
a custom function that returns a set of rules as a list of dictionaries:

```python
def my_patterns() -> List[Dict[str, Any]]:
    rules = [
        {"label": "Degree", "pattern": [{"LOWER": "bs", "OP": "?"}, {}, {"LOWER": "engineering"}]}
        {"label": "Degree", "pattern": [{"LOWER": "bs"}, {}]}
    ]
    return rules
```



<!--

##  Tip #2: you can reduce regexes
<!-- show example of a regex transformed into a dict -->

<!--
##  Tip #3: you can take advantage of linguistic features
-->


<!--
first things first, an overview of spaCy matcher
- a list of dictionaries, where each dictionary matches a token.
- so if you just want to match a single word... [example]
- so if you just want to match multiple words... [example]


You can use this system for matching entities and spans via the `SpanRuler` (footnote re: entity_ruler). Under the hood, the SpanRuler creates a Matcher (and a PhraseMatcher) durinng initialization. This means that we only need to learn one pattern-matching system.
Normally you can write them in Python code..

https://github.com/explosion/spaCy/blob/b69d249a223fa4e633e11babc0830f3b68df57e2/spacy/pipeline/span_ruler.py#L447

But they can also be from an external JSONL file:



-->


<!-- assembling rules -->

<!-- my favorite patterns -->
<!-- wildcards -->

<!-- operators -->

<!-- regex -->

<!-- talk about hidden complexity at the end -->

<!--

## Final thoughts: hidden complexity 
-->
