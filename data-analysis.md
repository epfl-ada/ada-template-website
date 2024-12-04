---
layout: default
---

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

# Data Analysis 6:07

## Preliminary Analysis and Metric Selection

<div id="movieReleasesChart" style="width: 100%; height: 400px;"></div>
<div id="revenueChart" style="width: 100%; height: 400px;"></div>
<div id="ratingsChart" style="width: 100%; height: 400px;"></div>

<script>
// Load the data directly
const data = {{{ site.static_files | where: "path", "assets/data/analysis_data.json" | first | file_content }}};

// Movie Releases Plot
const movieTrace = {
    x: data.movie_releases.map(d => d.year),
    y: data.movie_releases.map(d => d.count),
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(136, 204, 238)',
        width: 2
    },
    name: 'Number of Movies'
};

const movieLayout = {
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

Plotly.newPlot('movieReleasesChart', [movieTrace], movieLayout);

// Revenue Plot
const revenueTrace = {
    x: data.revenue.map(d => d.year),
    y: data.revenue.map(d => d.revenue),
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(144, 238, 144)',
        width: 2
    },
    name: 'Total Revenue'
};

const revenueLayout = {
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

Plotly.newPlot('revenueChart', [revenueTrace], revenueLayout);

// Ratings Plot
const ratingsTrace = {
    x: data.ratings.map(d => d.year),
    y: data.ratings.map(d => d.mean),
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(255, 165, 0)',
        width: 2
    },
    name: 'Mean Rating'
};

const ratingsLayout = {
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

Plotly.newPlot('ratingsChart', [ratingsTrace], ratingsLayout);
</script>

The plot illustrates the growth in movie production from 1920 onward, with notable fluctuations. The post-1980s increase likely reflects technological and industry expansion.

We observe a near-exponential growth in total box office revenue per year, potentially driven by:
- Increasing number of movie releases
- Inflation effects
- Growing global interest in cinema

The ratings trend shows significantly less fluctuation compared to revenue, suggesting that audience perception has remained relatively stable over time.

[Back to Home](/ada-template-website/)