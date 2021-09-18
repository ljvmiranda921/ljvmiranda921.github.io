---
layout: post
type: post
title: "Developing on a Windows machine"
date: 2021-10-18
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [windows, wsl, software engineering]
description: |
    Yes, you can use Windows for software development&mdash; and it's a fun
    experience! Here, I'll share some of the steps I took to make my machine
    developer-friendly.
excerpt: |
    Yes, you can use Windows for software development&mdash; and it's a fun
    experience! Here, I'll share some of the steps I took to make my machine
    developer-friendly.
---


<span class="firstcharacter">R</span>ecently, I've been developing on a Windows
machine, and it was surprisingly fun. At first, I was anxious because of my
previous experience with Windows. Five years ago, installation instructions
won't *just work*, each step needs a workaround,[^1] and
things break often. It was unpleasant. Now, I feel like the ecosystem has
changed for the better.

<!-- screenshot of your setup -->

In this blogpost, I'll share some of the steps I took to make my machine
developer-friendly. Hope you find these helpful as much as I did:

- Install WSL2 and get the Windows Terminal
- Prettify your PowerShell Prompt
- Install Windows Powertoys for more control
- Keep track of Windows Updates

## Install WSL2 and get the Windows Terminal

[Installing Windows Subsystem for Linux 2
(WSL2)](https://docs.microsoft.com/en-us/windows/wsl/install-win10) feels like
cheating because I'm literally just running Linux. Installation was painless,
and [all my dotfiles](https://github.com/ljvmiranda921/dotfiles) for
[vim](https://www.vim.org/), [tmux](https://github.com/tmux/tmux/wiki), and
bash worked out of the box. Also, you can choose any distro you want from the
Microsoft Store! I'm pretty basic so I went with Ubuntu 20.04. 

<!-- microsoft store choose distro -->
<!-- OR neofetch? -->


However, I wouldn't even stop there. Instead of using the "WSL2 Terminal," I
went for the Windows Terminal (you can also find it in the Microsoft Store).
It's an emulator where you can open PowerShell, Command Prompt, and Bash in
multiple tabs! 

<!-- show multiple tabs ? -->


It's customizable too. You can [change the color
scheme](https://docs.microsoft.com/en-us/windows/terminal/customize-settings/color-schemes)
and the font. Personally, I love using [Gruvbox
Dark](https://gist.github.com/davialexandre/1179070118b22d830739efee4721972d)
and [Fira
code](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/FiraCode).[^2]
After a few tweaks, my terminal already looks like the one I've been accustomed
to in my Linux machine.

Lastly, another thing I did is to set Bash as my default profile, and update
the starting directory to `//wsl$/Ubuntu-20.04/home/$USER/`. So whenever I open
the Windows Terminal, the bash profile is automatically loaded and is set to
the actual `home` directory for Linux.

## Prettify your PowerShell Prompt

> First off, take whatever I say in this section with a grain of salt. I am a
> beginner here (Windows) as much as the next guy. Let me know in the comments
> if I missed anything!

Now that I'm looking at Windows with my more experienced developer eyes, I was
curious as to how I can get around the OS through the shell. Previously, I've
always used the GUI. With that, I learned that the main entrypoint is through
PowerShell. 

I don't really see myself writing PowerShell scripts in the future. So in order
to dip my toes into the environment, my tiny task is to prettify my terminal.

### PowerShell

However, we won't be using the pre-installed "Windows PowerShell" for our
tasks. Instead, we will download *another PowerShell* (named just "PowerShell")
[from the Microsoft
Store](https://www.microsoft.com/en-us/p/powershell/9mz1snwt0n5d#activetab=pivot:overviewtab).
Confusing? Yeah, here's what I got:

* The pre-installed PowerShell, or *Windows PowerShell* (or PowerShell 5.1) is
    a Windows-only program that relies on an older .NET Core runtime. It's no
    longer in active development aside from bug-fixes.
* The new PowerShell, named *PowerShell* (or PowerShell 7.x) supports
    cross-platform development. So programs developed there can run on
    Windows, macOS, and Linux. 

You can check your PowerShell version by typing `$PSVersionTable` and checking
the value in the `PSVersion` key. On my machine, PowerShell 7.x is installed
side-by-side with PowerShell 5.1. I am not sure if it's possible to upgrade 5.1
to 7.X., so I opted to keep them separate.

<!-- show my PSVersionTable -->

Personally, it feels similar to the Python 2 to 3 conundrum. Sometimes it's
okay to keep them both so as to not break anything in your system.

### Install chocolatey

The next thing I did is to download the [Chocolatey](https://chocolatey.org/)
package manager. We will use it to install the prompt theme engine for
PowerShell. You can liken Chocolatey  to `apt` in Linux. Also, note that it's a
third-party app, as there is an official package manager by the name
[winget](https://docs.microsoft.com/en-us/windows/package-manager/winget/).

I chose Chocolatey over winget because the former seems more mature and is
feature-complete. To be honest, I am not sure of all the nuances between the
two. A [quick Reddit search on "winget vs
chocolatey"](https://www.google.com/search?q=winget+vs+chocolatey+site%3Areddit.com&oq=winget+vs+chocolatey+site%3Areddit.com)
shows some hesitation from other developers over winget. As for me, I value
stability, so I just went with Chocolatey.


## Install Windows Powertoys for more control


## Install Visual Studio Code


## Keep track of Windows Updates


## FAQs

- **Why did you change to Windows?** I've been gaming recently and some
      NVIDIA drivers don't work out-of-the-box on Linux, especially on current-gen
      GPUs. If they do, they cause weird errors like screen stuttering and
      blackouts.  
- **What made you took the leap?** Mostly curiosity. Some of my peers
      in my previous job use Windows for development (albeit with some pain-points). I'd like
      to see if I can create a delightful dev experience on a Windows Machine.




<!-- add links that you should check when keeping track of windows updates -->

<!--

1. install wsl
2. install windows terminal
3. beautifying your terminal: (1) bash (2) powershell
4. powertoys for keyboard mapping
-->


### Footnotes

[^1]: I remember back then, I use alternatives like [Cygwin](https://www.cygwin.com), [MSYS2](https://www.msys2.org), and [Git Bash on Windows](https://git-scm.com/downloads) to emulate a Linux-like experience. It was fun so I decided to jump head-on to a full Linux installation.
[^2]: I use NerdFont's patched version of [Fira Code](https://fonts.google.com/specimen/Fira+Code). With that, you can access almost a thousand icons to prettify your terminal.
