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

<div style="text-align:center">
<blockquote class="imgur-embed-pub" lang="en" data-id="EFuItd0" data-context="false" >
    <a href="//imgur.com/EFuItd0"></a>
</blockquote>
<script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
</div>

Don't fret, because it's [a common problem with Thinkpad
notebooks](https://www.reddit.com/r/thinkpad/search/?q=screen%20flicker&restrict_sr=1).
You're also in luck, because it's solvable with just a few terminal commands.

* [The solution](#the-solution)
* [Explanation](#explanation)
* [Other solutions](#other-solutions)

## The solution

> Note: this was tested on a Thinkpad X1 Extreme Gen 2 notebook running on an Ubuntu
> 20.04 distribution. I have an Intel UHD and Nvidia Geforce GTX1650 GPUs
> (Noveau driver). This solution solved my screen's flickering for the time
> being.

The solution is to **disable Intel's Panel Self Refresh (PSR) setting.**[^1]


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

    A quick note: **don't type** `sudo gedit /etc/default/grub` even if some
    tutorials tell you to. Using `sudo` to edit graphical settings is unsafe
    due to elevated privileges![^2] Read more from the [Ubuntu wiki](https://help.ubuntu.com/community/RootSudo#Graphical_sudo).

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
chip. It's directly tied to how a monitor displays contents to us.

Most monitors have a 60 Hz refresh rate, so every second it updates what
you see on the screen 60 times. It is good if you're viewing dynamic content
like games, scrolling, or watching movies. But it's not that efficient when
display is static: reading from a website, idle time, etc. 

PSR addresses the latter by "remembering" a few frames into memory (the frame
buffer) so that refreshing takes less work. Screen flicker *may* be due to the
memory leaking from the frame buffer, causing us to see unsynced content. By
disabling it, we lose that optimization at the cost of power efficiency&mdash;a
price to pay to remove that screen flickering.

## Other solutions

* Aside from disabling PSR, [one solution](https://askubuntu.com/questions/838957/upgrade-to-16-10-causes-desktop-backlight-flickering) also suggested turning off Frame Buffer Compression (`i915.enable_fbc=0`) and mode setting (`i915.modset=0`). Similar to the command above, you just need to append these to the grub parameter above: 

    ```sh
    # /etc/default/grub
    GRUB_CMDLINE_LINUX_DEFAULT="quiet splash i915.enable_psr=0 i915.enable_fbc=0 i915.modset=0"
    ```

* Updating your graphics drivers may also be another option. However, this
    didn't work for me. I switched from the Noveau driver to `nvidia-470
    (proprietary, tested)` and the flickering still showed up.
* Lastly, if you're [on
  Windows](https://www.intel.com/content/www/us/en/support/articles/000057194/graphics.html),
  you can search for the Intel Graphics Command Center, head to the Power tab,
  locate the Panel Self Refresh setting and toggle the disable button.

> Did it work? Please let me know in the comments below! If you also solved your
> problem using a different method, please let me know as well!

## Footnotes

[^1]: The [Arch Linux documentation](https://wiki.archlinux.org/title/intel_graphics#Screen_flickering) is a good resource for troubleshooting the Intel driver and cross-referencing your Google search results. Even though I am using Ubuntu, some of which still applies. You can also check the [corresponding Linux kernel bug report](http://lkml.iu.edu/hypermail/linux/kernel/2003.3/07303.html) for more info.
[^2]: If you are using Ubuntu 16.04 or below, you can use `gksudo` like so: `gksu gedit /etc/default/grub`. But since it's already removed in 18.04, you can use `pkexec gedit /etc/default/grub` (long-term method).  I am only using the `admin` route because it doesn't require any new installations. Read more from [this article](https://itsfoss.com/gksu-replacement-ubuntu/).
