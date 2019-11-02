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

![Full Architecture](/assets/png/tuts/build-badge-out.png)

Then, we'll follow the steps below:
1. [Create SVG files for your badges then store to Cloud Storage](#step-1-create-svg-files-for-badge-templates) 
2. [Write a Cloud Function to deploy](#step-2-write-a-cloud-function-to-deploy)
3. [Deploy, trigger a build, then embed the generated badge into your
   README](#step-3-deploy-and-trigger-a-build)

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


## Step 1: Create SVG files for badge templates 

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

```s
# Directory structure for gs://<MY-PROJECT-BUCKET> 
.
./build/
./build/success.svg
./build/failure.svg
```

## Step 2: Write a Cloud Function to deploy 

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
often use at the end. **Note that your Cloud Function must be stored either in
`index.js` or `function.js`**

### Check PubSub event details

The way we'll know the status of our builds is through GCP's messaging tool called
PubSub. Cloud Build automatically publishes build details as a topic and we
just need to set-up a subscriber to receive push messages. We'll start by writing a scaffold of our main method. We should `export` this
function and it must take an `event` and a `callback` as its [arguments](https://cloud.google.com/functions/docs/writing/background): 

- `event` (Object): an object representing the event that triggered the function
- `callback` (Function): a signal indicating the completion of the function
    execution. 

The `event` object that we'll obtain is a
[PubSubMessage](https://cloud.google.com/pubsub/docs/reference/rest/v1/PubsubMessage).
It contains the field, `data`, where we can access all relevant details from
our build. We do this by parsing the JSON object:

```javascript
const pubsubMessage = event.data;
if (pubsubMessage.data) {
    buildResource = JSON.parse(Buffer.from(pubsubMessage.data, "base64").toString());
}
```

### Get the event status of the latest build

From our snippet above, all event details will be stored inside the variable
`buildResource`. You can actually check all available fields by running `gcloud
builds describe <BUILD-ID>`. For our specific use-case, we'll need the
following[^2]:

- **Repository name**: `buildResource.substitutions.REPO_NAME`
- **Branch name**: `buildResource.substitutions.BRANCH_NAME` 
- **Build status**: `buildResource.status`

So let's access the variables now:

```javascript
// If using Github as your source repository 
repoName = buildResource.substitutions.REPO_NAME;
branch = buildResource.substitutions.BRANCH_NAME;

// If using Cloud Source Repository
repoName = buildResource.source.repoSource.repoName;
branch = buildResource.source.repoSource.branchName;

// Doesn't matter where your repository is
status = buildResource.status;
```

### Perform some logic depending on the build status

Now, depending on the build status, we can update the SVG file in GCS that we
will use for our README. If the build succeeds, then we copy over the "success"
badge onto our new badge. The same goes whenever the build fails.

In my workflow, I usually name the output badge as `{repoName}-{branch}.svg`.
Note that we also need to set the resulting object as publicly accessible for
it to show up.

So here's how the update works whenever the build succeeds:

```javascript
const filename = "build/myRepoName-" + branch + ".svg";
const storage = new Storage();

if (repo && branch && status == "SUCCESS") {
    console.log("Detected a successful build!")
    // Copy file from our success.svg template onto
    // {repoName}-{branch}.svg
    storage
        .bucket("my-bucket")
        .file("build/success.svg")
        .copy(storage.bucket("my-bucket").file(filename))
    // Set the output artifact to public        
    storage
        .bucket("my-bucket")
        .file(filename)
        .makePublic(function(err, apiResponse) {});
}
```

Then we just repeat the same thing whenever the build fails. In this case, we
just change the status string to `"FAILURE"` and copy over `build/failure.svg`
to our `filename`.

If you want to see the full template for writing a Cloud Function, you
can definitely check the gist below, and this small project of mine called
[cloud-build-badge](https://www.npmjs.com/package/cloud-build-badge)[^3]!

<script src="https://gist.github.com/ljvmiranda921/419e7c078d98069e8fc145d6cf0b540c.js"></script>

## Step 3: Deploy and trigger a build 

Recall that your cloud function should be stored either in `index.js` or
`function.js`. This is crucial because the deployment tool will look for
these files and vomit an error if not found. To deploy your function, execute
the following command:

```shell
gcloud functions deploy myFunction              \
    --runtime nodejs6                           \
    --trigger-resource cloud-builds             \
    --trigger-event google.pubsub.topic.publish \
```

You can find the official documentation for `gcloud functions deploy`
[here](https://cloud.google.com/sdk/gcloud/reference/functions/deploy).
If deployment is successful, you should see an SVG file in your GCS bucket
that you can use for your markdown READMEs!

## Summary

In this tutorial, we have learned how to add status badges to our Google Cloud
Builds using Cloud Functions and PubSub.  The main idea is that we copy over
the appropriate badge (stored in GCS) into the new badge given the latest
build's status. To accomplish that, we wrote a Cloud Functions script that
reads the build status as a PubSubMessage and applies the appropriate logic
depending on the result. The final product is a continually updating status
badge for our specific project and branch that we can use in our READMEs!

### Footnotes

[^1]: I chose to write in Javascript because I want to use this project as an opportunity to learn the language.
[^2]: If your repository is in [Cloud Source Repositories](https://cloud.google.com/source-repositories/), you need to use `buildResource.source.repoSource` to access the repository and branch respectively (`repoName`, `branchName`). 
[^3]: `cloud-build-badge` was actually inspired by Samuel Sendelback's [tutorial on creating cloud build badges](https://github.com/sbsends/cloud-build-badge) in 2 minutes. I decided to create a more verbose version of his work in this blog, and an easy tool to create deploy functions using the npm package.

