---
layout: post
type: post
title: "Taming the 'Taming Transformers' (VQGAN) paper"
date: 2021-09-01
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [vqgan, machine learning, research, deep learning, neural network, clip vqgan]
description: |
    The Vector Quantized Generative Adversarial Network (VQGAN) is a network
    that allows us to create high-resolution images from text. Let me talk
    about how it works in this post.
excerpt: |
    The Vector Quantized Generative Adversarial Network (VQGAN) is a network
    that allows us to create high-resolution images from text. Let me talk
    about how it works in this post.
---

<span class="firstcharacter">T</span>**ext-to-image synthesis has taken ML
Twitter by storm**. Everyday, we see new AI-generated artworks being shared
across the interwebs. All of these were made possible thanks to the [VQGAN-CLIP
Colab
Notebook](https://colab.research.google.com/drive/1_4Jl0a7WIJeqy5LTjPJfZOwMZopG5C-W?usp=sharing#scrollTo=g7EDme5RYCrt)
of [@advadnoun](https://twitter.com/advadnoun) and
[@RiversHaveWings](https://twitter.com/RiversHaveWings). They were able to
combine the generative capabilities of VQGAN ([Esser et al, 
2021](#esser2021vqgan)) and discriminative ability of CLIP ([Radford et al,
2021](#radford2021clip)) to produce the wonderful images we see today:

<!-- sample images -->

In essence, the way they work is that VQGAN generates the images, while CLIP
judges how well the image matches our text prompt:

<!-- draw stuff because it's fun -->

However, I'm more interested in how VQGAN works. **It seems to prescribe a
theory of perception that I find interesting.** That's why I'll be focusing on
the paper, ["Taming Transformers for high-resolution images
synthesis."](https://arxiv.org/abs/2012.09841) On the other hand, if you want
to learn more about CLIP, I suggest reading [OpenAI's
explainer](https://openai.com/blog/clip/). It's comprehensive and accessible. 


## How we see images




## References

1. <a id="esser2021vqgan">Esser, P., Rombach, R. and Ommer, B.</a>, 2021. Taming transformers for high-resolution image synthesis. In *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition* (pp. 12873-12883).
2. <a id="radford2021clip">Radford, A., Kim, J.W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J. and Krueger, G.</a>, 2021. Learning transferable visual models from natural language supervision. *arXiv preprint arXiv:2103.00020*.



