---
layout: default
---

# Network Analysis: Actor Collaborations and Success

## Actor Network Visualization

<div id="actor-network-plot" style="width: 100%; height: 800px;"></div>

The visualization above represents actor collaborations, where:
- Nodes represent actors
- Edges indicate collaborations
- Node size reflects number of collaborations
- Node color indicates actor's success metric

## Collaboration and Success Correlation

<div id="collaboration-success-plot" style="width: 100%; height: 600px;"></div>

### Key Findings

We observe a strong correlation between an actor's number of collaborations and their success metric, suggesting that:
- More collaborative actors tend to achieve higher success rates
- Network centrality often correlates with career longevity
- Industry connections play a significant role in actor success

## Career Trajectory Analysis

<div id="career-trajectory-plot" style="width: 100%; height: 600px;"></div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Load network data
    Promise.all([
        d3.csv('{{ site.baseurl }}/data/character_metadata_cleaned.csv'),
        d3.csv('{{ site.baseurl }}/data/movie_master_dataset.csv')
    ]).then(([characterData, movieData]) => {
        createActorNetwork(characterData, movieData);
        createCollaborationSuccessPlot(characterData, movieData);
        createCareerTrajectoryPlot(characterData);
    });
});

function createActorNetwork(characterData, movieData) {
    // Create force-directed graph visualization
    const nodes = [];
    const links = [];
    
    // Process data and create network visualization
    // Implementation follows similar style to data-analysis-plots.js
    // ...
}

function createCollaborationSuccessPlot(characterData, movieData) {
    // Create scatter plot of collaborations vs success
    // Implementation follows...
}

function createCareerTrajectoryPlot(characterData) {
    // Create career trajectory visualization
    // Implementation follows...
}
</script>