// Function to load data
async function loadData() {
    try {
        const response = await fetch('../data/movie_master_dataset.csv');
        const csvText = await response.text();
        
        // Parse CSV
        const rows = csvText.split('\n').slice(1); // Skip header
        const data = rows.map(row => {
            const columns = row.split(',');
            return {
                release_date: new Date(columns[4]),
                revenue: parseFloat(columns[3]),
            };
        });

        return data.filter(d => !isNaN(d.revenue) && d.release_date.getFullYear() >= 1920);
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}

// Create movies per year plot
async function create_influence_FactorsPlot() {
    const data = await loadData();
    
    // Group by year
    const moviesPerYear = {};
    data.forEach(movie => {
        const year = movie.release_date.getFullYear();
        moviesPerYear[year] = (moviesPerYear[year] || 0) + 1;
    });

    const years = Object.keys(moviesPerYear).sort();
    const counts = years.map(year => moviesPerYear[year]);

    const trace = {
        x: years,
        y: counts,
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'lightblue',
            width: 2
        },
        name: 'Number of Movies'
    };

    const layout = {
        title: 'Total Number of Movies Released Yearly',
        xaxis: {
            title: 'Year',
            gridcolor: 'gray'
        },
        yaxis: {
            title: 'Number of Movies',
            gridcolor: 'gray'
        },
        paper_bgcolor: '#1e1e1e',
        plot_bgcolor: '#1e1e1e',
        font: {
            color: 'white'
        }
    };

    Plotly.newPlot('influence_Factors', [trace], layout);
}


// Initialize plots when document is ready
document.addEventListener('DOMContentLoaded', () => {
    create_influence_FactorsPlot();
});