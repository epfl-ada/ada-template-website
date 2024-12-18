// File: assets/js/sentiment-analysis-plots.js

function createSentimentPlots(vaderData, distilbertData) {
    createSentimentComparisonPlot(vaderData, distilbertData);
    createGenreSentimentPlot(vaderData);
}

// Function to update DistilBERT plot
function updateDistilBERTPlot(movieId) {
    // Load the sentiment data
    Papa.parse('/data/distillbert_sentiment_analysis.csv', {
        download: true,
        header: true,
        complete: function(results) {
            // Filter data for the selected movie
            const movieData = results.data.filter(row => row.movie_id === movieId);
            
            if (movieData.length === 0) {
                console.error('No data found for movie ID:', movieId);
                return;
            }

            // Create the plot data
            const trace = {
                x: movieData.map((_, index) => index),
                y: movieData.map(row => parseFloat(row.sentiment_score)),
                type: 'scatter',
                mode: 'lines+markers',
                line: {
                    color: 'rgb(75, 192, 192)',
                    width: 2
                },
                marker: {
                    size: 6
                }
            };

            const layout = {
                title: {
                    text: `Sentence Sentiment for Movie ID: ${movieId} (DistilBERT)`,
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
                font: { color: 'white' }
            };

            Plotly.newPlot('distilbert-sentiment-plot', [trace], layout);
        },
        error: function(error) {
            console.error('Error loading sentiment data:', error);
        }
    });
}

// Call the function when the page loads with the default movie ID
document.addEventListener('DOMContentLoaded', function() {
    updateDistilBERTPlot('77856');
});

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