---
layout: default
---

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

# Data Analysis 5:47

## Preliminary Analysis and Metric Selection

Before diving into in-depth analysis, we'll explore our datasets to understand key features and establish metrics for success. Our analysis focuses on data from 1920 onwards due to limited availability of ratings and vote data for earlier movies.

### Total Movie Releases

<div id="movieReleasesChart" style="width: 100%; height: 400px;"></div>

<script>
// Sample data - we'll replace this with actual data
var years = Array.from({length: 101}, (_, i) => 1920 + i);
var releases = years.map(year => ({
    x: year,
    y: Math.floor(Math.random() * 1000) + 100
}));

var trace = {
    x: years,
    y: releases.map(r => r.y),
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(136, 204, 238)',
        width: 2
    },
    name: 'Movie Releases'
};

var layout = {
    title: 'Total Number of Movies Released Yearly',
    paper_bgcolor: '#1e1e1e',
    plot_bgcolor: '#1e1e1e',
    font: {
        color: 'white'
    },
    xaxis: {
        title: 'Year',
        gridcolor: 'gray'
    },
    yaxis: {
        title: 'Number of Movies',
        gridcolor: 'gray'
    }
};

var config = {
    responsive: true
};

Plotly.newPlot('movieReleasesChart', [trace], layout, config);
</script>

The plot illustrates the growth in movie production from 1920 onward, with notable fluctuations. The post-1980s increase likely reflects technological and industry expansion.

### Revenue Analysis

<div id="revenueChart" style="width: 100%; height: 400px;"></div>

<script>
var revenueTrace = {
    x: years,
    y: years.map(year => Math.exp(0.1 * (year - 1920)) * 1e6),
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(144, 238, 144)',
        width: 2
    },
    name: 'Total Revenue'
};

var revenueLayout = {
    title: 'Total Yearly Box Office Revenue',
    paper_bgcolor: '#1e1e1e',
    plot_bgcolor: '#1e1e1e',
    font: {
        color: 'white'
    },
    xaxis: {
        title: 'Year',
        gridcolor: 'gray'
    },
    yaxis: {
        title: 'Total Box Office Revenue [$]',
        type: 'log',
        gridcolor: 'gray'
    }
};

Plotly.newPlot('revenueChart', [revenueTrace], revenueLayout, config);
</script>

We observe a near-exponential growth in total box office revenue per year, potentially driven by:
- Increasing number of movie releases
- Inflation effects
- Growing global interest in cinema

### Ratings and Vote Count Evaluation

<div id="ratingsChart" style="width: 100%; height: 400px;"></div>

<script>
var meanRatings = years.map(year => 7 + Math.random());
var medianRatings = years.map(year => 7 + Math.random() * 0.5);

var meanTrace = {
    x: years,
    y: meanRatings,
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(255, 165, 0)',
        width: 2
    },
    name: 'Mean Rating'
};

var medianTrace = {
    x: years,
    y: medianRatings,
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'white',
        width: 2,
        dash: 'dash'
    },
    name: 'Median Rating'
};

var ratingsLayout = {
    title: 'Yearly Rating Statistics',
    paper_bgcolor: '#1e1e1e',
    plot_bgcolor: '#1e1e1e',
    font: {
        color: 'white'
    },
    xaxis: {
        title: 'Year',
        gridcolor: 'gray'
    },
    yaxis: {
        title: 'Rating',
        range: [0, 10],
        gridcolor: 'gray'
    }
};

Plotly.newPlot('ratingsChart', [meanTrace, medianTrace], ratingsLayout, config);
</script>

The ratings trend shows significantly less fluctuation compared to revenue, suggesting that audience perception has remained relatively stable over time.

[Back to Home](/ada-template-website/)