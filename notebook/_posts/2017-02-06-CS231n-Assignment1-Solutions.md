---
layout: post
title: "Notes on CS231n Assignment 1"
date: 2017-02-06
category: notebook
comments: true
---

> *I am currently following the [course notes](http://cs231n.github.io/) of CS231n: Convolutional Neural Networks for Visual Recognition in
Stanford University. There are programming exercises involved, and I wanted to share my solutions to some of the problems.*

The [first assignment](http://cs231n.github.io/assignments2016/assignment1/) is aimed at understanding the image classification pipeline that is based on the k-Nearest Neighbor and the SVM/Softmax classifier. It is divided into four parts:

- [Implementing a k-Nearest Neighbor classifier](#implementing-a-knn-classifier)
- [Training a Support-Vector Machine](#svm)
- [Implementing a Softmax classifier](#softmax)
- [Two-Layer Neural Network](#ann)

## Implementing a kNN Classifier
[Post](https://ljvmiranda921.github.io/cs231n/assignment1/knn/) | [IPython notebook](https://github.com/ljvmiranda921/cs231n-assignments/blob/master/assignment1/knn.ipynb)  
_Completion Date:_ February 9, 2017  
k-Nearest Neighbors was implemented in order to classify the examples in the CIFAR-10 dataset. The exercise involves the computation of the L2 Distance using two loops, one loop, and no loop (or vectorized implementation). Cross-validation was also implemented in order to find the best value of k.

## <a name="svm"></a> Training a Support-Vector Machine
[Post](https://ljvmiranda921.github.io/cs231n/assignment1/svm/) | [IPython notebook](https://github.com/ljvmiranda921/cs231n-assignments/blob/master/assignment1/svm.ipynb)  
_Completion Date:_ February 11, 2017  
A Support Vector Machine (SVM) was trained using stochastic gradient descent (SGD). The exercise involves the computation of the loss and gradient, and the implementation of the optimization algorithm SGD. Hyperparameters such as the learning rate and regularization strength were tuned to arrive at a better prediction accuracy.

## <a name="softmax"></a> Implementing a Softmax Classifier
[Post](https://ljvmiranda921.github.io/cs231n/assignment1/softmax/) | [IPython notebook](https://github.com/ljvmiranda921/cs231n-assignments/blob/master/assignment1/softmax.ipynb)  
_Completion Date:_ February 14, 2017  
A Softmax classifier was implemented using the cross-entropy loss function. This exercise involves the implementation of the loss and
gradient computation for the cross-entropy function.

## <a name="ann"></a> Two-Layer Neural Network
[Post](https://ljvmiranda921.github.io/cs231n/assignment1/ann/) | [IPython notebook](https://github.com/ljvmiranda921/cs231n-assignments/blob/master/assignment1/two_layer_net.ipynb)  
_Completion Date:_ February 17, 2017  
A Two-Layer neural network was implemented with a ReLU in the hidden layer and Softmax Loss in the output layer. Computations for the forward and backward passes were implemented for the network, including the loss and gradient computation. The hyperparameters were tuned and the weights were visualized to show the effects of hypeparameter tuning to the weights in the network.
