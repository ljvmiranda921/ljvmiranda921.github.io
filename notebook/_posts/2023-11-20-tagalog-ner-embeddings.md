---
layout: post
type: post
title: "Visualizing Tagalog NER embeddings"
date: 2023-11-20
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img: /assets/png/tagalog-ner-embeddings/header.png
tags: [nlp, tagalog, low-resource languages, prodigy, natural language processing, machine learning]
description: |
    Lately, I've been thinking a lot about visualizing datasets, and good
    old-fashioned t-SNE embeddings came to mind. In this blog post, indulge me
    as I examine a "data map" of our Tagalog NER dataset.
excerpt: |
    Lately, I've been thinking a lot about visualizing datasets, and good
    old-fashioned t-SNE embeddings came to mind. In this blog post, indulge me
    as I examine a "data map" of our Tagalog NER dataset.
---

<span class="firstcharacter">I</span> found this [nice blog post](https://mayhewsw.github.io/2022/01/30/conll-span-embeddings/) that demonstrates how we can glean insights just from visualizing ConLL NER embeddings.
They ran DistilBERT on the span labels to get their embeddings, and then projected them to 2D space using t-SNE. 
I think this approach has a lot of potential applications, from quality assurance to performance prediction.

For now, I am just curious as to how they would look like in our [Tagalog NER dataset](https://huggingface.co/datasets/ljvmiranda921/tlunified-ner). 
My approach is similar to the blog post I mentioned. 
Only difference is that I'm using a trained [RoBERTa Tagalog model](https://huggingface.co/jcblaise/roberta-tagalog-base) to get the embeddings.
Finally, there's nothing new about these methods: dataset cartography has already been an active area of NLP research ever since ([Swayamdipta et al., 2020](#swayamdipta2020cartography); [Balasubramanian et al., 2020](#balasubramanian2020name)).

You can find the code and implementation [here](https://github.com/ljvmiranda921/scratch/tree/master/2023-10-15-embeddings).

## Examining clusters for all labels

Below you'll find the t-SNE plot for all entities in our dataset.
They are color-coded based on their type&mdash; Person (PER), Organization (ORG), and Location (LOC).
When you hover over each point, you'll see the span text, its label, and a portion of the sentence it belongs to. 
Feel free to explore around using the visualization tools from Plotly.


<iframe width="720" height="540" frameborder="0" scrolling="no" src="/assets/png/tagalog-ner-embeddings/fig_all_points.html"></iframe>

<div align="center">
__Figure:__ t-SNE plot for all entity labels in [TLUnified-NER](https://huggingface.co/ljvmiranda921/tlunified-ner).
</div>


<img src="/assets/png/tagalog-ner-embeddings/confusion.png" align="right" height="300">

### LOC and ORG superclusters

At first glance, we see that PER entities are clearly separated from ORG and LOC, whereas the other two have noticeable overlaps.
My hunch here is that even if two entities have the same lexical properties, they have different semantic use. 
For example, *Malaca&ntilde;ang* (the place where the Philippine President resides, akin to The White House) can either be an organization or location based on its usage.
We can verify this observation by examining the confusion matrix of a simple transition-based NER model: it significantly misconstrues LOC entities as ORG (and vice-versa).

<div style="float:right; width:250px; margin:20px;">

| Embeddings set-up | ORG      | LOC      |
|-------------------|----------|----------|
| Shared            | $$+5\%$$  | $$+3\%$$  |
| Context-sensitive | $$+12\%$$ | $$+18\%$$ |

</div>

To further test this "lexical-semantic confusion" hypothesis, I trained two additional models that account for a word's position in the text.
The first model uses [spaCy's shared token-to-vector layer](https://spacy.io/usage/embeddings-transformers#embedding-layers) that includes a dependency parser and POS tagger aside from NER. 
The hope is that by sharing information between these three components, our downstream NER model can learn how to disambiguate between these semantic differences. 
The second model uses a transformer network to obtain context-sensitive vectors. 
It is interesting then that the relative error for LOC &harr; ORG decreased when using these methods.
Therefore, **I highly-recommend using context-sensitive techniques when training models from this dataset.**

### Interesting observations from other clusters

I also want to share interesting clusters from examining all labels.
I'm literally just spitballing here: there's nothing methodical aside from inspecting a few clusters and checking their neighbors.
With that in mind, take these observations with a grain of salt.

<img src="/assets/png/tagalog-ner-embeddings/example_nograles.svg" align="right" height="300">

**Political clusters are intriguing.**
There are some interesting neighborhoods that intrigued me.
For example, the *Nograles* cluster is isolated from most PER entities. 
Its closest PER cluster is *Arroyo*, and the majority of its neighboring clusters include *Mindanao*, *MILF*, and some cities near *Davao*.
My hunch is that most news stories in the corpus were written during a time when [Prospero Nograles's](https://en.wikipedia.org/wiki/Prospero_Nograles) involvement in Davao and the Arroyo administration is apparent (he was the Speaker of the House).

<img src="/assets/png/tagalog-ner-embeddings/example_politics.svg" align="right" height="300">

Now, we're entering speculative territory but it's cool that you can *at least* draw political lines during the 2004-2010 administration.
Of course, it's hard to draw these lines because unlike the US, the Philippines has a multi-party system.
It's fun to point out but I admit that what I've been doing is just akin to a Rorschach test.
If you're looking for something more rigorous, I suggest reading the work of [Rheault et al (2019)](#rheault2019parliamentary).
This led me to ask: can we predict shifts in political alliances from words alone?
I think it is an interesting exercise&mdash; and especially challenging&mdash; given that political parties in the Philippines are not really defined by their ideologies.

<img src="/assets/png/tagalog-ner-embeddings/example_bias_muslim.svg" align="right" height="300">

**Biases exist.**
I also noticed clusters that might potentially be sources of bias when training models from this dataset.
For example, most news sources from Mindanao involve acts of terrorism from [Abu Sayyaf](https://en.wikipedia.org/wiki/Abu_Sayyaf) and the [Moro National Liberation Front](https://en.wikipedia.org/wiki/Moro_National_Liberation_Front). 
It is then unfortunate that entities such as *Allah* and *Muslim* are co-located within this neighborhood.

Personally, I'm interested to explore techniques to debias corpora from an embeddings standpoint. 
The works of [Prost et al. (2019)](#prost2019debiasing) and [Kaneko et al. (2021)](#kaneko2021debiasing) for gender bias come to mind.


## Examining clusters for each entity type 

Here, I plotted the embeddings for each entity type while categorizing them based on their span property: `paren` (if the span is preceded by a parenthesis), `all_caps` (if all characters in the span are in uppercase), `initial` (if the span is the first subword in the text), and `plain` as a catch-all category.
These classes are mutually exclusive, i.e., I automatically assign them based on the first property they fulfill.


### PER embeddings

<iframe width="400" height="500" frameborder="0" scrolling="no" src="/assets/png/tagalog-ner-embeddings/fig_per_label_PER.html" align="right"></iframe> 

Most PER entities were categorized as plain, and it is mostly expected.
Although I find it interesting that there is a sizeable amount of names made up of initials such as FVR for [Fidel V. Ramos](https://en.wikipedia.org/wiki/Fidel_V._Ramos) or GMA for [Gloria Macapagal Arroyo](https://en.wikipedia.org/wiki/Gloria_Macapagal_Arroyo).
Most of our [benchmarks](/projects/2023/08/01/calamancy/#benchmarking-experiments) had little to no problem recognizing PER entities and my hunch is likely due to the straightforward and consistent structure of such entities.

The prevalence of initials in naming individuals usually stem from cultural influences in the Philippines.
It is customary to use initials to refer to prominent figures, such as Presidents and CEOs.
I have only scratched the surface on these entities, so feel free to explore around the interactive plot!


<img src="/assets/png/tagalog-ner-embeddings/example_ph_map.svg" align="right" height="300">

### LOC embeddings

<iframe width="400" height="500" frameborder="0" scrolling="no" src="/assets/png/tagalog-ner-embeddings/fig_per_label_LOC.html" align="right"></iframe> 

It is cool that if you squint hard enough, you can see cities in the Philippines arranged in their geographical location&mdash;based on their embeddings alone.
Of course, there are still inconsistencies: Manila is located at the rightmost portion whereas Bulacan appears in the middle.
Why would that be the case? 
My hunch is that in-country linguistic diversity is still apparent, and somewhat recoverable, through these embeddings.
For example, Mindanao is predominantly Muslim, hence affecting naming and proper noun patterns (you'll often see instances of *Muhammad* or *Al-* in Mindanaoan names).
These variations borne out of geographical differences may correlate with the linguistic clusters we now see.

My other theory is politics.
Although there is a central government, regional politics still dominate. 
Politicians tend to co-occur with one another in news reports, especially if they belong to the same region.
Perhaps these co-occurences caused some of the "geographical separation" we see in our embeddings.
Might be fun to explore in the future!


<iframe width="400" height="500" frameborder="0" scrolling="no" src="/assets/png/tagalog-ner-embeddings/fig_per_label_ORG.html" align="right"></iframe> 

### ORG embeddings

It's nice that most government departments are members of the same cluster.
This can lead to improved accuracy in NER tasks, as a model can easily recognize and categorize these entities.
Hopefully, this can be a good visual cue that the embeddings have captured the underlying relationships between different organizations.
They are similar to PER entities, with the exception that they have a more recognizable orthographic "shape."
For example, most organizations in news reports are acronyms.
And so, writers tend to give its full name first, then followed by its shorthand (e.g, `XXXXX XXXXX XXX (XXX)`).

## Final thoughts

Visualizing embeddings is a nice exercise of "examining your data."
Although I have to admit that I have made some huge leaps of logic while explaining my observations above&mdash; I'm still getting better at this!
In the future, I'm more interested in how these techniques can be applied, and how we can test them via a more empirical approach.
For example, we can get LLM embeddings, cluster them together, and examine the outliers.
There might be cool applications for correcting annotations or annotating a dataset from scratch.
For now, I think this is fun!




## References

- <a id="swayamdipta2020cartography">Swabha Swayamdipta, Roy Schwartz, Nicholas Lourie, Yizhong Wang, Hannaneh Hajishirzi, Noah A. Smith, and Yejin Choi.</a> 2020. Dataset Cartography: Mapping and Diagnosing Datasets with Training Dynamics. In *Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP)*, pages 9275–9293, Online. Association for Computational Linguistics.
- <a id="balasubramanian2020name">Sriram Balasubramanian, Naman Jain, Gaurav Jindal, Abhijeet Awasthi, and Sunita Sarawagi.</a> 2020. What’s in a Name? Are BERT Named Entity Representations just as Good for any other Name?. In *Proceedings of the 5th Workshop on Representation Learning for NLP*, pages 205–214, Online. Association for Computational Linguistics.
- <a id="rheault2019parliamentary">Ludovic Rheault and Christopher Cochrane. 2020. Word Embeddings for the Analysis of Ideological Placement in Parliamentary Corpora. *Political Analysis*, 28(1), 112-133. doi:10.1017/pan.2019.26.
- <a id="prost2019debiasing">Flavien Prost, Nithum Thain, and Tolga Bolukbasi</a>. 2019. Debiasing Embeddings for Reduced Gender Bias in Text Classification. In *Proceedings of the First Workshop on Gender Bias in Natural Language Processing*, pages 69–75, Florence, Italy. Association for Computational Linguistics.
- <a id="kaneko2021debiasing">Masahiro Kaneko and Danushka Bollegala. 2021. Debiasing Pre-trained Contextualised Embeddings.</a> In *Proceedings of the 16th Conference of the European Chapter of the Association for Computational Linguistics: Main Volume*, pages 1256–1266, Online. Association for Computational Linguistics.