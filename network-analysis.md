---
layout: default
---

# Network Analysis: Actor Collaborations and Success

## Actor Network Visualization

<div id="actor-network-plot" class="plot-container" style="width: 100%; height: 800px;"></div>

The visualization above represents actor collaborations, where:
- Nodes represent actors (size indicates number of collaborations)
- Edges indicate collaborations between actors
- Color indicates actor's success metric
- Position reflects clustering of frequent collaborators

## Collaboration and Success Analysis

<div id="collaboration-success-plot" class="plot-container" style="width: 100%; height: 600px;"></div>

## Career Trajectory Analysis

<div id="career-trajectory-plot" class="plot-container" style="width: 100%; height: 600px;"></div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/utilities.js"></script>
<script src="{{ site.baseurl }}/assets/js/network-analysis-plots.js"></script>
<script>
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const characterResponse = await fetch('{{ site.baseurl }}/data/character_metadata_cleaned.csv');
        const characterData = await characterResponse.text();
        
        const movieResponse = await fetch('{{ site.baseurl }}/data/movie_master_dataset.csv');
        const movieData = await movieResponse.text();
        
        Papa.parse(characterData, {
            header: true,
            complete: function(characterResults) {
                Papa.parse(movieData, {
                    header: true,
                    complete: function(movieResults) {
                        createNetworkPlots(characterResults.data, movieResults.data);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error loading network data:', error);
    }
});
</script>