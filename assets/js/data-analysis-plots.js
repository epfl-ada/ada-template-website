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

    const trace = {
        x: allMovies.map(m => m.success),
        y: allMovies.map(m => m.revenue),
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: allMovies.map(m => m.rating),
            colorscale: 'Viridis',
            showscale: true,
            size: 5,
            opacity: 0.3,
            colorbar: {
                title: 'Rating',
                titleside: 'right'
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