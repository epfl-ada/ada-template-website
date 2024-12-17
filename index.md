---
layout: page
title: The Recipe For A Movie's Success 🎬
subtitle: Analysis of various factors that lead to high box office revenue
cover-img: /assets/img/movie.png
thumbnail-img: /assets/img/movie.png
share-img: /assets/img/movie.png
use-site-title: true
---

# Stars or Storyline

<div class="hero-section">
  <h2>How Actor Fame and Sentiment Trajectories Shape a Movie's Critical Success</h2>
  <p class="lead">Exploring the intricate relationship between star power and storyline in determining a movie's success</p>
</div>

<div class="navigation-grid">
  <div class="nav-card" onclick="window.location='./data-analysis'">
    <h3>Data Analysis</h3>
    <p>Explore our comprehensive analysis of movie industry trends and metrics</p>
  </div>
  
  <div class="nav-card" onclick="window.location='./sentiment-analysis'">
    <h3>Sentiment Analysis</h3>
    <p>Discover how emotional arcs in movie plots influence success</p>
  </div>
  
  <div class="nav-card" onclick="window.location='./network-analysis'">
    <h3>Network Analysis</h3>
    <p>Uncover the impact of actor collaborations and industry connections</p>
  </div>
  
  <div class="nav-card" onclick="window.location='./results'">
    <h3>Results</h3>
    <p>See our key findings and conclusions</p>
  </div>
</div>

<style>
.hero-section {
  text-align: center;
  margin: 4rem 0;
  animation: fadeIn 1s ease-in;
}

.lead {
  font-size: 1.2rem;
  color: var(--text-color);
  margin: 2rem 0;
}

.navigation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
}

.nav-card {
  background: var(--background-hover);
  padding: 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>