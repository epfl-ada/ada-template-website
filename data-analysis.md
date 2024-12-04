---
layout: default
---

# Data Analysis and Metric Selection

## Dataset Overview

Our analysis begins with a comprehensive examination of movie data, including:
- Box office revenue trends
- Rating distributions
- Vote count patterns
- Release date information

## Movie Release Trends

The film industry has shown significant growth since 1920, with production rates increasing dramatically in recent decades. Our analysis reveals:

![Total Movies Released](../assets/img/total_movies.png)

This upward trend reflects both industry expansion and improved data availability for recent years.

## Revenue Analysis

Box office revenue provides crucial insights into commercial success, though it must be considered alongside other metrics.

![Revenue Trends](../assets/img/revenue_trends.png)

Key observations:
- Overall exponential growth in total box office revenue
- Increasing variance in individual movie revenues
- Notable impact of inflation on historical comparisons

## Ratings and Vote Count Evaluation

User ratings and vote counts offer a more standardized measure of movie success across different eras.

![Rating Analysis](../assets/img/rating_analysis.png)

Interesting findings:
- Relatively stable average ratings over time
- Increasing vote counts in recent decades
- More consistent rating patterns in modern era

## Success Metric Definition

We developed a comprehensive success metric that combines both quality (ratings) and popularity (vote count):

```
Success = Rating × log(Number of Votes)
```

This formula balances:
- Movie quality (through ratings)
- Audience reach (through vote count)
- Scale effects (through logarithmic transformation)

![Success Metric](../assets/img/success_metric.png)

Our success metric shows strong correlation with revenue while providing a more balanced evaluation of movie performance across different eras and budgets.

[Back to Home](./)