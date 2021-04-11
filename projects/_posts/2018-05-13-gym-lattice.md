---
layout: post
title: "Gym-Lattice: RL environment for the protein folding problem"
date: 2018-05-13
category: projects
comments: true
author: "LJ MIRANDA"
summary: "A short introduction to the gym-lattice environment for protein folding."
tags: [reinforcement learning, bioinformatics, protein structure prediction, research]
---

<a href="https://github.com/ljvmiranda921/gym-lattice"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png"></a>

[![Build Status](https://travis-ci.org/ljvmiranda921/gym-lattice.svg?branch=master)](https://travis-ci.org/ljvmiranda921/gym-lattice)
![python 3.4+](https://img.shields.io/badge/python-3.4+-blue.svg)
[![DOI](https://zenodo.org/badge/127895338.svg)](https://zenodo.org/badge/latestdoi/127895338)

<span class="firstcharacter">I</span>t turns out that my [brief soirée with reinforcement learning
(RL)](https://ljvmiranda921.github.io/notebook/2017/11/26/a-brief-soiree-with-reinforcement-learning/)
became a long dance. I started watching David Silver's
[lectures](https://www.youtube.com/watch?v=2pWv7GOvuf0), and seriously
considered doing a pet research project in RL. Good thing, deep in my lab's
archives, I found a gem of a problem that may be solvable by reinforcement
learning&mdash; protein structure prediction. In this post, I will walk you
through the first step of my journey in RL-plus-bioinformatics by creating a Gym
library for determining protein structures.

The main idea is that given a protein sequence, we wish to infer what it
looks like. However, determining a protein structure in the molecular level
is computationally-intensive. [Folding@Home](http://folding.stanford.edu/) is
a good example. It implements a distributed computing scheme to use a
volunteer's machine idle time (from PS4 to your web browser) in order to
simulate thousands of protein configurations. For our case, we start with
simple protein abstractions that are computationally manageable.

- [The 2D Hydrophobic-Polar (HP) Lattice Model](#latticemodel)
- [Protein Folding as a Reinforcement Learning (RL) Problem](#pfoldingrl)
- [The Gym-Lattice Environment](#gymlattice)

## <a id="latticemodel"></a>The 2D Hydrophobic-Polar (HP) Lattice Model

The HP Lattice Model is a seminal work that describes proteins in the lens of
statistical mechanics (Lau and Dill, [1989](#lau1989lattice)). Simply put, it
gives us a handle to tackle the protein folding problem in a *more tractable*
fashion. Furthermore, it has been proven that the HP Lattice problem is NP-complete
(Berger and Leighton, [1998](#berger1998protein)), joining the ranks of our
well-loved travelling salesman and graph coloring problems.

As a result, we can apply optimization techniques such as dynamic programming
to solve HP lattices. Because we are doing RL, we will attempt a solution
based on markov decision processes (MDPs). First, let's examine the
characteristics of a protein lattice.

### Treat it like a game

The goal is simple. Given a protein sequence made up of H and P "molecules,"
find the *most stable* configuration. That is, the config with the highest
number of adjacent H molecules (corresponds to the configuration with the
lowest energy).

![overview](/assets/png/gym-lattice/overview.png){:width="560px"}
{: style="text-align: center;"}

We start with an initial molecule (as per the example above, it's H), and
decide where to put the next molecule: up (U), down (D), left (L), or right
(R). We do this until all molecules are placed or if we accidentally trapped
ourselves in the sequence.

That's it! However, there are some rules that must be followed while playing
this game:
- You cannot move diagonally (only L, R, U, or D).
- You should only put a molecule *adjacent* to the previous one.
- Placing a molecule on an occupied space is penalized.
- Trapping yourself and failing to finish the task incurs heavy penalty.

![rules](/assets/png/gym-lattice/rules.png){:width="720px"}
{: style="text-align: center;"}

As you can see, the HP Lattice model is a very simple abstraction of actual
proteins. We only deal with two types of molecules (not 20 amino acids nor
$$20^3$$ codon combinations), we only work inside a 2-D planar surface, and
our objective function (number of H pairs) is a thermodynamic interpretation
of how protein molecules behave.

However, solving this problem can help us incrementally solve lower-order
abstractions of the protein folding problem, and who knows? Lead us to
finally solve how proteins behave in a molecular level.

## <a id="pfoldingrl"></a>Protein Folding as an RL Problem

We've seen RL being used successfully in games (Mnih, Silver, et al.,
[2013](#mnih2013playing)). Perhaps, formulating protein folding as a sequence
of states, actions, and rewards *like a game* opens up the possibility of
solving this via reinforcement learning. First, I will discuss what a typical
RL framework looks like, then, we'll start formulating the protein folding
problem as an RL problem.

### A typical reinforcement learning problem

Most reinforcement learning problems are formulated as the following (Sutton
and Barto, [1998](#sutton1998reinforcement)):
- We have an **agent** ($$\mathcal{A}$$) that decides an action $$a$$ given
an observation $$o$$ and reward $$r$$. Sometimes, the agent's policy (how it
acts given an observation and reward) is parameterized by $$\theta$$. It
could be a neural network with weights $$\theta$$.
- This action goes into the **environment** ($$\mathcal{E}$$) that takes the
agent's action, determines the equivalent reward $$r$$, and updates its state
$$s$$.
- The next state $$s_{t+1}$$ and reward $$r_{t+1}$$ is then transferred back
to the agent for deciding the next action. Just a note: sometimes we have
partially-observed cases where $$s_{t+1} \neq o_{t+1}$$. Imagine the
fog-of-war in DoTA where you cannot see beyond your visibility range. Ours is
fully-observed where $$s_{t+1} = o_{t+1}$$ (like chess, you can see the
position of all pieces.)

The **goal** ($$\mathcal{G}$$) then is to maximize the expected reward for
all timesteps. For a more thorough discussion of RL, please check Sutton's
book that I referenced below. For a more *leisurely* yet informative read,
check out this great post from [Thomas
Simonini](https://medium.freecodecamp.org/an-introduction-to-reinforcement-learning-4339519de419).

![rl_problem](/assets/png/gym-lattice/rl_problem.png){:width="480px"}
{: style="text-align: center;"}

### Reinforcement Learning + Protein Folding

Now that we have a rough idea of how reinforcement learning works, we can
then combine our knowledge of the protein folding game to create our framework:
- Our **agent** ($$\mathcal{A}$$) takes the current state of the lattice plus the reward, and
depending on its policy, outputs an action $$a \in \{L,D,U,R\}$$ to place the
next molecule.
- The **environment** ($$\mathcal{E}$$) takes this action and updates the
lattice by placing the next molecule on the location decided upon by the
agent. Afterwards, it computes the number of adjacent H-H pairs that are not
consecutive inside the sequence. More formally:
- The agent takes this next state and reward (energy function) and again
decides where to put the next molecule until all molecules have been placed.
An episode ends when the whole sequence has been exhausted or when the agent
was trapped.

$$
E(\mathcal{C}) = \sum_{i,j} I(i,j) \quad\text{where}\\
    I(i,j)=
    \begin{cases}
        -1 & p_i = p_j = H \quad\text{and}\quad |x_i-x_j| + |y_i-y_j|=1 \\
        0  & \text{otherwise}
    \end{cases}
$$

![pfold_as_rl](/assets/png/gym-lattice/pfold_as_rl.png){:width="480px"}
{: style="text-align: center;"}

For RL practitioners, it is obvious that the sign of the reward is a bit
funky. Negative rewards often mean penalties. We wil still modify this
reward function as you will see in the gym-lattice environment.

## <a id="gymlattice"></a>The Gym-Lattice Environment

My project aims to provide an environment ($$\mathcal{E}$$) that simulates
the protein folding problem for training RL agents. It follows a similar API
with [OpenAI-Gym](https://gym.openai.com/), and is built from primitives
found in the [Gym](https://github.com/openai/gym) library. This means that
the common `step()`, `reset()`, and `render()` methods are available. You can
find the Github link [here](https://github.com/ljvmiranda921/gym-lattice) and
a good Reddit discussion of the project
[here](https://www.reddit.com/r/MachineLearning/comments/8a9fge/p_a_reinforcement_learning_environment_for_the/).


- In `gym-lattice`, the state $$s$$ is represented as a 2D-matrix $$S \in
\{-1,0,+1\}^{2}$$. The observation-space is defined as `Box(high=1, low=-1,
shape=(2*n+1,2*n+1), dtype=int`)
    - `+1` represents hydrophobic (H) molecules
    - `-1` represents polar (P) molecules; and
    - `0` represents unassigned spaces in the grid.
- Your agent can perform four possible actions: 0 (left), 1 (down), 2 (up),
and 3 (right). The number choices may seem funky at first but just remember
that it maps to the standard vim keybindings.
- An episode ends when all molecules are added to the lattice OR if the
sequence of actions traps the polymer chain (no more valid moves because
surrounding space is fully-occupied). Whenever a collision is detected, the
agent should enter another action.

### Small note about the reward function

The reward function $$r$$ has been modified. For every timestep, it gives
sparse rewards $$r_{t}=0$$. The energy function is only computed at the end
of the episode (when all molecules are placed). Whenever the agent collides
at a specific timestep, a collision penalty is computed. Overall, the reward
at t $$r_{t}$$ is computed in the following manner:

```python
# Reward at timestep t
reward_t = state_reward + collision_penalty + trap_penalty
```

- The `state_reward` is the number of adjacent H-H molecules in the final
state. In protein folding, the state_reward is synonymous to computing
the Gibbs free energy, i.e., thermodynamic assumption of a stable
molecule. Its value is 0 in all timesteps and is only computed at the end
of the episode.
- The `collision_penalty` at timestep `t` accounts for collision events
whenever the agent chooses to put a molecule at an already-occupied
space. Its default value is -2, but this can be adjusted by setting the
`collision_penalty` at initialization.
- The `trap_penalty` is only computed whenever the agent has no more moves left
and is unable to finish the task. The episode ends, thus computing the
`state_reward`, but subtracts a deduction dependent on the length of the actual
sequence.

### Basic Usage

It's very simple to use `gym-lattice`. Once you have your agent ready, just
call the `step(action)` function to input your action. Remember that at the
beginning of each episode, you must reset your environment. Below is a basic
skeleton of how to use this package:

```python
from gym_lattice.envs import Lattice2DEnv
from gym import spaces
import numpy as np

np.random.seed(42)

seq = 'HHPHH' # Our input sequence
action_space = spaces.Discrete(4) # Choose among [0, 1, 2 ,3]
env = Lattice2DEnv(seq)

for i_episodes in range(5):
    env.reset()
    while True:
        # Random agent samples from action space
        action = action_space.sample()
        obs, reward, done, info = env.step(action)
        env.render()
        if done:
            print("Episode finished! Reward: {} | Collisions: {} | Actions: {}".format(reward, info['collisions'], info['actions']))
            break
```

Of course, at each step, you can call `render()` to see what the lattice looks
like in your console:


![demo1](/assets/png/gym-lattice/demo1.png){:width="120px"}
![demo2](/assets/png/gym-lattice/demo2.png){:width="120px"}
![demo3](/assets/png/gym-lattice/demo3.png){:width="120px"}
{: style="text-align: center;"}

### Last Notes

I haven't trained an agent *yet* to solve this problem, but one idea I have
in mind is by using a Deep Q-Network with a convolutional layer to take-in
the grid, and is connected to a Fully-Connected Network to output an action.
I've been very busy with thesis lately so we'll see what happens in the
future.

## References

- <a id="lau1989lattice">Lau, Kit Fun and Ken A Dill</a> (1989). “A lattice
statistical mechanics model of the conformational and sequence spaces of
proteins”. In: *Macromolecules* 22.10, pp. 3986–3997.
- <a id="berger1998protein">Berger, Bonnie and Tom Leighton</a> (1998).
“Protein folding in the hydrophobic-hydrophilic (HP) model is NP-complete”.
In: *Journal of Computational Biology* 5.1, pp. 27–40.
- <a id="mnih2013playing">Mnih, Volodymyr, Koray Kavukcuoglu, David Silver,
Alex Graves, et al.</a> (2013). “Playing atari with deep reinforcement
learning”. In: arXiv preprint arXiv:1312.5602.
- <a id="sutton1998reinforcement">Sutton, Richard and Barto, Andrew</a>
(1998). *Reinforcement Learning: An Introduction* Vol. 1 No. 1, Cambridge: MIT
Press.
