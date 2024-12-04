---
layout: default
---

# Preliminary Analysis and Metric Selection 8:07

Before diving into in-depth analysis, it's essential to perform preliminary exploration of our datasets. This helps us understand the general structure, identify key features, and establish metrics that will guide our subsequent analysis. By visualizing and examining basic characteristics, we can set the foundation for our study and determine which metrics will best represent a movie's success.

For all visualizations in this analysis, we decided to apply a cutoff at the year 1920. This decision was made due to the limited availability of ratings and vote data for movies released before 1920, which could skew results and impact the clarity of trends observed in more recent years.

## Total Movie Releases

<div id="releases-plot" style="width: 100%; height: 600px;"></div>

**Observation**:

The plot illustrates an overall growth in the number of movies released yearly from 1920 onward, with notable fluctuations. Hypothetically, early stability may be due to historical constraints, while the post-1980s increase could reflect technological and industry expansion. This growth trend will be an important consideration in our subsequent analysis.

## Revenue Analysis

<div id="revenue-plot" style="width: 100%; height: 600px;"></div>

**Observations**:

We observe a near-exponential growth in total box office revenue per year. This trend may be driven by:
- An increasing number of movie releases
- Inflation over time
- Growing interest in the film industry
- Expansion of global markets

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    Papa.parse('/data/movie_master_dataset.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            
            // Process data for releases plot
            const yearCounts = {};
            const yearRevenues = {};
            
            data.forEach(row => {
                if (row.release_date) {
                    const year = new Date(row.release_date).getFullYear();
                    if (year >= 1920 && !isNaN(year)) {
                        yearCounts[year] = (yearCounts[year] || 0) + 1;
                        if (row.revenue && !isNaN(row.revenue)) {
                            yearRevenues[year] = (yearRevenues[year] || 0) + parseFloat(row.revenue);
                        }
                    }
                }
            });

            // Create releases plot
            const years = Object.keys(yearCounts).sort();
            const movieCounts = years.map(year => yearCounts[year]);

            const releasesTrace = {
                x: years,
                y: movieCounts,
                type: 'scatter',
                mode: 'lines',
                line: {
                    color: 'lightblue',
                    width: 2
                },
                name: 'Number of Movies'
            };

            const releasesLayout = {
                title: {
                    text: 'Total Number of Movies Released Yearly',
                    font: { size: 24, color: 'white' }
                },
                xaxis: {
                    title: 'Year',
                    gridcolor: 'gray',
                    color: 'white'
                },
                yaxis: {
                    title: 'Number of Movies',
                    gridcolor: 'gray',
                    color: 'white'
                },
                plot_bgcolor: '#1e1e1e',
                paper_bgcolor: '#1e1e1e',
                font: { color: 'white' },
                showlegend: true
            };

            Plotly.newPlot('releases-plot', [releasesTrace], releasesLayout);

            // Create revenue plot
            const revenueTrace = {
                x: years,
                y: years.map(year => yearRevenues[year]),
                type: 'scatter',
                mode: 'lines',
                line: {
                    color: 'lightgreen',
                    width: 2
                },
                name: 'Total Box Office Revenue'
            };

            const revenueLayout = {
                title: {
                    text: 'Total Yearly Box Office Revenue (1920+)',
                    font: { size: 24, color: 'white' }
                },
                xaxis: {
                    title: 'Year',
                    gridcolor: 'gray',
                    color: 'white'
                },
                yaxis: {
                    title: 'Total Box Office Revenue [$] (log)',
                    type: 'log',
                    gridcolor: 'gray',
                    color: 'white'
                },
                plot_bgcolor: '#1e1e1e',
                paper_bgcolor: '#1e1e1e',
                font: { color: 'white' },
                showlegend: true
            };

            Plotly.newPlot('revenue-plot', [revenueTrace], revenueLayout);
        }
    });
});
</script>