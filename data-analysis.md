---
layout: default
---

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

# Data Analysis 6:09

## Preliminary Analysis and Metric Selection

<div id="movieReleasesChart" style="width: 100%; height: 400px;"></div>
<div id="revenueChart" style="width: 100%; height: 400px;"></div>
<div id="ratingsChart" style="width: 100%; height: 400px;"></div>

<script>
// Manually include the data
const analysisData = {"movie_releases":[{"year":1920,"count":1},{"year":1921,"count":1},{"year":1923,"count":1},{"year":1924,"count":1},{"year":1925,"count":1},{"year":1930,"count":2},{"year":1931,"count":1},{"year":1932,"count":1},{"year":1933,"count":3},{"year":1934,"count":3},{"year":1935,"count":6},{"year":1936,"count":6},{"year":1937,"count":2},{"year":1938,"count":4},{"year":1939,"count":2},{"year":1940,"count":5},{"year":1941,"count":4},{"year":1942,"count":2},{"year":1943,"count":1},{"year":1944,"count":2},{"year":1945,"count":2},{"year":1946,"count":2},{"year":1947,"count":2},{"year":1948,"count":3},{"year":1949,"count":10},{"year":1950,"count":14},{"year":1951,"count":22},{"year":1952,"count":27},{"year":1953,"count":24},{"year":1954,"count":14},{"year":1955,"count":15},{"year":1956,"count":18},{"year":1957,"count":17},{"year":1958,"count":2},{"year":1959,"count":2},{"year":1960,"count":1},{"year":1961,"count":1},{"year":1962,"count":1},{"year":1964,"count":2},{"year":1965,"count":3},{"year":1966,"count":5},{"year":1967,"count":9},{"year":1968,"count":4},{"year":1969,"count":1},{"year":1970,"count":4},{"year":1971,"count":3},{"year":1972,"count":2},{"year":1973,"count":3},{"year":1974,"count":2},{"year":1975,"count":10},{"year":1976,"count":2},{"year":1977,"count":3},{"year":1978,"count":4},{"year":1979,"count":7},{"year":1980,"count":8},{"year":1981,"count":7},{"year":1982,"count":7},{"year":1983,"count":17},{"year":1984,"count":11},{"year":1985,"count":18},{"year":1986,"count":16},{"year":1987,"count":26},{"year":1988,"count":21},{"year":1989,"count":28},{"year":1990,"count":25},{"year":1991,"count":10},{"year":1992,"count":12},{"year":1993,"count":23},{"year":1994,"count":17},{"year":1995,"count":17},{"year":1996,"count":19},{"year":1997,"count":17},{"year":1998,"count":14},{"year":1999,"count":16},{"year":2000,"count":22},{"year":2001,"count":23},{"year":2002,"count":15},{"year":2003,"count":21},{"year":2004,"count":18},{"year":2005,"count":17},{"year":2006,"count":29},{"year":2007,"count":26},{"year":2008,"count":31},{"year":2009,"count":21},{"year":2010,"count":17},{"year":2011,"count":4},{"year":2012,"count":5}],"revenue":[{"year":1920,"revenue":4500000.0},{"year":1921,"revenue":2500000.0},{"year":1923,"revenue":4168790.0},{"year":1924,"revenue":274827.0},{"year":1925,"revenue":4250001.0},{"year":1930,"revenue":8780000.0},{"year":1931,"revenue":5019181.0},{"year":1932,"revenue":2000000.0},{"year":1933,"revenue":6306000.0},{"year":1934,"revenue":4913000.0},{"year":1935,"revenue":11587000.0},{"year":1936,"revenue":14486143.0},{"year":1937,"revenue":2769138.0},{"year":1938,"revenue":6370091.0},{"year":1939,"revenue":9624643.0},{"year":1940,"revenue":5861129.0},{"year":1941,"revenue":13900000.0},{"year":1942,"revenue":7453416.0},{"year":1943,"revenue":2176489.0},{"year":1944,"revenue":3517285.0},{"year":1945,"revenue":6498386.0},{"year":1946,"revenue":44058163.0},{"year":1947,"revenue":2853357.0},{"year":1948,"revenue":17439142.0},{"year":1949,"revenue":24971188.0},{"year":1950,"revenue":31000000.0},{"year":1951,"revenue":46750000.0},{"year":1952,"revenue":54650000.0},{"year":1953,"revenue":93745000.0},{"year":1954,"revenue":46082130.0},{"year":1955,"revenue":56400000.0},{"year":1956,"revenue":78610000.0},{"year":1957,"revenue":45143000.0},{"year":1958,"revenue":5500000.0},{"year":1959,"revenue":5275000.0},{"year":1960,"revenue":4500000.0},{"year":1961,"revenue":25150385.0},{"year":1962,"revenue":1200000.0},{"year":1964,"revenue":10700000.0},{"year":1965,"revenue":7200000.0},{"year":1966,"revenue":42192682.0},{"year":1967,"revenue":148436100.0},{"year":1968,"revenue":28299000.0},{"year":1969,"revenue":82000000.0},{"year":1970,"revenue":57065560.0},{"year":1971,"revenue":35912637.0},{"year":1972,"revenue":13600000.0},{"year":1973,"revenue":58767000.0},{"year":1974,"revenue":7572000.0},{"year":1975,"revenue":187065467.0},{"year":1976,"revenue":62220000.0},{"year":1977,"revenue":104937139.0},{"year":1978,"revenue":87810695.0},{"year":1979,"revenue":345267857.0},{"year":1980,"revenue":59325825.0},{"year":1981,"revenue":104504102.0},{"year":1982,"revenue":67309609.0},{"year":1983,"revenue":273507193.0},{"year":1984,"revenue":166320340.0},{"year":1985,"revenue":297913855.0},{"year":1986,"revenue":175299221.0},{"year":1987,"revenue":604039885.0},{"year":1988,"revenue":364048210.0},{"year":1989,"revenue":513533222.0},{"year":1990,"revenue":563938534.0},{"year":1991,"revenue":160417389.0},{"year":1992,"revenue":121606861.0},{"year":1993,"revenue":708368501.0},{"year":1994,"revenue":131556608.0},{"year":1995,"revenue":192940489.0},{"year":1996,"revenue":235337863.0},{"year":1997,"revenue":76863411.0},{"year":1998,"revenue":78894454.0},{"year":1999,"revenue":113483033.0},{"year":2000,"revenue":648292132.0},{"year":2001,"revenue":474200452.0},{"year":2002,"revenue":221265484.0},{"year":2003,"revenue":343536133.0},{"year":2004,"revenue":301599584.0},{"year":2005,"revenue":428362302.0},{"year":2006,"revenue":139836220.0},{"year":2007,"revenue":198815490.0},{"year":2008,"revenue":131001007.0},{"year":2009,"revenue":326754809.0},{"year":2010,"revenue":168893948.0},{"year":2011,"revenue":160054754.0},{"year":2012,"revenue":47558926.0}],"ratings":[{"year":1920,"mean":6.9,"median":6.9,"std":0.0},{"year":1921,"mean":8.174,"median":8.174,"std":0.0},{"year":1923,"mean":7.8,"median":7.8,"std":0.0},{"year":1924,"mean":7.4,"median":7.4,"std":0.0},{"year":1925,"mean":8.0,"median":8.0,"std":0.0}]};

// Movie Releases Plot
const movieTrace = {
    x: analysisData.movie_releases.map(d => d.year),
    y: analysisData.movie_releases.map(d => d.count),
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(136, 204, 238)',
        width: 2
    },
    name: 'Number of Movies'
};

const movieLayout = {
    title: 'Total Number of Movies Released Yearly',
    paper_bgcolor: '#1e1e1e',
    plot_bgcolor: '#1e1e1e',
    font: {
        color: 'white'
    },
    xaxis: {
        title: 'Year',
        gridcolor: 'gray'
    },
    yaxis: {
        title: 'Number of Movies',
        gridcolor: 'gray'
    }
};

Plotly.newPlot('movieReleasesChart', [movieTrace], movieLayout);

// Revenue Plot
const revenueTrace = {
    x: analysisData.revenue.map(d => d.year),
    y: analysisData.revenue.map(d => d.revenue),
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(144, 238, 144)',
        width: 2
    },
    name: 'Total Revenue'
};

const revenueLayout = {
    title: 'Total Yearly Box Office Revenue',
    paper_bgcolor: '#1e1e1e',
    plot_bgcolor: '#1e1e1e',
    font: {
        color: 'white'
    },
    xaxis: {
        title: 'Year',
        gridcolor: 'gray'
    },
    yaxis: {
        title: 'Total Box Office Revenue [$]',
        type: 'log',
        gridcolor: 'gray'
    }
};

Plotly.newPlot('revenueChart', [revenueTrace], revenueLayout);

// Ratings Plot
const ratingsTrace = {
    x: analysisData.ratings.map(d => d.year),
    y: analysisData.ratings.map(d => d.mean),
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'rgb(255, 165, 0)',
        width: 2
    },
    name: 'Mean Rating'
};

const ratingsLayout = {
    title: 'Yearly Rating Statistics',
    paper_bgcolor: '#1e1e1e',
    plot_bgcolor: '#1e1e1e',
    font: {
        color: 'white'
    },
    xaxis: {
        title: 'Year',
        gridcolor: 'gray'
    },
    yaxis: {
        title: 'Rating',
        range: [0, 10],
        gridcolor: 'gray'
    }
};

Plotly.newPlot('ratingsChart', [ratingsTrace], ratingsLayout);
</script>

## Observations

### Movie Releases
The plot illustrates the growth in movie production from 1920 onward, with notable fluctuations. The post-1980s increase likely reflects technological and industry expansion.

### Revenue Trends
We observe a near-exponential growth in total box office revenue per year, potentially driven by:
- Increasing number of movie releases
- Inflation effects
- Growing global interest in cinema

### Ratings Analysis
The ratings trend shows significantly less fluctuation compared to revenue, suggesting that audience perception has remained relatively stable over time.

[Back to Home](/ada-template-website/)