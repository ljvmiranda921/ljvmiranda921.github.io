---
layout: post
title: "Neural Network for Solving the Two Spiral Problem"
date: 2017-01-17
---

This is a simple implementation of a 2-M-1 neural network trained using different optimization algorithms in order to solve the two-spiral problem. The two-spiral problem is a particularly difficult problem that requires separating two logistic spirals from one another [1] [2]. 

![Two Spiral Problem](http://i.imgur.com/AB14SHCl.png)  

## Optimization Algorithms:
1. Particle Swarm Optimization  
Particle swarm optimization is a population-based search algorithm that is based on the social behavior of birds within a 
flock. In PSO, the particles are scattered throughout the hyperdimensional search space. These particles use the results found 
by the others in order to build a better solution.

2. Differential Evolution  
As a member of a class of different evolutionary algorithms, DE is a population-based optimizer that generates perturbations
given the current generation. But instead of generating vectors using samples from a predefined probability functions, 
DE perturbs vectors using the scaled difference of two randomly population vectors. 

3. Function Minimization by Conjugate Gradients  
 It is a quadratically convergent process for locating an unconstrained local minimum of a function of n arguments. It uses the 
 cost function as its objective function, and the gradient (solved using backpropagation), to find the minima.  

## Methodology:
**Parameter Setting:**  
Both PSO and DE have different parameters that one can experiment on. In this implementation, the parameters present are summarized in the table below

**Particle Swarm Optimization**   

| Parameter       | Description                                              |
|-----------------|----------------------------------------------------------|
| `maxIter`       | Number of iterations that the PSO algorithm will run     |
| `swarmSize`     | Number of particles in the search space.                 |
| `epsilon`       | Scattering degree of the particles during initialization |
| `c_1`           | Cognitive component (exploration parameter).             |
| `c_2`           | Social component (exploitation parameter).               |
| `inertiaWeight` | Inertia weight that controls the movement of particles.  |

**Differential Evolution**  

| Parameter        | Description                                              |
|------------------|----------------------------------------------------------|
| `genMax`         | Number of generations that the DE algorithm will run     |
| `population`     | Number of particles in the search space.                 |
| `epsilon_de`     | Scattering degree of the particles during initialization |
| `mutationF`      | Degree of mutation effect (exploration parameter)        |
| `recombinationC` | Degree of recombination effect (exploitation parameter)  |

## Implementation Notes:
Generalization Ability  
1. **Particle Swarm Optimization** (84.86%)  
![Generalization ability of PSO](http://i.imgur.com/JtMGhr8l.png)  
2. **Differential Evolution** (84.102%)  
![Generalization ability of DE](http://i.imgur.com/oEHj0Dhl.png)
3. **Minimize Nonlinear Conjugant Gradient** (100.00%)  
![Generalization ability of FMINCG](http://i.imgur.com/SIGJKSal.png)

## References 
[1] Kevin J. Lang and Michael J. Witbrock: Learning to Tell Two Spirals Apart. In: *Proceedings of the 1988 Connectionist Models Summer School*, Morgan Kauffman, 1998.  
[2] http://www.ibiblio.org/pub/academic/computer-science/neural-networks/programs/bench/two-spirals  
