---
layout: default
---

# Preliminary Analysis and Metric Selection 8:22

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
    Papa.parse('{{ site.baseurl }}/data/movie_master_dataset.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            console.log("Data loaded:", data.length, "rows"); // Debug log
            
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

            console.log("Years processed:", Object.keys(yearCounts).length); // Debug log

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
        },
        error: function(error) {
            console.error('Error loading data:', error); // Debug log
        }
    });
});
</script>

## Detailed Revenue Analysis

<div id="revenue-stats-plot" style="width: 100%; height: 600px;"></div>

<div id="revenue-scatter-plot" style="width: 100%; height: 600px;"></div>

**Observations**:

1. **Variance in Revenue**: Over time, the variance in box office revenue has increased significantly, which may reflect the polarized landscape of modern cinema. This could indicate the simultaneous rise of high-grossing blockbusters and lower-budget independent films, appealing to increasingly diverse audience preferences.

2. **Revenue Trends**: Notable spikes in mean revenue can be observed in certain years, with peaks in the 1960s, 1970s, and the 2000s, potentially reflecting trends in cinema consumption or the success of particularly influential movies.

3. **Overall Growth**: An upward trend in overall revenue is apparent, which may be influenced by inflation as well as increased global interest in cinema over time. This growth highlights both the industry's expansion and the rising financial impact of movies as cultural products.

**Revenue Conclusion**:
While box office revenue provides valuable insight into the financial success of movies, it is an incomplete metric for gauging overall success. This preliminary analysis suggests that revenue alone does not fully capture a movie's impact or popularity, and additional metrics are necessary to achieve a comprehensive understanding of cinematic success.

<script>
document.addEventListener('DOMContentLoaded', function() {
    Papa.parse('{{ site.baseurl }}/data/movie_master_dataset.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            
            // Process data by year
            const yearStats = {};
            const individualMovies = [];
            
            data.forEach(row => {
                if (row.release_date && row.revenue) {
                    const year = new Date(row.release_date).getFullYear();
                    const revenue = parseFloat(row.revenue);
                    
                    if (year >= 1920 && !isNaN(year) && !isNaN(revenue) && revenue > 0) {
                        if (!yearStats[year]) {
                            yearStats[year] = {
                                revenues: [],
                                mean: 0,
                                median: 0,
                                std: 0
                            };
                        }
                        yearStats[year].revenues.push(revenue);
                        individualMovies.push({year: year, revenue: revenue});
                    }
                }
            });

            // Calculate statistics
            const years = Object.keys(yearStats).sort((a,b) => a-b);
            years.forEach(year => {
                const revenues = yearStats[year].revenues;
                yearStats[year].mean = revenues.reduce((a,b) => a+b, 0) / revenues.length;
                yearStats[year].median = revenues.sort((a,b) => a-b)[Math.floor(revenues.length/2)];
                yearStats[year].std = Math.sqrt(revenues.reduce((a,b) => a + Math.pow(b - yearStats[year].mean, 2), 0) / revenues.length);
            });

            // Create statistics plot
            const meanTrace = {
                x: years,
                y: years.map(year => yearStats[year].mean),
                type: 'scatter',
                mode: 'lines',
                name: 'Mean Revenue',
                line: {color: 'lightgreen', width: 3}
            };

            const medianTrace = {
                x: years,
                y: years.map(year => yearStats[year].median),
                type: 'scatter',
                mode: 'lines',
                name: 'Median Revenue',
                line: {color: 'white', width: 3, dash: 'dash'}
            };

            const stdUpperTrace = {
                x: years,
                y: years.map(year => yearStats[year].mean + yearStats[year].std),
                type: 'scatter',
                mode: 'lines',
                name: '1 Std Dev',
                line: {width: 0},
                showlegend: false
            };

            const stdLowerTrace = {
                x: years,
                y: years.map(year => yearStats[year].mean - yearStats[year].std),
                type: 'scatter',
                mode: 'lines',
                fill: 'tonexty',
                fillcolor: 'rgba(255,255,255,0.2)',
                line: {width: 0},
                name: '1 Std Dev'
            };

            const statsLayout = {
                title: {
                    text: 'Box Office Revenue Statistics',
                    font: { size: 24, color: 'white' }
                },
                xaxis: {
                    title: 'Year',
                    gridcolor: 'gray',
                    color: 'white'
                },
                yaxis: {
                    title: 'Revenue [$]',
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

            Plotly.newPlot('revenue-stats-plot', [stdUpperTrace, stdLowerTrace, meanTrace, medianTrace], statsLayout);

            // Create scatter plot
            const scatterTrace = {
                x: individualMovies.map(m => m.year),
                y: individualMovies.map(m => m.revenue),
                type: 'scatter',
                mode: 'markers',
                name: 'Individual Movies',
                marker: {
                    color: 'magenta',
                    size: 5,
                    opacity: 0.1
                }
            };

            const meanOverlayTrace = {
                x: years,
                y: years.map(year => yearStats[year].mean),
                type: 'scatter',
                mode: 'lines',
                name: 'Mean Revenue',
                line: {color: 'lightgreen', width: 4}
            };

            const scatterLayout = {
                title: {
                    text: 'Box Office Revenue per Movie (log)',
                    font: { size: 24, color: 'white' }
                },
                xaxis: {
                    title: 'Year',
                    gridcolor: 'gray',
                    color: 'white'
                },
                yaxis: {
                    title: 'Revenue [$] (log)',
                    type: 'log',
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

            Plotly.newPlot('revenue-scatter-plot', [scatterTrace, meanOverlayTrace], scatterLayout);
        }
    });
});
</script>


## Ratings and Vote Count Evaluation

### Ratings Analysis

In this section, we examine the evolution of movie ratings over time to identify any underlying trends and patterns. Ratings provide a measure of audience perception that is less influenced by external economic factors than revenue, offering a potentially more stable metric.


**Observations**:
The ratings trend shows significantly less fluctuation compared to the revenue analysis, suggesting that audience perception, as reflected in ratings, has remained relatively stable over time. However, at the beginning of the observed period, we see larger fluctuations in the mean ratings, which could be attributed to a smaller number of votes per movie. With fewer ratings, the averages are less consistent, leading to greater variability. This initial volatility gradually stabilizes, and overall, the average rating hovers within a consistent range, indicating a steady audience response to movies throughout the years.

### Vote Count Analysis

In this part, we examine the distribution and evolution of vote counts per movie over time. By analyzing vote counts, we can assess trends in audience engagement and a film's reach over time.





**Observations**:
1. **Early Years with Lower Vote Counts**: As hypothesized in the ratings analysis, we observe fewer votes per movie in the early years, leading to greater variability. This trend aligns with our previous observations, confirming that early movies have less audience engagement or records.
2. **Increasing Engagement Over Time**: Over the years, both mean and median vote counts have increased, reflecting the growth of movie audiences and the rise of global platforms that make films more accessible for voting and reviews.
3. **Fluctuations in Mean Vote Counts**: The variability in mean vote counts suggests shifts in audience attention, likely due to the release of particularly popular films in certain years.

</script>
document.addEventListener('DOMContentLoaded', function() {
    Papa.parse('{{ site.baseurl }}/data/movie_master_dataset.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            
            // Process data by year for both ratings and votes
            const yearStats = {};
            const individualMovies = [];
            
            data.forEach(row => {
                if (row.release_date && row.rating && row.vote_count) {
                    const year = new Date(row.release_date).getFullYear();
                    const rating = parseFloat(row.rating);
                    const votes = parseFloat(row.vote_count);
                    
                    if (year >= 1920 && !isNaN(year) && !isNaN(rating) && !isNaN(votes)) {
                        if (!yearStats[year]) {
                            yearStats[year] = {
                                ratings: [],
                                votes: [],
                                ratingStats: { mean: 0, median: 0, std: 0 },
                                voteStats: { mean: 0, median: 0, std: 0 }
                            };
                        }
                        yearStats[year].ratings.push(rating);
                        yearStats[year].votes.push(votes);
                        individualMovies.push({
                            year: year,
                            rating: rating,
                            votes: votes
                        });
                    }
                }
            });

            // Calculate statistics
            const years = Object.keys(yearStats).sort((a,b) => a-b);
            years.forEach(year => {
                // Ratings statistics
                const ratings = yearStats[year].ratings;
                yearStats[year].ratingStats.mean = ratings.reduce((a,b) => a+b, 0) / ratings.length;
                yearStats[year].ratingStats.median = ratings.sort((a,b) => a-b)[Math.floor(ratings.length/2)];
                yearStats[year].ratingStats.std = Math.sqrt(ratings.reduce((a,b) => 
                    a + Math.pow(b - yearStats[year].ratingStats.mean, 2), 0) / ratings.length);

                // Votes statistics
                const votes = yearStats[year].votes;
                yearStats[year].voteStats.mean = votes.reduce((a,b) => a+b, 0) / votes.length;
                yearStats[year].voteStats.median = votes.sort((a,b) => a-b)[Math.floor(votes.length/2)];
                yearStats[year].voteStats.std = Math.sqrt(votes.reduce((a,b) => 
                    a + Math.pow(b - yearStats[year].voteStats.mean, 2), 0) / votes.length);
            });

            // Create ratings plots
            const createStatsPlot = (divId, data, title, ylabel, statsKey) => {
                const meanTrace = {
                    x: years,
                    y: years.map(year => yearStats[year][statsKey].mean),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Mean',
                    line: {color: 'orange', width: 3}
                };

                const medianTrace = {
                    x: years,
                    y: years.map(year => yearStats[year][statsKey].median),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Median',
                    line: {color: 'white', width: 3, dash: 'dash'}
                };

                const stdUpperTrace = {
                    x: years,
                    y: years.map(year => yearStats[year][statsKey].mean + yearStats[year][statsKey].std),
                    type: 'scatter',
                    mode: 'lines',
                    name: '1 Std Dev',
                    line: {width: 0},
                    showlegend: false
                };

                const stdLowerTrace = {
                    x: years,
                    y: years.map(year => yearStats[year][statsKey].mean - yearStats[year][statsKey].std),
                    type: 'scatter',
                    mode: 'lines',
                    fill: 'tonexty',
                    fillcolor: 'rgba(255,255,255,0.2)',
                    line: {width: 0},
                    name: '1 Std Dev'
                };

                const layout = {
                    title: {
                        text: title,
                        font: { size: 24, color: 'white' }
                    },
                    xaxis: {
                        title: 'Year',
                        gridcolor: 'gray',
                        color: 'white'
                    },
                    yaxis: {
                        title: ylabel,
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

                Plotly.newPlot(divId, [stdUpperTrace, stdLowerTrace, meanTrace, medianTrace], layout);
            };

            const createScatterPlot = (divId, data, title, yfield, ylabel, useLog = false) => {
                const scatterTrace = {
                    x: individualMovies.map(m => m.year),
                    y: individualMovies.map(m => m[yfield]),
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
                    y: years.map(year => yearStats[year][yfield === 'rating' ? 'ratingStats' : 'voteStats'].mean),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Mean',
                    line: {color: 'orange', width: 4}
                };

                const layout = {
                    title: {
                        text: title,
                        font: { size: 24, color: 'white' }
                    },
                    xaxis: {
                        title: 'Year',
                        gridcolor: 'gray',
                        color: 'white'
                    },
                    yaxis: {
                        title: ylabel,
                        type: useLog ? 'log' : 'linear',
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

                Plotly.newPlot(divId, [scatterTrace, meanTrace], layout);
            };

            // Create all plots
            createStatsPlot('ratings-stats-plot', yearStats, 'Yearly Rating Statistics', 'Rating', 'ratingStats');
            createScatterPlot('ratings-scatter-plot', individualMovies, 'Ratings per Movie', 'rating', 'Rating');
            createStatsPlot('votes-stats-plot', yearStats, 'Yearly Vote Count Statistics', 'Vote Count', 'voteStats');
            createScatterPlot('votes-scatter-plot', individualMovies, 'Vote Counts per Movie (log)', 'votes', 'Vote Count (log)', true);
        }
    });
});
</script>

**Conclusion**:
The trends in vote counts and ratings together provide a more comprehensive picture of a movie's impact over time. While ratings reflect audience satisfaction, vote counts indicate the level of engagement. The combination of these metrics offers valuable insights into how movies resonate with audiences across different periods.
