// Function to create a new plot with Plotly
function createNewPlot(plotId, xData, yData, plotTitle, xAxisTitle, yAxisTitle) {
    const trace = {
        x: xData,
        y: yData,
        mode: 'lines+markers',
        type: 'scatter',
        marker: { size: 8, color: 'blue' },
        line: { color: 'blue', width: 2 },
    };

    const layout = {
        title: plotTitle,
        xaxis: { title: xAxisTitle },
        yaxis: { title: yAxisTitle },
        margin: { l: 50, r: 50, b: 50, t: 50 },
        hovermode: 'closest',
    };

    const data = [trace];

    Plotly.newPlot(plotId, data, layout);
}