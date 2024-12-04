---
layout: default
---

# Data Analysis

## Overview

In this section, we explore the quantitative aspects of our movie dataset, analyzing key metrics and their relationships to understand what contributes to a movie's success.

## Preliminary Analysis

### Movie Releases Over Time

Our analysis begins with examining the evolution of movie releases from 1920 onwards. This timeframe was chosen to ensure data reliability and consistency.

<div id="movie-releases-chart"></div>

The graph above shows a clear upward trend in movie production over time, with notable acceleration post-1980s. This growth reflects both the expansion of the film industry and improvements in data collection.

### Revenue Analysis

Box office revenue provides one perspective on movie success, though it must be interpreted within historical context.

<div id="revenue-analysis"></div>

Key observations:
- Revenue shows exponential growth over time
- Modern blockbusters demonstrate unprecedented earning potential
- Revenue alone doesn't capture critical success or cultural impact

### Ratings and Vote Count Evaluation

To better understand movie success, we examined both ratings and vote counts:

<div id="ratings-analysis"></div>

Notable findings:
- Ratings remain relatively stable over time
- Vote counts increase significantly in recent decades
- The combination of ratings and vote counts provides a more balanced success metric

## Success Metric Development

We developed a comprehensive success metric that combines both quality (ratings) and impact (vote count):

```
Success = rating * log(number of votes)
```

This formula balances:
- Quality (through ratings)
- Popularity (through vote count)
- Scale effects (through logarithmic transformation)

<div id="success-metric-chart"></div>

The resulting metric shows strong correlation with both critical acclaim and commercial success, while avoiding overemphasis on either factor.

[Back to Home](/)