---
layout: post
title: "Add badges to your Google Cloud Builds"
date: 2018-12-21
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [cloud build, google, google cloud platform, google cloud build, badge]
---

> Using a combination of Cloud PubSub and Cloud Functions, it is possible to
> create status badges everytime you build. Read more to find out how!


Recently, Github
[announced](https://blog.github.com/2018-07-26-simplify-your-ci-process/) easy
integration with [Google Cloud Build](https://cloud.google.com/cloud-build/) to
simplify our continuous-integration (CI) processes. Because our company
leverages the Google Cloud Platform, it is a great boon to unify our DevOps
process inside a single infrastructure&mdash;especially for our private
projects. Furthermore, with the first 120 build-minutes per day free-of-charge,
Cloud Build is virtually free!

However, unlike Travis or AppVeyor, Cloud Build does not provide badges
out-of-the-box. As open-source enthusiasts, we love badges, so wouldn't it be
nice to create one for Cloud Build? In this post, I'll be talking about how to
add badges to your Google Cloud Builds. The full architecture would look like
this:

[!Full architecture]()

Then, we'll follow the steps below:
1. [Create SVG files for your badges then store to Cloud Storage](#create-svg-files-for-badge-templates) 
2. [Write a Cloud Function and deploy](#write-a-cloud-function-to-deploy)
3. Trigger a build, then embed the generated badge into your README

## To whom is this tutorial good for?

I realized that there is still a lot of configuration needed in order to proceed
with this tutorial. So I think this post is highly recommended for people who already...
- ...have experience working with the Google Cloud Platform.
- ...doing continuous integration and deployment (CI/CD) with Cloud Build and Github, and just want to add badges in their project.

Before we begin, some prerequisites and assumptions:
- You have already set up a Google Cloud Project, enabled Cloud Build, and
[created a Storage bucket](https://cloud.google.com/storage/docs/creating-buckets)
- You have the Google Cloud SDK [installed in your system](https://cloud.google.com/sdk/install) 
- You have already [configured](https://github.com/marketplace/google-cloud-build) your Github project with the Cloud Build App


## Create SVG files for badge templates 

The first step is to create badge templates as SVG files then store them in
Google Cloud Storage. We use this file format because of its "highly-scalable"
resolution. For now, we need to create a badge for both `SUCCESS` and `FAILURE`
status. You can create custom SVG files from
[Shields.IO](https://shields.io/#/), or just use our badges here:

- Success badge ([link](https://storage.googleapis.com/tm-github-builds/build/success.svg)): ![link](https://storage.googleapis.com/tm-github-builds/build/success.svg) 
- Failure badge ([link](https://storage.googleapis.com/tm-github-builds/build/failure.svg)): ![link](https://storage.googleapis.com/tm-github-builds/build/failure.svg) 

These badges will serve as your **badge templates** whenever a *specific badge for
your project* is created. So if your latest build was successful, then the
success template is used. The same goes whenever the build fails.

Note that these badges should be stored in your project's Google Cloud Storage
(GCS) bucket. It is preferable to have a directory, `build`, that will contain all
badge-related artifacts. 
```
# Directory structure for gs://<MY-PROJECT-BUCKET> 
.
./build/
./build/success.svg
./build/failure.svg
```

## Write a Cloud Function to deploy 

The next step is to write a Cloud Function for deployment. The purpose of the
Cloud Function is to listen for the build status (in terms of PubSub events),
and performs some logic to update the build badge for our specific project. For
the purposes of this tutorial, we'll use Javascript (Node.js 6)[^1]. [You can
use Python
too](https://cloud.google.com/functions/docs/concepts/python-runtime),  as long
as you follow the execution pattern below:

1. Check if the PubSub event corresponds to the repository and branch
2. Get the event status for the latest build (success or fail)
3. Depending on the status, copy the badge over to a new file (preferably `<PROJECT>-<BRANCH>.svg`)
4. Update the newly-created badge's accessibility to public

I'll walk you through each step of the execution process (with some code
snippets along the way), then I'll put the overall deploy code that I
often use at the end.

### Check PubSub event details

The way we'll know the status of our builds is through GCP's messaging tool called
PubSub. Cloud Build automatically publishes build details as a topic and we
just need to set-up a subscriber to pull messages from that. 

[^1]: I chose to write in Javascript because I want to use this project as an opportunity to learn the language.
