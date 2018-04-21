---
layout: post
title: "Implementing a softmax classifier"
date: 2017-02-14
category: notebook
comments: true
math: true
author: "LJ MIRANDA"
---

> I am currently following the [course notes](http://cs231n.github.io/) of CS231n: Convolutional Neural Networks for Visual Recognition in Stanford University. There are programming exercises involved, and I wanted to share my solutions to some of the problems.

The Softmax classifier is one of the commonly-used classifiers and can be
seen to be similar in form with the multiclass logistic regression. Like the
linear SVM, Softmax still uses a similar mapping function $$f(x_{i};W) =
Wx_{i}$$, but instead of using the _hinge loss_, we are using the
cross-entropy loss with the form:

$$
L_{i} = -f_{y_{i}} + \log\sum_{j}e^{f_{j}}
$$

Here, $$f_{j}$$ is the j-th element of the vector of class scores $$f$$. In
this implementation of the Sofmax classifier, we perform the following steps:

1. [Naive implementation of the loss function and analytic gradient.](#naive)
2. [Fully-vectorized implementation of the loss function and analytic gradient.](#vector)

Now, I am excluding the "Data Loading and Preprocessing" section because they
are similar with the SVM and kNN implementations. Moreover, the
hyperparameter tuning and results can be seen in my [IPython
Notebook](https://github.com/ljvmiranda921/cs231n-assignments/blob/master/assignment1/softmax.ipynb).
This time, I will be keeping this post short, because _I am so excited to do
the neural networks assignment!!_

## <a name="naive"></a> Naive Implementation

For the loss function, we can simply follow the equations in the [course
notes](http://cs231n.github.io/linear-classify/#softmax). Thus, we can also
write the equation above as:

$$
L_{i} = -\log\dfrac{e^{f_{y_{i}}}}{\sum_{j} e^{f_{j}}}
$$

Now, in the case of the gradient, we can then have the following:

$$
\dfrac{\partial L_{i}}{\partial f_{k}} = p_{k} - 1 (y_{1} = k)
$$

Where $$p_{k}$$ is equivalent to

$$
p_{k} = \dfrac{e^{f_{k}}}{\sum_{j} e^{f_{j}}}
$$

And we simply run this through all examples in our training set:

```python
num_train = X.shape[0]
num_classes = W.shape[1]
loss = 0.0
for i in range(num_train):

  f_i = X[i].dot(W)
  f_i -= np.max(f_i)

  sum_j = np.sum(np.exp(f_i))
  p = lambda k: np.exp(f_i[k]) / sum_j
  loss += -np.log(p(y[i]))

  for k in range(num_classes):
    p_k = p(k)
    dW[:, k] += (p_k - (k == y[i])) * X[i]
```

Notice that the form is similar to the SVM exercise that we had. Moreover,
the $$p_{k}$$ equation above is expressed in code in terms of a lambda
function. This makes everything much easier to do. Lastly, don't forget to
regularize and normalize our `loss` and `dW` before returning them.

```python
# This is implemented outside our
# nested loops
loss /= num_train
loss += 0.5 * reg * np.sum(W * W)
dW /= num_train
dW += reg*W

return loss, dW
```

## <a name="vector"></a> Vectorized Implementation

I honestly found the vectorized implementation way easier than the naive one.
It is because one has to simply follow the equations above. In this case, we
have the following for the loss function:

```python
num_train = X.shape[0]
 f = X.dot(W)
 f -= np.max(f, axis=1, keepdims=True)
 sum_f = np.sum(np.exp(f), axis=1, keepdims=True)
 p = np.exp(f)/sum_f

 loss = np.sum(-np.log(p[np.arange(num_train), y]))
```

And we have the following for the gradient:

```python
ind = np.zeros_like(p)
ind[np.arange(num_train), y] = 1
dW = X.T.dot(p - ind)
```

As usual, we should not forget to regularize and normalize our loss and
gradient matrices.

I am currently keeping this post short because most of the questions and the
exercises are in Softmax are quite similar to SVM. So I just focused on the
more important parts such as the implementation of the loss and gradient.
Furthermore, I've been itching to try out the neural networks assignment
because it will be my first time to implement an ANN manually using Python!
