// File: assets/js/utilities.js

// Plotting utilities
function createPlotlyLayout(title, xTitle, yTitle, logY = false) {
    return {
        title: {
            text: title,
            font: { size: 24, color: 'white' }
        },
        xaxis: {
            title: xTitle,
            gridcolor: 'gray',
            color: 'white',
            showline: false,  // Remove axis line
            zeroline: false   // Remove zero line
        },
        yaxis: {
            title: yTitle,
            type: logY ? 'log' : 'linear',
            gridcolor: 'gray',
            color: 'white',
            showline: false,  // Remove axis line
            zeroline: false   // Remove zero line
        },
        plot_bgcolor: '#1e1e1e',
        paper_bgcolor: '#1e1e1e',
        font: { color: 'white' },
        showlegend: true,
        legend: {
            font: { color: 'white' }
        },
        margin: {  // Adjust margins to remove spacing
            l: 80,
            r: 30,
            t: 100,
            b: 80
        }
    };
}

// Data processing utilities
function calculateStatistics(array) {
    if (!array || array.length === 0) return { mean: 0, median: 0, std: 0 };
    
    const mean = array.reduce((a, b) => a + b, 0) / array.length;
    const sortedArray = [...array].sort((a, b) => a - b);
    const median = sortedArray[Math.floor(array.length / 2)];
    const std = Math.sqrt(array.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / array.length);
    
    return { mean, median, std };
}

// Data transformation utilities
function processYearlyData(data, startYear = 1920) {
    const yearStats = {};
    
    data.forEach(row => {
        if (row.release_date) {
            const year = new Date(row.release_date).getFullYear();
            if (year >= startYear && !isNaN(year)) {
                if (!yearStats[year]) {
                    yearStats[year] = {
                        count: 0,
                        totalRevenue: 0,
                        revenues: [],
                        ratings: [],
                        votes: [],
                        movies: []
                    };
                }
                
                yearStats[year].count++;
                
                const revenue = parseFloat(row.revenue) || 0;
                const rating = parseFloat(row.rating) || 0;
                const votes = parseFloat(row.vote_count) || 0;
                
                if (revenue > 0) {
                    yearStats[year].revenues.push(revenue);
                    yearStats[year].totalRevenue += revenue;
                }
                if (rating > 0) yearStats[year].ratings.push(rating);
                if (votes > 0) yearStats[year].votes.push(votes);
                
                yearStats[year].movies.push({ revenue, rating, votes });
            }
        }
    });
    
    return yearStats;
}

// Color utilities
const COLORS = {
    primary: 'lightblue',
    secondary: 'lightgreen',
    tertiary: 'orange',
    highlight: 'magenta',
    neutral: 'white'
};
// Data validation utilities
function isValidNumber(value) {
    return !isNaN(value) && value !== null && value !== undefined;
}

// Export utilities
function downloadCSV(data, filename) {
    const csvContent = "data:text/csv;charset=utf-8," + data;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Date utilities
function getYearFromDate(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
}