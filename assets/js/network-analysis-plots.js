// File: assets/js/network-analysis-plots.js

function createNetworkPlots(characterData, movieData) {
    createActorNetwork(characterData, movieData);
    createCollaborationSuccessPlot(characterData, movieData);
    createCareerTrajectoryPlot(characterData, movieData);
}

function createActorNetwork(characterData, movieData, width = 800, height = 800) {
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
}

function createCollaborationSuccessPlot(characterData, movieData) {
    const actorStats = processActorStats(characterData, movieData);
    
    const trace = {
        x: actorStats.map(d => d.collaborations),
        y: actorStats.map(d => d.success),
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: 8,
            color: actorStats.map(d => d.movies),
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
}

function createCareerTrajectoryPlot(characterData, movieData) {
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

function processNetworkData(characterData, movieData) {
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

function processActorStats(characterData, movieData) {
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

function processCareerTrajectories(characterData, movieData) {
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