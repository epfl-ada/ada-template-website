---
layout: default
---

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>

# Data Analysis 6:03

<div id="debug"></div>
<div id="movieReleasesChart" style="width: 100%; height: 400px;"></div>
<div id="revenueChart" style="width: 100%; height: 400px;"></div>
<div id="ratingsChart" style="width: 100%; height: 400px;"></div>

<script>
// Add debug information
document.getElementById('debug').innerHTML = 'Loading data...';

// Load the data with error handling
d3.json("assets/data/analysis_data.json")  // Updated path
    .then(function(data) {
        document.getElementById('debug').innerHTML = 'Data loaded successfully: ' + JSON.stringify(data).substring(0, 100) + '...';
        
        // Movie Releases Chart
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

        Plotly.newPlot('movieReleasesChart', [trace], layout);

        // Revenue Chart
        var revenueData = data.revenue;
        var revenueTrace = {
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

        Plotly.newPlot('revenueChart', [revenueTrace], revenueLayout);

        // Ratings Chart
        var ratingsData = data.ratings;
        var ratingsTrace = {
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

        Plotly.newPlot('ratingsChart', [ratingsTrace], ratingsLayout);
    })
    .catch(function(error) {
        document.getElementById('debug').innerHTML = 'Error loading data: ' + error;
        console.error('Error:', error);
    });
</script>

[Back to Home](/ada-template-website/)