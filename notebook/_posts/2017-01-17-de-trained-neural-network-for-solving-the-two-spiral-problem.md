---
layout: post
title: "Training a neural network using differential evolution"
date: 2017-01-17
category: notebook
comments: true
author: "LJ MIRANDA"
description: "Trained a neural network using differential evolution (DE) to solve the two-spiral problem"
math: true
---

This is a simple implementation of a 2-16-1 neural network trained using
Particle Swarm Optimization in order to solve the two-spiral problem. The
$$\sin(z)$$ and $$\sigma(z)$$ activation functions were used for the
input-hidden and hidden-output layers respectively. The cross-entropy error was
used as the cost function. The two-spiral problem is a particularly difficult
problem that requires separating two logistic spirals from one another (Lang
and Witbrock, [1998](#lang1998learning)).

![Two Spiral Problem](https://i.imgur.com/AB14SHCl.png)  
__Figure 1:__ _Graph of the Two-Spiral Problem_
{: style="text-align: center;"}

## Differential Evolution
As a member of a class of different evolutionary algorithms, DE is a
population-based optimizer that generates perturbations given the current
generation (Price and Storn, [2005](#price2005differential)). But instead of
generating vectors using samples from a predefined probability functions, DE
perturbs vectors using the scaled difference of two randomly population
vectors.

Differential Evolution produces a trial vector, $$\mathbf{u}_{0}$$, that
competes against the population vector of the same index. Now, once the last
trial vector has been tested, the survivors of the pairwise competitions
become the parents for the next generation in the evolutionary cycle.

## Methodology
For Differential Evolution, a three step process will be done. First, we will
initialize the population, set-up the optimization system, and then tune the
hyperparameters. Initialization will be based from a Gaussian distribution,
while the tuning will involve the mutation and recombination parameters.

Our neural network simply consists of one hidden layer with a $$sin(x)$$
activation function (Sopena, Romero, et al.,
[1999](#sopena1999neural)).

### Initialization
For any particle $$n = 1,2, \dots , N$$, its position $$P$$ at time-step
$$t$$ with respect to the ANN parameters are expressed as:

$$
P_{n,t} \equiv \begin{bmatrix}
\Theta_{11}^{(1)} & \Theta_{12}^{(1)} & \dots & \Theta_{ij}^{(1)}\\
\Theta_{11}^{(2)} & \Theta_{21}^{(2)} & \dots & \Theta_{jk}^{(2)}
\end{bmatrix}
$$

The particle matrix __P__ was initialized using uniform distribution. This is
to maximize the exploration capability of the particles over the search space
by distributing it evenly. Using a Gaussian distribution to initialize the
particles will "scatter" it in a centered weight , reducing the exploration
capacity.

### Optimization System  
1. __Mutation:__ For mutation, three random vectors are chosen, and relate
them in order to produce the donor vector ,$$v_{i,G+1}$$. This method is
controlled by the parameter $$F$$ ($$F \in [0,2]$$). The equation for
producing the donor vector is $$v_{i,G+1} = x_{r1,G} + F (x_{r2,G} -
x_{r3,G})$$

2. __Recombination:__ For recombination, the trial vector is built using the
elements of the donor vector (donorVec) and the elements of your target
vector. This means that for each particle in the population (for each row of
particle) and for each dimension of that particle (for each column of each
row of particle), a comparison is made with respect to the parameter $$CR$$.

3. __Selection:__ For selection, the target vector is then compared against
the trial vector if the fitness value is less than the computed fitness of
the target, then that particle is replaced with the one captured from the
trial vector. After all particles are tested, we then have the second
generation.

### Implementation Parameters  

|------------------+----------------------------------------------------------|
| Parameter        | Description                                              |
|------------------|----------------------------------------------------------|
| `genMax`         | Number of generations that the DE algorithm will run     |
| `population`     | Number of particles in the search space.                 |
| `epsilon_de`     | Scattering degree of the particles during initialization |
| `mutationF`      | Degree of mutation effect (exploration parameter)        |
| `recombinationC` | Degree of recombination effect (exploitation parameter)  |
|------------------+----------------------------------------------------------|  
{: .table}
__Table 1:__ _Parameters used in DE Implementation_
{: style="text-align: center;"}


### Tuning the mutation and recombination parameters
Here, I swept over different values of $$m$$ and $$c$$ in order to find good
values for my final model.

![Cmatrix for DE params](/assets/png/nn/cmatrix2.png){:width="320px"}       
__Figure 2:__ _Heat Map for testing the mutation and recombination parameters_
{: style="text-align: center;"}

As shown, it may be better to use lower mutation values coupled with very low
recombination values.


## Results:
The best score that was achieved using this optimization algorithm is
84.8684% recall. The figure below shows the generalization ability that the
algorithm can attain. Moreover, the table below shows the values I set for
the parameters.

|------------------+----------------------------------------------------------|
| Parameter        | Value                                                    |
|------------------|----------------------------------------------------------|
| `genMax`         | 5,000                                                    |
| `population`     | 20                                                       |
| `epsilon_de`     | 0.1                                                      |
| `mutationF`      | 0.19                                                     |
| `recombinationC` | 0.07                                                     |
|------------------+----------------------------------------------------------|
{: .table}
__Table 2:__ _Parameter Values for DE Implementation_
{: style="text-align: center;"}

![Generalization ability of DE](https://i.imgur.com/oEHj0Dhl.png){:width="640px"}  
__Figure 3:__ _Generalization ability of the DE-trained Neural Network over the whole space_
{: style="text-align: center;"}


## Conclusion
Using the differential evolution to train a neural network is much faster as
compared to PSO. However, one problem with PSO is on how the production of a
_completely new_ generation is affected by the population size $$N$$. Because
each vector is being replaced one by one, it may also require $$N$$
iterations in order to fully replace the current generation and find a more
suitable candidate solution.

In terms of performance, DE and PSO's best solutions are not really that far
apart. Although these values are achieved in different iterations, i.e., DE
needing more time to get to converge to a better solution. In my opinion, it
is also possible to modify the DE algorithm by taking into consideration the
gradient produced by backpropagation. This gradient may be used as a scale to
"mutate" the donor vector, thus making the mutated vectors much better.
Although this gradient needs to be modified so that the stochastic element is
still present.

## References
- <a id="sopena1999neural">Sopena, J.M., Romero, E. and Alquezar, R.</a>
  (1999). “Neural networks with periodic and monotonic activation functions: a
  comparative study in classification problems”. In: *ICANN Ninth International Conference on Artificial Neural Networks*.
- <a id="lang1998learning">Lang, K.J. and Witbrock, M.J.</a> (1988).
  "Learning to Tell Two Spirals Apart". In: *Proceedings of the 1988
  Connectionist Models Summer School*
- <a id="price2005differential">Price, K.V., Storn, R.M., and Lampinen,
  J.A.</a> (2005). *Differential Evolution: A Practical Approach to Global
  Evolution*, Springer.

You can access the gist [here.](https://gist.github.com/ljvmiranda921/53939299b9e67f0df082e0127c7f229d)
