---
layout: post
type: post
title: "How to set up Git and SSH when your org has enforced SAML SSO"
date: 2023-11-28
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [git, github, saml, sso, ssh, how to]
header-img: /assets/png/headers-only/header-saml.png
description: |
    While cloning a repository from an organization, I encountered an SSH error that I've never seen before.
    It's something related to SAML SSO. I managed to solve it, so I'm documenting the steps here. Hope it helps you too!
excerpt: |
    While cloning a repository from an organization, I encountered an SSH error that I've never seen before.
    It's something related to SAML SSO. I managed to solve it, so I'm documenting the steps here. Hope it helps you too!
---

<span class="firstcharacter">W</span>hile cloning a repository from an organization with SAML SSO, I encountered an SSH error. I've been using Git with SSH before, and I admit that this was new:

```sh
$ git clone git@github.com:myorg/repo.git
Cloning into 'repo'...
ERROR: The 'myorg' organization has enabled or enforced SAML SSO.  
To access this repository, you must use the HTTPS remote with a 
personal access token or SSH with an SSH key and passphrase that 
has been authorized for this organization.

Visit https://docs.github.com/articles/authenticating-to-a-github-organ
ization-with-saml-single-sign-on/ for more information.
```


# Step 1: Create an SSH key and upload it to your GitHub account

First you need to generate your SSH key. 
Sometimes, your organization will require you to generate a new one using your company email.
Nevertheless, the common denominator would be to run the `ssh-keygen` command below:

```sh
ssh-keygen -t ed25519 -C lj@myorg.org
```

This will generate a key pair in the form of `id_ed25519` and `id_25519.pub`.
In Linux, you can find them in the `~./ssh/` directory.
We need to upload the one with the `.pub` extension to GitHub.
Go to your GitHub **Settings** > **SSH and GPG Keys** > **New SSH Key** (or head to [github.com/settings/keys](https://github.com/settings/keys)).  

Write a semi-descriptive title (I usually put the organization name), set the **Key Type** as "Authentication Key," and copy the contents of the `id_25519.pub` in the **Key** field.

# Step 2: Add your SSH key to the SSH agent's list

First, test the connection by running:

```
$ ssh -T git@github.com
Hi username! You've successfully authenticated, but GitHub does 
not provide shell access.
```

Then, start the SSH agent:

```
$ eval "$(ssh-agent -s)"
Agent pid 16935
```

It starts a background daemon and displays its process ID (in this case, 16935). 
We can then add our private keys while this agent is running.

```
$ ssh-add .ssh/id_ed25519
Identity added: .ssh/id_ed25519 (some other info)
```

At this point, you should now be able to clone your organization's private repository. 
I haven't really dug deep as to why it errored out the first time, I assumed that the keys are automatically added whenever I create them.
Anyway, in case you also encountered this error, I hope this tutorial helps!