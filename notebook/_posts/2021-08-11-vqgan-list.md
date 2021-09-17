---
layout: post
type: post
title: "List of VQGAN+CLIP Implementations"
date: 2021-08-11
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [vqgan, machine learning, research, deep learning, neural network, clip vqgan]
header-img: /assets/png/vqgan/ai_art_collage.png
description: |
    Here's a list of all VQGAN implementations I found on the internet.
excerpt: |
    Here's a list of all VQGAN implementations I found on the internet.
---

I've been in a VQGAN+CLIP craze lately, so here's a list of all VQGAN+CLIP
implementations I found on the internet (The symbol 🔰 means perfect for
non-programmers alike. If you don't know where to start, you can start with
these):

## VQGAN+CLIP implementations

| Name                                                                                                                                          | Author                                              | Description / Features                                                  |
|-----------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|-------------------------------------------------------------------------|
| [VQGAN+CLIP (codebook sampling method)](https://colab.research.google.com/drive/15UwYDsnNeldJFHJ9NdgYBYeo6xPmSelP)                                 | [@RiversHaveWings](https://twitter.com/RiversHaveWings) | The original VQGAN+CLIP notebook of Katherine Crowson ([@RiversHaveWings](https://twitter.com/RiversHaveWings)).        |
| [AI Art Machine](https://colab.research.google.com/drive/1n_xrgKDlGQcCF6O-eL3NOd_x4NSqAUjK) | [@hillelogram](https://twitter.com/hillelogram)         | 🔰 Very accessible Colab notebook. Has advanced options that are explained in a beginner-friendly level. |
| [Create realistic AI-Generated Images with VQGAN+CLIP](https://colab.research.google.com/drive/1wkF67ThUz37T2_oPIuSwuO4e_-0vjaLs?usp=sharing) | [@minimaxir](https://twitter.com/minimaxir)         | 🔰 Has good UI affordances and more descriptive explanation of parameters. Have options for deterministic output by using icon-based input/target images. |
| [VQGAN+CLIP (with pooling and quantize method)](https://colab.research.google.com/drive/1Foi0mCSE6NrW9oI3Fhni7158Krz4ZXdH)                    | [@ak92501](https://twitter.com/ak92501)             | Has an optional Gradio demo for a more streamlined experience.           |
| [Zoetrope 5](https://colab.research.google.com/drive/1LpEbICv1mmta7Qqic1IcRTsRsq7UKRHM#scrollTo=iKP0tnHaiTyl)                                 | [@classpectanon](https://twitter.com/classpectanon) | Has advanced parameters for  more controlled AI art generation. I haven't tried this yet, but it may be good to flesh your artwork more.       |
| [VQGAN+CLIP Python command-line interface](https://colab.research.google.com/drive/1LpEbICv1mmta7Qqic1IcRTsRsq7UKRHM#scrollTo=iKP0tnHaiTyl)                                 | [@nerdyrodent](https://github.com/nerdyrodent) | Not a Google Colab notebook, but a Github repo that you can fork and run locally. Provides a command-line interface to generate AI-art on the fly.        |
| [VQGAN+CLIP (z+quantize method with augmentations)](https://colab.research.google.com/drive/1_4Jl0a7WIJeqy5LTjPJfZOwMZopG5C-W?usp=sharing)                                 | [@somewheresy](https://twitter.com/somewheresy) | It seems to be the first English-translated notebook of Katherine Crowson ([@RiversHaveWings](https://twitter.com/RiversHaveWings)).        |
| [CLIPIT PixelDraw](https://colab.research.google.com/github/dribnet/clipit/blob/master/demos/PixelDrawer.ipynb)                                 | [@dribnet](https://www.twitter.com/dribnet) | A very interesting fork of the VQGAN+CLIP notebooks that uses PixelDraw to generate pixel art given a prompt. |
| [Nightcafe Studio](https://creator.nightcafe.studio/text-to-image-art)                                 | [NightCafe Studio](https://twitter.com/somewheresy) | Not a Colab notebook, but rather a managed service where you need to setup an account. I can't comment how different the outputs are compared to the Colab notebooks.  |
| [Kapwing AI Video Generator](https://www.kapwing.com/ai-video-generator)                                 | [Kapwing](https://www.kapwing.com/workspace/60c6021530e75900fd3e7f23) | A web-hosted version of CLIP VQGAN. Generates videos after processing. It's not as customizable, but the processing time is relatively fast!  |

## CLIP-guided art generators


These aren't necessarily VQGAN implementations, but can produce AI art
nonetheless:


| Name                                                                                                                                          | Author                                              | Description / Features                                                  |
|-----------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|-------------------------------------------------------------------------|
| [The Big Sleep: BigGAN x CLIP](https://colab.research.google.com/drive/1NCceX2mbiKOSlAd_o7IU7nA9UskKN5WR?usp=sharing)                    | [@advadnoun](https://twitter.com/advadnoun)             | Uses a CLIP-guided BigGAN generator. I can't comment on the quality of the outputs, but this is exciting to try as well!  |
| [Aleph-Image](https://colab.research.google.com/drive/1Q-TbYvASMPRMXCOQjkxxf72CXYjR_8Vp?usp=sharing)                    | [@advadnoun](https://twitter.com/advadnoun)             | Uses a CLIP-guided DALL-E decoder. Try it out for more interesting results!  |
| [CLIP Guided Diffusion HQ 512x512](https://colab.research.google.com/drive/1V66mUeJbXrTuQITvJunvnWVn96FEbSI3#scrollTo=ivuJjs6p9ttA)                                 | [@RiversHaveWings](https://twitter.com/RiversHaveWings) | Uses OpenAI's 512x512 class-conditional [ImageNet diffusion model](https://github.com/openai/guided-diffusion) with CLIP. It is fixed at 512x512, but it also has a [256x256 version](https://colab.research.google.com/drive/12a_Wrfi2_gwwAuN3VvMTwVMz9TfqctNj). |

The common denominator across these works is that they are guided by [OpenAI's
CLIP](https://openai.com/blog/clip/) so that the image matches the text
description. For more CLIP-guided projects, check out this [Reddit post from
February](https://www.reddit.com/r/MachineLearning/comments/ldc6oc/p_list_of_sitesprogramsprojects_that_use_openais/).


## Resources

If you wish to learn more about VQGAN and CLIP, I suggest reading the
following:
- [**Alien Dreams: An Emerging Art Scene by Charlie Snell**](https://ml.berkeley.edu/blog/posts/clip-art/): gives a good overview and history of the recent AI Art scene. Traces its roots from the introduction of CLIP and its pairing of VQGAN today.
- [**The Illustrated VQGAN**](/notebook/2021/08/08/clip-vqgan/): by yours
    truly, here I tried to explain how VQGAN works in a conceptual level. It
    starts with how images are "perceived" then ends with the whole VQGAN
    system.

Of course, nothing beats reading the original papers themselves:

1. <a id="esser2021vqgan">Esser, P., Rombach, R. and Ommer, B.</a>, 2021. Taming transformers for high-resolution image synthesis. In *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition* (pp. 12873-12883).
1. <a id="radford2021clip">Radford, A., Kim, J.W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J. and Krueger, G.</a>, 2021. Learning transferable visual models from natural language supervision. *arXiv preprint arXiv:2103.00020*.

> Did I miss anything? Just comment below!

#### Changelog

- 08-22-2021: Added Kapwing and PixelDraw
- 08-21-2021: This blogpost was featured in [Comet's newsletter](https://www.comet.ml/site/comet-newsletter-issue-14-nvidias-computer-generated-ceo-snap-gpus-for-model-inference/)! 
