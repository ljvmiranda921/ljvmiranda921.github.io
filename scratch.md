### Experiment on the cloud

A huge component of data science is experimentation. This can come in the form
of feature engineering, hyperparameter optimization, or testing out algorithms
given a domain. As data gets bigger and models require more compute, it is not
enough to perform everything in your local machine. Experimentation workloads
are often delegated into the Cloud. 

|  | Recommendation |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Best Tool of Choice | [Google Colaboratory](https://colab.research.google.com/). With Colab, you have access to powerful hardware to run your experiments on.|
| Runner-up | If you are using Cloud Platforms, I'd recommend checking-out [AWS Sagemaker Notebook Instances](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi.html) or Google Cloud's [AI Platform Notebooks](https://cloud.google.com/ai-platform-notebooks) |

**Here, I'd highly-recommend [Google
Colaboratory](https://colab.research.google.com/) as your daily workhorse.** It
gives you a huge boost with the latest hardware (GPUs, TPUs, you name it!),
while making the user-interface as intuitive as possible. With Colab, you can
organize your notebooks inside a Google Drive folder, and share them as how
you'd share any Google Docs or Slides. I'd say that this *covers almost 80% of
your previous Notebook use-cases.*

For the other 20%, well it varies. If you're used to writing utility Python
modules to reuse code across your work, then Colab may feel unwieldy. In
addition, Git integration is one-way and idle-time force restarts your kernel.
You cannot force your own workflow into Colab&mdash; you have to do it their
way.

Now, if you are using Cloud Platforms such as Amazon Web Services (AWS) or
Google Cloud (GCP), **I'd recommend taking a look at Notebook Instances.** They
are managed Jupyter Notebooks in a server, and you can freely choose your
machine type and do Git integration. Between the two, I prefer SageMaker
notebooks, it's less buggy and more seamless than Google's AI Platform
Notebooks. My tip is to tie-in these Instances with a Git repo. 


### Support for developer workflow

<!-- version control and git integration, docker for repro -->


### Putting them together


### Quick turnaround from analysis to production

<!-- Include tools like papermill, restart and run kernel -->








## Conclusion


<!-- wishlist -->

