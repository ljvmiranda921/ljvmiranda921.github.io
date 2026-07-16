---
layout: post
title: "Experiments with neural style transfer"
date: 2017-05-28
category: notebook
comments: true
author: "LJ V. MIRANDA"
summary: "Training a convolutional neural network to perform style transfer on some Filipino paintings."
tags: [neural style transfer, deep learning, filipino paintings, convolutional neural network]
---

For one of my weekend projects, I chanced upon [this
paper](https://arxiv.org/abs/1508.06576) of L.A. Gatys (Gatys et al. [2015](#gatys2015neural)) describing how we can
use a convolutional neural network to transfer artistic style from one image
to another. Here, I used the neural style transfer technique to learn the
artistic style of various Filipino paintings. Painters range from Amorsolo to
Manansala, and other modern artists such as Zobel. Enjoy!

{% include figure.html
   src="/assets/images/experiments-with-neural-style-transfer/communities.png"
   width="560"
   alt="Communities"
   caption="Vicente Manansala's style in Communities was applied in a photo of the Manila Skyline." %}

{% include figure.html
   src="/assets/images/experiments-with-neural-style-transfer/fruit-gatherer.png"
   width="560"
   alt="Fruit Gatherer"
   caption="Probably one of my favorites. Manansala's brush strokes applied to the facade of his alma mater." %}

{% include figure.html
   src="/assets/images/experiments-with-neural-style-transfer/rivers.png"
   width="560"
   alt="Rivers"
   caption="Fernando Zobel's work as implemented into one of the buildings in Ateneo." %}

{% include figure.html
   src="/assets/images/experiments-with-neural-style-transfer/sarimanok.png"
   width="560"
   alt="Sarimanok"
   caption="The work Sarimanok, aptly transfered to a pair of fighting cocks." %}

Here is also Ateneo's Church of the Gesu, rendered in Van Gogh's Starry
Night. What beauty!

{% include figure.html
   src="/assets/images/experiments-with-neural-style-transfer/starry-night.png"
   width="560"
   alt="Starry Night"
   caption="Van Gogh's starry night in Church of the Gesu." %}

If you want to implement this technique, you can use [my
work](https://github.com/ljvmiranda921/style-transfer) written in Python 2.X
and Tensorflow. I am running this above our lab's GPU (NVIDIA Titan X), and
it takes around 2-3 minutes for a single style transfer, depending on the
resolution (I'm using 72dpi). I haven't tested this with a normal CPU, but
from previous experience, this may take more than 30 minutes to run.

## References

{% bibliography --file notebook/experiments-with-neural-style-transfer.bib %}

### Other neural style implementations

My neural style implementation is still naive and dirty, and doesn't have the
degree of freedom to blend various artistic styles perfectly. If you prefer
using other implementations, take a look at the following below.

1. [`jcjohnson`'s original implementation, using Lua and Torch.](https://github.com/jcjohnson/neural-style) _(Probably one of the most comprehensive implementations around. It enables you to blend various styles, and control the degree of blending)._
2. [`fzliu`'s implementation, using Python and Caffe.](https://github.com/fzliu/style-transfer) _(Here's something that's much closer to home. If you're a Caffe user, this implementation might be more of a breeze. I don't use Caffe so I opted for Tensorflow)._
3. [`anishathalye`s implementation, using Python and Tensorflow.](https://github.com/anishathalye/neural-style) _(A straightforward implementation using Tensorflow. This also adopts various parameters set by jcjohnson, but works under the Tensorflow API)_
