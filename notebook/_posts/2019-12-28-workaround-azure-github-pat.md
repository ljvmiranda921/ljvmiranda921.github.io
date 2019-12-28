---
layout: post
title: "Workaround for creating a Github service connection in Azure Pipelines"
date: 2019-12-28
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [azure pipelines, github , service connection]
description: |
    Here's a workaround in creating a Github service connection in Azure Pipelines.
    You can find the related issue here: https://github.com/microsoft/azure-pipelines-tasks/issues/11558
excerpt: "Create a Github service connection in Azure Pipelines"
---

> If you want to skip ahead to the workaround, click [here](#the-workaround)

Earlier today, I tried automating Github releases in [Azure
Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/). It
should be easy because they already have a
[Task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/github-release?view=azure-devops)
for it, but I encountered this annoying error in my builds:

![](/assets/png/workaround-azure/annoying_error.png){:width="520px"}
{: style="text-align: center;"}

I checked if my service connection exists, it does! I've already set it up by
creating a [Github Personal Access
Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line),
and adding it to [Azure's "Service
Connections"](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml).
What's weird is that my **authentication scheme is being detected as `Token`,
instead of `Github personal access token`!**. This is a potential bug, so I
scoured Github Issues if someone has reported it.

There is an
[Issue](https://github.com/microsoft/azure-pipelines-tasks/issues/11558) for
it, but it's been open for almost three months!

![](/assets/png/workaround-azure/github_issue.png){:width="520px"}
{: style="text-align: center;"}

Luckily, the conversation thread has discovered a workaround: **create the
service token via an API request.** There's some cURL magic happening, and the
thread has left out some important parts, so I hope this tutorial can walk you
through the steps.

## The Workaround

Just three (3) steps:
1. Create a personal access token (PAT)
2. Prepare token for the request
3. Send a POST request

First, **create a personal access token (PAT)** for sending requests to the
Azure Devops REST API. You can do so by following the instructions
[here](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page).
Some notes on my case:
- The minimal scope for the token can be: `Service Connections (Read, query, &
    manage)`. Be sure to click the "other 27 scores" so this category would
    appear.
- I didn't need to change the token expiry. Since you're going to hopefully use
    this atleast once, you're free to set it in a nearer date.

![](/assets/png/workaround-azure/create_access_token.png){:width="520px"}
{: style="text-align: center;"}

After creating the token you need to **prepare it for the request** by (1) [base64
encoding](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page#q-how-can-i-use-a-pat-in-my-code)
it and (2) copy-pasting it in your request body. In my case, I just used
[Postman](https://www.getpostman.com/) rather than the usual cURL since the
former does step 1 automatically. For Postman, simply go to the "Authorization"
tab and fill-in your Username and Password (the generated token)

![](/assets/png/workaround-azure/params.png)
{: style="text-align: center;"}

Then, you can now **send a POST request** to this endpoint:
`https://dev.azure.com/<TODO-ORGANIZATION>/<TODO-PROJECT>/_apis/serviceendpoint/endpoints?api-version=5.1-preview.2`.
The `Content-Type` of the request should be `application/json`, and must
contain the following payload:

```json
{
  "name": "release",
  "type": "github",
  "url": "https://github.com",
  "authorization": {
    "scheme": "PersonalAccessToken",
    "parameters": {
      "accessToken": "<TODO-GITHUB-PERSONAL-ACCESS-TOKEN>"
    }
  }
}
```

After sending the request, you should be able to verify that the Service
Connection has indeed been created. Note that it should say `using
personalaccesstoken` and not `using Personal Access Token` or `using Github
Access Token`. It's really weird.


![](/assets/png/workaround-azure/verify.png)
{: style="text-align: center;"}

Hope it helps!

## Final thoughts

Creating Github Releases from a Continuous Delivery pipeline is one of the most
common tasks in open-source software dev. However, this simple bug in Azure
Pipelines can prove to be very frustrating for developers. I hope that this bug
will be fixed soon, but for now, you can just follow this workaround!

