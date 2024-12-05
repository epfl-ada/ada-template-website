---
layout: default
---

# Preliminary Analysis and Metric Selection 1:27

Before diving into in-depth analysis, it's essential to perform preliminary exploration of our datasets. This helps us understand the general structure, identify key features, and establish metrics that will guide our subsequent analysis. By visualizing and examining basic characteristics, we can set the foundation for our study and determine which metrics will best represent a movie's success.

For all visualizations in this analysis, we decided to apply a cutoff at the year 1920. This decision was made due to the limited availability of ratings and vote data for movies released before 1920, which could skew results and impact the clarity of trends observed in more recent years.

## Total Movie Releases

<div id="releases-plot" style="width: 100%; height: 600px;"></div>

**Observation**:

The plot illustrates an overall growth in the number of movies released yearly from 1920 onward, with notable fluctuations. Hypothetically, early stability may be due to historical constraints, while the post-1980s increase could reflect technological and industry expansion. This growth trend will be an important consideration in our subsequent analysis.

## Revenue Analysis

<div id="revenue-plot" style="width: 100%; height: 600px;"></div>

**Observations**:

We observe a near-exponential growth in total box office revenue per year. This trend may be driven by:
- An increasing number of movie releases
- Inflation over time
- Growing interest in the film industry
- Expansion of global markets

## Detailed Revenue Analysis

<div id="revenue-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="revenue-scatter-plot" style="width: 100%; height: 600px;"></div>

**Observations**:

1. **Variance in Revenue**: Over time, the variance in box office revenue has increased significantly, which may reflect the polarized landscape of modern cinema. This could indicate the simultaneous rise of high-grossing blockbusters and lower-budget independent films, appealing to increasingly diverse audience preferences.

2. **Revenue Trends**: Notable spikes in mean revenue can be observed in certain years, with peaks in the 1960s, 1970s, and the 2000s, potentially reflecting trends in cinema consumption or the success of particularly influential movies.

3. **Overall Growth**: An upward trend in overall revenue is apparent, which may be influenced by inflation as well as increased global interest in cinema over time. This growth highlights both the industry's expansion and the rising financial impact of movies as cultural products.

**Revenue Conclusion**:
While box office revenue provides valuable insight into the financial success of movies, it is an incomplete metric for gauging overall success. This preliminary analysis suggests that revenue alone does not fully capture a movie's impact or popularity, and additional metrics are necessary to achieve a comprehensive understanding of cinematic success.

## Ratings and Vote Count Evaluation

### Ratings Analysis

In this section, we examine the evolution of movie ratings over time to identify any underlying trends and patterns. Ratings provide a measure of audience perception that is less influenced by external economic factors than revenue, offering a potentially more stable metric.

<div id="ratings-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="ratings-scatter-plot" style="width: 100%; height: 600px;"></div>

**Observations**:
The ratings trend shows significantly less fluctuation compared to the revenue analysis, suggesting that audience perception, as reflected in ratings, has remained relatively stable over time. However, at the beginning of the observed period, we see larger fluctuations in the mean ratings, which could be attributed to a smaller number of votes per movie. With fewer ratings, the averages are less consistent, leading to greater variability. This initial volatility gradually stabilizes, and overall, the average rating hovers within a consistent range, indicating a steady audience response to movies throughout the years.

### Vote Count Analysis

In this part, we examine the distribution and evolution of vote counts per movie over time. By analyzing vote counts, we can assess trends in audience engagement and a film's reach over time.

<div id="votes-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="votes-scatter-plot" style="width: 100%; height: 600px;"></div>

**Observations**:
1. **Early Years with Lower Vote Counts**: As hypothesized in the ratings analysis, we observe fewer votes per movie in the early years, leading to greater variability. This trend aligns with our previous observations, confirming that early movies have less audience engagement or records.
2. **Increasing Engagement Over Time**: Over the years, both mean and median vote counts have increased, reflecting the growth of movie audiences and the rise of global platforms that make films more accessible for voting and reviews.
3. **Fluctuations in Mean Vote Counts**: The variability in mean vote counts suggests shifts in audience attention, likely due to the release of particularly popular films in certain years.

**Conclusion**:
The trends in vote counts and ratings together provide a more comprehensive picture of a movie's impact over time. While ratings reflect audience satisfaction, vote counts indicate the level of engagement. The combination of these metrics offers valuable insights into how movies resonate with audiences across different periods.

## Definition of Success

To conduct meaningful analysis, it's crucial to first define what "success" means in the context of movies. Success is a multifaceted concept that can vary widely depending on goals, stakeholders, and industry standards.

We define success using a combination of ratings and audience engagement:

**S = rating * log(number of votes)**

This formula effectively combines both quality (ratings) and popularity (vote count) into a single metric. The logarithmic adjustment of vote count helps balance the influence of highly-voted movies without letting them disproportionately skew the results.

### Success Metric Analysis

<div id="success-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="success-scatter-plot" style="width: 100%; height: 600px;"></div>

**Observations:**
1. **Early Fluctuations**: Higher variability in early years (1920s-1940s) likely due to fewer ratings and votes.
2. **Stabilizing Trends**: Success metric stabilizes over time, with a gradual increase in the mean.
3. **Overall Growth**: The rise in mean success reflects increased movie output, audience engagement, and influential blockbusters.

### Success vs Revenue Analysis

<div id="success-revenue-plot" style="width: 100%; height: 600px;"></div>

We can observe a clear correlation between success and revenue: Revenue tends to grow exponentially with our definition of success, which validates our success metric. Additionally, movies with lower success generally have lower ratings, with some exceptions that had little attention despite their high rating and vice versa.

## Understanding Actor Trajectories

Understanding actors' trajectories can offer valuable insights into their influence in the industry. Generally, actors who start their careers at a younger age tend to have more connections and experience, which could positively impact a movie's success. In this section, we examine how the age of an actor at their first movie appearance correlates with the total number of movies they appear in.

<div id="actor-age-plot" style="width: 100%; height: 600px;"></div>

**Observations**:

1. **Age Intervals of High Activity**: There are two key age ranges where actors are more likely to appear in additional movies:
   - **1-5 years**: Very early career starts
   - **15-19 years**: Teenage career beginnings
   These intervals suggest that actors starting young or during teenage years often have longer, more prolific careers.

2. **Declining Trend**: An overall decline in appearances with increasing starting age indicates that actors beginning their careers later are less likely to have extensive filmographies. This trend suggests a strong correlation between early career start and accumulated experience.

These findings support our hypothesis that an experienced actor contributes to a movie's success. To incorporate this, we considered the most experienced actor in each movie (i.e., the actor with the most previous appearances by the movie's release date) as a factor in our success metric.

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/utilities.js"></script>
<script src="{{ site.baseurl }}/assets/js/data-analysis-plots.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded"); // Debug log
    Papa.parse('{{ site.baseurl }}/data/movie_master_dataset.csv', {
        download: true,
        header: true,
        complete: function(results) {
            console.log("Data loaded successfully"); // Debug log
            const yearStats = processYearlyData(results.data);
            const years = Object.keys(yearStats).sort((a,b) => a-b);
            
            // Create all plots
            createReleasesPlot(yearStats, years);
            createRevenuePlot(yearStats, years);
            createStatsPlot('revenue-stats-plot', yearStats, years, 'revenues', 
                'Box Office Revenue Statistics', 'Revenue [$]');
            createScatterPlot('revenue-scatter-plot', yearStats, years, 'revenue', 
                'Box Office Revenue per Movie (log)', 'Revenue [$] (log)', true);
            createStatsPlot('ratings-stats-plot', yearStats, years, 'ratings',
                'Yearly Rating Statistics', 'Rating');
            createScatterPlot('ratings-scatter-plot', yearStats, years, 'rating',
                'Ratings per Movie', 'Rating');
            createStatsPlot('votes-stats-plot', yearStats, years, 'votes',
                'Yearly Vote Count Statistics', 'Vote Count');
            createScatterPlot('votes-scatter-plot', yearStats, years, 'votes',
                'Vote Counts per Movie (log)', 'Vote Count (log)', true);
            // Create success plots
            createSuccessPlots(yearStats, years);
            // Add to the existing script section in data-analysis.md, inside the complete callback
            createActorAgePlot();
        },
        error: function(error) {
            console.error('Error loading data:', error);
        }
    });
});
</script>