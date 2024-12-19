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

// Create a dummy plot to check if it works
function createDummyPlot() {
    const dummyTrace = {
        x: [1, 2, 3, 4, 5],
        y: [10, 15, 13, 17, 20],
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
            color: 'red',
            size: 8
        },
        line: {
            color: 'blue',
            width: 2
        },
        name: 'Dummy Data'
    };

    const layout = {
        title: 'Dummy Plot',
        xaxis: {
            title: 'X Axis',
            gridcolor: 'gray'
        },
        yaxis: {
            title: 'Y Axis',
            gridcolor: 'gray'
        },
        paper_bgcolor: '#f8f9fa',
        plot_bgcolor: '#f8f9fa',
        font: {
            color: 'black'
        }
    };

    Plotly.newPlot('correlation', [dummyTrace], layout);
}

document.addEventListener('DOMContentLoaded', () => {
    createDummyPlot();
});