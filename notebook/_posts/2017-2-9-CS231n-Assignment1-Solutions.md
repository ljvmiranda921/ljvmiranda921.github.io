---
layout: post
title: "CS231n Assignment#1 Solutions"
date: 2017-02-09
category: notebook
comments: true
---

*I am currently following the [course notes](http://cs231n.github.io/) of CS231n: Convolutional Neural Networks for Visual Recognition in
Stanford University. There are programming exercises involved, and I wanted to share my solutions to some of the problems.*

The [first assignment](http://cs231n.github.io/assignments2016/assignment1/) is aimed at understanding the image classification pipeline that is based on the k-Nearest Neighbor and the SVM/Softmax classifier. It is divided into five parts:

- [Implementing a k-Nearest Neighbor classifier](#implementing-a-knn-classifier)
- Training a Support-Vector Machine _(In-progress)_
- Implementing a Softmax classifier _(In-progress)_
- Two-Layer Neural Network _(In-progress)_
- Higher Level Representations _(In-progress)_

## Implementing a kNN Classifier
[Post](https://ljvmiranda921.github.io/) | [IPython notebook](https://github.com/ljvmiranda921/cs231n-assignments/blob/master/assignment1/knn.ipynb)  
k-Nearest Neighbors was implemented in order to classify the examples in the CIFAR-10 dataset. The exercise involves the computation of the L2 Distance using two loops, one loop, and no loop (or vectorized implementation). Cross-validation was also implemented in order to find the best value of k.
