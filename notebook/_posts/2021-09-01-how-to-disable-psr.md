---
layout: post
type: post
title: "How to fix screen flickering on Linux Thinkpad by disabling PSR"
date: 2021-09-01
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [linux, thinkpad, nvidia, screen flickering, ubuntu]
description: |
    If your Thinkpad experiences screen flickering&mdash;monitor blacks out
    even if it's turned on, static-like screen movement, or tearing&mdash;then
    it may just be due to a power-saving setting.
excerpt: |
    If your Thinkpad experiences screen flickering&mdash;monitor blacks out
    even if it's turned on, static-like screen movement, or tearing&mdash;then
    it may just be due to a power-saving setting.
---

If you own a Lenovo Thinkpad and experience screen flickering&mdash;monitor
blacks out even if it's turned on, static-like screen movement, or
tearing&mdash; then it may just be due to a power-saving setting.

<!-- GIF of screen flickering -->

Don't fret, because it's [a common problem for Thinkpad
notebooks](https://www.reddit.com/r/thinkpad/search/?q=screen%20flicker&restrict_sr=1).
You're also in luck, because it's solvable with just a few terminal commands.

* [The solution](#the-solution)
* [Explanation](#explanation)
* [Other solutions](#other-solutions)

## The solution

> Note: This was tested on a Thinkpad X1 Extreme Gen 2 and running on a Ubuntu
> 20.04 distribution. I have an Intel UHD and Nvidia Geforce GTX1650 GPUs
> (Noveau driver).

The solution is to **disable Intel's Panel Self Refresh (PSR) setting.**


1. First, check if PSR is actually turned on:

    ```sh
    sudo cat /sys/kernel/debug/dri/0/i915_edp_psr_status
    ```

    This should show:

    ```
    Sink support: yes [0x01]
    PSR mode: enabled
    PSR sink not reliable: no
    ```
2. You can disable it by editing `/etc/default/grub`:

    ```sh
    gedit admin:///etc/default/grub
    ```

    A quick note: **don't type** `sudo gedit /etc/default/grub`! Because it has
    elevated privileges, it is the least safe option.[^1] 

3. Now, look for the line that says `quiet splash` and append
   `i915.enable_psr=0` in front of the last quote. It should look like this:

    ```sh
    # /etc/default/grub (before)
    GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
    # /etc/default/grub (after)
    GRUB_CMDLINE_LINUX_DEFAULT="quiet splash i915.enable_psr=0"
    ```

4. Save the file and type:

    ```sh
    sudo update-grub
    ```

    And reboot your computer. 

5. After rebooting, check if PSR has been disabled:

    ```sh
    sudo cat /sys/kernel/debug/dri/0/i915_edp_psr_status
    ```

    It should now show:

    ```
    Sink support: yes [0x01]
    PSR mode: disabled
    PSR sink not reliable: no
    ```

## Explanation

[Panel Self Refresh
(PSR)](https://www.anandtech.com/show/7208/understanding-panel-self-refresh) is
an optimization to reduce the power consumed by your computer, especially the
chip. Most monitors have a 60 Hz refresh rate, so every second it updates what
you see on the screen 60 times. It is good if you're viewing dynamic content
like games, scrolling, or watching movies. But it's not that efficient when
display is static: reading from a website, idle time, etc. PSR addresses the
latter by "remembering" a few frames into memory so that refreshing takes less
work.




## Other solutions

* Aside from disabling PSR, [one solution](https://askubuntu.com/questions/838957/upgrade-to-16-10-causes-desktop-backlight-flickering) also suggested turning off Frame Buffer Compression (`i915.enable_fbc=0`) and mode setting (`i915.modset=0`). Similar to the command above, you just need to append these to the grub parameter above: 

    ```sh
    # /etc/default/grub
    GRUB_CMDLINE_LINUX_DEFAULT="quiet splash i915.enable_psr=0 i915.enable_fbc=0 i915.modset=0"
    ```
## Footnotes

[^1]: If you are using Ubuntu 16.04 or below, you can use `gksudo` like so: `gksu gedit /etc/default/grub`. But since it's already removed in 18.04, you can use `pkexec gedit /etc/default/grub` (long-term method).  I am only using the `admin` route because it doesn't require any new installations.










