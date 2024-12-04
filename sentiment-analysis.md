---
layout: default
---

# Sentiment Analysis: Understanding Plot Emotions

## Methodology Comparison

We explored two different approaches to analyze the emotional content of movie plots:

### VADER (Valence Aware Dictionary and Sentiment Reasoner)
- Rule-based sentiment analysis
- Optimized for social media text
- Provides compound sentiment scores
- Strong performance on overall tone assessment

### DistilBERT
- Neural network-based approach
- Captures complex language patterns
- Sentence-level sentiment analysis
- Better at nuanced emotional shifts

## Comparative Results

Our analysis of movie ID 77856 demonstrates the different approaches:

![Sentiment Comparison](../assets/img/sentiment_comparison.png)

### Genre-Based Analysis

We observed distinct sentiment patterns across different movie genres:

![Genre Sentiment](../assets/img/genre_sentiment.png)

Key findings:
- Comedy and Family films show consistently positive sentiment
- Horror and Thriller genres demonstrate expected negative patterns
- Drama shows the most varied sentiment trajectories

## Model Selection

After careful comparison, we selected **VADER** as our primary sentiment analysis tool due to:
- More stable and intuitive results
- Better alignment with genre expectations
- More consistent performance across different text lengths
- Strong correlation with audience reception

## Applications

Our sentiment analysis reveals:
- Emotional arcs common to successful movies
- Genre-specific sentiment patterns
- Correlation between sentiment variation and audience engagement

[Back to Home](/ada-template-website/)