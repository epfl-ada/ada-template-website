// File: assets/js/network-analysis-plots.js

// Utility functions for data processing
function processActorStats(characterData, movieData) {
    const actorStats = new Map();
    
    // Process movie success data
    const movieSuccess = new Map();
    movieData.forEach(movie => {
        movieSuccess.set(movie.movie_id, {
            success: movie.rating * Math.log(Math.max(movie.vote_count, 1)),
            year: new Date(movie.release_date).getFullYear()
        });
    });

    // Calculate actor statistics
    characterData.forEach(char => {
        if (!actorStats.has(char.actor_name)) {
            actorStats.set(char.actor_name, {
                collaborations: new Set(),
                movies: new Set(),
                totalSuccess: 0,
                firstYear: Infinity
            });
        }
        
        const stats = actorStats.get(char.actor_name);
        stats.movies.add(char.movie_id);
        
        const movieData = movieSuccess.get(char.movie_id);
        if (movieData) {
            stats.totalSuccess += movieData.success;
            stats.firstYear = Math.min(stats.firstYear, movieData.year);
        }
    });

    // Process collaborations
    characterData.forEach(char1 => {
        characterData.forEach(char2 => {
            if (char1.movie_id === char2.movie_id && char1.actor_name !== char2.actor_name) {
                actorStats.get(char1.actor_name).collaborations.add(char2.actor_name);
            }
        });
    });

    // Convert to array format
    return Array.from(actorStats.entries()).map(([name, stats]) => ({
        name,
        collaborations: stats.collaborations.size,
        movies: stats.movies.size,
        success: stats.totalSuccess / stats.movies.size,
        firstYear: stats.firstYear
    }));
}

// Network visualization
function createActorNetwork(characterData, movieData, width = 800, height = 800) {
    const actorStats = processActorStats(characterData, movieData);
    
    // Filter to top 60 actors by collaborations
    const topActors = actorStats
        .sort((a, b) => b.collaborations - a.collaborations)
        .slice(0, 60);

    // Create nodes and links
    const nodes = topActors.map(actor => ({
        id: actor.name,
        collaborations: actor.collaborations,
        success: actor.success,
        radius: Math.sqrt(actor.collaborations) * 2
    }));

    const links = [];
    for (let i = 0; i < topActors.length; i++) {
        for (let j = i + 1; j < topActors.length; j++) {
            if (areCollaborators(topActors[i].name, topActors[j].name, characterData)) {
                links.push({
                    source: topActors[i].name,
                    target: topActors[j].name
                });
            }
        }
    }

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => d.radius + 2));

    // Create SVG container
    const svg = d3.select('#actor-network-plot')
        .append('svg')
        .attr('viewBox', [0, 0, width, height])
        .style('background-color', '#1e1e1e');

    // Add links
    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .style('stroke', '#404040')
        .style('stroke-width', 0.5)
        .style('stroke-opacity', 0.6);

    // Add nodes
    const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', d => d.radius)
        .style('fill', d => d3.interpolateViridis(normalizeSuccess(d.success)))
        .style('stroke', '#fff')
        .style('stroke-width', 0.5)
        .call(drag(simulation));

    // Add labels
    const label = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text(d => d.id)
        .style('fill', 'white')
        .style('font-size', '8px')
        .style('text-anchor', 'middle')
        .style('pointer-events', 'none');

    // Simulation update function
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        label
            .attr('x', d => d.x)
            .attr('y', d => d.y + 3);
    });
}

// Collaboration success analysis
function createCollaborationSuccessPlot(characterData, movieData) {
    const actorStats = processActorStats(characterData, movieData);
    
    const trace = {
        x: actorStats.map(d => d.collaborations),
        y: actorStats.map(d => d.success),
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: 6,
            color: actorStats.map(d => d.movies),
            colorscale: 'Viridis',
            opacity: 0.6,
            showscale: true,
            colorbar: {
                title: 'Number of Movies',
                titlefont: { color: 'white' },
                tickfont: { color: 'white' }
            }
        },
        hovertemplate: 
            '<b>%{text}</b><br>' +
            'Collaborations: %{x}<br>' +
            'Success: %{y:.2f}<br>' +
            '<extra></extra>',
        text: actorStats.map(d => d.name)
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
        font: { color: 'white' },
        showlegend: false
    };

    Plotly.newPlot('collaboration-success-plot', [trace], layout);
}

// Career trajectory analysis
function createCareerTrajectoryPlot(characterData) {
    // Calculate average success by career year
    const careerData = processCareerTrajectories(characterData);
    
    const trace = {
        x: careerData.years,
        y: careerData.avgSuccess,
        mode: 'lines+markers',
        type: 'scatter',
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

// Utility functions
function drag(simulation) {
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

function areCollaborators(actor1, actor2, characterData) {
    return characterData.some(char1 => 
        char1.actor_name === actor1 && 
        characterData.some(char2 => 
            char2.actor_name === actor2 && 
            char1.movie_id === char2.movie_id
        )
    );
}

function normalizeSuccess(success) {
    // Normalize success value to [0,1] range for color scaling
    const minSuccess = 0;
    const maxSuccess = 100;
    return (success - minSuccess) / (maxSuccess - minSuccess);
}

function processCareerTrajectories(characterData) {
    const careerData = new Map();
    
    // Process career trajectories
    characterData.forEach(char => {
        const careerYear = getCareerYear(char.actor_name, char.release_date, characterData);
        if (!careerData.has(careerYear)) {
            careerData.set(careerYear, {
                totalSuccess: 0,
                count: 0
            });
        }
        const yearData = careerData.get(careerYear);
        yearData.totalSuccess += char.success || 0;
        yearData.count += 1;
    });

    // Convert to arrays for plotting
    const years = Array.from(careerData.keys()).sort((a, b) => a - b);
    const avgSuccess = years.map(year => {
        const yearData = careerData.get(year);
        return yearData.totalSuccess / yearData.count;
    });

    return { years, avgSuccess };
}

function getCareerYear(actorName, releaseDate, characterData) {
    const firstMovie = characterData
        .filter(char => char.actor_name === actorName)
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))[0];
    
    return firstMovie ? 
        Math.floor((new Date(releaseDate) - new Date(firstMovie.release_date)) / (1000 * 60 * 60 * 24 * 365)) : 
        0;
}