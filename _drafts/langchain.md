<!--

| Scores         | Zero-shot          | Supervised          | Few-shot    |
|----------------|-------------------:|--------------------:|-------------:
| Micro F1-score | $$\mathbf{81.45}$$ |  $$79.88$$          | $$61.90$$   |
| Macro F1-score | $$\mathbf{78.74}$$ |  $$77.52$$          | $$55.02$$   |


| F1-score (per type)                      | Zero-shot           | Supervised | Few-shot  |
|------------------------------------------|--------------------:|-----------:|-----------:
| Supporting argument (`Argument_for`)     |  $$\mathbf{75.21}$$ | $$73.60$$  | $$48.74$$ |
| No argument (`NoArgument`)               |  $$\mathbf{86.74}$$ | $$85.66$$  | $$72.50$$ |
| Opposing argument (`Argument_against`)   |  $$\mathbf{74.26}$$ | $$73.30$$  | $$46.00$$ |


-->

<!--
I have to admit that this one's definitely a **negative result.** I initially
expected that the few-shot predictions will work better because there's added
context from the guidelines. But it's also possible that our prompt (plus our
sequential processing step) became a detriment to get more reliable predictions.

I'm not closing my doors to this hypothesis. There's an interesting distribution
of scores especially across category types. For example, [Levy et al.,
(2018)](#levy2018towards) seems to perform well on `NoArgument` cases. Perhaps
there's something in how the guideline was written that caused this? I might get
back to this again in a more qualitative light.

-->