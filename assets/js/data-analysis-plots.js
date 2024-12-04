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

    const stats = years.map(year => calculateStatistics(yearStats[year][field + 's']));
    const meanTrace = {
        x: years,
        y: stats.map(s => s.mean),
        type: 'scatter',
        mode: 'lines',
        name: 'Mean',
        line: {
            color: field === 'revenue' ? COLORS.secondary : COLORS.tertiary,
            width: 4
        }
    };

    Plotly.newPlot(divId, [scatterTrace, meanTrace], 
        createPlotlyLayout(title, 'Year', yLabel, logY)
    );
}