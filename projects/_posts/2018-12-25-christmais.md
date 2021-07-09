---
layout: post
title: "Postscript: The ChristmAIs Journey"
date: 2018-12-25
category: projects
comments: true
author: "LJ MIRANDA"
summary: "Postscript on the ChristmAIs project"
tags: [machine learning, david ha, sketch-rnn, magenta, holiday cards, thinking
machines data science, deep learning, christmas, glove, style transfer]
---

<span class="firstcharacter">O</span>ne of my first blog posts in Thinking Machines involves a deep-learning based
holiday card generator dubbed as **ChristmAIs**. It was an exciting two-month
journey of creating artworks using AI: there are things that we tried but
didn't work, reasons we pivoted, and small wins in publishing the article. This
post serves as a postscript, like a "developer's cut," of this whimsical
application.

> You can view the original blogpost in this
> [link](https://stories.thinkingmachin.es/ai-art-holiday-cards/) and the
> open-source repository [here](https://github.com/thinkingmachines/christmais)

![AI Holiday Cards](https://i.imgur.com/TFGRexp.jpg){:width="560px"}  
__Figure:__ _Artworks produced by our AI-art generator.  
Credits: [Thinking Machines Data Science](https://thinkingmachin.es/)_
{: style="text-align: center;"}

The whole pipeline can be summarized as the following:
- Take an input string and find an object representation, 
- Draw the object representation; then
- Style the drawing

The most difficult part was the second step, how do you actually let an AI
system draw? I'll be spending a large chunk of the blog post on that step,
then mention in passing the other two.

## What didn't work

One of the first things we tried was to replicate [Tom White's Perception
Engines](https://medium.com/artists-and-machine-intelligence/perception-engines-8a46bc598d57).
The idea is to have a drawing system iteratively create abstract images based
on various ImageNet classes. So by using a combination of strokes, circles, and
colors as its primitives, the perception engine should be able to draw any
real-world object. 

![Imgur](https://i.imgur.com/uglus41.jpg){:width="560px"}  
__Figure:__ _Some objects from Tom White's Perception Engine: forklift, ruler,
sewing machine.  
Credits: [@dribnet](https://twitter.com/dribnet)_
{: style="text-align: center;"}

They definitely look pretty, and it's something you want to showcase to people.
White provided a base set of primitives using circles and lines in his
[open-source repository](https://github.com/dribnet/dopes), and we tried to use
that as the drawing system. In this case, we even tried genetic algorithms to
optimize the drawing (he only used random walks):

![Perception](/assets/png/christmais/perception.png){:width="560px"}  
__Figure:__ _Initial ML system that we designed based on Tom White's work. Instead
of using random walks, we decided to use genetic algorithms for optimization_
{: style="text-align: center;"}

We didn't have much luck. 

![Trial1-1](https://i.imgur.com/JikBJYD.png){:width="150px"}
![Trial1-2](https://i.imgur.com/fTVWgta.png){:width="150px"}
![Trial1-3](https://i.imgur.com/P7lAdb0.png){:width="150px"}  
__Figure:__ _First iteration of our tests. Yup, doesn't really look like it.    
We tried changing the colors or adding new strokes, but to no effect_
{: style="text-align: center;"}

Then we tried to restrict everything into dark lines by removing the circles
and other colors in the background. We thought that by training the "outlines,"
we can get atleast some recognizable shapes:

![Trial2-1](https://i.imgur.com/tt6xMXx.png){:width="150px"}
![Trial2-2](https://i.imgur.com/ahmJvt2.png){:width="150px"}
![Trial2-3](https://i.imgur.com/0ioAPxi.png){:width="150px"}  
__Figure:__ _Second iteration of our tests. To be honest, this looks a bit
of an improvement over the previous one, and I think that we're on to something
here. However, we decided to scrap this idea due to time constraints_
{: style="text-align: center;"}

Perhaps one of the reasons why we weren't able to replicate his work is because
there's not much information on how the whole system actually works. I guess
it's also part of his artistic license to keep their secret sauce. So yup, we
decided to scrap this idea.[^1] 

## What worked

Good thing, one of our engineers suggested using the [Quick, Draw!
dataset](https://github.com/googlecreativelab/quickdraw-dataset) as primitives
for our Drawing System. It's simply a set of drawings made by real players from
the game [Quick, Draw!](https://quickdraw.withgoogle.com/)

![Quick, Draw! Preview](https://i.imgur.com/zwM2tib.jpg){:width="560px"}   
__Figure:__ _Some samples of the Quick, Draw! dataset_
{: style="text-align: center;"}

Thus, I just need to figure out how we can generate new images from that
dataset. I can use individual strokes, but building it from scratch will take a
lot of time (it was almost December), so I went on and use generative models to
accomplish the drawing task. 

The main idea for generative models is that it first summarizes a particular
class in a single distribution, then samples from it. So for a set of "book"
doodles, the generative model finds the distribution that perfectly fits (or
represents) all of them, then creates new drawings based on that.

![Generated books](https://i.imgur.com/V746am3.png){:width="560px"}  
__Figure:__ _Generated "book" samples. These were not drawn by any human player_
{: style="text-align: center;"}


The sequence-to-sequence variational autoencoder Sketch-RNN (Ha and Eck,
[2017](#ha2017sketchrnn)) seems perfect for the job, so I decided to incorporate
that in the system.

![VAE](/assets/png/christmais/vae.png){:width="560px"}  
__Figure:__ _Drawing system but using the VAE. Instead of using lines and
circles directly as primitives, we chose to use the Quick, Draw! dataset_
{: style="text-align: center;"}

For the final pipeline, the first and last stages&mdash;the one where we
convert strings to objects and the one where we need to style the object
further&mdash;are more straightforward. We used the GloVe word embedding model
(Pennington, et al., [2014](#pennington2014glove))
to map[^2] any input string into one of the trained Quick, Draw classes, and used
Arbitrary Neural Style Transfer[^3] (Ghiasi, et al., [2017](#ghiasi2017exploring)) to add more artistic styling to the resulting drawings.

![Pipeline](/assets/png/christmais/pipeline.png){:width="560px"}  
__Figure:__ _Final pipeline for the ChristmAIs project_
{: style="text-align: center;"}

## Results

I'm pretty proud of our final product. Mainly because of my amazing and
talented teammates who helped productionalize this machine learning system!

- We built a **web application** where people can try entering any given text and
    choose the artistic style to create AI generated holiday cards! The backend
    uses a Google Compute Engine (GCE) instance.  

- We also printed some **holiday cards and artworks** that look really dope!

![Fun artwork prints](https://i.imgur.com/gHiMAgS.jpg){:width="560px"}  
{: style="text-align: center;"}


- We **got noticed by David Ha! He's the author of the original Sketch-RNN**, and
    probably one of the big names in machine learning and creativity (from
    Google Brain). Perhaps this is one of the highlights of this project.

<center>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Happy Holidays 🎉<br><br>Someone made this holiday card generator using Sketch-RNN and Style Transfer:<a href="https://t.co/50dWllrga8">https://t.co/50dWllrga8</a><a href="https://t.co/Tag9IwVenP">https://t.co/Tag9IwVenP</a> <a href="https://t.co/68Q0fPL5eP">pic.twitter.com/68Q0fPL5eP</a></p>&mdash; hardmaru (@hardmaru) <a href="https://twitter.com/hardmaru/status/1077537402133012480?ref_src=twsrc%5Etfw">December 25, 2018</a></blockquote></center>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Conclusion

In this post, I shared the creative process we've undergone when building
ChristmAIs. We started of by replicating Tom White's work, but it didn't
produce pleasing results. Then, we pivoted on an entirely different pipeline
using generative models, and it worked! So far, I'm very happy with the
results: we got an open-source project, got recognized by one of Google Brain's
top research scientists, and produced an AI-generated art apt for the holiday
season.

## References

* <a id="pennington2014glove">Pennington, Jeffrey, Socher Richard, et al.</a>(2014). "Glove: 
    Global Vectors for Word Representation". In: *Proceedings of the 2014 Conference on
    Empirical Methods in Natural Language Processing (EMNLP)*, pp.1532-1543.
* <a id="ha2017sketchrnn">Ha, David and Eck Douglas</a>(2017). "A Neural
    Representation of Sketch Drawings". In: *arXiv:1704.03477[cs.NE]*
* <a id="ghiasi2017exploring">Ghiasi, Golnaz et al.</a> (2017). "Exploring the
    structure of real-time, arbitrary neural artistic stylization network". In:
    *arXiv:1705.06830[cs.CV]*

### Footnotes

[^1]: You can even see the remnants of our exploratory replication work in the repository. Perhaps you can replicate it by yourself!
[^2]: This step simply involves getting the word vector for the query string and the Quick, Draw! classes, and computing the cosine similarity for each.
[^3]: For style transfer, we used Ghiasi's work on "Arbitrary Image Stylization." Unlike the work of Gatys, this technique only trains a single model for any given style image. It's much faster and less complex.
