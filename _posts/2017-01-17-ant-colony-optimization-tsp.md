---
layout: post
title: "Ant Colony Optimization for Solving the Travelling Salesman Problem"
date: 2017-01-17
---

This is an implementation of the Ant Colony Optimization to solve the Traveling Salesman Problem. 
In this project, the `berlin52` dataset that maps 52 different points in Berlin, Germany was used.

![Berlin52](http://i.imgur.com/tqkRm4dl.png)

## Ant Colony Optimization  
The Ant Colony Optimization algorithm is inspired by the foraging behaviour of ants. The behavior of the ants are controlled by two 
main parameters: $$\alpha$$, or the pheromone's attractiveness to the ant, and $$\beta$$, or the exploration capability of the ant. 
If $$\alpha$$ is very large, the pheromones left by previous ants in a certain path will be deemed very attractive, making most 
of the ants divert its way towards only one route (exploitation), if $$\beta$$ is large, ants are more independent in finding the best path (exploration). This ACO implementation used the Ant-System (AS) variant where the movement from 
node $$i$$ to node $$j$$ is defined by:

$$ 
p_{ij}^{k}(t)=  \begin{cases} 
      \dfrac{\tau_{ij}^{\alpha}(t)\eta_{ij}^{\beta}(t)}{\sum_{u \in \mathcal{N}_{i}^{k}(t)} \tau_{iu}^{\alpha}(t)\eta_{iu}^{\beta}(t)} &if~~~ j \in \mathcal{N}_{i}^{k}(t) \\
      0 &if~~~ j \not\in \mathcal{N}_{i}^{k}(t)
   \end{cases}
$$


## Methodology  
As mentioned, the $$\alpha$$ and $$\beta$$ parameters control the exploitation and exploration behaviour of the ants by setting the 
attractiveness of pheromone deposits or the "shortness" of the path. The graphs below (in clockwise order, starting from the upper left) 
describe the _(i)_ city locations, the _(ii)_ solution found by the algorithm, the _(iii)_ (mean) behaviour of the ants, and the 
_(iv)_ minimum tour distance for each iteration.  

1. __Parameters:__ $$\alpha$$ = 15, $$\beta$$ = 20, $$\rho$$ = 0.15    
![ACO Test 1](http://i.imgur.com/lVuDTDkl.png)  

2. __Parameters:__ $$\alpha$$ = 20, $$\beta$$ = 15, $$\rho$$ = 0.15    
![ACO Test 2](http://i.imgur.com/SnW6hVll.png)  

The `rho` parameter controls the evaporation of pheromone for each time step $$t$$. In this case, setting a small `rho`
leads to a slow evaporation of the pheromones, which affects the ants' exploitation ability as shown below. On the other hand, 
setting a very high evaporation coefficient makes the pheromones for each time step evaporate quickly. This means that ants are 
constantly doing random searches for each iteration.  

3. __Parameters:__ $$\alpha$$ = $$\beta$$ = 15, $$\rho$$ = 0.8         
![ACO Test 3](http://i.imgur.com/1mqQCyrl.png)  

4. __Parameters:__ $$\alpha$$ = $$\beta$$ = 15, $$\rho$$ = 0.01       
![ACO Test 4](http://i.imgur.com/ISCpfpkl.png)  

## Results:  
The best solution for ACO was __7548.9927__ _(the optimal solution achieved by current research so far is 7542.00)_ . It was obtained with the following parameters: 

| Parameter               | Value |
|-------------------------|-------|
| Iterations              | 500   |
| Colony Size             | 0.7   |
| Evaporation Coefficient, $$\rho$$ | 0.1   |
| Pheromone Attraction, $$\alpha$$    | 15    |
| Short-Path Bias, $$\beta$$         | 200   | 

![ACO Best](http://i.imgur.com/neFD3JDl.png)