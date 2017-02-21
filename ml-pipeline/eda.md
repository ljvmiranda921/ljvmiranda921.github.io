---
layout: viz
title: "ML Pipeline"
date: 2017-03-02
category: projects
comments: true
author: "LJ MIRANDA"
description: "Exploratory Data Analysis of the breast cancer dataset."
---


In this notebook, I would like to explore the parameters found in the Wisconsin Breast Cancer Dataset. This also serves as the first in the series of my __Machine Learning System Design__ post, an exercise to help me familarize with the machine learning pipeline.

Exploring the dataset is very helpful so that one can get acquainted with the data he/she is working with. Data exploration can include the inspection of correlation, significance, or feature selection. Moreover, this can also involve a bit of data cleaning, that is, the filling of missing or `NaN` values, handling of class imbalances, and the like. I would like to to EDA first before proceeding to build my classifier in Python.


## Table of Contents
1. [Data Cleaning and Manipulation](#data-cleaning-and-manipulation)
2. [Correlation and Data Distribution](#correlation-and-data-distribution)
3. [Parameter Distribution](#parameter-distribution)
4. [Principal Component Analysis](#principal-component-analysis)
5. [Conclusion](#conclusion)

Let us first import modules that we'll need:


```python
import pandas as pd
import numpy as np
import seaborn as sns
import itertools
import matplotlib.pyplot as plt
from pandas.tools.plotting import scatter_matrix
from sklearn import preprocessing
sns.set(style = 'darkgrid')
```


```python
%matplotlib inline
```

## Data Cleaning and Manipulation
In this section, we will first look into the raw dataset that we have. Descriptions, characteristics, and other important information about the data will be included. Moreover, this is a good avenue as well to set-up the dataframe that will be used throughout the analysis. So first, let's import the data.


```python
df = pd.read_csv('./data/breast-cancer/wdbc.csv')
```

To make our dataframe easier to process, we will add another column, `classEncoding`, that will encode our classes into `0` and `1` respectively. We will be using this for our machine learning algorithm later on.

I don't think the `id` column is important so we'll remove it. We will also replace our classes into the string types for better representation:


```python
df.drop('id', axis=1, inplace=True)
df.replace({'diagnosis' : { 'B' : 'benign', 'M' : 'malignant'}}, inplace=True)
```

Let's then add another column, `classEncode`, so that we can represent our classes as 1s and 0s, which will be useful later on:


```python
# Get the index of benign and malignant classes
benign_index = np.where(df['diagnosis'].values =='benign')
malign_index = np.where(df['diagnosis'].values =='malignant')

# Encode by index using a numpy array
encode = np.zeros((569,1))
encode[malign_index] = 1

# Convert numpy array to series
encoding = pd.Series(encode.flatten('F'), name="classEncode")

# Concatenate at the end of our dataframe
df = pd.concat([df, encoding], axis=1)
```

It seems that we were able to do the proper manipulations correctly. It may be nice to export our dataframe into a .csv file for future use.


```python
# Convert to csv
df.to_csv('./data/breast-cancer/wdbc-encoded.csv',sep=",", index=False)
```

## Correlation and Data Distribution
One of the easiest things to examine in a dataset is that of correlation between variables. With it, we can easily find parameters that are correlated with one another. In this section, a scatter plot matrix will be implemented. Here, we can then see how different attributes interact with one another.


```python
temp = pd.DataFrame(preprocessing.scale(df.ix[:,1:31]))
temp.columns = list(df.ix[:,1:31].columns)
temp['diagnosis'] = df['diagnosis']
temp['classEncode'] = df['classEncode']
```


```python
p = sns.PairGrid(temp.ix[:,20:31], hue = 'diagnosis', palette = 'Oranges')
p.map_upper(plt.scatter, s = 20, edgecolor = 'w')
p.map_diag(plt.hist)
p.map_lower(sns.kdeplot, cmap = 'GnBu_d')
p.add_legend()

p.figsize = (30,30)
```


![png](/res/ml-design/eda/output_18_0.png){:width="750px"}  
__Figure 1:__ _Scatter Matrix for all Breast Cancer Parameters_
{: style="text-align: center;"}


Note that in the scatter matrix in the upper diagonal above, we are only taking the last 10 parameters in our dataset. Either way, we can see that there is a clear separation between our two classes, and we are confident that separating these two will be possible.

Our histograms along the diagonal shows the distribution of our data for each parameter. Of course, we can notice that there is a class imbalance between the benign and malignant cases, with the benign cases being more frequent than the malignant ones. Later on, we have to consider this imbalance in training our classifier.

Lastly, the lower diagonal shows the density estimate of our data distribution. Here, we can interest ourselves into finding where the mean of our data distribution given two parameters lie. If their distributions overlap, we can expect that these two parameters have similar values. On the other hand if the two distributions lie far from one another, it means that their range of values are not at all similar.


## Parameter Distribution
We can also inspect how our two classes are distributed along each parameter. In this case, we will be utilizing a violin plot. This can help us visualize the range of values for our two classes for each parameter.


```python
mbc = pd.melt(temp, "diagnosis", var_name="measurement")
fig, ax = plt.subplots(figsize=(10,5))
p = sns.violinplot(ax = ax, x="measurement", y="value", hue="diagnosis", split = True, data=mbc, inner = 'quartile', palette = 'Set2');
p.set_xticklabels(rotation = 90, labels = list(temp.columns));
```


![png](/res/ml-design/eda/output_21_0.png){:width=auto}  
__Figure 2:__ _Class Distribution for each Parameter_
{: style="text-align: center;"}



## Principal Component Analysis
Here, we'll perform Principal Component Analysis (PCA) to see how the data will fare once it is reduced to a fewer set of parameters. Recall that PCA is a data transformation technique in order to achieve dimensionality reduction. As [Sebastian Raschka](http://sebastianraschka.com/Articles/2015_pca_in_3_steps.html) pointed out, PCA is all about finding the directions of maximum variance in high-dimensional data and project it onto a smaller dimensional subspace while retaining most of the information.

Let's first prepare our data:


```python
pca_df = pd.read_csv('./data/breast-cancer/wdbc.csv')
```

What we'll do next is that we will drop the `id` column, factorize the `diagnosis` column, then store it into the `target` variable.


```python
pca_df.drop('id', axis=1, inplace=True)
pca_df['diagnosis'] = pca_df['diagnosis'].factorize()[0]
pca_df.fillna(value=0, inplace=True)
target = pca_df['diagnosis']
pca_df.drop('diagnosis', axis=1,inplace=True)
```

We then import the PCA module from `sklearn` and invoke the `fit_transform()` command. What will happen is that it will reduce our high-dimensional dataset into two dimensions. We can then plot and see how this transformation looks like.


```python
from sklearn.decomposition import PCA
X = pca_df.values
pca = PCA(n_components=2)
pca_2d = pca.fit_transform(X)
```


```python
plot_pca_df = pd.DataFrame(pca_2d, columns=['x','y'], dtype=float)
plot_pca_df = pd.concat([plot_pca_df, target], axis=1)
```


```python
plt.scatter(plot_pca_df['x'][plot_pca_df['diagnosis'] == 0],
            plot_pca_df['y'][plot_pca_df['diagnosis'] == 0],
            color='#66c2a5',alpha=0.5,label='malignant')
plt.scatter(plot_pca_df['x'][plot_pca_df['diagnosis'] == 1],
            plot_pca_df['y'][plot_pca_df['diagnosis'] == 1],
            color='#fc8d62',alpha=0.5,label='benign')
plt.title('PCA Scatter Plot')
plt.legend()
```




    <matplotlib.legend.Legend at 0x247e7483358>




![png](/res/ml-design/eda/output_30_1.png){:width="560px"}  
__Figure 3:__ _Scatter Plot of PCA-Fitted Parameters_
{: style="text-align: center;"}

A quick look at our data above shows that our two classes can be decently separated. However, because we have not scaled our values yet, we can see a large range of values that might not be healthy once fed into our classifier. So now we will standardize our PCA data.


```python
from sklearn.preprocessing import StandardScaler
X_std = StandardScaler().fit_transform(X)
pca = PCA(n_components=2)
pca_2d_std = pca.fit_transform(X_std)
```


```python
plot_pca_df_std = pd.DataFrame(pca_2d_std, columns=['x','y'], dtype=float)
plot_pca_df_std = pd.concat([plot_pca_df_std, target], axis=1)
```


```python
plt.scatter(plot_pca_df_std['x'][plot_pca_df_std['diagnosis'] == 0],
            plot_pca_df_std['y'][plot_pca_df_std['diagnosis'] == 0],
            color='#66c2a5',alpha=0.5,label='malignant')
plt.scatter(plot_pca_df_std['x'][plot_pca_df_std['diagnosis'] == 1],
            plot_pca_df_std['y'][plot_pca_df_std['diagnosis'] == 1],
            color='#fc8d62',alpha=0.5,label='benign')
plt.title('PCA Scatter Plot with Standardization')
plt.legend()
```




    <matplotlib.legend.Legend at 0x247ed1474e0>




![png](/res/ml-design/eda/output_34_1.png){:width="560px"}  
__Figure 4:__ _Standardized Scatter Plot of PCA-Fitted Parameters_
{: style="text-align: center;"}

Looks much better! Let's first perform some statistical visualizations for this and we're done!


```python
df2 = plot_pca_df_std
malignant = df2.loc[df2.diagnosis == 0]
benign = df2.loc[df2.diagnosis == 1]

ax = sns.kdeplot(malignant.x, malignant.y,
                  cmap="Oranges", shade=True, shade_lowest=False)
ax = sns.kdeplot(benign.x, benign.y,
                  cmap="Blues", shade=True, shade_lowest=False)
sns.plt.title('Bivariate Kernel Density Estimate of PCA Fitted Parameters')
```




    <matplotlib.text.Text at 0x247e750d048>




![png](/res/ml-design/eda/output_36_1.png){:width="560px"}  
__Figure 5:__ _Kernel Distribution_
{: style="text-align: center;"}

In the plot above, we can see the density distribution for our fitted parameters. It is interesting to see that the mean of the two classes are far away from each other (meaning, we can perform easier classification). We can also see the powers of Principal Component Analysis, we were able to reduce the number of features from more than 20 into just 2. This data is much easier to work with and hopefully this can produce a better model.

## Conclusion
Using Exploratory Data Analysis, we were able to see how different parameters come together in the breast cancer dataset. Furthermore, we were also able to
reduce our features into two with the help of Principal Component Analysis. The next step is to build a classifier and implement it in our data.
