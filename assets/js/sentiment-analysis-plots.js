// File: assets/js/sentiment-analysis-plots.js

function createSentimentComparisonPlot(vaderData, distilbertData, movieId) {
    const layout = {
        title: {
            text: `Sentiment Comparison for Movie ID: ${movieId}`,
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

    // Process VADER data
    const vaderTrace = {
        x: Array.from({ length: vaderData.length }, (_, i) => i),
        y: vaderData.map(d => parseFloat(d.compound)),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'VADER',
        line: { color: 'cyan', width: 2 }
    };

    // Process DistilBERT data
    const distilbertTrace = {
        x: Array.from({ length: distilbertData.length }, (_, i) => i),
        y: distilbertData.map(d => parseFloat(d.sentiment_score)),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'DistilBERT',
        line: { color: 'magenta', width: 2 }
    };

    Plotly.newPlot('sentiment-comparison-plot', [vaderTrace, distilbertTrace], layout);
}

function createGenreSentimentPlot(data, modelType) {
    const layout = {
        title: {
            text: `Genre-based Sentiment Analysis (${modelType})`,
            font: { size: 24, color: 'white' }
        },
        xaxis: {
            title: 'Genre',
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

    // Process genre sentiment data
    const genreStats = processGenreSentiments(data);
    
    const trace = {
        x: Object.keys(genreStats),
        y: Object.values(genreStats).map(g => g.avgSentiment),
        type: 'bar',
        marker: {
            color: Object.values(genreStats).map(g => g.avgSentiment),
            colorscale: 'Viridis'
        }
    };

    Plotly.newPlot(`genre-sentiment-${modelType.toLowerCase()}`, [trace], layout);
}

function processGenreSentiments(data) {
    const genreStats = {};

    // Extract genres and calculate sentiment averages
    data.forEach(movie => {
        if (!movie.genres) return;
        
        const genres = movie.genres.split(', ');
        const sentiment = typeof movie.plot_sentiment === 'string' ? 
            JSON.parse(movie.plot_sentiment).compound : 
            parseFloat(movie.sentiment_score);

        if (!isNaN(sentiment)) {
            genres.forEach(genre => {
                if (!genreStats[genre]) {
                    genreStats[genre] = {
                        totalSentiment: 0,
                        count: 0,
                        sentiments: []
                    };
                }
                
                genreStats[genre].totalSentiment += sentiment;
                genreStats[genre].count += 1;
                genreStats[genre].sentiments.push(sentiment);
            });
        }
    });

    // Calculate averages and standard deviations
    Object.keys(genreStats).forEach(genre => {
        const stats = genreStats[genre];
        stats.avgSentiment = stats.totalSentiment / stats.count;
        
        // Calculate standard deviation
        const mean = stats.avgSentiment;
        stats.stdDev = Math.sqrt(
            stats.sentiments.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / stats.count
        );
    });

    // Filter for top 20 genres by movie count
    const sortedGenres = Object.entries(genreStats)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 20)
        .reduce((obj, [genre, stats]) => {
            obj[genre] = stats;
            return obj;
        }, {});

    return sortedGenres;
}