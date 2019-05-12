---
layout: post
title: "Solving the travelling salesman problem using ant colony optimization"
date: 2017-01-18
category: notebook
comments: true
author: "LJ MIRANDA"
description: "Solution for the berlin52 travelling salesman problem using ant colony optimization"
---

This is an implementation of the Ant Colony Optimization to solve the
Traveling Salesman Problem. In this project, the `berlin52` dataset that maps
52 different points in Berlin, Germany was used.

![Berlin52](https://i.imgur.com/tqkRm4dl.png)  
__Figure 1:__ _Graph of the Berlin52 Dataset_
{: style="text-align: center;"}

## Ant Colony Optimization
The Ant Colony Optimization algorithm is inspired by the foraging behaviour
of ants (Dorigo, [1992](#dorigo1992optimization)) . The behavior of the ants are controlled by two main parameters:
$$\alpha$$, or the pheromone's attractiveness to the ant, and $$\beta$$, or
the exploration capability of the ant. If $$\alpha$$ is very large, the
pheromones left by previous ants in a certain path will be deemed very
attractive, making most of the ants divert its way towards only one route
(exploitation), if $$\beta$$ is large, ants are more independent in finding
the best path (exploration). This ACO implementation used the Ant-System (AS)
variant where the movement from node $$i$$ to node $$j$$ is defined by:

$$
p_{ij}^{k}(t)=  \begin{cases}
      \dfrac{\tau_{ij}^{\alpha}(t)\eta_{ij}^{\beta}(t)}{\sum_{u \in \mathcal{N}_{i}^{k}(t)} \tau_{iu}^{\alpha}(t)\eta_{iu}^{\beta}(t)} &if~~~ j \in \mathcal{N}_{i}^{k}(t) \\
      0 &if~~~ j \not\in \mathcal{N}_{i}^{k}(t)
   \end{cases}
$$


## Methodology
As mentioned, the $$\alpha$$ and $$\beta$$ parameters control the
exploitation and exploration behaviour of the ants by setting the
attractiveness of pheromone deposits or the "shortness" of the path (Engelbrecht, [2007](#engelbrecht2007computational)). The
graphs below (in clockwise order, starting from the upper left) describe the
_(i)_ city locations, the _(ii)_ solution found by the algorithm, the _(iii)_
(mean) behaviour of the ants, and the _(iv)_ minimum tour distance for each
iteration.

### Increased exploration
__Parameters:__ $$\alpha$$ = 15, $$\beta$$ = 20, $$\rho$$ = 0.15
![ACO Test 1](https://i.imgur.com/lVuDTDkl.png)  
__Figure 2:__ _ACO Simulation when the exploration parameter is higher_
{: style="text-align: center;"}

### Increased exploitation
__Parameters:__ $$\alpha$$ = 20, $$\beta$$ = 15, $$\rho$$ = 0.15
![ACO Test 2](https://i.imgur.com/SnW6hVll.png)  
__Figure 3:__ _ACO Simulation when the exploitation parameter is higher_
{: style="text-align: center;"}

The `rho` parameter controls the evaporation of pheromone for each time step
$$t$$. In this case, setting a small `rho` leads to a slow evaporation of the
pheromones, which affects the ants' exploitation ability as shown below. On
the other hand, setting a very high evaporation coefficient makes the
pheromones for each time step evaporate quickly. This means that ants are
constantly doing random searches for each iteration.

### Increased pheromone evaporation rate
__Parameters:__ $$\alpha$$ = $$\beta$$ = 15, $$\rho$$ = 0.8
![ACO Test 3](https://i.imgur.com/1mqQCyrl.png)  
__Figure 4:__ _ACO Simulation when pheromone evaporation is high_
{: style="text-align: center;"}

### Decreased pheromone evaporation rate
__Parameters:__ $$\alpha$$ = $$\beta$$ = 15, $$\rho$$ = 0.01
![ACO Test 4](https://i.imgur.com/ISCpfpkl.png)  
__Figure 4:__ _ACO Simulation when pheromone evaporation is low_
{: style="text-align: center;"}

## Results
The best solution for ACO was __7548.9927__ _(the optimal solution achieved by current research so far is 7542.00)_ . It was obtained with the following parameters:

|----------------------------------------+-------|
| Parameter                              | Value |
|----------------------------------------|-------|
| Iterations                             | 500   |
| Colony Size                            | 0.7   |
| Evaporation Coefficient, $$\rho~~~$$   | 0.1   |
| Pheromone Attraction, $$\alpha$$       | 15    |
| Short-Path Bias, $$\beta$$             | 200   |
|----------------------------------------+-------|
{: .table}
__Table 1:__ _ACO Parameters that was used in the implementation_
{: style="text-align: center;"}

![ACO Best](https://i.imgur.com/neFD3JDl.png)  
__Figure 5:__ _ACO Best Solution_
{: style="text-align: center;"}

## Conclusion

In this ACO implementation, arriving at the best solution requires balancing
the exploitation-exploration tradeoff. Setting the evaporation coefficient
low makes the pheromones stay longer. However, this was balanced by setting
the path bias of the colony very high, so that they get to explore more
options near the route with the highest pheromone concentration (instead of
causally settling in it). In contrast with the GA implementation, ACO is much
easier to control. There are few parameters needed and the exploration
capability doesn't necessarily go out of control. It also helps that the ants
are randomly placed in different areas of the map and allowed to make a
"guided" initial tour. This makes the initial values much lower as compared
in the case of GA where initial costs are very high if a greedy search is not
first implemented to construct the initial tour.

## References

- <a id="engelbrecht2007computational">Engelbrecht, Andres</a> (2007). *Computational Intelligence: An Introduction*, John Wiley & Sons.
- <a id="dorigo1992optimization">Dorigo, Marco</a> (1992). *Optimization, Learning, and Natural Algorithms*, PhD Thesis, Politecnico di Milano.

You can access the gist [here.](https://gist.github.com/ljvmiranda921/ca93059bc213531fd99af22955b6bf5f)
