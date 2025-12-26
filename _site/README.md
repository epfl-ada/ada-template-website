# Introduction
* * *
Can **doing well** in finance also mean **doing good** for the planet? If you’ve asked yourself this question, you’re not alone, we have too! Sustainable investing has been gaining a lot of attention lately, and we wanted to see whether ethical investing can also stand up financially. To find out, we looked at data from ESG funds and traditional ETFs, comparing them across several financial metrics to explore how they behave differently.

## What are ESG funds?
* * *

ESG stands for **Environmental**, **Social**, and **Governance**, basically, the three pillars of responsible investing. An ESG ETF is a fund that includes companies that do well in these areas. For example, it might invest in companies that are eco-friendly, treat their employees and communities well, and have strong, transparent leadership. Think of ESG funds as a way to align your investments with your values. But a quick heads-up: the rules for what counts as “ESG” aren’t set in stone yet. Each fund issuer can have slightly different standards putting more importance into certain categories, so ESG funds can vary quite a bit.

# The Data
* * *

The data used in this investigation contains historical daily data on all the tickers that are currently trading on NASDAQ starting from different timepoints up to April 2020. The daily data contains: **Opening**,**Closing**,**Highest** and **Lowest** prices as well as the total **volume** traded on that specific day. We also have access to metadata for each company where we find our ESG labels.
* * *

Below is a visualization of the data for the Apple stock.

<style>
  .stock-viewer-container {
    max-width: 900px;
    margin: 20px 0;
  }
  
  .search-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  #stockSearch {
    flex: 1;
    min-width: 200px;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  #loadBtn {
    padding: 8px 20px;
    background-color: #0366d6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  #loadBtn:hover {
    background-color: #0256c7;
  }
  
  #loadBtn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  #chartContainer {
    position: relative;
    height: 400px;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  
  #errorMessage {
    color: #d73a49;
    padding: 10px;
    margin-top: 10px;
    background-color: #ffeef0;
    border-radius: 4px;
    display: none;
  }
  
  .stock-info {
    margin-top: 15px;
    padding: 10px;
    background-color: #f6f8fa;
    border-radius: 4px;
  }
  
  .loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #0366d6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>

<div class="stock-viewer-container">
  <div class="search-controls">
    <input type="text" id="stockSearch" placeholder="Enter stock symbol (e.g. AAPL)" autocomplete="off">
    <button id="loadBtn">Load Chart</button>
  </div>
  
  <div id="errorMessage"></div>
  
  <div id="chartContainer" style="display:none;">
    <canvas id="chart"></canvas>
  </div>
  
  <div class="stock-info" id="stockInfo" style="display:none;"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>

<script>
// Cache for loaded stock data to avoid re-fetching
const stockCache = {};
let allSymbols = [];
let symbolsLoaded = false;

// Load symbol list on page load
function loadSymbolList() {
    fetch('assets/data/symbols.json')
        .then(response => {
            console.log(`Symbols fetch status: ${response.status}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            allSymbols = data;
            symbolsLoaded = true;
            console.log(`✓ Loaded ${allSymbols.length} stock symbols`);
        })
        .catch(error => console.error('Error loading symbols:', error));
}

// Load individual stock data on demand
function loadStockData(symbol) {
    if (stockCache[symbol]) {
        console.log(`✓ Using cached data for ${symbol}`);
        return Promise.resolve(stockCache[symbol]);
    }
    
    const path = `assets/data/stocks/${symbol}.json`;
    console.log(`Fetching: ${path}`);
    
    return fetch(path)
        .then(response => {
            console.log(`Fetch status for ${symbol}: ${response.status}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log(`✓ Loaded ${data.length} records for ${symbol}`);
            stockCache[symbol] = data;
            return data;
        })
        .catch(error => {
            console.error(`Error loading ${symbol}:`, error);
            throw error;
        });
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function loadStock(symbol) {
    // Clear previous error
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) errorDiv.style.display = 'none';
    
    // Validate input
    if (!symbol || symbol.trim() === '') {
        showError('Please enter a stock symbol');
        return;
    }
    
    const upperSymbol = symbol.toUpperCase().trim();
    const loadBtn = document.getElementById('loadBtn');
    
    // Show loading state
    loadBtn.disabled = true;
    loadBtn.innerHTML = '<span class="loading-spinner"></span> Loading...';
    
    loadStockData(upperSymbol)
        .then(data => {
            if (!data || data.length === 0) {
                showError(`Stock symbol "${upperSymbol}" not found.`);
                loadBtn.disabled = false;
                loadBtn.innerHTML = 'Load Chart';
                return;
            }
            
            // Parse data (stored as arrays: [date, open, close, high, low, volume])
            const labels = data.map(d => d[0]);
            const volumes = data.map(d => d[5]);
            
            // Calculate statistics
            const maxVolume = Math.max(...volumes);
            const minVolume = Math.min(...volumes);
            const avgVolume = (volumes.reduce((a, b) => a + b, 0) / volumes.length).toFixed(0);
            
            // Destroy old chart if exists
            const chartCanvas = document.getElementById('chart');
            if (chartCanvas.chart) {
                chartCanvas.chart.destroy();
            }
            
            // Get canvas context
            const ctx = chartCanvas.getContext("2d");
            
            // Create new chart
            const newChart = new Chart(ctx, {
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
            
            // Store chart reference
            chartCanvas.chart = newChart;
            
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
            
            // Reset button
            loadBtn.disabled = false;
            loadBtn.innerHTML = 'Load Chart';
        })
        .catch(error => {
            showError(`Error loading stock "${upperSymbol}". Make sure the symbol exists in our dataset.`);
            console.error('Error:', error);
            loadBtn.disabled = false;
            loadBtn.innerHTML = 'Load Chart';
        });
}

// Event listener for load button
const loadBtn = document.getElementById("loadBtn");
if (loadBtn) {
    loadBtn.addEventListener("click", () => {
        const symbol = document.getElementById("stockSearch").value;
        loadStock(symbol);
    });
}

// Allow Enter key to load stock
const stockSearch = document.getElementById("stockSearch");
if (stockSearch) {
    stockSearch.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            const symbol = document.getElementById("stockSearch").value;
            loadStock(symbol);
        }
    });
}

// Load symbol list on page load
loadSymbolList();
</script>


## The ESG data

After selecting the etfs with the ESG labels the dataset is as follows:

| Number of etfs       | Labelled as ESG    | Percentage |
|:---------------------|:-------------------|:-----------|
|                 2166 |                 42 |        1.9 |

