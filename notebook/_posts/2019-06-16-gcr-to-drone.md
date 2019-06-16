---
layout: post
title: "How to pull a private image from GCR in Drone CI"
date: 2019-06-16
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [drone ci, gcr, google cloud, google, google container registry, image, docker, private, pull]
---

[Drone CI](https://drone.io/) is probably one of the best continuous
integration tools out there.  It's lightweight, [free for
open-source](https://cloud.drone.io/), and extensible. In TM, we use Drone
Cloud for our open-source projects but also maintain an internal Drone server
residing in a [Google Compute Engine (GCE)](https://cloud.google.com/compute/)
instance.

In Drone, each step occurs inside a Docker container. Everything is
straightforward if the image is public, but sometimes, we need Drone to pull
images from our private [Google Container Registry
(GCR)](https://cloud.google.com/container-registry/), and use it for downstream
tasks (build, checks, etc.). To achieve that, we need to do the following:

1. Create a [service
   account](https://cloud.google.com/iam/docs/understanding-service-accounts)
   with the `Storage.Viewer` scope. Then, download a JSON key for that account.
2. In the console (preferably Cloud Shell), login to Docker using that key:

    ```shell
    $ docker login -u _json_key --password-stdin https://gcr.io <
    service-account.json
    ```
    Then, check if there is a `gcr.io` entry in your `$HOME/.docker/config.json` 

3. Go to Drone CI and add `$HOME/.docker/config.json` as a secret. At this time
   of writing, you can just copy the contents from that file to the secrets
   text box. Then, refer it to your `.drone.yml` in the `image_pull_secrets` key:

   ```yaml
   kind: pipeline
   name: default

   steps:
    - name: build
      image: gcr.io/my-private-image
      commands:
      - go build
      - go test

   image_pull_secrets:
    - dockerconfigjson
   ```

  In the example above, we named our `config.json` secret as
  `dockerconfigjson`. Then we put that value inside `image_pull_secrets`.

*Et voilà!*, Drone should be able to pull your private image from `gcr.io` and
perform the steps necessary to complete your pipeline. It definitely sounds
straightforward but it took me the whole night to figure that out! 

## Notes 

- If you are just going to pull images from GCR, then limit the scope to
    `Storage.Viewer`. Here, we're following the principle of least privileges.
- We're setting the scope to `Storage` because as it turns out, the "layers" of
    the image and its corresponding artifacts are all stored in a Google Cloud
    Storage (GCS) bucket.
- There's already an [official documentation](https://docs.drone.io/user-guide/pipeline/secrets/#image-pull-secrets) regarding this how-to, but I'm hoping we have something that is specific to the Google Cloud Platform.
- The Drone creator posted an early version of the official documentation in
    their [discourse page](https://discourse.drone.io/t/how-to-pull-private-images-with-1-0/3155). He mentioned that we need to enable the secret for pull requests. I'm doing that on my case.
- I highly recommend doing the login step in Cloud Shell so as to not pollute
    your Docker config inside your local machine. Of course, you can just login
    or logout as needed but in Cloud Shell, everything is isolated.
- The docker configuration file, `$HOME/.docker/config.json` looks something like this: 

    ```
    {
        "auths": {
                "https://index.docker.io/v1/": {
                        "auth": "YW11cmRhY2E6c3VwZXJzZWNyZXRwYXNzd29yZA=="
                }
        }
    }
    ```

    If Step 2 succeeds, you should see an entry for `gcr.io`. The `"auth"` key
    is *very long*. On my end, I saw that there are other keys in my config
    file. I just ignored that and copied the `"auths"` part.

Hope you learned a lot!
