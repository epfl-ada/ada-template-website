---
layout: page
title: MovieKinsey Analytics®4:56
subtitle: A Consulting Startup for Predicting Movie Success
cover-img: /assets/img/stars.jpg
thumbnail-img: /assets/img/stars.jpg
share-img: /assets/img/stars.jpg
use-site-title: true
---

## *Introduction*

In the ever-evolving world of cinema, predicting a movie's success has become both an art and a science. At **MKA® (MovieKinsey Analytics®)**, we bring a data-driven approach to help producers, studios, and filmmakers understand what drives a movie’s critical success.

Success in our model isn’t just about box office revenue—it’s defined by a combination of critical acclaim, audience reception, and overall impact. By analyzing patterns in **actor fame** and **narrative structure**, we decode the essential elements that set successful movies apart.

Our approach focuses on two critical factors:  

1. **Actor Fame**: Leveraging **social network analysis**, we assess an actor’s influence, connectivity, and prominence within the industry.  
2. **Storyline Sentiment**: Through **sentiment analysis**, we explore the emotional arcs within movie plots, identifying recurring patterns and trajectories that align with success.

## *Why MKA®?*

We answer the questions that matter most to the industry:  

- How does the **cast’s fame and influence** contribute to a movie’s success?  
- What types of **emotional story arcs** resonate most with audiences and critics alike?  
- Can data help predict whether a movie will achieve critical acclaim before its release?  

At **MKA®**, we bridge the gap between storytelling and data science to empower decision-makers. From script development to casting decisions, our insights provide a clear roadmap for creating impactful movies that resonate with critics and audiences.  

Discover the **data story** behind what makes a movie succeed. Let us guide you to the next big hit.

-----------------

## **Preliminary Analysis and Metric Selection**

At **MKA**, every great analysis begins with a solid foundation. To deliver precise and actionable insights for predicting movie success, we start by exploring and structuring our datasets. This **preliminary analysis** enables us to identify key features, understand trends, and establish the metrics that will drive our consulting framework.  

### **Why It Matters**

Before diving into detailed modeling, we ensure:  
- A comprehensive understanding of the data structure.  
- Identification of relevant features that best reflect a movie’s success.  
- Elimination of noise, anomalies, or incomplete information that could distort results.  

This **preliminary exploration** forms the backbone of our data-driven strategy, setting the stage for the deeper insights that follow. From here, we move forward with confidence, equipped with the metrics that matter most for predicting a movie’s success.

### *The Evolution of Movie Releases*

<div id="releases-plot" style="width: 100%; height: 600px;"></div>

Picture this: it’s the early 20th century, the golden age of cinema has just begun. Movies trickled into the public sphere at a measured pace, their production limited by the constraints of technology and resources. But as we move past 1920, the plot begins to shift.

The data reveals a compelling story — a steady increase in movie releases. For decades, this rise was modest, reflecting the era’s cautious approach to film production. However, as the 1980s hit, the industry witnessed an explosion. Technological innovations, the rise of global distribution, and evolving audience tastes fueled a boom in movie production. From film reels to streaming platforms, cinema was no longer just an art form; it had become a global phenomenon.

This growth in releases isn’t just a statistic; it sets the stage for everything that follows. More movies mean more competition, more innovation, and a higher bar for success. But does quantity translate to quality? Let’s keep the reel rolling.

---

### *The Story of Revenue: From Modest Beginnings to Box Office Titans*

<div id="revenue-plot" style="width: 100%; height: 600px;"></div>

As the movie release curve climbs, so too does its financial counterpart. Revenue — the industry’s heartbeat — has grown near-exponentially, and the reasons are as clear as a perfectly executed plot twist.

Imagine a time when a successful film was a local triumph. Fast forward to today, and the story has changed dramatically. With an ever-expanding audience, the introduction of global markets, and technological advancements like CGI and IMAX, movies have become larger than life — both in production scale and earnings.

What’s driving this growth? A rising number of releases, yes, but also inflation and a world increasingly captivated by cinema. The industry isn’t just growing; it’s thriving. Yet, this financial boom raises questions. Are blockbusters dominating at the cost of smaller stories? Is success only about revenue? Let’s dig deeper into the numbers.

---

### *The Nuanced Revenue Landscape: Blockbusters, Indies, and Everything In-Between*

<div id="revenue-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="revenue-scatter-plot" style="width: 100%; height: 600px;"></div>

Here’s where the story takes a fascinating turn. Over the years, the revenue landscape has grown polarized. The variance in box office earnings has never been wider. On one end, we have the colossal success of record-breaking blockbusters. On the other, a rise in lower-budget indie films carving their own niche.

Take a closer look, and you’ll spot the trends: spikes in average revenue during the 1960s, 1970s, and the 2000s. These peaks suggest a few standout years when influential movies reshaped audience behavior and consumption. Movies weren’t just entertainment; they became cultural landmarks, driving trends and capturing imaginations.

But here’s the twist: while revenue paints a broad picture of financial success, it’s not the whole story. A movie’s impact goes beyond earnings. Popularity, critical acclaim, and audience connection all play roles in determining what *success* truly means.

---

### *Why Revenue Isn’t Enough*

The data tells us this much: the movie industry is growing, financially and creatively. But focusing on revenue alone misses the bigger picture. A movie’s success isn’t just about box office numbers; it’s about emotional connection, cultural impact, and the stories that resonate.

Our analysis doesn’t stop here. While the industry’s financial growth is impressive, we believe there’s more to success than dollars earned. Through a deep dive into sentiment analysis and actor influence, we aim to uncover the hidden ingredients that separate good movies from great ones. 

So, does a star-studded cast or an unforgettable storyline hold the key to success? The answer is coming — and it’s worth sticking around for.


## *The Story Behind Movie Ratings: Audience Perception Unmasked*

### Ratings Analysis

<div id="ratings-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="ratings-scatter-plot" style="width: 100%; height: 600px;"></div>

Every movie tells a story, but what about the story told by its ratings? Early on, movie ratings were a bit like untamed scripts — volatile, inconsistent, and shaped by a limited audience. In the industry's early years, ratings swung unpredictably due to sparse viewer feedback. As more people tuned in, these fluctuations smoothed out, creating a consistent, audience-driven metric. 

Today, movie ratings remain a steady guide, capturing audience sentiment independent of revenue-driven market forces. This makes ratings a core element of our success metric, offering a grounded perspective on a film’s lasting appeal.

---

### Vote Count Analysis

<div id="votes-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="votes-scatter-plot" style="width: 100%; height: 600px;"></div>

Movie ratings tell us *what* audiences think, but vote counts tell us *how many* people care enough to voice that opinion. Early movies gathered only a handful of votes — cinema was still a niche experience. Over time, the industry grew, audiences expanded, and voting became commonplace.

This surge in engagement wasn’t linear. Certain years saw sudden spikes, likely driven by cultural phenomena or blockbuster releases. These trends reveal more than viewership; they reflect engagement, passion, and a global audience becoming active participants in a movie’s journey.

---

## *Defining Success: Beyond Box Office Numbers*

What makes a movie truly successful? In our story, success goes beyond the ticket counter. We crafted a success metric that blends quality and popularity:

**S = rating × log(number of votes)**

This formula ensures that both a film's approval rating and its audience reach are counted — balancing the art of filmmaking with its global reception.

### Success Metric in Action

<div id="success-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="success-scatter-plot" style="width: 100%; height: 600px;"></div>

Early cinema was unpredictable. Fewer votes and scattered ratings created erratic success scores. But with time, our metric stabilizes, reflecting how modern movies consistently engage and resonate with large audiences. This trend shows how industry growth parallels increased viewer participation and emotional investment.

---

### Success vs. Revenue

<div id="success-revenue-plot" style="width: 100%; height: 600px;"></div>

A quick glance reveals a strong relationship between success and revenue — but with notable exceptions. Some highly-rated movies earned modest revenue due to limited release or niche appeal. Conversely, some financially dominant films may have sacrificed quality for commercial appeal. This duality affirms that success isn’t solely about money — it’s about reaching hearts *and* wallets.

---

## *The Actor's Journey: Age, Experience, and Cinematic Legacy*

### Understanding Actor Trajectories

<div id="actor-age-plot" style="width: 100%; height: 600px;"></div>

An actor’s career arc mirrors a movie's narrative: beginnings, climaxes, and resolutions. Our analysis reveals that actors starting young are more likely to build extensive filmographies. Two standout starting points emerged:

- **1-5 Years Old:** The child star phenomenon.
- **15-19 Years Old:** Teenage career launches.

Actors entering the scene later face a tougher climb, with decreasing movie counts as starting age increases. This pattern underscores experience as a key driver in career longevity — and movie success.

By tracking the most experienced actor in each film, we captured a critical piece of the success puzzle. After all, in the cinematic universe, experience isn’t just an asset — it’s a legacy in motion.



# **3. Sentiment Analysis: Understanding Emotional Dynamics**

In the cinematic world, a movie's ability to evoke emotions often defines its success. To explore this dimension, **MovieKinsey Analytics** conducted sentiment analysis on movie plot summaries, leveraging cutting-edge natural language processing tools.

---

### **Choosing the Right Sentiment Model**

We tested two sentiment analysis models to determine the best fit for our project:

1. **VADER (Valence Aware Dictionary and Sentiment Reasoner)**:  
   A highly efficient, rule-based tool designed for analyzing short and emotive text, VADER captures **positive**, **neutral**, and **negative** sentiment using a pre-defined word lexicon and sentiment rules. It calculates an overall **compound score** between -1 (most negative) and +1 (most positive). VADER’s simplicity and speed made it a practical choice for processing extensive movie datasets.

2. **DistilBERT (Distilled Bidirectional Encoder Representations from Transformers)**:  
   While more advanced, DistilBERT is a transformer-based language model capable of deep contextual understanding. It excels in complex linguistic analysis but was ultimately too intricate for our focus on sentiment polarity in plot summaries.

---

### **Why We Chose VADER**

Given our objective of scoring sentiment efficiently across thousands of movie plots, we chose **VADER** for its balance of speed and interpretability. Its rule-based approach aligns well with detecting sentiment in structured summaries while remaining computationally efficient.

By leveraging VADER, **MovieKinsey Analytics** ensures robust sentiment analysis as part of our mission to predict a movie's success through data-driven insights.

At **MovieKinsey Analytics**, we don't just analyze plots—we map emotions.



<div id="distilbert-sentiment-plot" style="width: 100%; height: 600px;"></div>


### Sentiment Analysis of Movie Plot Summaries Using VADER

We utilized VADER (Valence Aware Dictionary and Sentiment Reasoner) for sentiment analysis on movie plot summaries, following a structured approach to analyze and interpret sentiment effectively:

1. **Sentiment Calculation**:  
   - VADER, a lexicon- and rule-based tool, was applied to each plot summary. The `SentimentIntensityAnalyzer` function computed four sentiment metrics for each summary:  
     - **Positive Sentiment**: The proportion of positive words.
     - **Negative Sentiment**: The proportion of negative words.
     - **Neutral Sentiment**: The proportion of neutral words.
     - **Compound Score**: A single normalized score (-1 to +1) summarizing overall sentiment intensity.

2. **Metadata Integration**:  
   - Sentiment data was combined with metadata for each movie, such as genres, revenue, and runtime. This enabled a deeper understanding of how sentiment relates to other attributes of the movies.

3. **Analysis of Sentiment Trends**:  
   - Using aggregated sentiment metrics, we analyzed sentiment patterns across genres, identifying trends such as the average positivity or negativity associated with specific movie types.

4. **Clustering Sentiment Trajectories**:  
   - Sentiment scores were clustered using machine learning techniques (KMeans and PCA). This provided insights into common sentiment patterns among movies and visualized relationships in a lower-dimensional space.

5. **Saving Results**:  
   - The processed data, including sentiment scores and clustering results, was saved in a CSV file (`sentiment_genre_Vader_analysis.csv`). This structured format allows for further analysis and visualization.

This approach leverages VADER's efficiency and simplicity, making it well-suited for understanding overall sentiment trends in movie plot summaries, especially for lexicon-dominated text.



VADER PLOT HERE 


Averahge sentiment by top 20 genre for VADER




PLOT HERE

### 3.3 Analysis 

#### 3.3.1 Sentiment Variability and Its Relationship with Success


In this analysis, we compute the **variability of sentiment scores** for each movie to investigate how emotional dynamics influence a movie's success. Sentiment variability is measured as the standard deviation of sentiment scores across a movie's narrative arc.

AVERAGE SUCCCESS BY SENTIMENT VARIABILITY PLOT


The bar chart above shows the **average success** for movies with **High Variability** and **Low Variability** in sentiment arcs. 

- **High Variability** movies have a higher average success compared to **Low Variability** movies.
- The extremely low p-value (< 0.05) indicates that the observed difference in success between the two groups is **statistically significant**. This suggests that movies with higher sentiment variability (emotional rollercoaster) are more engaging for audiences and tend to achieve greater success.

This finding supports the hypothesis that an **emotional rollercoaster experience**—indicated by high sentiment variability—leads to higher audience engagement, which in turn contributes to greater success for movies. This insight can inform storytelling and scriptwriting strategies to optimize audience reception.

#### 3.3.2 Analysis of Shape-Based Sentiment Features and Success

This analysis explores the relationship between key shape-based sentiment features and movie success. Specifically, we analyze:
1. **Amplitude**: Difference between highest and lowest sentiment scores.
2. **Slope**: Rate of sentiment change across the movie.
3. **Peak Timing**: When the highest sentiment occurs (early, mid, or late in the movie).


AVERAGE SUCCESS BY AMPLITUDE QUARTILES

AVERAGE SUCCESS BY SLOPE QUARTILES 

AVERAGE SUCCESS BY PEAK TIMING QUARTILES


This analysis explores the relationship between key shape-based sentiment features and movie success. Specifically, we analyze:
1. **Amplitude**: Difference between highest and lowest sentiment scores.
2. **Slope**: Rate of sentiment change across the movie.
3. **Peak Timing**: When the highest sentiment occurs (early, mid, or late in the movie).


#### 3.3.4 Narrative Types Across All Movies

This analysis identifies the narrative types across all movies by clustering sentiment arcs, assigns the clusters meaningful narrative labels, and examines their relationship with movie success. 


**Kurt Vonnegut's Six Narrative Types**  
The emotional story arc of a movie plot describes how the emotions of characters—and by extension, the audience—shift throughout the film. These arcs often reveal universal storytelling patterns that resonate across genres. American writer Kurt Vonnegut famously categorized all stories into **six narrative archetypes**, which can be used to classify emotional arcs:

1. **Rags to Riches:** The protagonist starts low and rises to success.
2. **Riches to Rags:** The protagonist starts high and descends into failure.
3. **Man in a Hole:** The protagonist falls into difficulty but rises again.
4. **Icarus:** The protagonist rises to great heights only to fall.
5. **Cinderella:** The protagonist rises, falls, and rises again.
6. **Oedipus:** The protagonist falls, rises, and falls again.


We aim to uncover whether **genres** naturally exhibit these six narrative types by analyzing the average emotional arcs of movies. Grouping movies by genre allows us to observe recurring patterns and connections to Vonnegut’s archetypes, which could help identify dominant narrative types within genres.

This analysis uses **Time-Series KMeans Clustering** to group movies in each genre by their sentiment arcs (emotional trajectories). The main steps include:
1. **Data Preparation:** Sentiment arcs are extracted and normalized to a consistent length (200 points) for each movie in a genre.
2. **Clustering:** 
   - Time-series KMeans clustering groups movies into 4 clusters per genre based on their sentiment arcs.
   - Each cluster represents a narrative type, visualized through its barycenter (average arc for the cluster).
3. **Results:** The clusters reveal key narrative archetypes in each genre, aligning with **Kurt Vonnegut's six story types**.



1. **Number of Movies per Narrative Type**
   - **Most Common Narrative Types**:
     - **Man in Hole**: 6,423 movies
     - **Icarus**: 6,245 movies
     - **Cinderella**: 6,087 movies
   - **Less Common Narrative Types**:
     - **Oedipus**: 4,995 movies
     - **Rags to Riches**: 4,101 movies
     - **Riches to Rags**: 3,486 movies

2. **Average Success by Narrative Type**
   - **Top Performing Narrative Types**:
     - **Cinderella**: 41.46 (highest success)
     - **Oedipus**: 41.01
     - **Man in Hole**: 40.03
   - **Lower Performing Narrative Types**:
     - **Icarus**: 39.41
     - **Rags to Riches**: 35.46
     - **Riches to Rags**: 32.61 (lowest success)

3. **ANOVA Test Results**
   - **F-statistic**: 219.05
   - **P-value**: 1.55e-230
   - **Conclusion**: There is a highly statistically significant difference in success across narrative types. This confirms that different story arcs impact movie success differently.

4. **Visualization Highlights**
   - **Representative Story Arcs**: Six clusters were identified, aligning with Kurt Vonnegut’s narrative archetypes.
   - **Success by Narrative Type**: "Cinderella" and "Oedipus" lead in average success, while "Riches to Rags" has the lowest performance.
   - **Movie Count by Narrative Type**: "Man in Hole," "Icarus," and "Cinderella" are the most popular narrative structures.

---

#### **Insights**
- **Cinderella** and **Oedipus** are associated with the highest success rates, suggesting audiences resonate with these uplifting or dramatic story arcs.
- **Riches to Rags** performs the worst in terms of success, indicating that steady decline may be less engaging for audiences.
- **Man in Hole** and **Icarus** are popular but have slightly lower success rates compared to **Cinderella** and **Oedipus**.
- The significant ANOVA results underline the impact of narrative structure on audience reception and movie success.


# 4. Network Analysis
In this section we will attempt to quantify an actor's success based on the success of the film. The relationship between collaborative status and success will then be explored in relation to the actors' partnerships.

We built this graph structure based on the movie's appearance schedule. If two actors appeared in the same movie, we consider that there is a collaboration between them. The graph is explained as follows:

- Edge: no direction, represents the existence of collaboration
- Node: represents an actor
- Degree: the number of edges of a node, i.e., the number of collaborations an actor has with other people
- Actor's Success: the average of the successes of all the movies an actor has appeared in

We use colour and size to show the features of an actor:
- Node Colour: represents an actor's success
- Node Size: the number of degrees an actor has.

It can be observed that actors close to the centre tend to be more successful. However, since only the 60 actors with the highest number of collaborations were selected here to build the network, the number of successes and collaborations is not very intuitive. Therefore we will use all actors to fit the curves in the following analyses.

### 4.2 Relationship between Collaboration and Success

Based on the analysis, we can observe:
- The number of collaborations for most of the actors is clustered around 100, showing a right-skewed distribution.

- The metric we use to represent success rises as the number of collaborations rises.

This matches our expected assumptions and intuition:

- There are more unknown and smaller actors.

- There is a strong relationship between the success of the film in which an actor is cast and the actor's fame.

So we can say that the measure of an actor can be based on the popularity and ratings of the films he has appeared in. And since we find that there is a strong correlation between an actor's success and the number of collaborations an actor has, we can add the number of collaborations an actor has as a feature to the calculation of an actor's success rate.



<div class="plot-controls">
    <label for="movie-id-input">Enter Movie ID:</label>
    <input type="number" id="movie-id-input" value="77856" min="1">
    <button onclick="updateDistilBERTPlot(document.getElementById('movie-id-input').value)">
        Update Plot
    </button>
</div>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/sentiment-analysis-plots.js"></script>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/utilities.js"></script>
<script src="{{ site.baseurl }}/assets/js/data-analysis-plots.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Load the movie master dataset
    Papa.parse('{{ site.baseurl }}/data/movie_master_dataset.csv', {
        download: true,
        header: true,
        complete: function(movieResults) {
            const yearStats = processYearlyData(movieResults.data);
            const years = Object.keys(yearStats).sort((a,b) => a-b);
            // Create movie-related plots
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
            createSuccessPlots(yearStats, years);
            
            // Load the character metadata for actor age plot
            Papa.parse('{{ site.baseurl }}/data/character_metadata_cleaned.csv', {
                download: true,
                header: true,
                complete: function(characterResults) {
                    console.log("Character data loaded:", characterResults.data.length);
                    createActorAgePlot(characterResults.data);
                },
                error: function(error) {
                    console.error('Error loading character data:', error);
                }
            });
        },
        error: function(error) {
            console.error('Error loading movie data:', error);
        }
    });
});
</script>