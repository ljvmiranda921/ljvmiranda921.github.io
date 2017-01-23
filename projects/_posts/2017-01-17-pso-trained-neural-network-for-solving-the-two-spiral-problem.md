---
layout: post
title: "PSO-trained Neural Network for Solving the Two Spiral Problem"
date: 2017-01-17
category: projects
---

This is a simple implementation of a 2-M-1 neural network trained using Particle Swarm Optimization in order to solve the two-spiral problem. 
The two-spiral problem is a particularly difficult problem that requires separating two logistic spirals from one another [1] [2]. 

![Two Spiral Problem](http://i.imgur.com/AB14SHCl.png)  

## Particle Swarm Optimization:
Particle swarm optimization is a population-based search algorithm that is based on the social behavior of birds within a 
flock. In PSO, the particles are scattered throughout the hyperdimensional search space. These particles use the results found 
by the others in order to build a better solution.

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
  
|-----------------+----------------------------------------------------------|
| Parameter       | Description                                              |
|-----------------|----------------------------------------------------------|
| `maxIter`       | Number of iterations that the PSO algorithm will run     |
| `swarmSize`     | Number of particles in the search space.                 |
| `epsilon`       | Scattering degree of the particles during initialization |
| `c_1`           | Cognitive component (exploration parameter).             |
| `c_2`           | Social component (exploitation parameter).               |
| `inertiaWeight` | Inertia weight that controls the movement of particles.  |
|-----------------+----------------------------------------------------------|



### Tuning the $$c_{1}$$ and $$c_{2}$$ parameters
Here, I sweeped over different values for the social and cognitive components, and came up with this matrix:

![Cmatrix for PSO params](/res/nn/cmatrix.png){:height="560px" width="560px"} 

From this value matrix, it is clear that accuracy may improve with values where the ratio of $$c_{1}$$ and $$c_{2}$$ is 
$$\approx 1$$. Moreover, it also shows that setting a very low cognitive value doesn't improve the solution. 
However, because the value matrix doesn't give anything definitive regarding the settings for $$c_{1}$$ and $$c_{2}$$, 
a more heuristic approach is applied.

### Observation of Swarm Behavior 

Below is a simulation of the behavior of particles when $$c_{1} = 0$$ and $$c_{2} = 0$$

![PSO Run for c1](/res/nn/pso_r_test1_zeroc1.gif){:height="280px" width="280px"} ![PSO Run c2](/res/nn/pso_r_test2_zeroc2.gif){:height="280px" width="280px"}
![PSO Run for c1](/res/nn/pso_r_test1_zeroc1.png){:height="280px" width="280px"} ![PSO Run c2](/res/nn/pso_r_test2_zeroc2.png){:height="280px" width="280px"}  

For a swarm that has no cognitive parameter, the particles tend to move to the global best quite early, resulting to a 
curve that converges easily. On the other hand, for a swarm that has no social parameter, the particles tend to move only 
to their personal bests, without doing an effort to reach the best score found by the whole swarm.  

## Results
The best score that was achieved using this optimization algorithm is 85.5264% recall. The figure below shows the generalization abiility 
that the algorithm can attain. 

![Generalization ability of PSO](http://i.imgur.com/JtMGhr8l.png)  


## Conclusion

One of the main advantage of PSO is that there are only (at a minimum) two parameters to control. Balancing the tradeoff between 
exploitation and exploration is much easier as compared to other algorithms because it is much more intuitive. However, 
initialization is also important in PSO. It matters how the particles are distributed along the search space as it may increase 
or decrease their chances of finding the optimal solution. In this implementation, a small value of $$0.1$$ was used for the spread 
parameter $$\epsilon$$.

Compared with the benchmark solution, the PSO has a tendency to run slower. Moreover, as the number of particles increase, 
the computational time increases because the size of the matrices to be computed also expands. This problem may be solved 
using advanced vectorization techniques in MATLAB, but overall, the PSO runtime often correlates with the swarm size.


## References 
[1] Kevin J. Lang and Michael J. Witbrock: Learning to Tell Two Spirals Apart. In: *Proceedings of the 1988 Connectionist Models Summer School*, Morgan Kauffman, 1998.  
[2] http://www.ibiblio.org/pub/academic/computer-science/neural-networks/programs/bench/two-spirals   
 
You can access the repository [here.](https://github.com/ljvmiranda921/two-spiral-neural-net)
