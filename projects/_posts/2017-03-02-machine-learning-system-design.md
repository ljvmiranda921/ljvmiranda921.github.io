---
layout: viz
title: "ML Pipeline"
date: 2017-03-02
category: projects
comments: true
author: "LJ MIRANDA"
description: "Notes on my design process in building a machine learning pipeline to solve breast cancer classification."
---

## Introduction
This will be a series of posts showing my step-by-step process on my attempt to create a machine learning pipeline. Here, I am designing a
machine learning system to solve the problem of __breast cancer classification__, that is, to accurately predict if a tumor is benign or
malignant given several parameters.  

I am using the [Wisconsin Breast Cancer Dataset](http://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Original)), and proper attributions should be cited:

- O. L. Mangasarian and W. H. Wolberg: "Cancer diagnosis via linear programming", SIAM News, Volume 23, Number 5, September 1990, pp 1 & 18.
- William H. Wolberg and O.L. Mangasarian: "Multisurface method of pattern separation for medical diagnosis applied to breast cytology", Proceedings of the National Academy of Sciences, U.S.A., Volume 87, December 1990, pp 9193-9196.
- O. L. Mangasarian, R. Setiono, and W.H. Wolberg: "Pattern recognition via linear programming: Theory and application to medical diagnosis", in: "Large-scale numerical optimization", Thomas F. Coleman and Yuying Li, editors, SIAM Publications, Philadelphia 1990, pp 22-30.
- K. P. Bennett & O. L. Mangasarian: "Robust linear programming discrimination of two linearly inseparable sets", Optimization Methods and Software 1, 1992, 23-34 (Gordon & Breach Science Publishers).

## Structure
The whole project is still in progress, but it is divided into four parts: Exploratory Data Analysis, Machine Learning System Design, Cross-Validation & Evaluation, and some API Notes.

<br>
<br>

<div class="row">
  <div class="thumbnail">
    <div style="height:250px;overflow:hidden">
    <img src="/res/ml-design/eda/output_18_0.png">
    </div>
      <div class="caption">
        <h3>Exploratory Data Analysis</h3>
        <p>Various attributes in the data set were investigated. In addition, data was cleaned and organizedto make it more readable. Lastly, Principal Component Analysis (PCA) was implemented in an effort to reduce the dimensionality of the data.</p>
        <p><a href="https://ljvmiranda921.github.io/ml-pipeline/eda/">Read notebook</a></p>
      </div>
    </div>
  </div>
