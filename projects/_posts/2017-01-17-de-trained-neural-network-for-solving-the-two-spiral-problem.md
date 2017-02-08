---
layout: post
title: "DE-trained Neural Network for Solving the Two Spiral Problem"
date: 2017-01-17
category: projects
comments: true
---

This is a simple implementation of a 2-16-1 neural network trained using Particle Swarm Optimization in order to solve the two-spiral problem. The $$\sin(z)$$ and $$\sigma(z)$$ activation functions were used for the input-hidden and hidden-output layers respectively. The cross-entropy error was used as the cost function. The two-spiral problem is a particularly difficult problem that requires separating two logistic spirals from one another [1] [2].

![Two Spiral Problem](http://i.imgur.com/AB14SHCl.png)  
__Figure 1:__ _Graph of the Two-Spiral Problem_
{: style="text-align: center;"}  


## Table of Contents
---
1. [Introduction: Differential Evolution](#differential-evolution)
2. [Methodology](#methodology)
  - [Initialization of candidate solutions](#initialization)
  - [Implementation parameters](#implementation-parameters)
  - [Parameter Tuning: Mutation and Recombination](#tuning-the-mutation-and-recombination-parameters)
  - [Optimization System Set-up](#optimization-system)
3. [Results](#results)
4. [Conclusion](#conclusion)



## Differential Evolution  
As a member of a class of different evolutionary algorithms, DE is a population-based optimizer that generates
perturbations given the current generation. But instead of generating vectors using samples from a predefined
probability functions, DE perturbs vectors using the scaled difference of two randomly population vectors.

Differential Evolution produces a trial vector, $$\mathbf{u}_{0}$$, that competes against the population
vector of the same index. Now, once the last trial vector has been tested, the survivors of the pairwise
competitions become the parents for the next generation in the evolutionary cycle.


## Methodology  

### Initialization
For any particle $$n = 1,2, \dots , N$$, its position $$P$$ at time-step $$t$$ with respect to the ANN parameters are expressed as:

$$
P_{n,t} \equiv \begin{bmatrix}
\Theta_{11}^{(1)} & \Theta_{12}^{(1)} & \dots & \Theta_{ij}^{(1)}\\
\Theta_{11}^{(2)} & \Theta_{21}^{(2)} & \dots & \Theta_{jk}^{(2)}
\end{bmatrix}
$$

The particle matrix __P__ was initialized using uniform distribution. This is to maximize the exploration capability of the particles
over the search space by distributing it evenly. Using a gaussian distribution to initialize the particles will "scatter" it in a centered weight
, reducing the exploration capacity.

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

__Table 1:__ _Parameters used in DE Implementation_
{: style="text-align: center;"}

### Tuning the mutation and recombination parameters
Here, I swept over different values of $$m$$ and $$c$$ in order to find good values for my final model.

![Cmatrix for DE params](/res/nn/cmatrix2.png){:height="560px" width="560px"}  
__Figure 2:__ _Value matrix for testing the mutation and recombination parameters_
{: style="text-align: center;"}

As shown, it may be better to use lower mutation values coupled with very low recombination values.


### Optimization System  
1. __Mutation:__ For mutation, three random vectors are chosen, and relate them in order to produce the donor vector
,$$v_{i,G+1}$$. This method is controlled by the parameter $$F$$ ($$F \in [0,2]$$). The equation for producing the
donor vector is $$v_{i,G+1} = x_{r1,G} + F (x_{r2,G} - x_{r3,G})$$

2. __Recombination:__ For recombination, the trial vector is built using the elements of the donor vector (donorVec)
and the elements of your target vector. This means that for each particle in the population (for each row of
particle) and for each dimension of that particle (for each column of each row of particle), a comparison is made with respect to the
parameter $$CR$$.

3. __Selection:__ For selection, the target vector is then compared against the trial vector if the fitness value is less
than the computed fitness of the target, then that particle is replaced  with the one captured from the trial vector.
After all particles are tested, we then have the second generation.


## Results:
The best score that was achieved using this optimization algorithm is 84.8684% recall. The figure below shows the generalization ability that the algorithm can attain. Moreover, the table below shows the values I set for the parameters.

|------------------+----------------------------------------------------------|
| Parameter        | Value                                                    |
|------------------|----------------------------------------------------------|
| `genMax`         | 5,000                                                    |
| `population`     | 20                                                       |
| `epsilon_de`     | 0.1                                                      |
| `mutationF`      | 0.19                                                     |
| `recombinationC` | 0.07                                                     |
|------------------+----------------------------------------------------------|  

__Table 2:__ _Parameter Values for DE Implementation_
{: style="text-align: center;"}

![Generalization ability of DE](http://i.imgur.com/oEHj0Dhl.png)  
__Figure 3:__ _Generalization ability of the DE-trained Neural Network over the whole space_
{: style="text-align: center;"}


## Conclusion
Using the differential evolution to train a neural network is much faster as compared to PSO. However, one problem with PSO is on how the production of a _completely new_ generation is affected by the population size $$N$$. Because each vector is being replaced one by one, it may also require $$N$$ iterations in order to fully replace the current generation and find a more suitable candidate solution.

In terms of performance, DE and PSO's best solutions are not really that far apart. Although these values are achieved in different iterations, i.e., DE needing more time to get to converge to a better solution. In my opinion, it is also possible to modify the DE algorithm by taking into consideration the gradient produced by backpropagation. This gradient may be used as a scale to "mutate" the donor vector, thus making the mutated vectors much better. Although this gradient needs to be modified so that the stochastic element is still present.


## References
+ A. Engelbrecht, *Computational Intelligence: An Introduction*, John Wiley & Sons, Ltd., 2007.  
+ E.B. Baum and K.J. Lang, "Constructing Hidden Units Using Examples and Queries" _Advances
in Neural Information Processing Systems_, vol. 3, pp. 904-910, 1993.
+ J.M. Sopena, E. Romero,R. Alquezar, "Neural networks with periodic and monotonic activation functions: a comparative study in classification problems," _ICANN Ninth International Conference on Artificial Neural Networks_, 1999.
+ K.J. Lang and M.J. Witbrock, "Learning to Tell Two Spirals Apart", in: *Proceedings of the 1988 Connectionist Models Summer School*, Morgan Kauffman, 1998.  
+ K.V. Price, R.M. Storn, J.A. Lampinen, _Differential Evolution: A Practical Approach to Global Evolution_, Springer, 2005.
+ [Two-Spirals in Neural Networks](http://www.ibiblio.org/pub/academic/computer-science/neural-networks/programs/bench/two-spirals), [Accessed: 17 January 2017].   


You can access the repository [here.](https://github.com/ljvmiranda921/two-spiral-neural-net)

***

### Related Posts
- [PSO-trained Neural Network for Solving the Two Spiral Problem](https://ljvmiranda921.github.io/projects/2017/01/17/pso-trained-neural-network-for-solving-the-two-spiral-problem/)
- [Ant Colony Optimization for Solving the Travelling Salesman Problem](https://ljvmiranda921.github.io/projects/2017/01/18/ant-colony-optimization-tsp/)
