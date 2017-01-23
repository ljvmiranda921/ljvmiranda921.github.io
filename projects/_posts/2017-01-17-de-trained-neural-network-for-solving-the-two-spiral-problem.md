---
layout: post
title: "DE-trained Neural Network for Solving the Two Spiral Problem"
date: 2017-01-17
category: projects
---

This is a simple implementation of a 2-M-1 neural network trained using different optimization algorithms in order to solve the two-spiral problem. The two-spiral problem is a particularly difficult problem that requires separating two logistic spirals from one another [1] [2]. 

![Two Spiral Problem](http://i.imgur.com/AB14SHCl.png)  

## Differential Evolution  

As a member of a class of different evolutionary algorithms, DE is a population-based optimizer that generates 
perturbations given the current generation. But instead of generating vectors using samples from a predefined 
probability functions, DE perturbs vectors using the scaled difference of two randomly population vectors.

Differential Evolution produces a trial vector, $$\mathbf{u}_{0}$$, that competes against the population 
vector of the same index. Now, once the last trial vector has been tested, the survivors of the pairwise 
competitions become the parents for the next generation in the evolutionary cycle. 


## Methodology:

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

### DE Set-up  
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
The best score that was achieved using this optimization algorithm is 84.8684% recall. The figure below shows the generalization abiility 
that the algorithm can attain. 

![Generalization ability of DE](http://i.imgur.com/oEHj0Dhl.png)


## Conclusion
Using the differential evolution to train a neural network is much faster as compared to PSO. However, one problem with PSO is on how the production 
of a _completely new_ generation is affected by the population size $$N$$. Because each vector is being replaced one by one, it may also 
require $$N$$ iterations in order to fully replace the current generation and find a more suitable candidate solution. 

In terms of performance, DE and PSO's best solutions are not really that far apart. Although these values are achieved in different 
iterations, i.e., DE needing more time to get to converge to a better solution. In my opinion, it is also possible to modify the 
DE algorithm by taking into consideration the gradient produced by backpropagation. This gradient may be used as a scale to "mutate" 
the donor vector, thus making the mutated vectors much better. Although this gradient needs to be modified so that the stochastic element is still present.


## References 
[1] Kevin J. Lang and Michael J. Witbrock: Learning to Tell Two Spirals Apart. In: *Proceedings of the 1988 Connectionist Models Summer School*, Morgan Kauffman, 1998.  
[2] http://www.ibiblio.org/pub/academic/computer-science/neural-networks/programs/bench/two-spirals   
 
You can access the repository [here.](https://github.com/ljvmiranda921/two-spiral-neural-net)
