---
layout: post
type: post
title: "A Weekend Ray Tracer"
date: 2021-09-25
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [raytracing, typescript, computer graphics]
description: |
    Sharing the output of my fun weekend escapade in ray tracing and computer
    graphics!
excerpt: |
    Sharing the output of my fun weekend escapade in ray tracing and computer
    graphics!
---

> Just sharing the output of my fun weekend escapade in ray tracing and
> computer graphics!

<a span class="firstcharacter">L</a>ast month, I went through Peter Shirley's
"[Ray Tracing in One
Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html)" to
build my very own ray tracer from scratch! I've been reading a lot about
computer graphics recently, and this guide encouraged me to try something on my
own. 

The book was easy to follow, and the math itself isn't that
complicated&mdash;just a decent understanding of geometry (vectors, surface
normals, Snell's law, etc.).  The code was written in C++, but I opted to write
it in [Typescript](https://www.typescriptlang.org/) as a learning practice. The
best part is that you get a nice output in the end:

![](/assets/png/raytracer/highres_showcase.png)


The teaching style is bottom-up. We start by writing the basic building blocks,
then slowly inch our way up to add new features and materials. For example,
during the first few chapters I was tasked to just render colors and draw a
sphere:

![](/assets/png/raytracer/ch01_hello_world.ppm.png){:height="140px"}
![](/assets/png/raytracer/ch04_white_blue_gradient.ppm.png){:width="250px"}
![](/assets/png/raytracer/ch05_red_sphere.ppm.png){:width="250px"}
{: style="text-align: center;"}

Then little by little


![](/assets/png/raytracer/ch06_front_back_forces.ppm.png){:width="225px"}
![](/assets/png/raytracer/ch06_surface_normal.ppm.png){:width="225px"}
![](/assets/png/raytracer/ch07_antialiasing.ppm.png){:width="225px"}
{: style="text-align: center;"}

And experimented on different materials


![](/assets/png/raytracer/ch08_matte_with_correction.ppm.png){:width="225px"}
![](/assets/png/raytracer/ch09_metal_fuzz.ppm.png){:width="225px"}
![](/assets/png/raytracer/ch09_metal_material.ppm.png){:width="225px"}
![](/assets/png/raytracer/ch10_a_hollow_glass_sphere.ppm.png){:width="225px"}
![](/assets/png/raytracer/ch10_glass_always_refracts.ppm.png){:width="225px"}
![](/assets/png/raytracer/ch10_glass_sometimes_refracts.ppm.png){:width="225px"}
{: style="text-align: center;"}


<!-- allude to the idea of having a stock of moderately-challenging projects
-->

