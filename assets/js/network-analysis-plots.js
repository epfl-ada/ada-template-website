// File: assets/js/network-analysis-plots.js
async function loadDataMaster() {
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

async function loadDataCharacter() {
    try {
        const response = await fetch('../data/character_metadata_cleaned.csv');
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


async function createActorNetwork_() {
    const characterData = await loadDataMaster();
    const movieData = await loadDataCharacter();

    width = 600
    height = 200

    // Process data for network visualization
    const { nodes, links } = processNetworkData(characterData, movieData);
    
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3.select('#actor-network-plot')
        .append('svg')
        .attr('viewBox', [0, 0, width, height])
        .style('background-color', '#1e1e1e');

    // Create links
    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .style('stroke', '#404040')
        .style('stroke-opacity', 0.6);

    // Create nodes
    const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', d => Math.sqrt(d.collaborations) * 2)
        .style('fill', d => d3.interpolateViridis(d.success))
        .call(drag(simulation));

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });

    Plotly.newPlot('collaboration-node-plot', [trace], layout);
    console.log(nodes, links);
}

async function createCollaborationSuccessPlot() {
    const dataMaster = await loadDataMaster();
    const dataCharacter = await loadDataCharacter();

    const actorStats = processActorStats(dataMaster, dataCharacter);
    // Convert actorStats from a Map to an array if it's not already
    const actorStatsArray = Array.from(actorStats);

    const trace = {
        x: actorStatsArray.map(d => d.collaborations),
        y: actorStatsArray.map(d => d.success),
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: 8,
            color: actorStatsArray.map(d => d.movies),
            colorscale: 'Viridis',
            opacity: 0.6
        }
    };

    const layout = {
        title: {
            text: 'Actor Collaborations vs Success',
            font: { size: 24, color: 'white' }
        },
        xaxis: {
            title: 'Number of Collaborations',
            type: 'log',
            gridcolor: 'gray',
            color: 'white'
        },
        yaxis: {
            title: 'Success Metric',
            gridcolor: 'gray',
            color: 'white'
        },
        plot_bgcolor: '#1e1e1e',
        paper_bgcolor: '#1e1e1e',
        font: { color: 'white' }
    };

    Plotly.newPlot('collaboration-success-plot', [trace], layout);
    console.log(actorStats);    // In createCollaborationSuccessPlot
}

async function createCareerTrajectoryPlot() {
    const characterData = await loadDataMaster();
    const movieData = await loadDataCharacter();

    const trajectoryData = processCareerTrajectories(characterData, movieData);
    
    const trace = {
        x: trajectoryData.years,
        y: trajectoryData.avgSuccess,
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: 'cyan', width: 2 },
        marker: { size: 8 }
    };

    const layout = {
        title: {
            text: 'Average Actor Success by Career Year',
            font: { size: 24, color: 'white' }
        },
        xaxis: {
            title: 'Years into Career',
            gridcolor: 'gray',
            color: 'white'
        },
        yaxis: {
            title: 'Average Success',
            gridcolor: 'gray',
            color: 'white'
        },
        plot_bgcolor: '#1e1e1e',
        paper_bgcolor: '#1e1e1e',
        font: { color: 'white' }
    };

    Plotly.newPlot('career-trajectory-plot', [trace], layout);
}

// Utility functions for network analysis

async function processNetworkData(characterData, movieData) {
    // Create maps for movie and actor success metrics
    const movieSuccessMap = new Map(
        movieData.map(movie => [
            movie.movie_id,
            {
                success: parseFloat(movie.rating) * Math.log(Math.max(parseFloat(movie.vote_count), 1)),
                year: new Date(movie.release_date).getFullYear()
            }
        ])
    );

    // Create collaboration tracking structures
    const collaborations = new Map();
    const actorMovies = new Map();
    const actorSuccess = new Map();

    // Process all character data to build collaboration network
    characterData.forEach(char1 => {
        const actor1 = char1.actor_name;
        
        // Track movies per actor
        if (!actorMovies.has(actor1)) {
            actorMovies.set(actor1, new Set());
        }
        actorMovies.get(actor1).add(char1.movie_id);

        // Track success metrics
        if (!actorSuccess.has(actor1)) {
            actorSuccess.set(actor1, {
                totalSuccess: 0,
                movieCount: 0
            });
        }

        const movieSuccess = movieSuccessMap.get(char1.movie_id);
        if (movieSuccess) {
            const stats = actorSuccess.get(actor1);
            stats.totalSuccess += movieSuccess.success;
            stats.movieCount += 1;
        }

        // Find collaborations within the same movie
        characterData.forEach(char2 => {
            if (char1.movie_id === char2.movie_id && char1.actor_name !== char2.actor_name) {
                const actor2 = char2.actor_name;
                const collaborationKey = [actor1, actor2].sort().join('|');

                if (!collaborations.has(collaborationKey)) {
                    collaborations.set(collaborationKey, {
                        count: 0,
                        movies: new Set()
                    });
                }
                
                const collab = collaborations.get(collaborationKey);
                if (!collab.movies.has(char1.movie_id)) {
                    collab.count += 1;
                    collab.movies.add(char1.movie_id);
                }
            }
        });
    });

    // Create nodes array (top 60 actors by collaboration count)
    const actorCollabCounts = new Map();
    collaborations.forEach((value, key) => {
        const [actor1, actor2] = key.split('|');
        actorCollabCounts.set(actor1, (actorCollabCounts.get(actor1) || 0) + value.count);
        actorCollabCounts.set(actor2, (actorCollabCounts.get(actor2) || 0) + value.count);
    });

    const topActors = Array.from(actorCollabCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 60)
        .map(([actor]) => actor);

    const nodes = topActors.map(actor => ({
        id: actor,
        collaborations: actorCollabCounts.get(actor),
        success: actorSuccess.get(actor).totalSuccess / actorSuccess.get(actor).movieCount,
        movieCount: actorMovies.get(actor).size
    }));

    // Create links array for top actors
    const links = Array.from(collaborations.entries())
        .filter(([key]) => {
            const [actor1, actor2] = key.split('|');
            return topActors.includes(actor1) && topActors.includes(actor2);
        })
        .map(([key, value]) => {
            const [actor1, actor2] = key.split('|');
            return {
                source: actor1,
                target: actor2,
                weight: value.count
            };
        });

    return { nodes, links };
}

async function processActorStats(characterData, movieData) {
    // Create movie success map
    const movieSuccessMap = new Map(
        movieData.map(movie => [
            movie.movie_id,
            {
                success: parseFloat(movie.rating) * Math.log(Math.max(parseFloat(movie.vote_count), 1)),
                year: new Date(movie.release_date).getFullYear()
            }
        ])
    );

    // Track actor statistics
    const actorStats = new Map();

    // Process all character appearances
    characterData.forEach(char => {
        const actor = char.actor_name;
        if (!actorStats.has(actor)) {
            actorStats.set(actor, {
                collaborations: new Set(),
                movies: new Set(),
                totalSuccess: 0,
                firstYear: Infinity,
                latestYear: -Infinity
            });
        }

        const stats = actorStats.get(actor);
        const movieSuccess = movieSuccessMap.get(char.movie_id);

        if (movieSuccess) {
            stats.movies.add(char.movie_id);
            stats.totalSuccess += movieSuccess.success;
            stats.firstYear = Math.min(stats.firstYear, movieSuccess.year);
            stats.latestYear = Math.max(stats.latestYear, movieSuccess.year);

            // Find collaborators in the same movie
            characterData
                .filter(c => c.movie_id === char.movie_id && c.actor_name !== actor)
                .forEach(collaborator => {
                    stats.collaborations.add(collaborator.actor_name);
                });
        }
    });

    // Convert to array format for plotting
    return Array.from(actorStats.entries())
        .filter(([_, stats]) => stats.movies.size >= 5) // Filter for actors with at least 5 movies
        .map(([actor, stats]) => ({
            name: actor,
            collaborations: stats.collaborations.size,
            movies: stats.movies.size,
            success: stats.totalSuccess / stats.movies.size,
            careerLength: stats.latestYear - stats.firstYear + 1
        }));
}

async function processCareerTrajectories(characterData, movieData) {
    // Create movie success map
    const movieSuccessMap = new Map(
        movieData.map(movie => [
            movie.movie_id,
            {
                success: parseFloat(movie.rating) * Math.log(Math.max(parseFloat(movie.vote_count), 1)),
                year: new Date(movie.release_date).getFullYear()
            }
        ])
    );

    // Track career trajectories
    const careerData = new Map();

    // Process all character appearances
    characterData.forEach(char => {
        const actor = char.actor_name;
        const movieSuccess = movieSuccessMap.get(char.movie_id);

        if (movieSuccess) {
            if (!careerData.has(actor)) {
                careerData.set(actor, {
                    firstYear: movieSuccess.year,
                    yearlySuccess: new Map()
                });
            }

            const career = careerData.get(actor);
            const careerYear = movieSuccess.year - career.firstYear;

            if (!career.yearlySuccess.has(careerYear)) {
                career.yearlySuccess.set(careerYear, {
                    totalSuccess: 0,
                    count: 0
                });
            }

            const yearStats = career.yearlySuccess.get(careerYear);
            yearStats.totalSuccess += movieSuccess.success;
            yearStats.count += 1;
        }
    });

    // Calculate average success by career year
    const trajectoryStats = new Map();
    careerData.forEach(career => {
        career.yearlySuccess.forEach((stats, year) => {
            if (!trajectoryStats.has(year)) {
                trajectoryStats.set(year, {
                    totalSuccess: 0,
                    count: 0
                });
            }
            const yearStats = trajectoryStats.get(year);
            yearStats.totalSuccess += stats.totalSuccess / stats.count;
            yearStats.count += 1;
        });
    });

    // Convert to arrays for plotting
    const years = Array.from(trajectoryStats.keys()).sort((a, b) => a - b);
    const avgSuccess = years.map(year => {
        const stats = trajectoryStats.get(year);
        return stats.totalSuccess / stats.count;
    });

    return { years, avgSuccess };
}

document.addEventListener('DOMContentLoaded', () => {
    createActorNetwork();
    createCollaborationSuccessPlot();
    createCareerTrajectoryPlot();
});

// document.addEventListener('DOMContentLoaded', function() {
//     // Load data
//     Papa.parse('/data/character_metadata_cleaned.csv', {

//     // Papa.parse('{{ site.baseurl }}/data/character_metadata_cleaned.csv', {
//         download: true,
//         header: true,
//         complete: function(characterResults) {
//             Papa.parse('/data/movie_master_dataset.csv', {
//             // Papa.parse('{{ site.baseurl }}/data/movie_master_dataset.csv', {
//                 download: true,
//                 header: true,
//                 complete: function(movieResults) {
//                     const characterData = characterResults.data;
//                     const movieData = movieResults.data;
                    
//                     // After the data is loaded, call the createNetworkPlots function
//                     createNetworkPlots(characterData, movieData);
//                 }
//             });
//         }
//     });
// });

async function createActorNetwork() {
    // Load data (assuming loadDataMaster and loadDataCharacter functions are defined)
    const characterData = await loadDataMaster();
    const movieData = await loadDataCharacter();

    // Process data for network visualization using the updated preprocessData function
    const { nodes, links } = await preprocessData(characterData, movieData);

    // Build the graph (using nodes and links)
    const G = buildGraph(nodes, links);

    // Get top actors
    const G_sub = getTopActors(G, 60);
    const actorAvgSuccess = computeActorAvgSuccess(nodes, 5, 10);

    // Process nodes and graph for visualization
    const updatedGraph = updateGraphWithAttributes(G_sub, actorAvgSuccess);
    const normalizedGraph = normalizeAttributes(updatedGraph);
    const pos = generatePositions(normalizedGraph);

    // Create the network plot (using Plotly traces)
    const { edgeTrace, nodeTrace } = preparePlotlyTraces(normalizedGraph, pos);

    // Visualize the network plot
    visualizeNetworkPlotly(edgeTrace, nodeTrace);

    // Collect additional metrics (degrees and success)
    const { degreesAll, avgSuccessesAll } = collectDegreesAndSuccess(G, actorAvgSuccess);

    // Create fame scores (degree centrality)
    const actorsList = Array.from(G.nodes);
    const fameScores = createFameScores(actorsList, degreesAll);

    // Find the best actor for each movie (using fame scores)
    const movieBestActor = findBestActorForMovies(movieData, nodes, fameScores, actorAvgSuccess);

    // Create movie DataFrame (or table) for the best actor for each movie
    const movieDf = createMovieDataFrame(movieBestActor, actorAvgSuccess);

    // Display the movie DataFrame (you can also plot or log it as necessary)
    console.log(movieDf);
}

// Preprocess data (this function merges character and movie data and calculates necessary metrics)
async function preprocessData(characterData, movieData) {
    // Create maps for movie success metrics
    const movieSuccessMap = new Map(
        movieData.map(movie => [
            movie.movie_id,
            {
                success: parseFloat(movie.rating) * Math.log(Math.max(parseFloat(movie.vote_count), 1)),
                year: new Date(movie.release_date).getFullYear()
            }
        ])
    );

    // Create collaboration tracking structures
    const collaborations = new Map();
    const actorMovies = new Map();
    const actorSuccess = new Map();

    // Process all character data to build collaboration network
    characterData.forEach(char1 => {
        const actor1 = char1.actor_name;

        // Track movies per actor
        if (!actorMovies.has(actor1)) {
            actorMovies.set(actor1, new Set());
        }
        actorMovies.get(actor1).add(char1.movie_id);

        // Track success metrics
        if (!actorSuccess.has(actor1)) {
            actorSuccess.set(actor1, {
                totalSuccess: 0,
                movieCount: 0
            });
        }

        const movieSuccess = movieSuccessMap.get(char1.movie_id);
        if (movieSuccess) {
            const stats = actorSuccess.get(actor1);
            stats.totalSuccess += movieSuccess.success;
            stats.movieCount += 1;
        }

        // Find collaborations within the same movie
        characterData.forEach(char2 => {
            if (char1.movie_id === char2.movie_id && char1.actor_name !== char2.actor_name) {
                const actor2 = char2.actor_name;
                const collaborationKey = [actor1, actor2].sort().join('|');

                if (!collaborations.has(collaborationKey)) {
                    collaborations.set(collaborationKey, {
                        count: 0,
                        movies: new Set()
                    });
                }

                const collab = collaborations.get(collaborationKey);
                if (!collab.movies.has(char1.movie_id)) {
                    collab.count += 1;
                    collab.movies.add(char1.movie_id);
                }
            }
        });
    });

    // Create nodes array (top 60 actors by collaboration count)
    const actorCollabCounts = new Map();
    collaborations.forEach((value, key) => {
        const [actor1, actor2] = key.split('|');
        actorCollabCounts.set(actor1, (actorCollabCounts.get(actor1) || 0) + value.count);
        actorCollabCounts.set(actor2, (actorCollabCounts.get(actor2) || 0) + value.count);
    });

    const topActors = Array.from(actorCollabCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 60)
        .map(([actor]) => actor);

    const nodes = topActors.map(actor => ({
        id: actor,
        collaborations: actorCollabCounts.get(actor),
        success: actorSuccess.get(actor).totalSuccess / actorSuccess.get(actor).movieCount,
        movieCount: actorMovies.get(actor).size
    }));

    // Create links array for top actors
    const links = Array.from(collaborations.entries())
        .filter(([key]) => {
            const [actor1, actor2] = key.split('|');
            return topActors.includes(actor1) && topActors.includes(actor2);
        })
        .map(([key, value]) => {
            const [actor1, actor2] = key.split('|');
            return {
                source: actor1,
                target: actor2,
                weight: value.count
            };
        });

    return { nodes, links };
}

// Build a graph from nodes and links
function buildGraph(nodes, links) {
    const G = { nodes: new Map(), links: [] };

    nodes.forEach(node => {
        G.nodes.set(node.id, node);
    });

    links.forEach(link => {
        G.links.push(link);
    });

    return G;
}

// Get the top N actors with the most collaborations
function getTopActors(G, topN) {
    const sortedNodes = Array.from(G.nodes.values())
        .sort((a, b) => b.collaborations - a.collaborations);
    return new Map(sortedNodes.slice(0, topN).map(node => [node.id, node]));
}

// Compute average success for each actor based on their collaborations
function computeActorAvgSuccess(nodes, minCollaborations, minSuccess) {
    const actorAvgSuccess = {};

    nodes.forEach(node => {
        if (node.collaborations >= minCollaborations && node.success >= minSuccess) {
            actorAvgSuccess[node.id] = node.success / node.collaborations;
        }
    });

    return actorAvgSuccess;
}

// Update graph with attributes such as success and collaboration count
function updateGraphWithAttributes(G_sub, actorAvgSuccess) {
    G_sub.forEach((actor, actorId) => {
        const avgSuccess = actorAvgSuccess[actorId] || 0;
        actor.success = avgSuccess;
    });

    return G_sub;
}

// Normalize graph attributes (e.g., success, collaborations)
function normalizeAttributes(G_sub) {
    const maxCollabs = Math.max(...Array.from(G_sub.values()).map(actor => actor.collaborations));
    const maxSuccess = Math.max(...Array.from(G_sub.values()).map(actor => actor.success));

    G_sub.forEach(actor => {
        actor.normCollabs = actor.collaborations / maxCollabs;
        actor.normSuccess = actor.success / maxSuccess;
    });

    return G_sub;
}

// Generate positions for nodes using a simple layout or physics simulation
function generatePositions(G_sub) {
    const positions = {};

    // Example of a simple random layout
    G_sub.forEach((actor, actorId) => {
        positions[actorId] = {
            x: Math.random() * 1000,
            y: Math.random() * 1000
        };
    });

    return positions;
}

// Prepare Plotly traces for visualization
function preparePlotlyTraces(G_sub, positions) {
    const edgeTrace = {
        x: [],
        y: [],
        mode: 'lines',
        type: 'scatter',
        line: { width: 0.5, color: '#888' },
        hoverinfo: 'none'
    };

    const nodeTrace = {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: [],
            color: [],
            colorscale: 'Viridis',
            opacity: 0.7
        },
        text: [],
        hoverinfo: 'text'
    };

    // Create edges and nodes for Plotly
    G_sub.forEach((actor, actorId) => {
        const pos = positions[actorId];
        nodeTrace.x.push(pos.x);
        nodeTrace.y.push(pos.y);
        nodeTrace.marker.size.push(Math.sqrt(actor.collaborations) * 5); // Adjust size based on collaborations
        nodeTrace.marker.color.push(actor.normSuccess);
        nodeTrace.text.push(`${actorId}<br>Success: ${actor.success}<br>Collaborations: ${actor.collaborations}`);

        // Create edges (links)
        G.links.forEach(link => {
            if (link.source === actorId || link.target === actorId) {
                const targetActor = link.source === actorId ? link.target : link.source;
                const targetPos = positions[targetActor];
                edgeTrace.x.push(pos.x);
                edgeTrace.y.push(pos.y);
                edgeTrace.x.push(targetPos.x);
                edgeTrace.y.push(targetPos.y);
            }
        });
    });

    return { edgeTrace, nodeTrace };
}

// Visualize the network plot with Plotly
function visualizeNetworkPlotly(edgeTrace, nodeTrace) {
    const layout = {
        title: 'Actor Collaboration Network',
        titlefont: { size: 24, color: 'white' },
        showlegend: false,
        xaxis: { showgrid: false, zeroline: false, showticklabels: false },
        yaxis: { showgrid: false, zeroline: false, showticklabels: false },
        plot_bgcolor: '#1e1e1e',
        paper_bgcolor: '#1e1e1e',
        font: { color: 'white' }
    };

    Plotly.newPlot('actor-network-plot', [edgeTrace, nodeTrace], layout);
}

// Collect degree (collaboration count) and success data for all actors
function collectDegreesAndSuccess(G, actorAvgSuccess) {
    const degreesAll = {};
    const avgSuccessesAll = {};

    G.nodes.forEach((actor, actorId) => {
        degreesAll[actorId] = actor.collaborations;
        avgSuccessesAll[actorId] = actorAvgSuccess[actorId] || 0;
    });

    return { degreesAll, avgSuccessesAll };
}

// Create fame scores (based on degree centrality)
function createFameScores(actorsList, degreesAll) {
    const fameScores = {};

    actorsList.forEach(actor => {
        fameScores[actor] = degreesAll[actor] || 0;
    });

    return fameScores;
}

// Find the best actor for each movie based on fame scores and average success
function findBestActorForMovies(movieData, mergedData, fameScores, actorAvgSuccess) {
    const movieBestActor = {};

    movieData.forEach(movie => {
        const movieActors = mergedData.filter(char => char.movie_id === movie.movie_id);
        let bestActor = null;
        let highestScore = -Infinity;

        movieActors.forEach(char => {
            const actorId = char.actor_name;
            const fameScore = fameScores[actorId] || 0;
            const avgSuccess = actorAvgSuccess[actorId] || 0;
            const score = fameScore * avgSuccess; // Combine fame and success

            if (score > highestScore) {
                highestScore = score;
                bestActor = actorId;
            }
        });

        movieBestActor[movie.movie_id] = bestActor;
    });

    return movieBestActor;
}

// Create a movie DataFrame (or table) for the best actor for each movie
function createMovieDataFrame(movieBestActor, actorAvgSuccess) {
    const movieDf = [];

    for (const movieId in movieBestActor) {
        const bestActor = movieBestActor[movieId];
        const avgSuccess = actorAvgSuccess[bestActor] || 0;

        movieDf.push({
            movieId: movieId,
            bestActor: bestActor,
            avgSuccess: avgSuccess
        });
    }

    return movieDf;
}
