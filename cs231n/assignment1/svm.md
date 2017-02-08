---
layout: post
title: "Multiclass Support Vector Machines"
date: 2017-02-11
category: notebook
comments: true
---
<sup>[CS231n: CONVOLUTIONAL NEURAL NETWORKS FOR VISUAL RECOGNITION](https://ljvmiranda921.github.io/notebook/2017/02/06/CS231n-Assignment1-Solutions/)</sup>

In this notebook, a Multiclass Support Vector Machine (SVM) will be implemented. In particular, a linear SVM will be used. Linear classifiers differ from k-NN in a sense that instead of memorizing data every run, the classifier creates a "hypothesis" on the data called a _parameter_, and adjusts it accordingly during training time. This "adjustment" is done through an optimization algorithm, in this case, via Stochastic Gradient Descent (SGD). The full implementation will be done through the following steps:

- Data Loading and Preprocessing
  - Splitting and reshaping the data
  - Computing and subtracting the mean image
- SVM classifier Implementation
  - Gradient computation
  - Vectorized implementation of loss and gradient computation
- Stochastic Gradient Descent
- Tuning the hyperparameters
- Results
