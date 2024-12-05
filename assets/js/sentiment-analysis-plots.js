// File: assets/js/sentiment-analysis-plots.js

function createSentimentPlots(vaderData, distilbertData) {
    createSentimentComparisonPlot(vaderData, distilbertData);
    createGenreSentimentPlot(vaderData);
}

function createSentimentComparisonPlot(vaderData, distilbertData) {
    const movieId = '77856';
    
    // Process VADER data
    const vaderMovieData = vaderData
        .filter(d => d.movie_id === movieId)
        .map((d, i) => ({
            x: i,
            y: JSON.parse(d.sentence_sentiments)[0].compound
        }));

    // Process DistilBERT data
    const distilbertMovieData = distilbertData
        .filter(d => d.movie_id === movieId)
        .map((d, i) => ({
            x: i,
            y: parseFloat(d.sentiment_score)
        }));

    const traces = [
        {
            x: vaderMovieData.map(d => d.x),
            y: vaderMovieData.map(d => d.y),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'VADER',
            line: { color: 'cyan', width: 2 }
        },
        {
            x: distilbertMovieData.map(d => d.x),
            y: distilbertMovieData.map(d => d.y),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'DistilBERT',
            line: { color: 'magenta', width: 2 }
        }
    ];

    const layout = {
        title: {
            text: 'Sentiment Analysis Comparison',
            font: { size: 24, color: 'white' }
        },
        xaxis: {
            title: 'Sentence Index',
            gridcolor: 'gray',
            color: 'white'
        },
        yaxis: {
            title: 'Sentiment Score',
            gridcolor: 'gray',
            color: 'white'
        },
        plot_bgcolor: '#1e1e1e',
        paper_bgcolor: '#1e1e1e',
        font: { color: 'white' },
        showlegend: true,
        legend: { font: { color: 'white' } }
    };

    Plotly.newPlot('sentiment-comparison-plot', traces, layout);
}

function createGenreSentimentPlot(vaderData) {
    const genreStats = processGenreSentiments(vaderData);
    
    const trace = {
        x: Object.keys(genreStats),
        y: Object.values(genreStats).map(d => d.avgSentiment),
        type: 'bar',
        marker: {
            color: Object.values(genreStats).map(d => d.avgSentiment),
            colorscale: [
                [0, 'rgb(178,24,43)'],
                [0.5, 'rgb(244,244,244)'],
                [1, 'rgb(33,102,172)']
            ]
        }
    };

    const layout = {
        title: {
            text: 'Average Sentiment by Genre',
            font: { size: 24, color: 'white' }
        },
        xaxis: {
            title: 'Genre',
            tickangle: 45,
            gridcolor: 'gray',
            color: 'white'
        },
        yaxis: {
            title: 'Average Sentiment Score',
            gridcolor: 'gray',
            color: 'white'
        },
        plot_bgcolor: '#1e1e1e',
        paper_bgcolor: '#1e1e1e',
        font: { color: 'white' }
    };

    Plotly.newPlot('genre-sentiment-plot', [trace], layout);
}

function processGenreSentiments(data) {
    const genreStats = {};
    
    data.forEach(movie => {
        if (!movie.genres) return;
        
        const genres = movie.genres.split(', ');
        const sentiments = JSON.parse(movie.sentence_sentiments);
        const avgSentiment = sentiments.reduce((sum, s) => sum + s.compound, 0) / sentiments.length;
        
        genres.forEach(genre => {
            if (!genreStats[genre]) {
                genreStats[genre] = {
                    total: 0,
                    count: 0
                };
            }
            genreStats[genre].total += avgSentiment;
            genreStats[genre].count += 1;
        });
    });
    
    Object.keys(genreStats).forEach(genre => {
        genreStats[genre].avgSentiment = genreStats[genre].total / genreStats[genre].count;
    });
    
    // Get top 20 genres by count
    return Object.fromEntries(
        Object.entries(genreStats)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 20)
    );
}