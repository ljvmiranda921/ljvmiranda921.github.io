---
title: "Reallocative k-Sparse Autoencoder for Selective Feature Extraction"
authors: "Lester James V. Miranda"
date: 2017-09-10
category: research
publication: "Furuzuki Neurocomputing Systems Laboratory"
thumbnail: "/assets/jpg/thumbs/fall-2017-proposal-report.pdf.jpg"
abstract: "An autoencoder is often used to extract features from raw data. However, given the goal of reconstructing the input, they tend to greedily create features to satisfy the objective–without concern whether the features were relevant or not. A Reallocative k-Sparse Autoencoder (RSAE) is proposed to automatically select features before reconstruction. After the feedforward phase, a competitive layer where each hidden unit’s energy will be computed. The k% highest units will then be reallocated with the energy (controlled by a parameter α ) of the non-k units, as the latter’s activation is set to 0. This scheme ensures the extraction of sparse and important features that can be used for classification or network pre-training."
---