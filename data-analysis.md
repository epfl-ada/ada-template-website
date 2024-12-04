---
layout: default
---

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>

# Data Analysis 5:59

## Preliminary Analysis and Metric Selection

Before diving into in-depth analysis, we'll explore our datasets to understand key features and establish metrics for success. Our analysis focuses on data from 1920 onwards due to limited availability of ratings and vote data for earlier movies.

### Total Movie Releases

<div id="movieReleasesChart" style="width: 100%; height: 400px;"></div>

<script>
d3.json("assets/data/analysis_data.json").then(function(data) {
    var movieData = data.movie_releases;
    
    var trace = {
        x: movieData.map(d => d.year),
        y: movieData.map(d => d.count),
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'rgb(136, 204, 238)',
            width: 2
        },
        name: 'Number of Movies'
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
});
</script>

The plot illustrates the growth in movie production from 1920 onward, with notable fluctuations. The post-1980s increase likely reflects technological and industry expansion.

### Revenue Analysis

<div id="revenueChart" style="width: 100%; height: 400px;"></div>

<script>
d3.json("assets/data/analysis_data.json").then(function(data) {
    var revenueData = data.revenue;
    
    var trace = {
        x: revenueData.map(d => d.year),
        y: revenueData.map(d => d.revenue),
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'rgb(144, 238, 144)',
            width: 2
        },
        name: 'Total Revenue'
    };

    var layout = {
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

    var config = {
        responsive: true
    };

    Plotly.newPlot('revenueChart', [trace], layout, config);
});
</script>

We observe a near-exponential growth in total box office revenue per year, potentially driven by:
- Increasing number of movie releases
- Inflation effects
- Growing global interest in cinema

### Ratings and Vote Count Evaluation

<div id="ratingsChart" style="width: 100%; height: 400px;"></div>

<script>
d3.json("assets/data/analysis_data.json").then(function(data) {
    var ratingsData = data.ratings;
    
    var meanTrace = {
        x: ratingsData.map(d => d.year),
        y: ratingsData.map(d => d.mean),
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'rgb(255, 165, 0)',
            width: 2
        },
        name: 'Mean Rating'
    };

    var medianTrace = {
        x: ratingsData.map(d => d.year),
        y: ratingsData.map(d => d.median),
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'white',
            width: 2,
            dash: 'dash'
        },
        name: 'Median Rating'
    };

    // Add confidence interval
    var upperBound = ratingsData.map(d => Math.min(d.mean + d.std, 10));
    var lowerBound = ratingsData.map(d => Math.max(d.mean - d.std, 0));
    
    var fillTrace = {
        x: ratingsData.map(d => d.year).concat(ratingsData.map(d => d.year).reverse()),
        y: upperBound.concat(lowerBound.reverse()),
        fill: 'toself',
        fillcolor: 'rgba(255, 255, 255, 0.1)',
        line: {width: 0},
        name: '1 Std Dev',
        showlegend: true,
        type: 'scatter'
    };

    var layout = {
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

    var config = {
        responsive: true
    };

    Plotly.newPlot('ratingsChart', [fillTrace, meanTrace, medianTrace], layout, config);
});
</script>

The ratings trend shows significantly less fluctuation compared to revenue, suggesting that audience perception has remained relatively stable over time. The shaded area represents one standard deviation above and below the mean, illustrating the spread of ratings for each year.

[Back to Home](/ada-template-website/)