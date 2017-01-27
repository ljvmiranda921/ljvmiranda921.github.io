---
layout: blog
title: "Simple Pairwise Sequencing with BLOSUM62"
date: 2017-01-23
category: blog
comments: true
---

Doing pairwise alignments using the BLOSUM62 scoring matrix _manually_ for our assignment in bioinformatics is really time-consuming. 
Honestly, I am not sure if the professor is actually expecting us to do this by hand. Either way, just to make my life simple, I built
a simple sequence alignment program using the BLOSUM62 scoring matrix.  

<?prettify?>
<pre class="prettyprint linenums">
import numpy as np
from numpy import array
def blosum62dp(seq1,seq2,gap_penalty):
    m = len(seq2) 
    n = len(seq1) 
    D = np.zeros((m+1, n+1)) 
  
    for i in xrange(m+1):
        D[i,0] = i * gap_penalty
   
    for j in xrange(n+1):
        D[0,j] = j * gap_penalty
   
    for i in xrange(1,m+1): 
        for j in xrange(1,n+1): 
            D[i,j] = max(D[i-1,j-1] + blosum62[seq1[j-1]][seq2[i-1]],
                         D[i-1,j]+gap_penalty,
                         D[i,j-1]+gap_penalty)
    print D
	
# Testing
seq1 = array(['T','H','I','S','L','I','N','E'])
seq2 = array(['I','S','A','L','I','G','N','E','D'])
blosum62dp(seq1,seq2,-4)
</pre>

It's pretty simple and efficient. It looks up the pairwise scores in a BLOSUM62 dictionary, and then generates the benefit table using
dynamic programming. Although as of this moment, I am doing the traceback procedure by hand. If I have time next week (_let me finish finals first!_),
I'd probably implement the traceback procedure here so that it can generate the pairwise alignment easily.