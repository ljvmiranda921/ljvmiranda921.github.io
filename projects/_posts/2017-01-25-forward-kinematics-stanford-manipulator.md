---
layout: post
title: "Forward Kinematics of Stanford Arm"
date: 2017-01-25
category: projects
comments: true
---

## Stanford Arm

The Stanford Arm, designed by Victor Scheinmann in 1969, can be considered to be one of the _classic manipulators_ in robotics, and is one of the first robots that are designed exclusively for computer control. In this project, I performed a forward kinematics procedure in simulating the arm.  

Forward Kinematics uses different kinematic equations in order to compute for the end-tip position of a manipulator given its joint parameters. Joint parameters can refer to joint angles $$\theta$$ for revolute joints, or link lengths for prismatic joints. In solving for the Forward Kinematics, I utilized the Denavit-Hartenberg (DH) Parameters.  

## Denavit-Hartenberg Parameters

With DH Parameters, solving for the Forward Kinematics is easy. I only need to take four parameters for each joint $$i$$: $$\theta_{i}$$ for the joint angle, $$\alpha_{i}$$ for the link twist, $$d_{i}$$ for the link offset, and $$a_{i}$$ for the link length. Once I've obtained them, I can just  plug them in to this transformation matrix:  

$$
T_{i-1}^{i} = \begin{bmatrix}
\cos(\theta_{i}) & -cos(\alpha_{i})\cdot sin(\theta_{i}) & \sin(\alpha_{i})\cdot\sin(\theta_{i}) & a_{i} \cdot cos(\theta_{i}) \\
\sin(\theta_{i}) & cos(\alpha_{i}) \cdot cos(\theta_{i})  & -sin(\alpha_{i}) \cdot cos(\theta_{i}) & a_{i} \cdot sin(\theta_{i}) \\
 0 & sin(\alpha_{i})  & cos(\alpha_{i})  & d_{i} \\
0 & 0 & 0   & 1
\end{bmatrix}
$$

For the Stanford Arm, here are the DH Parameters:  

| Joint |   Joint Angle   |   Link Offset   | Link Length | Link Twist |
|:-----:|:--------------:|:---------:|:-----:|:----------:|
| 1     | $$\theta_{1}$$ | $$d_{1}$$ |   0   |     -90    |
| 2     | $$\theta_{2}$$ | $$d_{2}$$ |   0   |     -90    |
| 3     |       -90      | $$d_{3}$$ |   0   |      0     |
| 4     | $$\theta_{4}$$ | $$d_{4}$$ |   0   |     -90    |
| 5     | $$\theta_{5}$$ |     0     |   0   |     90     |
| 6     | $$\theta_{6}$$ | $$d_{6}$$ |   0   |      0     |  

__Table 1:__ _DH Parameters for the Stanford Arm_
{: style="text-align: center;"}



The joint variables are then expressed as a vector $$V$$:  


$$
V \equiv \begin{bmatrix}
\theta_{1} & \theta_{2} & d_{3} & \theta_{5} & \theta_{6}
\end{bmatrix}
$$

## Simulation  
Here are some simulations of my work. I tried different values for the joint parameters and the recorded the results in
GIF format. I also plotted the top and side views just to see how the manipulator is posed in terms of the x-y and x-z coordinates.


### Simulation 1
$$\theta_{1}$$ = -90, $$\theta_{2}$$ = 90, $$d_{3}$$ = 6, $$\theta_{4}$$ = 45, $$\theta_{5}$$ = 25, $$\theta_{6}$$ = 90


![Simulation 1](/res/robosim/fkine01.gif)  
__Figure 1a:__ _Forward Kinematics Simulation_
{: style="text-align: center;"}
![Top and Side View](http://i.imgur.com/uxf2xKtl.png){:height="274px" width="560px"}  
__Figure 1b:__ _Top (left) and side (right) views of the manipulator's end-pose_
{: style="text-align: center;"}


### Simulation 2
$$\theta_{1}$$ = 180, $$\theta_{2}$$ = 0, $$d_{3}$$ = 6, $$\theta_{4}$$ = 45, $$\theta_{5}$$ = 25, $$\theta_{6}$$ = 0  



![Simulation 2](/res/robosim/fkine02.gif)  
__Figure 2a:__ _Forward Kinematics Simulation_
{: style="text-align: center;"}

![Top and Side View](http://i.imgur.com/AjVMtIGl.png){:height="274px" width="560px"}  
__Figure 2b:__ _Top (left) and side (right) views of the manipulator's end-pose_
{: style="text-align: center;"}



### Simulation 3
$$\theta_{1}$$ = 90, $$\theta_{2}$$ = -45, $$d_{3}$$ = 6, $$\theta_{4}$$ = 45, $$\theta_{5}$$ = -25, $$\theta_{6}$$ = 45


![Simulation 3](/res/robosim/fkine03.gif)  
__Figure 3a:__ _Forward Kinematics Simulation_
{: style="text-align: center;"}

![Top and Side View](http://i.imgur.com/StBp7rGl.png){:height="274px" width="560px"}  
__Figure 3b:__ _Top (left) and side (right) views of the manipulator's end-pose_
{: style="text-align: center;"}  

## Conclusion
Solving for the end-tip position given the joint parameters (or doing forward kinematics) is much easier algebraically when one is using the DH parameters. It is then a lot easier to model a manipulator because four parameters are only needed in order to define a certain joint.  

Limitations should also be imposed in the model with respect to the physical environment it belongs to. This is to avoid “impractical” or “illogical” movements being done by the manipulator.  

Solving for the inverse kinematics proved to be very difficult algebraically. Multiple solutions often arise and it must always be checked with respect to the physical constraints imposed.
