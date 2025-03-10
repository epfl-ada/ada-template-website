// File: assets/js/data-analysis-plots.js

function createReleasesPlot(yearStats, years) {
    const releasesTrace = {
        x: years,
        y: years.map(year => yearStats[year].count),
        type: 'scatter',
        mode: 'lines',
        line: {
            color: COLORS.primary,
            width: 2
        },
        name: 'Number of Movies'
    };

    Plotly.newPlot('releases-plot', [releasesTrace], 
        createPlotlyLayout('Total Number of Movies Released Yearly', 'Year', 'Number of Movies')
    );
}

function createRevenuePlot(yearStats, years) {
    const revenueTrace = {
        x: years,
        y: years.map(year => yearStats[year].totalRevenue),
        type: 'scatter',
        mode: 'lines',
        line: {
            color: COLORS.secondary,
            width: 2
        },
        name: 'Total Box Office Revenue'
    };

    Plotly.newPlot('revenue-plot', [revenueTrace], 
        createPlotlyLayout('Total Yearly Box Office Revenue', 'Year', 'Total Box Office Revenue [$] (log)', true)
    );
}

function createStatsPlot(divId, yearStats, years, field, title, yLabel, logY = false) {
    const stats = years.map(year => calculateStatistics(yearStats[year][field]));
    
    const meanTrace = {
        x: years,
        y: stats.map(s => s.mean),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean',
        line: {color: field === 'revenues' ? COLORS.secondary : COLORS.tertiary, width: 3}
    };

    const medianTrace = {
        x: years,
        y: stats.map(s => s.median),
        type: 'scatter',
        mode: 'lines',
        name: 'Median',
        line: {color: COLORS.neutral, width: 3, dash: 'dash'}
    };

    const stdUpperTrace = {
        x: years,
        y: stats.map((s, i) => s.mean + s.std),
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        line: {width: 0}
    };

    const stdLowerTrace = {
        x: years,
        y: stats.map((s, i) => s.mean - s.std),
        type: 'scatter',
        mode: 'lines',
        name: '1 Std Dev',
        fill: 'tonexty',
        fillcolor: 'rgba(255,255,255,0.2)',
        line: {width: 0}
    };

    Plotly.newPlot(divId, 
        [stdUpperTrace, stdLowerTrace, meanTrace, medianTrace], 
        createPlotlyLayout(title, 'Year', yLabel, logY)
    );
}

function createScatterPlot(divId, yearStats, years, field, title, yLabel, logY = false) {
    // Create scatter plot of individual movies
    const allMovies = years.flatMap(year => 
        yearStats[year].movies
            .filter(movie => movie[field] > 0)
            .map(movie => ({
                year: parseInt(year),
                value: movie[field]
            }))
    );

    const scatterTrace = {
        x: allMovies.map(m => m.year),
        y: allMovies.map(m => m.value),
        type: 'scatter',
        mode: 'markers',
        name: 'Individual Movies',
        marker: {
            color: COLORS.highlight,
            size: 5,
            opacity: 0.1
        }
    };

    // Calculate mean differently for votes
    const meanTrace = {
        x: years,
        y: years.map(year => {
            const movies = yearStats[year].movies.filter(m => m[field] > 0);
            if (movies.length === 0) return 0;
            return movies.reduce((sum, movie) => sum + movie[field], 0) / movies.length;
        }),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean',
        line: {
            color: COLORS.tertiary,
            width: 4
        }
    };

    const layout = createPlotlyLayout(title, 'Year', yLabel, logY);
    
    // Ensure y-axis shows logarithmic ticks properly for vote counts
    if (field === 'votes') {
        layout.yaxis.dtick = 1;  // This will show ticks at each order of magnitude
    }

    Plotly.newPlot(divId, [scatterTrace, meanTrace], layout);
}

// Add to assets/js/data-analysis-plots.js

// Add to assets/js/data-analysis-plots.js

function calculateSuccess(rating, votes) {
    if (!rating || !votes || votes <= 1) return null;
    return rating * Math.log(votes);
}

function createSuccessPlots(yearStats, years) {
    console.log("Creating success plots..."); // Debug log

    // Calculate success for each movie and add to yearStats
    years.forEach(year => {
        yearStats[year].successes = [];
        yearStats[year].movies.forEach(movie => {
            const success = calculateSuccess(movie.rating, movie.votes);
            if (success !== null) {
                movie.success = success;
                yearStats[year].successes.push(success);
            }
        });
    });

    // Log some debug info
    console.log("Sample success values:", yearStats[years[0]].successes.slice(0, 5));

    // Create success statistics plot
    createStatsPlot('success-stats-plot', yearStats, years, 'successes',
        'Success Statistics', 'Success', false);

    // Create success scatter plot
    createScatterPlot('success-scatter-plot', yearStats, years, 'success',
        'Success per Movie', 'Success', false);

    // Create success vs revenue plot
    const allMovies = years.flatMap(year => 
        yearStats[year].movies
            .filter(movie => movie.success !== null && movie.revenue > 0 && movie.rating > 0)
            .map(movie => ({
                success: movie.success,
                revenue: movie.revenue,
                rating: movie.rating
            }))
    );

    console.log("Number of movies for success-revenue plot:", allMovies.length); // Debug log

    const customColorScale = [
        [0, '#0000FF'],      // Blue
        [0.33, '#8A2BE2'],   // Purple
        [0.66, '#FF00FF'],   // Magenta
        [1, '#FF0000']       // Red
    ];
    
    const trace = {
        x: allMovies.map(m => m.success),
        y: allMovies.map(m => m.revenue),
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: allMovies.map(m => m.rating),
            colorscale: customColorScale,
            showscale: true,
            size: 5,
            opacity: 0.3,
            colorbar: {
                title: {
                    text: 'Rating',
                    side: 'right'
                },
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
            }
        },
        name: 'Movies'
    };

    const layout = createPlotlyLayout(
        'Box Office Revenue vs. Success',
        'Success = rating * log(vote_count)',
        'Box Office Revenue [$] (log)',
        true
    );

    layout.showlegend = false;

    Plotly.newPlot('success-revenue-plot', [trace], layout);
}

// Add to assets/js/data-analysis-plots.js

// Update in assets/js/data-analysis-plots.js

function createActorAgePlot(characterData) {
    try {
        console.log("Starting actor age plot creation");

        // Process actor data from the character dataset
        const actorStats = new Map();
        
        // Filter and process valid actor data
        characterData
            .filter(row => {
                const age = parseFloat(row.actor_age);
                return row.actor_name && !isNaN(age) && age > 0 && age < 100;
            })
            .forEach(row => {
                const actorName = row.actor_name;
                const age = parseFloat(row.actor_age);
                
                if (!actorStats.has(actorName)) {
                    actorStats.set(actorName, {
                        youngest_age: age,
                        occurrences: 1
                    });
                } else {
                    const stats = actorStats.get(actorName);
                    stats.youngest_age = Math.min(stats.youngest_age, age);
                    stats.occurrences += 1;
                }
            });

        // Convert Map to array and filter out any invalid entries
        const plotData = Array.from(actorStats.values())
            .filter(d => d.youngest_age > 0 && d.occurrences > 0);

        // Create scatter plot with increased visibility
        const scatterTrace = {
            x: plotData.map(d => d.youngest_age),
            y: plotData.map(d => d.occurrences),
            mode: 'markers',
            type: 'scatter',
            name: 'Actors',
            marker: {
                color: 'magenta',
                size: 12,
                opacity: 0.05
            }
        };

        // Calculate mean line with proper binning
        const ageGroups = Array(100).fill().map(() => []);
        plotData.forEach(d => {
            const age = Math.floor(d.youngest_age);
            if (age >= 0 && age < 100) {
                ageGroups[age].push(d.occurrences);
            }
        });

        const meanLine = ageGroups
            .map((occurrences, age) => ({
                age,
                mean: occurrences.length > 0 
                    ? occurrences.reduce((a, b) => a + b, 0) / occurrences.length 
                    : null
            }))
            .filter(d => d.mean !== null);

        const meanTrace = {
            x: meanLine.map(d => d.age),
            y: meanLine.map(d => d.mean),
            mode: 'lines',
            type: 'scatter',
            name: 'Mean Occurrences',
            line: {
                color: '#FF7E1D',
                width: 3
            }
        };

        // Create layout with improved visibility and fixed y-axis range
        // In createActorAgePlot function, update the layout configuration:
        const layout = {
            title: {
                text: 'Actor Career Analysis: Age vs. Number of Appearances',
                font: { size: 24, color: 'white' }
            },
            xaxis: {
                title: 'Age at First Appearance',
                range: [0, 40],
                gridcolor: 'gray',
                color: 'white',
                showline: false,
                zeroline: false
            },
            yaxis: {
                title: 'Number of Appearances',
                type: 'log',
                range: [0, 3],  // log10(1000) ≈ 3
                gridcolor: 'gray',
                color: 'white',
                showline: false,
                zeroline: false,
                fixedrange: true  // This prevents user from zooming on y-axis
            },
            plot_bgcolor: '#1e1e1e',
            paper_bgcolor: '#1e1e1e',
            showlegend: true,
            legend: {
                font: { color: 'white' }
            },
            shapes: [
                // Update vertical lines to extend full height
                { 
                    type: 'line', 
                    x0: 3, x1: 3, 
                    y0: 1, y1: 1000,
                    yref: 'y',
                    line: { color: 'yellow', width: 1 } 
                },
                { 
                    type: 'line', 
                    x0: 17, x1: 17, 
                    y0: 1, y1: 1000,
                    yref: 'y',
                    line: { color: 'yellow', width: 1 } 
                },
                // Additional reference lines
                { 
                    type: 'line', 
                    x0: 1, x1: 1, 
                    y0: 1, y1: 1000,
                    yref: 'y',
                    line: { color: 'white', width: 0.5, dash: 'dash' } 
                },
                // ... (repeat for other vertical lines)
            ],
            margin: {
                l: 80,
                r: 30,
                t: 100,
                b: 80
            }
        };

        Plotly.newPlot('actor-age-plot', [scatterTrace, meanTrace], layout);

    } catch (error) {
        console.error('Error creating actor age plot:', error);
        document.getElementById('actor-age-plot-error').textContent = 
            `Error creating plot: ${error.message}`;
    }
}