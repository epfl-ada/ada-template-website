---
layout: default
---

# Sentiment Analysis: Understanding Plot Emotions

## Methodology Overview

We explored two different methodologies for analyzing plot sentiments: VADER (Valence Aware Dictionary and Sentiment Reasoner) and DistilBERT. Each approach offers unique insights into the emotional content of movie plots.

## Comparative Analysis

### Example Movie Analysis (ID: 77856)

<div id="sentiment-comparison-plot" style="width: 100%; height: 600px;"></div>

This visualization demonstrates how both models analyze the same movie plot, showing sentence-by-sentence sentiment progression.

### Genre-Based Sentiment Analysis

<div id="genre-sentiment-vader" style="width: 100%; height: 600px;"></div>
<div id="genre-sentiment-distilbert" style="width: 100%; height: 600px;"></div>

## Model Selection and Rationale

Based on our comparative analysis, we selected **VADER** as our primary sentiment analysis tool due to its:
- More stable and intuitive results
- Better alignment with genre expectations
- More consistent performance across different text lengths
- Strong correlation with audience reception

## Genre-Specific Patterns

<div id="genre-patterns-plot" style="width: 100%; height: 600px;"></div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Load VADER sentiment data
    Papa.parse('{{ site.baseurl }}/data/sentence_sentimental_analysis_Vader.csv', {
        download: true,
        header: true,
        complete: function(vaderResults) {
            // Load DistilBERT sentiment data
            Papa.parse('{{ site.baseurl }}/data/distillbert_sentiment_analysis.csv', {
                download: true,
                header: true,
                complete: function(distilbertResults) {
                    createSentimentComparisonPlot(vaderResults.data, distilbertResults.data);
                    createGenreSentimentPlots(vaderResults.data);
                }
            });
        }
    });
});

function createSentimentComparisonPlot(vaderData, distilbertData) {
    const movieId = 77856;
    
    // Process VADER data
    const vaderMovie = vaderData.filter(d => d.movie_id === movieId.toString());
    const vaderSentiments = vaderMovie.map((d, i) => ({
        x: i,
        y: JSON.parse(d.sentence_sentiments).compound
    }));

    // Process DistilBERT data
    const distilbertMovie = distilbertData.filter(d => parseInt(d.movie_id) === movieId);
    const distilbertSentiments = distilbertMovie.map((d, i) => ({
        x: i,
        y: parseFloat(d.sentiment_score)
    }));

    const traces = [
        {
            x: vaderSentiments.map(d => d.x),
            y: vaderSentiments.map(d => d.y),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'VADER',
            line: { color: 'cyan' }
        },
        {
            x: distilbertSentiments.map(d => d.x),
            y: distilbertSentiments.map(d => d.y),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'DistilBERT',
            line: { color: 'magenta' }
        }
    ];

    const layout = {
        title: 'Sentiment Comparison for Movie ID: ' + movieId,
        xaxis: { title: 'Sentence Index' },
        yaxis: { title: 'Sentiment Score' },
        plot_bgcolor: '#1e1e1e',
        paper_bgcolor: '#1e1e1e',
        font: { color: 'white' }
    };

    Plotly.newPlot('sentiment-comparison-plot', traces, layout);
}

function createGenreSentimentPlots(data) {
    // Process genre sentiment data and create visualizations
    // Similar structure to data-analysis-plots.js
    // Implementation follows...
}
</script>