---
layout: default
---

# Preliminary Analysis and Metric Selection

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

## Detailed Revenue Analysis

<div id="revenue-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="revenue-scatter-plot" style="width: 100%; height: 600px;"></div>

**Observations**:

1. **Variance in Revenue**: Over time, the variance in box office revenue has increased significantly, which may reflect the polarized landscape of modern cinema. This could indicate the simultaneous rise of high-grossing blockbusters and lower-budget independent films, appealing to increasingly diverse audience preferences.

2. **Revenue Trends**: Notable spikes in mean revenue can be observed in certain years, with peaks in the 1960s, 1970s, and the 2000s, potentially reflecting trends in cinema consumption or the success of particularly influential movies.

3. **Overall Growth**: An upward trend in overall revenue is apparent, which may be influenced by inflation as well as increased global interest in cinema over time. This growth highlights both the industry's expansion and the rising financial impact of movies as cultural products.

**Revenue Conclusion**:
While box office revenue provides valuable insight into the financial success of movies, it is an incomplete metric for gauging overall success. This preliminary analysis suggests that revenue alone does not fully capture a movie's impact or popularity, and additional metrics are necessary to achieve a comprehensive understanding of cinematic success.

## Ratings and Vote Count Evaluation

### Ratings Analysis

In this section, we examine the evolution of movie ratings over time to identify any underlying trends and patterns. Ratings provide a measure of audience perception that is less influenced by external economic factors than revenue, offering a potentially more stable metric.

<div id="ratings-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="ratings-scatter-plot" style="width: 100%; height: 600px;"></div>

**Observations**:
The ratings trend shows significantly less fluctuation compared to the revenue analysis, suggesting that audience perception, as reflected in ratings, has remained relatively stable over time. However, at the beginning of the observed period, we see larger fluctuations in the mean ratings, which could be attributed to a smaller number of votes per movie. With fewer ratings, the averages are less consistent, leading to greater variability. This initial volatility gradually stabilizes, and overall, the average rating hovers within a consistent range, indicating a steady audience response to movies throughout the years.

### Vote Count Analysis

In this part, we examine the distribution and evolution of vote counts per movie over time. By analyzing vote counts, we can assess trends in audience engagement and a film's reach over time.

<div id="votes-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="votes-scatter-plot" style="width: 100%; height: 600px;"></div>

**Observations**:
1. **Early Years with Lower Vote Counts**: As hypothesized in the ratings analysis, we observe fewer votes per movie in the early years, leading to greater variability. This trend aligns with our previous observations, confirming that early movies have less audience engagement or records.
2. **Increasing Engagement Over Time**: Over the years, both mean and median vote counts have increased, reflecting the growth of movie audiences and the rise of global platforms that make films more accessible for voting and reviews.
3. **Fluctuations in Mean Vote Counts**: The variability in mean vote counts suggests shifts in audience attention, likely due to the release of particularly popular films in certain years.

**Conclusion**:
The trends in vote counts and ratings together provide a more comprehensive picture of a movie's impact over time. While ratings reflect audience satisfaction, vote counts indicate the level of engagement. The combination of these metrics offers valuable insights into how movies resonate with audiences across different periods.

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script>
// Initialize all plots when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load and process data
    Papa.parse('{{ site.baseurl }}/data/movie_master_dataset.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            
            // Process data for all plots
            const yearStats = processData(data);
            const years = Object.keys(yearStats).sort((a,b) => a-b);
            
            // Create all plots
            createReleasesPlot(yearStats, years);
            createRevenuePlot(yearStats, years);
            createRevenueStatsPlot(yearStats, years);
            createRevenueScatterPlot(yearStats, years);
            createRatingsPlots(yearStats, years);
            createVotesPlots(yearStats, years);
        },
        error: function(error) {
            console.error('Error loading data:', error);
        }
    });
});

// Data processing function
function processData(data) {
    const yearStats = {};
    
    data.forEach(row => {
        if (row.release_date) {
            const year = new Date(row.release_date).getFullYear();
            if (year >= 1920 && !isNaN(year)) {
                if (!yearStats[year]) {
                    yearStats[year] = {
                        count: 0,
                        revenue: 0,
                        revenues: [],
                        ratings: [],
                        votes: [],
                        movies: []
                    };
                }
                
                yearStats[year].count++;
                
                if (row.revenue && !isNaN(row.revenue)) {
                    const revenue = parseFloat(row.revenue);
                    yearStats[year].revenue += revenue;
                    yearStats[year].revenues.push(revenue);
                }
                
                if (row.rating && !isNaN(row.rating)) {
                    yearStats[year].ratings.push(parseFloat(row.rating));
                }
                
                if (row.vote_count && !isNaN(row.vote_count)) {
                    yearStats[year].votes.push(parseFloat(row.vote_count));
                }
                
                yearStats[year].movies.push({
                    revenue: parseFloat(row.revenue) || 0,
                    rating: parseFloat(row.rating) || 0,
                    votes: parseFloat(row.vote_count) || 0
                });
            }
        }
    });
    
    // Calculate statistics for each year
    Object.keys(yearStats).forEach(year => {
        const stats = yearStats[year];
        stats.meanRevenue = stats.revenues.length ? stats.revenues.reduce((a,b) => a+b, 0) / stats.revenues.length : 0;
        stats.medianRevenue = stats.revenues.length ? stats.revenues.sort((a,b) => a-b)[Math.floor(stats.revenues.length/2)] : 0;
        stats.stdRevenue = calculateStd(stats.revenues, stats.meanRevenue);
        
        stats.meanRating = stats.ratings.length ? stats.ratings.reduce((a,b) => a+b, 0) / stats.ratings.length : 0;
        stats.medianRating = stats.ratings.length ? stats.ratings.sort((a,b) => a-b)[Math.floor(stats.ratings.length/2)] : 0;
        stats.stdRating = calculateStd(stats.ratings, stats.meanRating);
        
        stats.meanVotes = stats.votes.length ? stats.votes.reduce((a,b) => a+b, 0) / stats.votes.length : 0;
        stats.medianVotes = stats.votes.length ? stats.votes.sort((a,b) => a-b)[Math.floor(stats.votes.length/2)] : 0;
        stats.stdVotes = calculateStd(stats.votes, stats.meanVotes);
    });
    
    return yearStats;
}

// Helper function to calculate standard deviation
function calculateStd(arr, mean) {
    if (!arr.length) return 0;
    return Math.sqrt(arr.reduce((a,b) => a + Math.pow(b - mean, 2), 0) / arr.length);
}

// Plot creation functions
function createPlotlyLayout(title, xTitle, yTitle, logY = false) {
    return {
        title: {
            text: title,
            font: { size: 24, color: 'white' }
        },
        xaxis: {
            title: xTitle,
            gridcolor: 'gray',
            color: 'white'
        },
        yaxis: {
            title: yTitle,
            type: logY ? 'log' : 'linear',
            gridcolor: 'gray',
            color: 'white'
        },
        plot_bgcolor: '#1e1e1e',
        paper_bgcolor: '#1e1e1e',
        font: { color: 'white' },
        showlegend: true,
        legend: {
            font: { color: 'white' }
        }
    };
}

function createReleasesPlot(yearStats, years) {
    const releasesTrace = {
        x: years,
        y: years.map(year => yearStats[year].count),
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'lightblue',
            width: 2
        },
        name: 'Number of Movies'
    };

    const layout = createPlotlyLayout(
        'Total Number of Movies Released Yearly',
        'Year',
        'Number of Movies'
    );

    Plotly.newPlot('releases-plot', [releasesTrace], layout);
}

function createRevenuePlot(yearStats, years) {
    const revenueTrace = {
        x: years,
        y: years.map(year => yearStats[year].revenue),
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'lightgreen',
            width: 2
        },
        name: 'Total Box Office Revenue'
    };

    const layout = createPlotlyLayout(
        'Total Yearly Box Office Revenue (1920+)',
        'Year',
        'Total Box Office Revenue [$] (log)',
        true
    );

    Plotly.newPlot('revenue-plot', [revenueTrace], layout);
}

function createRevenueStatsPlot(yearStats, years) {
    const meanTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanRevenue),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean Revenue',
        line: {color: 'lightgreen', width: 3}
    };

    const medianTrace = {
        x: years,
        y: years.map(year => yearStats[year].medianRevenue),
        type: 'scatter',
        mode: 'lines',
        name: 'Median Revenue',
        line: {color: 'white', width: 3, dash: 'dash'}
    };

    const stdUpperTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanRevenue + yearStats[year].stdRevenue),
        type: 'scatter',
        mode: 'lines',
        name: '1 Std Dev',
        line: {width: 0},
        showlegend: false
    };

    const stdLowerTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanRevenue - yearStats[year].stdRevenue),
        type: 'scatter',
        mode: 'lines',
        fill: 'tonexty',
        fillcolor: 'rgba(255,255,255,0.2)',
        line: {width: 0},
        name: '1 Std Dev'
    };

    const layout = createPlotlyLayout(
        'Box Office Revenue Statistics',
        'Year',
        'Revenue [$]'
    );

    Plotly.newPlot('revenue-stats-plot', 
        [stdUpperTrace, stdLowerTrace, meanTrace, medianTrace], 
        layout
    );
}

function createRevenueScatterPlot(yearStats, years) {
    const allMovies = years.flatMap(year => 
        yearStats[year].movies.map(movie => ({
            year: parseInt(year),
            revenue: movie.revenue
        }))
    ).filter(movie => movie.revenue > 0);

    const scatterTrace = {
        x: allMovies.map(m => m.year),
        y: allMovies.map(m => m.revenue),
        type: 'scatter',
        mode: 'markers',
        name: 'Individual Movies',
        marker: {
            color: 'magenta',
            size: 5,
            opacity: 0.1
        }
    };

    const meanTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanRevenue),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean Revenue',
        line: {color: 'lightgreen', width: 4}
    };

    const layout = createPlotlyLayout(
        'Box Office Revenue per Movie (log)',
        'Year',
        'Revenue [$] (log)',
        true
    );

    Plotly.newPlot('revenue-scatter-plot', [scatterTrace, meanTrace], layout);
}

function createRatingsPlots(yearStats, years) {
    // Stats plot
    const meanTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanRating),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean',
        line: {color: 'orange', width: 3}
    };

    const medianTrace = {
        x: years,
        y: years.map(year => yearStats[year].medianRating),
        type: 'scatter',
        mode: 'lines',
        name: 'Median',
        line: {color: 'white', width: 3, dash: 'dash'}
    };

    const stdUpperTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanRating + yearStats[year].stdRating),
        type: 'scatter',
        mode: 'lines',
        name: '1 Std Dev',
        line: {width: 0},
        showlegend: false
    };

    const stdLowerTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanRating - yearStats[year].stdRating),
        type: 'scatter',
        mode: 'lines',
        fill: 'tonexty',
        fillcolor: 'rgba(255,255,255,0.2)',
        line: {width: 0},
        name: '1 Std Dev'
    };

    const statsLayout = createPlotlyLayout(
        'Yearly Rating Statistics',
        'Year',
        'Rating'
    );

    Plotly.newPlot('ratings-stats-plot', 
        [stdUpperTrace, stdLowerTrace, meanTrace, medianTrace], 
        statsLayout
    );

    // Scatter plot
    const allMovies = years.flatMap(year => 
        yearStats[year].movies.map(movie => ({
            year: parseInt(year),
            rating: movie.rating
        }))
    ).filter(movie => movie.rating > 0);

    const scatterTrace = {
        x: allMovies.map(m => m.year),
        y: allMovies.map(m => m.rating),
        type: 'scatter',
        mode: 'markers',
        name: 'Individual Movies',
        marker: {
            color: 'magenta',
            size: 5,
            opacity: 0.1
        }
    };

    const scatterMeanTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanRating),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean',
        line: {color: 'orange', width: 4}
    };

    const scatterLayout = createPlotlyLayout(
        'Ratings per Movie',
        'Year',
        'Rating'
    );

    Plotly.newPlot('ratings-scatter-plot', [scatterTrace, scatterMeanTrace], scatterLayout);
}

function createVotesPlots(yearStats, years) {
    // Stats plot
    const meanTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanVotes),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean',
        line: {color: 'orange', width: 3}
    };

    const medianTrace = {
        x: years,
        y: years.map(year => yearStats[year].medianVotes),
        type: 'scatter',
        mode: 'lines',
        name: 'Median',
        line: {color: 'white', width: 3, dash: 'dash'}
    };

    const stdUpperTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanVotes + yearStats[year].stdVotes),
        type: 'scatter',
        mode: 'lines',
        name: '1 Std Dev',
        line: {width: 0},
        showlegend: false
    };

    const stdLowerTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanVotes - yearStats[year].stdVotes),
        type: 'scatter',
        mode: 'lines',
        fill: 'tonexty',
        fillcolor: 'rgba(255,255,255,0.2)',
        line: {width: 0},
        name: '1 Std Dev'
    };

    const statsLayout = createPlotlyLayout(
        'Yearly Vote Count Statistics',
        'Year',
        'Vote Count'
    );

    Plotly.newPlot('votes-stats-plot', 
        [stdUpperTrace, stdLowerTrace, meanTrace, medianTrace], 
        statsLayout
    );

    // Scatter plot
    const allMovies = years.flatMap(year => 
        yearStats[year].movies.map(movie => ({
            year: parseInt(year),
            votes: movie.votes
        }))
    ).filter(movie => movie.votes > 0);

    const scatterTrace = {
        x: allMovies.map(m => m.year),
        y: allMovies.map(m => m.votes),
        type: 'scatter',
        mode: 'markers',
        name: 'Individual Movies',
        marker: {
            color: 'magenta',
            size: 5,
            opacity: 0.1
        }
    };

    const scatterMeanTrace = {
        x: years,
        y: years.map(year => yearStats[year].meanVotes),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean',
        line: {color: 'orange', width: 4}
    };

    const scatterLayout = createPlotlyLayout(
        'Vote Counts per Movie (log)',
        'Year',
        'Vote Count (log)',
        true
    );

    Plotly.newPlot('votes-scatter-plot', [scatterTrace, scatterMeanTrace], scatterLayout);
}
</script>