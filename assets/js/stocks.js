let chart;

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function loadStock(symbol) {
    // Clear previous error
    document.getElementById('errorMessage').style.display = 'none';
    
    // Validate input
    if (!symbol || symbol.trim() === '') {
        showError('Please enter a stock symbol');
        return;
    }
    
    // Check if data is loaded
    if (!window.STOCK_DATA) {
        showError('Stock data is still loading... Please try again in a moment');
        return;
    }
    
    // Get data
    const upperSymbol = symbol.toUpperCase().trim();
    const data = window.STOCK_DATA[upperSymbol];
    
    if (!data || data.length === 0) {
        showError(`Stock symbol "${upperSymbol}" not found. Please check the symbol and try again.`);
        return;
    }
    
    // Prepare chart data
    const labels = data.map(d => d.date);
    const volumes = data.map(d => d.volume);
    
    // Calculate statistics
    const maxVolume = Math.max(...volumes);
    const minVolume = Math.min(...volumes);
    const avgVolume = (volumes.reduce((a, b) => a + b, 0) / volumes.length).toFixed(0);
    
    // Destroy old chart if exists
    if (chart) {
        chart.destroy();
    }
    
    // Get canvas context
    const ctx = document.getElementById("chart").getContext("2d");
    
    // Create new chart
    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: `Trading Volume - ${upperSymbol}`,
                data: volumes,
                backgroundColor: '#0366d6',
                borderColor: '#0256c7',
                borderWidth: 1,
                borderRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: `Trading Volume for ${upperSymbol}`
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Volume'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
    
    // Show chart and info
    document.getElementById('chartContainer').style.display = 'block';
    
    // Update stock info
    const infoDiv = document.getElementById('stockInfo');
    infoDiv.innerHTML = `
        <strong>${upperSymbol} Statistics</strong><br>
        Records: ${data.length} trading days<br>
        Max Volume: ${maxVolume.toLocaleString()}<br>
        Min Volume: ${minVolume.toLocaleString()}<br>
        Avg Volume: ${avgVolume.toLocaleString()}
    `;
    infoDiv.style.display = 'block';
}

function aggregateVolumeByYear() {
    const map = {};

    AAPL_DATA.forEach(d => {
        const year = d.date.split('-')[0];
        if (!map[year]) map[year] = 0;
        map[year] += d.Volume;
    });

    return {
        labels: Object.keys(map),
        data: Object.values(map)
    };
}

/////////////////////////////////

//////////////////////////////
// -------------------------
// AAPL interactive chart
// -------------------------
let aaplChart;
let AAPL_DATA = [];

function showAaplError(message) {
    const el = document.getElementById('aaplError');
    if (!el) return;
    el.textContent = message;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
}

function parseCSVToObjects(csv) {
    const lines = csv.trim().split('\n');
    if (lines.length <= 1) return [];
    const header = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1);
    return rows.map(r => {
        const cols = r.split(',');
        const obj = {};
        header.forEach((h, i) => {
            obj[h] = cols[i];
        });
        // normalize types
        return {
            date: obj['Date'],
            Open: parseFloat(obj['Open']),
            High: parseFloat(obj['High']),
            Low: parseFloat(obj['Low']),
            Close: parseFloat(obj['Close']),
            'Adj Close': parseFloat(obj['Adj Close']),
            Volume: parseInt(obj['Volume'], 10)
        };
    }).filter(d => d && d.date);
}

async function loadAAPLData() {
    try {
        const resp = await fetch('raw_data/stocks/AAPL.csv');
        if (!resp.ok) throw new Error('Failed to fetch AAPL CSV');
        const txt = await resp.text();
        AAPL_DATA = parseCSVToObjects(txt);
        if (!AAPL_DATA || AAPL_DATA.length === 0) {
            showAaplError('AAPL data is empty or malformed');
            return;
        }
        // default render: High
        renderAAPLChart('High');
    } catch (err) {
        console.error(err);
        showAaplError('Unable to load AAPL data. Check raw_data/stocks/AAPL.csv path.');
    }
}

function getMetricSeries(metric) {
    const labels = AAPL_DATA.map(d => d.date);
    let data = [];
    switch (metric) {
        case 'Low': data = AAPL_DATA.map(d => d.Low); break;
        case 'Close': data = AAPL_DATA.map(d => d.Close); break;
        case 'Open': data = AAPL_DATA.map(d => d.Open); break;
        case 'Volume': data = AAPL_DATA.map(d => d.Volume); break;
        case 'High':
        default:
            data = AAPL_DATA.map(d => d.High);
    }
    return { labels, data };
}

function renderAAPLChart(metric) {
    if (!AAPL_DATA || AAPL_DATA.length === 0) {
        showAaplError('AAPL data not loaded yet');
        return;
    }

    const ctx = document.getElementById('aaplChart').getContext('2d');
    //const { labels, data } = getMetricSeries(metric);
    //const isVolume = metric === 'Volume';

    let labels, data;
    const isVolume = metric === 'Volume';

    if (isVolume) {
        const yearly = aggregateVolumeByYear();
        labels = yearly.labels;
        data = yearly.data;
    } else {
        const series = getMetricSeries(metric);
        labels = series.labels;
        data = series.data;
    }

    // If chart exists, destroy to update
    if (aaplChart) aaplChart.destroy();

   

    aaplChart = new Chart(ctx, {
        type: isVolume ? 'bar' : 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `AAPL - ${metric}`,
                data: data,
                borderColor: '#2176FF',
                backgroundColor: '#2176FF', // single string, not array
                pointRadius: isVolume ? 1 : 1,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: { display: false,}
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 12,
                        callback: function(value, index, ticks) {
                            // Show only the year part of the date string
                            const dateStr = this.getLabelForValue ? this.getLabelForValue(value) : labels[index];
                            return dateStr ? dateStr.substring(0, 4) : '';
                        }
                    },
                    title: { display: true, text: 'Year' }
                },
                y: {
                    type: isVolume ? 'logarithmic' : 'linear',
                    beginAtZero: false,
                    title: { display: true, text: isVolume ? 'Volume (log scale)' : 'Price (USD)' },
                    ticks: {
                        callback: function(value) {
                            if (isVolume) return Number(value).toLocaleString();
                            return value;
                        }
                    }
                }
            }
        }
    });

    // summary info
    const info = document.getElementById('aaplInfo');
    if (info) {
        const max = Math.max(...data.filter(v => typeof v === 'number'));
        const min = Math.min(...data.filter(v => typeof v === 'number'));
        info.innerHTML = `Records: ${AAPL_DATA.length} &nbsp; | &nbsp; Max: ${isFinite(max) ? max.toLocaleString() : '-'} &nbsp; | &nbsp; Min: ${isFinite(min) ? min.toLocaleString() : '-'}`;
    }
}

// Wire up dropdown
document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('metricSelect');
    if (sel) {
        sel.addEventListener('change', (e) => {
            renderAAPLChart(e.target.value);
        });
    }
    // Attempt to load AAPL
    loadAAPLData();
});
