---
layout: default
---

# 2. Preliminary Analysis and Metric Selection

Before diving into in-depth analysis, it's essential to perform preliminary exploration of our datasets. This helps us understand the general structure, identify key features, and establish metrics that will guide our subsequent analysis. By visualizing and examining basic characteristics, we can set the foundation for our study and determine which metrics will best represent a movie's success. Additionally, this initial step allows us to identify any gaps or trends that could impact our analysis, especially when considering data evolution over time.

For all visualizations in this analysis, we decided to apply a cutoff at the year 1920. This decision was made due to the limited availability of ratings and vote data for movies released before 1920, which could skew results and impact the clarity of trends observed in more recent years.

## 2.1 Data Overview

### 2.1.1 Total Movie Releases

In this section, we analyze the yearly trend in movie releases to observe the trajectory of cinematic production over time. By grouping our dataset by release year and calculating the total number of movies produced each year, we visualize fluctuations and long-term patterns in film production.

<div id="movies-per-year"></div>

**Observation**: The plot illustrates an overall growth in the number of movies released yearly from 1920 onward, with notable fluctuations. Hypothetically, early stability may be due to historical constraints, while the post-1980s increase could reflect technological and industry expansion. This growth trend will be an important consideration in our subsequent analysis.

### 2.1.2 Revenue

Revenue is a key indicator of a movie's commercial success, but analyzing it requires careful context. Plotting total movie revenues per year over time reveals general growth; however, this trend may be influenced by the greater number of recent entries in the database and does not account for inflation, limiting comparability across periods.

<div id="revenue-per-year"></div>

**Observations**: We observe a near-exponential growth in total box office revenue per year. This trend may be driven by an increasing number of movie releases, inflation, and a growing interest in the film industry over time.

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/data-analysis.js"></script>