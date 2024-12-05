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
        createPlotlyLayout('Total Yearly Box Office Revenue (1920+)', 'Year', 'Total Box Office Revenue [$] (log)', true)
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

async function createActorAgePlot() {
    try {
        // Load character metadata
        const response = await fetch('../data/character_metadata_cleaned.csv');
        const text = await response.text();
        const characterData = Papa.parse(text, { header: true }).data;

        console.log("Loaded character data length:", characterData.length); // Debug log

        // Process actor data
        const actorStats = {};
        characterData.forEach(row => {
            if (row.actor_name && row.actor_age) {  // Check if values exist
                const actorName = row.actor_name;
                const age = parseFloat(row.actor_age);
                
                if (actorName && !isNaN(age) && age > 0 && age < 100) {
                    if (!actorStats[actorName]) {
                        actorStats[actorName] = {
                            youngest_age: age,
                            occurrences: 1
                        };
                    } else {
                        actorStats[actorName].youngest_age = Math.min(actorStats[actorName].youngest_age, age);
                        actorStats[actorName].occurrences++;
                    }
                }
            }
        });

        console.log("Number of processed actors:", Object.keys(actorStats).length); // Debug log

        // Convert to arrays for plotting
        const plotData = Object.values(actorStats);
        console.log("Plot data points:", plotData.length); // Debug log

        // Calculate mean occurrences per age
        const ageStats = {};
        plotData.forEach(stat => {
            const age = Math.floor(stat.youngest_age);
            if (!ageStats[age]) {
                ageStats[age] = { sum: 0, count: 0 };
            }
            ageStats[age].sum += stat.occurrences;
            ageStats[age].count++;
        });

        const meanLine = Object.entries(ageStats)
            .map(([age, stats]) => ({
                age: parseInt(age),
                mean: stats.sum / stats.count
            }))
            .sort((a, b) => a.age - b.age);

        // Create scatter plot
        const scatterTrace = {
            x: plotData.map(d => d.youngest_age),
            y: plotData.map(d => d.occurrences),
            mode: 'markers',
            type: 'scatter',
            name: 'Actors',
            marker: {
                color: 'magenta',
                size: 3,
                opacity: 0.2
            }
        };

        // Create mean line
        const meanTrace = {
            x: meanLine.map(d => d.age),
            y: meanLine.map(d => d.mean),
            mode: 'lines',
            type: 'scatter',
            name: 'Mean Occurrences',
            line: {
                color: 'cyan',
                width: 2
            }
        };

        // Add vertical highlight lines
        const verticalLines = [
            { x: 1, color: 'white', style: 'dash', width: 0.5 },
            { x: 3, color: 'yellow', style: 'solid', width: 1 },
            { x: 5, color: 'white', style: 'dash', width: 0.5 },
            { x: 15, color: 'white', style: 'dash', width: 0.5 },
            { x: 17, color: 'yellow', style: 'solid', width: 1 },
            { x: 19, color: 'white', style: 'dash', width: 0.5 }
        ].map(line => ({
            type: 'line',
            x0: line.x,
            x1: line.x,
            y0: 0,
            y1: Math.max(...plotData.map(d => d.occurrences)),
            line: {
                color: line.color,
                width: line.width,
                dash: line.style
            }
        }));

        const layout = createPlotlyLayout(
            'Total Number of Occurrences vs. Youngest Age at First Occurrence',
            'Youngest Age at First Occurrence',
            'Total Number of Occurrences',
            true
        );

        layout.shapes = verticalLines;
        layout.yaxis.type = 'log';  // Set y-axis to logarithmic scale

        console.log("Creating plot with data points:", scatterTrace.x.length); // Debug log

        Plotly.newPlot('actor-age-plot', [scatterTrace, meanTrace], layout);

    } catch (error) {
        console.error('Error creating actor age plot:', error);
        console.error('Error details:', error.message);
    }
}