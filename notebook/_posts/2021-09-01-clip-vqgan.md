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

Text-to-image synthesis has taken ML Twitter by storm. Everyday, we see new
AI-generated artworks being shared around the interwebs. All of these were made
possible thanks to the [VQGAN-CLIP Colab
Notebook](https://colab.research.google.com/drive/1_4Jl0a7WIJeqy5LTjPJfZOwMZopG5C-W?usp=sharing#scrollTo=g7EDme5RYCrt)
by [@advadnoun](https://twitter.com/advadnoun) and
[@RiversHaveWings](https://twitter.com/RiversHaveWings). They were able to
combine the generative capabilities of VQGAN and discriminative ability of CLIP
to produce the wonderful images we see today:


