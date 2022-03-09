---
layout: post
type: post
title: "Not all NER datasets are created equal"
date: 2022-03-30
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, span categorization, spacy, spans, machine learning, natural language processing, linguistics]
description: |
    Named-entity recognition (NER) datasets come in different shapes and sizes.
    This structure also contributes to how well machine learning techniques
    perform on said task. In this blogpost, we'll characterize a few NER
    datasets, and examine how its form affects its difficulty.
excerpt: |
    Named-entity recognition (NER) datasets come in different shapes and sizes.
    This structure also contributes to how well machine learning techniques
    perform on said task. In this blogpost, we'll characterize a few NER
    datasets, and examine how its form affects its difficulty.
---

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm//vega@5"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm//vega-lite@4.17.0"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm//vega-embed@6"></script>

<span class="firstcharacter">N</span>amed-entity recognition (NER) is one of
the most common tasks in Natural Language Processing (NLP). It involves the
classification of word tokens into distinct categories. Usually, named-entities
are defined over clear and exact token boundaries, but over time, these
entities have enjoyed much more flexibility.

Nowadays, NER datasets come in all shapes and sizes: some involve long
contiguous spans of tokens, some have entities within entities, and some are
fragmented and vague. We don't work with clearly-bounded tokens anymore,
instead, we work with **spans**.

<div class="spans" style="line-height: 2.5; direction: ltr; text-align:
center">Welcome to the <span style="font-weight: bold; display: inline-block;
position: relative;"> Bank<span style="background: #7aecec; top: 40px; height:
4px; left: -1px; width: calc(100% + 2px); position: absolute;"> </span> <span
style="background: #7aecec; top: 40px; height: 4px; border-top-left-radius:
3px; border-bottom-left-radius: 3px; left: -1px; width: calc(100% + 2px);
position: absolute;"> <span style="background: #7aecec; color: #000; top:
-0.5em; padding: 2px 3px; position: absolute; font-size: 0.6em; font-weight:
bold; line-height: 1; border-radius: 3px"> ORG </span> </span> </span> <span
style="font-weight: bold; display: inline-block; position: relative;">of <span
style="background: #7aecec; top: 40px; height: 4px; left: -1px; width:
calc(100% + 2px); position: absolute;"></span></span> <span style="font-weight:
bold; display: inline-block; position:relative;"> China<span style="background:
#7aecec; top: 40px; height: 4px;left: -1px; width: calc(100% + 2px); position:
absolute;"> </span><span style="background: #feca74; top: 57px; height: 4px;
left: -1px; width: calc(100% + 2px); position: absolute;"> </span><span
style="background: #feca74; top: 57px; height: 4px; border-top-left-radius:
3px; border-bottom-left-radius: 3px; left: -1px; width: calc(100% + 2px);
position: absolute;"> <span style="background: #feca74; color: #000; top:
-0.5em; padding: 2px 3px; position: absolute; font-size: 0.6em; font-weight:
bold; line-height: 1; border-radius: 3px"> GPE </span> </span></span> . </div>

&nbsp;

<div class="spans" style="width: 60%; line-height: 2.5; direction: ltr;
text-align: center; margin: auto;"> <span style="font-weight: bold; display:
inline-block; position: relative;"> Multivariate <span style="background: #ddd;
top: 40px; height: 4px; left: -1px; width: calc(100% + 2px); position:
absolute;"> </span><span style="background: #7aecec; top: 40px; height: 4px;
border-top-left-radius: 3px; border-bottom-left-radius: 3px; left: -1px; width:
calc(100% + 2px); position: absolute;"> <span style="background: #7aecec; z-index:
10; color: #000; top: -0.5em; padding: 2px 3px; position: absolute; font-size:
0.6em; font-weight: bold; line-height: 1; border-radius: 3px">
METHOD</span></span> </span> <span style="font-weight: bold; display:
inline-block; position: relative;"> analysis <span style="background: #7aecec;
top: 40px; height: 4px; left: -1px; width: calc(100% + 2px); position:
absolute;"> </span> </span> revealed that <span style="font-weight: bold;
display: inline-block; position: relative;"> septic <span style="background:
#feca74; top: 40px; height: 4px; left: -1px; width: calc(100% + 2px); position:
absolute;"> </span> <span style="background: #feca74; top: 40px; height: 4px;
border-top-left-radius: 3px; border-bottom-left-radius: 3px; left: -1px; width:
calc(100% + 2px); position: absolute;"> <span style="background: #feca74; z-index:
10; color: #000; top: -0.5em; padding: 2px 3px; position: absolute; font-size:
0.6em; font-weight: bold; line-height: 1; border-radius: 3px"> FACTOR </span>
</span> </span> <span style="font-weight: bold; display: inline-block;
position: relative;"> shock <span style="background: #feca74; top: 40px; height:
4px; left: -1px; width: calc(100% + 2px); position: absolute;"> </span> </span>
is an independent <span style="font-weight: bold; display: inline-block;
position: relative;"> risk <span style="background: #feca74; top: 40px; height:
4px; left: -1px; width: calc(100% + 2px); position: absolute;"> </span> <span
style="background: #feca74; top: 40px; height: 4px; border-top-left-radius: 3px;
border-bottom-left-radius: 3px; left: -1px; width: calc(100% + 2px); position:
absolute;"> <span style="background: #feca74; z-index: 10; color: #000; top:
-0.5em; padding: 2px 3px; position: absolute; font-size: 0.6em; font-weight:
bold; line-height: 1; border-radius: 3px"> FACTOR </span> </span> </span> <span
style="font-weight: bold; display: inline-block; position: relative;"> factor
<span style="background: #feca74; top: 40px; height: 4px; left: -1px; width:
calc(100% + 2px); position: absolute;"> </span> </span> <span
style="font-weight: bold; display: inline-block; position: relative;"> for
<span style="background: #feca74; top: 40px; height: 4px; left: -1px; width:
calc(100% + 2px); position: absolute;"> </span> </span> <span
style="font-weight: bold; display: inline-block; position: relative;"> 30 <span
style="background: #feca74; top: 40px; height: 4px; left: -1px; width: calc(100% +
2px); position: absolute;"> </span> <span style="background: #feca74; top: 57px;
height: 4px; left: -1px; width: calc(100% + 2px); position: absolute;"> </span>
<span style="background: #ddd; top: 57px; height: 4px; border-top-left-radius:
3px; border-bottom-left-radius: 3px; left: -1px; width: calc(100% + 2px);
position: absolute;"> <span style="background: #ddd; z-index: 10; color: #000;
top: -0.5em; padding: 2px 3px; position: absolute; font-size: 0.6em;
font-weight: bold; line-height: 1; border-radius: 3px"> EFFECT </span>
</span></span> <span style="font-weight: bold; display: inline-block; position:
relative;"> day <span style="background: #feca74; top: 40px; height: 4px; left:
-1px; width: calc(100% + 2px); position: absolute;"> </span> <span
style="background: #ddd; top: 57px; height: 4px; left: -1px; width: calc(100% +
2px); position: absolute;"> </span> </span> <span style="font-weight: bold;
display: inline-block; position: relative;"> mortality <span style="background:
#feca74; top: 40px; height: 4px; left: -1px; width: calc(100% + 2px); position:
absolute;"> </span> <span style="background: #ddd; top: 57px; height: 4px;
left: -1px; width: calc(100% + 2px); position: absolute;"> </span> </span> .
</div>

&nbsp;

In the paper *Dissecting Span Identification Tasks with Performance
Prediction*, Papay et al., profiled various NER datasets using the following
characteristics: 

1. **Span Length**: describes how long on average a span is in tokens.
2. **Span Frequency**: describes how often a particular span entity occurs in
    the dataset.
3. **Span Distinctiveness (SD)**: describes how distinct the words are inside the
    spans compared to the corpus. Computed as the KL-divergence of their
    unigram distributions.
4. **Boundary Distinctiveness (BD)**: describes how distinct the span boundaries are
    compared to the rest of the corpus. Computed as the KL-divergence of their
    unigram distributions.

Personally, I like this approach because it gives [a data-centric
view](/notebook/2021/07/30/data-centric-ml/) of your problem: investigate the
characteristics of your data first before jumping head-on to build
models&mdash;it's much more realistic and grounded.

In this blogpost, we'll characterize NER datasets using these metrics.  We will
also perform NER using standard techniques such as CRFs, LSTMs, and [spaCy's
span categorizer (SpanCat)](https://spacy.io/api/spancategorizer)[^1] and
observe how well their performance is affected by these characteristics. My
goal is similar (or in some way, a reproduction) to Papay et al's work:
**create a general decision framework to identify which technique works best
given a particular dataset.**

## Quick view of our datasets

First off, let's look into some common NER datasets and plot their
characteristics. This should give us some insight on various task profiles
that exist within NER.

| Dataset   |   Length |   Frequency |   SD |   BD |
|:----------|---------:|------------:|-----:|-----:|
| RiQUA (<a href="#papay2020riqua">Papay and Pado</a>, 2020)|     7.03 |        4026 | 1.65 | 1.16 |
| PARC 3.0 (<a href="#pareti2016parc">Pareti</a>, 2016) |     7.89 |       16840 | 1.34 | 1.43 |
| ConLL'00 (<a href="#sang2000conll00">Tjong Kim Sang and Bucholz</a>, 2000)  |     1.55 |       37168 | 1.27 | 0.44 |
| ConLL'03 (<a href="#sang2003conll03">Tjong Kim Sang and Meulder</a>, 2003)  |     1.34 |        5874 | 2.79 | 1.06 |
| OntoNotes (<a href="#pradhan2013ontonotes">Pradhan, Moschitti, et al</a>, 2013) |     1.62 |       16861 | 3.35 | 1.00    |
| EBM-NLP (<a href="#nye2018ebm">Nye, Li, et al</a>, 2018)  |     3.65 |       21788 | 0.71 | 0.59 |

One of the more straightforward things we can do is plot a dataset's span
length versus its span frequency. The former measures the average length (in
tokens) of the span entities, while the latter describes how often a span
entity is present in a dataset. 

<div id="vis" style="justify-content: center; display: flex;"></div>
<script>
(function(vegaEmbed) {
    var spec = {"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}, "background": "#FFFFF8", "mark": {"color": "#A00000"}}, "data": {"name": "data-7a767b52ab927aa8f448c7d669f2b3c2"}, "mark": {"type": "circle", "size": 180}, "encoding": {"tooltip": [{"field": "dataset", "type": "nominal"}, {"field": "length", "type": "quantitative"}, {"field": "frequency", "type": "quantitative"}, {"field": "sd", "type": "quantitative"}, {"field": "bd", "type": "quantitative"}], "x": {"axis": {"title": "Span Length", "titleFontSize": 12}, "field": "length", "type": "quantitative"}, "y": {"axis": {"title": "Span Frequency", "titleFontSize": 12}, "field": "frequency", "type": "quantitative"}}, "selection": {"selector022": {"type": "interval", "bind": "scales", "encodings": ["x", "y"]}}, "$schema": "https://vega.github.io/schema/vega-lite/v4.17.0.json", "datasets": {"data-7a767b52ab927aa8f448c7d669f2b3c2": [{"dataset": "riqua", "length": 7.03, "frequency": 4026, "sd": 1.65, "bd": 1.16}, {"dataset": "parc", "length": 7.89, "frequency": 16840, "sd": 1.34, "bd": 1.43}, {"dataset": "conll00", "length": 1.55, "frequency": 37168, "sd": 1.27, "bd": 0.44}, {"dataset": "conll03", "length": 1.34, "frequency": 5874, "sd": 2.79, "bd": 1.06}, {"dataset": "ontonotes", "length": 1.62, "frequency": 16861, "sd": 3.35, "bd": 1.0}, {"dataset": "ebmnlp", "length": 3.65, "frequency": 21788, "sd": 0.71, "bd": 0.59}]}};
    var embedOpt = {"mode": "vega-lite"};

    function showError(el, error){
        el.innerHTML = ('<div class="error" style="color:red;">'
                        + '<p>JavaScript Error: ' + error.message + '</p>'
                        + "<p>This usually means there's a typo in your chart specification. "
                        + "See the javascript console for the full traceback.</p>"
                        + '</div>');
        throw error;
    }
    const el = document.getElementById('vis');
    vegaEmbed("#vis", spec, embedOpt)
    .catch(error => showError(el, error));
})(vegaEmbed);
</script>


From here, we can see that some datasets tend to have longer spans, while others
make up for it with frequency. This makes sense because PARC and RiQUA are
about quotations whereas ConLL and OntoNotes are about noun chunks.

However, I'm particularly interested with the span and boundary
distrinctiveness metrics. They provide a perspective on how "unique" the tokens
are within and around the spans. My hypothesis is that **the more distinct the
span and boundary tokens are, the easier they are to be classified**. Let's now
look into how these characteristics relate to one another:

<div id="vis2" style="justify-content: center; display: flex;"></div>
<script>
(function(vegaEmbed) {
    var spec = {"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}, "background": "#FFFFF8", "mark": {"color": "#A00000"}}, "data": {"name": "data-7a767b52ab927aa8f448c7d669f2b3c2"}, "mark": {"type": "circle", "size": 180}, "encoding": {"tooltip": [{"field": "dataset", "type": "nominal"}, {"field": "length", "type": "quantitative"}, {"field": "frequency", "type": "quantitative"}, {"field": "sd", "type": "quantitative"}, {"field": "bd", "type": "quantitative"}], "x": {"axis": {"title": "Span Distinctiveness (SD)", "titleFontSize": 12}, "field": "sd", "type": "quantitative"}, "y": {"axis": {"title": "Boundary Distinctiveness (BD)", "titleFontSize": 12}, "field": "bd", "type": "quantitative"}}, "selection": {"selector020": {"type": "interval", "bind": "scales", "encodings": ["x", "y"]}}, "$schema": "https://vega.github.io/schema/vega-lite/v4.17.0.json", "datasets": {"data-7a767b52ab927aa8f448c7d669f2b3c2": [{"dataset": "riqua", "length": 7.03, "frequency": 4026, "sd": 1.65, "bd": 1.16}, {"dataset": "parc", "length": 7.89, "frequency": 16840, "sd": 1.34, "bd": 1.43}, {"dataset": "conll00", "length": 1.55, "frequency": 37168, "sd": 1.27, "bd": 0.44}, {"dataset": "conll03", "length": 1.34, "frequency": 5874, "sd": 2.79, "bd": 1.06}, {"dataset": "ontonotes", "length": 1.62, "frequency": 16861, "sd": 3.35, "bd": 1.0}, {"dataset": "ebmnlp", "length": 3.65, "frequency": 21788, "sd": 0.71, "bd": 0.59}]}};
    var embedOpt = {"mode": "vega-lite"};

    function showError(el, error){
        el.innerHTML = ('<div class="error" style="color:red;">'
                        + '<p>JavaScript Error: ' + error.message + '</p>'
                        + "<p>This usually means there's a typo in your chart specification. "
                        + "See the javascript console for the full traceback.</p>"
                        + '</div>');
        throw error;
    }
    const el = document.getElementById('vis2');
    vegaEmbed("#vis2", spec, embedOpt)
    .catch(error => showError(el, error));
})(vegaEmbed);
</script>

Sure, it's not *that* scientific to infer from a small number of datapoints, but
indulge me for a second&mdash; perhaps...we can draw clusters out of these
graphs to represent various NER task profiles? 


...And **if we can understand how each task profile behaves when exposed to
different models, then we can construct a guide on which model to use on which
dataset.** In practice, this would be useful to know beforehand which model
works best on a given dataset: if I know that my dataset is similar to task
profile X, then I should use models A or B.


## Effect of span length on model performance


## Effect of span and boundary distintiveness on model performance


## Improving our metrics

### Adding a boundary window


### Using character n-grams

### Model-specific distances





<!--

- What is NER
    - NER datasets in the wild
- Introduce Papay et al's work: introduce 4 span characteristics
- Introduce the datasets we'll use
    - Standard NER: OntoNotes, ConLL
    - Quotation detection: RIQUA
    - Nested NER: ACE2004, ACE2005, GENIA
    - A few domain-specific datasets: EBM-NLP
-->

### References


* <a id="sang2000conll00">Erik F. Tjong Kim Sang and Sabine Buchholz</a>. 2000. Introduction to the CoNLL-2000 Shared Task Chunking. In *Fourth Conference on Computational Natural Language Learning and the Second Learning Language in Logic Workshop.*
* <a id="sang2003conll03">Erik F. Tjong Kim Sang and Fien De Meulder</a>. 2003. Introduction to the CoNLL-2003 Shared Task: Language-Independent Named Entity Recognition. In *Proceedings of the Seventh Conference on Natural Language Learning at HLT-NAACL* 2003, pages 142–147.
* <a id="papay2020riqua">Sean Papay and Sebastian Padó</a>. 2020. RiQuA: A Corpus of Rich Quotation Annotation for English Literary Text. In *Proceedings of the 12th Language Resources and Evaluation Conference*, pages 835–841, Marseille, France. European Language Resources Association.
* <a id="pareti2016parc">Silvia Pareti</a>. 2016. PARC 3.0: A Corpus of Attribution Relations. In *Proceedings of the Tenth International Conference on Language Resources and Evaluation (LREC'16)*, pages 3914–3920, Portorož, Slovenia. European Language Resources Association (ELRA).
* <a id="pradhan2013ontonotes">Sameer Pradhan, Alessandro Moschitti, Nianwen Xue, Hwee Tou Ng, Anders Björkelund, Olga Uryupina, Yuchen Zhang, and Zhi Zhong</a>. 2013. Towards Robust Linguistic Analysis using OntoNotes. In *Proceedings of the Seventeenth Conference on Computational Natural Language Learning*, pages 143–152, Sofia, Bulgaria. Association for Computational Linguistics.
* <a id="nye2018ebm">Benjamin Nye, Junyi Jessy Li, Roma Patel, Yinfei Yang, Iain Marshall, Ani Nenkova, and Byron Wallace</a>. 2018. A Corpus with Multi-Level Annotations of Patients, Interventions and Outcomes to Support Language Processing for Medical Literature. In *Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)*, pages 197–207, Melbourne, Australia. Association for Computational Linguistics.



### Footnotes

[^1]:
    
    We will be using spaCy's SpanCat instead of its built-in NER because our
    datasets contain overlapping entities, which the latter isn't made for. For
    the sake of consistency, I'll be using SpanCat all throughout.
