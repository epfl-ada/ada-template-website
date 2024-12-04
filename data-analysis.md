---
layout: default
---

# Preliminary Analysis and Metric Selection 8:03

Before diving into in-depth analysis, it's essential to perform preliminary exploration of our datasets. This helps us understand the general structure, identify key features, and establish metrics that will guide our subsequent analysis. By visualizing and examining basic characteristics, we can set the foundation for our study and determine which metrics will best represent a movie's success. Additionally, this initial step allows us to identify any gaps or trends that could impact our analysis, especially when considering data evolution over time.

For all visualizations in this analysis, we decided to apply a cutoff at the year 1920. This decision was made due to the limited availability of ratings and vote data for movies released before 1920, which could skew results and impact the clarity of trends observed in more recent years.

## Total Movie Releases

<div id="releases-plot"></div>

**Observation**:

The plot illustrates an overall growth in the number of movies released yearly from 1920 onward, with notable fluctuations. Hypothetically, early stability may be due to historical constraints, while the post-1980s increase could reflect technological and industry expansion. This growth trend will be an important consideration in our subsequent analysis.

## Revenue Analysis

<div id="revenue-plot"></div>

**Observations**:

We observe a near-exponential growth in total box office revenue per year. This trend may be driven by:
- An increasing number of movie releases
- Inflation over time
- Growing interest in the film industry
- Expansion of global markets

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script>
// Load data and create plots
document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/movie_master_dataset.csv')
        .then(response => response.text())
        .then(csvData => {
            // Parse CSV data
            const rows = csvData.split('\n').slice(1);
            const years = {};
            const revenues = {};
            
            rows.forEach(row => {
                const cols = row.split(',');
                const year = new Date(cols[4]).getFullYear();
                if (year >= 1920) {
                    years[year] = (years[year] || 0) + 1;
                    revenues[year] = (revenues[year] || 0) + parseFloat(cols[3] || 0);
                }
            });

            // Create releases plot
            const yearsData = Object.entries(years).sort((a,b) => a[0]-b[0]);
            const releasesTrace = {
                x: yearsData.map(d => d[0]),
                y: yearsData.map(d => d[1]),
                type: 'scatter',
                mode: 'lines',
                line: {color: 'lightblue', width: 2},
                name: 'Number of Movies'
            };

            const releasesLayout = {
                title: 'Total Number of Movies Released Yearly',
                xaxis: {title: 'Year'},
                yaxis: {title: 'Number of Movies'},
                plot_bgcolor: '#1e1e1e',
                paper_bgcolor: '#1e1e1e',
                font: {color: 'white'},
                showlegend: true
            };

            Plotly.newPlot('releases-plot', [releasesTrace], releasesLayout);

            // Create revenue plot
            const revenueData = Object.entries(revenues).sort((a,b) => a[0]-b[0]);
            const revenueTrace = {
                x: revenueData.map(d => d[0]),
                y: revenueData.map(d => d[1]),
                type: 'scatter',
                mode: 'lines',
                line: {color: 'lightgreen', width: 2},
                name: 'Total Box Office Revenue'
            };

            const revenueLayout = {
                title: 'Total Yearly Box Office Revenue (1920+)',
                xaxis: {title: 'Year'},
                yaxis: {
                    title: 'Total Box Office Revenue [$] (log)',
                    type: 'log'
                },
                plot_bgcolor: '#1e1e1e',
                paper_bgcolor: '#1e1e1e',
                font: {color: 'white'},
                showlegend: true
            };

            Plotly.newPlot('revenue-plot', [revenueTrace], revenueLayout);
        });
});
</script>