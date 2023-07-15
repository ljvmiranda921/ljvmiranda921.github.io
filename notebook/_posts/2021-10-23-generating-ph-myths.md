---
layout: post
type: post
title: "Reimagining Philippine mythical creatures using VQGAN+CLIP"
date: 2021-10-23
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
header-img: /assets/png/ph-clip/header.png
tags: [machine learning, clip, clip vqgan, open ai, trese, halloween, scary,
generative art, generative, procgen, procedural generation]
description: |
    Using the text-to-image VQGAN+CLIP neural network to generate surreal
    mythical creatures from Philippine folk culture.
excerpt: |
    Using the text-to-image VQGAN+CLIP neural network to generate surreal
    mythical creatures from Philippine folk culture.
---

<span class="firstcharacter">M</span>ost of what I know from Philippine
folklore came from stories that were passed down from one generation to the
next. I knew that a *kapre* is a large creature smoking a cigar because the
"auntie of my mother's friend" said so. Words turn into images, bringing these
creatures into life. 

> Words turn into images, bringing these creatures into life.

![](/assets/png/ph-clip/trese.jpg){:width="640px"}  
__Figure:__ Comics like *Trese* also captured our imagination on Philippine folklore   
*(image from Trese / Visual Print Enterprises)*
{: style="text-align: center;"}

I wonder what will happen if we let a computer do the same. **If we provide a
machine learning model with text descriptions of folk creatures, what images
can it conjure?** 

To do so, I used a neural network called VQGAN+CLIP ([Esser et al,
2021](#esser2021clip) and [Radford et al, 2021](#radford2021clip)) and supplied
it with descriptions of Philippine folk creatures. The resulting images can
then be thought of as to what the model "imagined" upon reading them &mdash;and
they're a bit surreal and creepy!

> If you're interested to learn how VQGAN works, then head to my [explainer blogpost](/notebook/2021/08/08/clip-vqgan/).   
> It's not magic, it's math!

## Monsters from the machine

Below you'll see model-generated creatures from text. The descriptions were lifted
from [*The Aswang Project*](https://www.aswangproject.com/) and Wikipedia. On
the left you'll see a clip of the model while it's generating the image, and on
the right you'll see the final output. Also I kinda suck at CSS so this layout
works best on desktop!

### 1. Nunò sa punso

> Generally described as old men with flowing beards. They stand as tall as a
> three-year old child. In some stories, they wear a salakot, a traditional
> wide-brimmed hat made of rattan or reeds. They usually reside in an anthill
> or termite mound, hence the name.

<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls loop><source src="https://imgur.com/32IzDcS.mp4" type="video/mp4">Your browser does not support the video tag.</video>

</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/nuno_sa_punso.png" width="360">
</div>
</div>

### 2. Tiktik

> It looks like a large, man-sized vulture or raven. It has an unusual ability
> to fly low and slow, without the winds visibly flapping. Its defining feature
> is its highly prehensile tongue/proboscis that reportedly has the looks and
> dexterity of a human hand.


<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/562OYMa.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/tiktik.png" width="360">
</div>
</div>


### 3. Kapre

> A tree giant, phenomenally tall, long-legged, god type of hairy humanoid that
> sits in big trees and smokes cigarattes. It is often seen waiting for people
> as they walk through a path. If you're stuck in a place and you keep going
> around in circles, you're said to be played around by a kapre.

<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/Sg2w8X0.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/kapre.png" width="360">
</div>
</div>


### 4. Tikbalang

> A half-human, half-horse creature in the mold of the Greek Pan. It has
> unusually long, powerful legs that resemble the rear quarter of a horse, hooves
> and all. It does not hurt or kill people. At worst, it leads them astray and
> plays mischievous tricks on their senses.


<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/2cTcXG1.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/tikbalang.png" width="360">
</div>
</div>

### 5. Manananggal

>  An old mythical creature in the Philippines that separates from their lower
>  part of body and their fangs and wings give it a vampire-like appearance. It
>  is said to favor preying on sleeping, pregnant women, using an elongated
>  proboscis-like tongue to suck the hearts of fetuses, or the blood of someone
>  who is sleeping.

<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/8KjHw3O.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/manananggal.png" width="360">
</div>
</div>


### 6. Mantiw

> Thirty foot, docile spirits in Iloilo that are often spotted in fields while leaning
> against coconut and buri palm trees. They have a fair complexion, broad
> shoulders, and hooked noses. They are reserved and peaceful, but are easily
> offended when a human attempts to whistle along them.

<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/nBvTQiY.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/mantiw.png" width="360">
</div>
</div>

### 7. Tiyanak

>  A vampiric creature that takes on the form of a toddler or baby. Although
>  there are various types, it typically takes the form of a newborn baby and
>  cries in the jungle to attract unwary travelers. Once it is picked up by an
>  unfortunate passerby, it reverts to its true form and attacks the victim.

<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/sQ0V68X.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/tiyanak.png" width="360">
</div>
</div>

### 8. Sigbin

> It resembles a large dog or a hornless goat, but has large ears which it can
> clap like a pair of hands and a long, flexible tail that can be used as a
> whip. Families known as *Sigbinan* are said to keep the Sigbin in jars made of
> clay.

<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/JlNQfwW.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/sigbin.png" width="360">
</div>
</div>

### 9. Santelmo

> A shortened form of St Elmo's Fire, it appears as a ball of fire and has
> served as an omen of heavenly intervention to sailors. It is found in fields
> and swamps and may have been caused by a spirit of a man who died near that
> area during heavy rain.


<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/xgjWVf5.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/santelmo.png" width="360">
</div>
</div>


### 10. Bakunawa

> A serpent-like dragon that is believed to be the cause of eclipses,
> earthquakes, rains, and wind. In mythology, it is said that the Bakunawa
> would rise from the ocean and swallow the moon, causing an eclipse.


<div style="display:flex">
<!-- video -->
<div style="flex:33.33%;padding:5px">
<video width="360" height="360" controls  loop><source src="https://imgur.com/KS2Ayag.mp4" type="video/mp4">Your browser does not support the video tag.</video>
</div>
<!-- image -->
<div style="flex:33.33%;padding:5px">
<img src="/assets/png/ph-clip/bakunawa.png" width="360">
</div>
</div>

## Postscript

<!--
Aside from the upcoming Halloween season, this post was inspired by my recent
trip to my mother's province, [Iloilo](https://en.wikipedia.org/wiki/Iloilo),
where I spent a few days during my sabbatical. As some of you may already know,
[Western Visayas](https://en.wikipedia.org/wiki/Western_Visayas) is a place
teeming with Philippine folklore and myth. I learned a lot about supernatural
entities and my family history too *(oooh)*. I find it fun to put an AI spin to the
supernatural!
-->

As for the output, the surreal imagery added a nice touch&mdash; it gave our
mythical creatures an unearthly and bizarre vibe. I find the *nunò* and *kapre* 
surprising. They both capture what I imagine when I was young.

### Implementation details

I didn't write any code nor train any model to generate these images. Instead,
I used the [Google Colab
Notebook](https://colab.research.google.com/drive/1_4Jl0a7WIJeqy5LTjPJfZOwMZopG5C-W?usp=sharing#scrollTo=g7EDme5RYCrt)
provided by [@advadnoun](https://twitter.com/advadnoun) and [Katherine
Crowson](https://github.com/crowsonkb)
([@RiversHaveWings](https://twitter.com/RiversHaveWings))&mdash; all credits go
to them. I simply provided it with the text prompt, and have the model generate
the images for me. Cool!

However, I did a few tweaks in the prompt to influence the results. For
example, I added tags like `artstation`, `blender` or `hdr` so that it shows
more artistic renders rather than watercolored images. Lastly, I also limited
the number of iterations to 1500, I noticed that most images converge around
this point. When using a GPU, it takes around ten minutes to generate a decent
image. 

**You can definitely create scary monsters by your own**, the [Colab
Notebook](https://colab.research.google.com/drive/1_4Jl0a7WIJeqy5LTjPJfZOwMZopG5C-W?usp=sharing#scrollTo=g7EDme5RYCrt)
provides all the resources you need. I also compiled [a list of VQGAN+CLIP
implementations](/notebook/2021/08/11/vqgan-list/), so be sure to check it out!
For more inspiration, check out the [@images_ai](https://twitter.com/images_ai)
handle, this [Youtube channel](https://www.youtube.com/user/glenniszen), or
just search for "vqgan clip" on Twitter!

*Did you uncover scarier monsters from the machine? Share them in the comments
below!*  


## References

1. <a id="esser2021clip">Esser, P., Rombach, R. and Ommer, B.</a>, 2021. Taming transformers for high-resolution image synthesis. In *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition* (pp. 12873-12883).
2. <a id="radford2021clip">Radford, A., Kim, J.W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J. and Krueger, G.</a>, 2021. Learning transferable visual models from natural language supervision. *arXiv preprint arXiv:2103.00020*.

