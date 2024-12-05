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

<div id="sentiment-comparison-plot" class="plot-container" style="width: 100%; height: 600px;"></div>

### Genre-Based Analysis

We observed distinct sentiment patterns across different movie genres:

<div id="genre-sentiment-plot" class="plot-container" style="width: 100%; height: 600px;"></div>

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

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/utilities.js"></script>
<script src="{{ site.baseurl }}/assets/js/sentiment-analysis-plots.js"></script>
<script>
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const vaderResponse = await fetch('{{ site.baseurl }}/data/sentence_sentimental_analysis_Vader.csv');
        const vaderData = await vaderResponse.text();
        
        const distilbertResponse = await fetch('{{ site.baseurl }}/data/distillbert_sentiment_analysis.csv');
        const distilbertData = await distilbertResponse.text();
        
        Papa.parse(vaderData, {
            header: true,
            complete: function(vaderResults) {
                Papa.parse(distilbertData, {
                    header: true,
                    complete: function(distilbertResults) {
                        createSentimentPlots(vaderResults.data, distilbertResults.data);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error loading sentiment data:', error);
    }
});
</script>