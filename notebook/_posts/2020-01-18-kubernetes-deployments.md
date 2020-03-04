---
layout: post
title: "Kubernetes clicked when I learned about Deployments and Services"
date: 2020-01-18
category: notebook
comments: true
author: "LJ MIRANDA"
tags: [kubernetes, deployments, services, k8s, cloud-native, cloud computing]
description: |
    I've been using Kubernetes for a few months, but this tech only *clicked*
    when I learned about Deployments and Services. I argue that all
    "Introduction to Kubernetes" tutorials should start with that.
header-img: /assets/png/kubernetes-deployments/header.png
excerpt: "I should've first learnt Kubernetes through Deployments and Services"
---

![](/assets/png/kubernetes-deployments/pirate_focused.svg){:width="320px"}
{: style="text-align: center;"}

It took me a long time to wrap my head around the idea of
[Kubernetes](https://kubernetes.io/). Even if I've done some projects using k8s
before, there's still this voice at the back of my head saying: *"Ok, I really
don't know how this whole thing works."* 

A few months ago, I
learned about
[Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
and
[Services](https://kubernetes.io/docs/concepts/services-networking/service/),
and everything suddenly clicked!

In this blogpost, I'll talk about my journey in understanding Kubernetes&mdash;where
learning Pods and Nodes proved to be a false start&mdash;and why I think that
Deployments and Services is a good place to begin. Lastly, I'd argue that k8s
*may* be better taught first with the concept of Deployments and Services![^1] 


This post is divided into two parts:
- [Why starting with Pods and Nodes didn't help me](#pods-or-nodes)
- [Why starting with Deployments and Services clicked right away](#deployments-and-services)

Before we begin, a little something about myself: before learning Kubernetes,
I'm already familiar with container tools such as Docker and docker-compose.
I've built simple web applications before and deployed them to platforms like
[Heroku](https://www.heroku.com/) or [App Engine](https://cloud.google.com/appengine/) so I kinda get the idea of "putting something in the
internet." Perhaps this has affected my learning trajectory for k8s, and might
be different for you or your team.

Lastly, this is not a tutorial about Deployments & Services nor Kubernetes as
a whole. **Here, I'll try to be reflective but informative.** I may be explaining
some terminologies along the way, but will pull-in Kubernetes concepts here
and there.

## <a name="pods-or-nodes"/> Why starting with Pods or Nodes didn't help me

### Pods are simple at first, but overloads you after a while

Most tutorials I've seen in the Internet starts with a
[Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/), and for good
reason: because you can think of Pods as a basic unit in Kubernetes. In many
cases, a Pod is often mapped to a container&mdash;and hey, Kubernetes is a
*container* orchestration tool! 

*Ok, that's cool! I can now map what I know to this new Kubernetes concept!* So
where did the confusion began? It began when I saw notes like these:

> "Pods (can) run multiple containers that need to work together." [("Understanding Pods", Kubernetes Documentation)](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/#understanding-pods)

It's not bad, but it sets off a *conceptual alarm* that Pods may
not be as straightforward as what they appear to be. This proved to be true
because in practice, you don't directly work with Pods, you
delegate a Controller to manage them for you.

> "Kubernetes uses a higher-level abstraction, called a Controller, that
> handles the work of managing the relatively disposable Pod instances. Thus,
> while it is possible to use Pod directly, it’s far more common in Kubernetes
> to manage your pods using a Controller." [("Working with Pods", Kubernetes
Documentation)](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/#working-with-pods)

<!-- Insert animation of "now I need to learn another concept just to apply
this new concept I've learned???" -->

(With the gift of hindsight, this statement hinted the idea of Deployments.) 

I think the main reason why Pods are a poor starting point in learning
Kubernetes is because **it does not provide an "actionable" mapping of what I
already know and what I'm trying to learn.** Even if I now know that a Pod is a
basic unit and it maps to a container, it is not actionable enough that I can
apply this knowledge when using Kubernetes. On another note, starting from Pods
will inadvertently add another hoop to jump into&mdash; I need to now know what
Controllers are, and there's [three of
them](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/#pods-and-controllers)
for my novice mind to learn.

### Nodes pull you into the architecture rabbit-hole

Just like Pods,
[Nodes](https://kubernetes.io/docs/concepts/architecture/nodes/) are
unassuming: they're just worker machines where processes are run. The
documentation says that they may be "a VM or a physical machine depending on the
cluster." As someone who used to SSH into VMs and run
Python programs, Nodes may be a relatable starting point.

<!-- Insert animation of me SSH-ing into VMs -->

However, as I scrolled through the documentation, I saw things about external
IPs, memory, PID pressure, and whatnot. Upon seeing these words, I was
intimidated. *Wait! I thought one benefit of "Serverless and The Cloud" is
that I don't need to think about what's happening in my machine?* The concept
of Nodes got a bit too low-level right away that I was sucked into the
`kubelet` rabbit-hole and enrolled myself into a ["Learn Kubernetes the Hard
Way"](https://github.com/kelseyhightower/kubernetes-the-hard-way) course in
[LinuxAcademy](https://linuxacademy.com/) (which I wasn't able to finish by the
way). 

The problem with Nodes is that they are **too low-level of an abstraction for
me to get started.** Even if it's a natural progression from virtual machines 
conceptually, it didn't lead me to do what I need to do, that is, to *just* deploy an
application. 

### Some things are good conceptually but bad practically 

Understanding Pods and Nodes are good conceptually, since they are a natural
progression of what I know so far: Docker containers can be mapped into Pods, and
the machines where these containers are run can be mapped into Nodes. However in
practice, this bottom-up approach didn't help because **there's more to
Kubernetes than Pods and Nodes**. If I want to deploy an application, there's
a lot of things I still need to think about. 

In the next section, I'll discuss why the concept of Deployments and Services
provide the "right amount of abstraction" in order for me to (1) understand
what's happening and (2) be productive with it right away. On this level, we can
even **consider Deployments as a functional unit of a Kubernetes cluster.**


## <a name="deployments-and-services"/> Why start from Deployments and Services 

By first learning about deployments and services, **I immediately had a handle on
the simplest and oft-used Kubernetes use-case**: "I want to have X in my
cluster."

> The simplest and oft-used Kubernetes use-case: "I want to have X in my
> cluster"

As an illustration, let's say that we are [implementing a task
queue](https://ljvmiranda921.github.io/notebook/2019/11/08/flask-redis-celery-mcdo/),
and we want Redis[^2] inside our cluster. We can easily map this use-case in a
Deployment configuration:

```yaml
# "I want to have Redis in my cluster"
apiVersion: apps/v1
kind: Deployment 
spec:
  # ...
  template:
    spec:
      containers:  # Make me a container... 
      - name: redis   # ...named `redis` based on...
        image: redis  # ..this image
```

In contrast to the Pods analogy, Deployments provide a **one-to-one and
actionable conceptual mapping** of "what you want to do" and "how you can do it."
Every time I want to have X in my cluster, I can just think of any Docker image
at my disposal (e.g. a machine learning service, a node backend, or a Postgres
database).

Next, we can incorporate the idea of Services when we expand the statement
above into: *"I want to have X in my cluster that is accessible via Y."*
Kubernetes is a clever way of orchestrating processes and networks together
where Deployments fill-in the former and Services the latter.

> "I want to have X in my cluster that is accessible via Y."

So if we want to say: "I want to have **Redis** in my cluster that is
accessible **only within the cluster**", then we just map this sentence into a
configuration file consisting of a Deployment and a Service[^3]:

```yaml
# "I want to have <X> Redis in my cluster that is accessible 
# <Y> only within the cluster"
apiVersion: apps/v1
kind: Deployment 
spec:
  # ...
  selector:
    matchLabels:
      app: redis 
  template:
    spec:
      containers:  # Make me a container... 
      - name: redis   # ...named `redis` based on...
        image: redis  # ..this image
---
apiVersion: v1
kind: Service
spec:
  type: ClusterIP
  ports:
    - port: 6379
      targetPort: 6379
  selector:
    app: redis
```

By thinking in terms of Deployments and Services, it is easier to transform a
declaration (*"I want..."*) into a configuration file. In my experience, this
conceptual framework helped me grok the concept of Kubernetes. 

### Why Deployments and Services clicked

There are three reasons why the concepts of deployments and services easily
clicked for me:

1. **It is a direct mapping between "what I want to do" and "how to do it"**.
   As we have seen from the previous examples, it is straightforward and there
   are no conceptual hoops to jump on to. As long as I can declare "I want X in
   my cluster," I can conveniently transform that into a k8s configuration
   file.
2. **It is an easy next-step after learning about Containers**. Deployments
   only care about the container image you have&mdash;plus some other settings that
   you may or may not use. In order to be productive in Kubernetes, I just
   need to know what those settings are (replicas, labels, etc.). It's a small
   delta between Kubernetes and Containers, and it made me productive in k8s
   immediately.
3. **It is easy to onboard people to your infrastructure**. Once I start with
   Deployments and Services, I found it easier to onboard people in my cluster
   setup. I just show them the images I've built and the deployment
   configuration file. Then once I've established their connection, they can
   now work with my cluster immediately. 

## Conclusion

In this blogpost, I talked about my journey in learning Kubernetes, and how
learning about Deployments and Services made k8s concepts suddenly click.
First, I illustrated how Pods and Nodes proved to be false starts: Pods have
"hidden concepts" that overloads you after a while, and Nodes can bring you
into an architecture rabbit-hole. Then, I talked about Deployments and
Services and why we should start with them. It clicked because:
- It provides a direct mapping of what I want to do and how to do it
- It is an easy next-step after learning about Containers, and
- It is easy to onboard people into my cluster setup

Learning Kubernetes was really challenging and fun. It seems that after I
grokked these concepts, I unlocked a whole new world of possibilities! This
made me more excited to work on distributed systems and infrastructure. Wish me
luck!

#### Changelog
* 03-04-2020: Update and flesh-out the conclusion and why it clicked


### Footnotes

[^1]: Kudos to the Kubernetes Documentation team for following a similar pattern in one of their [tutorials!](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
[^2]: Note that whenever we say "I want X," we're referring to a Docker image. Thus, if I say "I want Redis," we're providing Kubernetes a [Docker image of Redis](https://hub.docker.com/_/redis/).
[^3]: See this [post](https://matthewpalmer.net/kubernetes-app-developer/articles/service-kubernetes-example-tutorial.html) for a nice tutorial on Services and Deployments:
