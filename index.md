---
layout: page
title: MovieKinsey Analytics 2:57
subtitle: A Consulting Startup for Predicting Movie Success
cover-img: /assets/img/Picture2.png
thumbnail-img: /assets/img/Picture2.png
share-img: /assets/img/Picture2.png
use-site-title: true
css: 
  - /assets/css/progress-bar.css
js:
  - /assets/js/progress-bar.js
---

<div id="header-logo-container"></div>
<script type="module">
  import { createRoot } from 'react-dom/client';
  import HeaderLogo from './assets/js/components/HeaderLogo.js';

  const container = document.getElementById('header-logo-container');
  const root = createRoot(container);
  root.render(<HeaderLogo />);
</script>

## **Introduction**

In the ever-evolving world of cinema, predicting a movie's success has become both an art and a science. At **MKA® (MovieKinsey Analytics®)**, we bring a data-driven approach to help producers, studios, and filmmakers understand what drives a movie’s critical success.

Success in our model isn’t just about box office revenue—it’s defined by what we like to call here at MKA: **success** . By analyzing patterns in **actor fame** and **narrative structure**, we decode the essential elements that set successful movies apart.

Our approach focuses on two critical factors:  

1. **Actor Fame**: Leveraging **social network analysis**, we assess an actor’s influence, connectivity, and prominence within the industry.  
2. **Storyline Sentiment**: Through **sentiment analysis**, we explore the emotional arcs within movie plots, identifying recurring patterns and trajectories that align with success.

## *Why MKA®?*

We answer the questions that matter most to the industry:  

- How does the **cast’s fame and influence** contribute to a movie’s success?  
- What types of **emotional story arcs** resonate most with audiences and critics alike?  
- Can data help predict whether a movie will achieve critical acclaim before its release?  

At **MKA®**, we bridge the gap between storytelling and data science to empower decision-makers. From script development to casting decisions, our insights provide a clear roadmap for creating impactful movies that resonate with critics and audiences.  

Discover the **data story** behind what makes a movie succeed. Let us guide you to **the next big hit**.

-----------------

## **Preliminary Analysis and Metric Selection**

At **MKA**, every great analysis begins with a solid foundation. To deliver precise and actionable insights for predicting movie success, we start by exploring and structuring our datasets. This **preliminary analysis** enables us to identify key features, understand trends, and establish the metrics that will drive our consulting framework.  

### **Why It Matters**

Before diving into detailed modeling, we ensure:  
- A comprehensive understanding of the data structure.  
- Identification of relevant features that best reflect a movie’s success.  
- Elimination of noise, anomalies, or incomplete information that could distort results.  

This **preliminary exploration** forms the backbone of our data-driven strategy, setting the stage for the deeper insights that follow. From here, we move forward with confidence, equipped with the metrics that matter most for predicting a movie’s success.

### **The Evolution of Movie Releases**

<div id="releases-plot" style="width: 100%; height: 600px;"></div>

Picture this: it’s the early 20th century, the golden age of cinema has just begun. Movies trickled into the public sphere at a measured pace, their production limited by the constraints of technology and resources. But as we move past 1920, the plot begins to shift.

The data reveals a compelling story — a steady increase in movie releases. For decades, this rise was modest, reflecting the era’s cautious approach to film production. However, as the 1980s hit, the industry witnessed an explosion. Technological innovations, the rise of global distribution, and evolving audience tastes fueled a boom in movie production. From film reels to streaming platforms, cinema was no longer just an art form; it had become a global phenomenon.

This growth in releases isn’t just a statistic; it sets the stage for everything that follows. More movies mean more competition, more innovation, and a higher bar for success. 


But does quantity translate to quality? Let’s keep the reel rolling.

### **The Story of Revenue: From Modest Beginnings to Box Office Titans**

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

But here’s the twist: while revenue paints a broad picture of financial success, it’s not the whole story. A movie’s impact goes beyond earnings. Popularity, critical acclaim, and audience connection all play roles in determining what **success** truly means.

---

#### **Why Revenue Isn’t Enough**

The data tells us this much: the movie industry is growing, financially and creatively. But focusing on revenue alone misses the bigger picture. A movie’s success isn’t just about box office numbers; it’s about emotional connection, cultural impact, and the stories that resonate.

Our analysis doesn’t stop here. While the industry’s financial growth is impressive, we believe there’s more to success than dollars earned. 

### **The Story Behind Movie Ratings: Audience Perception Unmasked**

#### Ratings Analysis

<div id="ratings-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="ratings-scatter-plot" style="width: 100%; height: 600px;"></div>

Every movie tells a story, but what about the story told by its ratings? Early on, movie ratings were a bit like untamed scripts — volatile, inconsistent, and shaped by a limited audience. In the industry's early years, ratings swung unpredictably due to sparse viewer feedback. As more people tuned in, these fluctuations smoothed out, creating a consistent, audience-driven metric. 

Today, movie ratings remain a steady guide, capturing audience sentiment independent of revenue-driven market forces. This makes ratings a core element of our success metric, offering a grounded perspective on a film’s lasting appeal.

---

#### Vote Count Analysis

<div id="votes-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="votes-scatter-plot" style="width: 100%; height: 600px;"></div>

Movie ratings tell us *what* audiences think, but vote counts tell us *how many* people care enough to voice that opinion. Early movies gathered only a handful of votes — cinema was still a niche experience. Over time, the industry grew, audiences expanded, and voting became commonplace.

This surge in engagement wasn’t linear. Certain years saw sudden spikes, likely driven by cultural phenomena or blockbuster releases. These trends reveal more than viewership; they reflect engagement, passion, and a global audience becoming active participants in a movie’s journey.

---

### *Defining Success: Beyond Box Office Numbers*

What makes a movie truly successful? In our story, success goes beyond the ticket counter. We crafted a success metric that blends quality and popularity:

**S = rating × log(number of votes)**

This formula ensures that both a film's approval rating and its audience reach are counted — balancing the art of filmmaking with its global reception.

#### Success Metric in Action

<div id="success-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="success-scatter-plot" style="width: 100%; height: 600px;"></div>

Early cinema was unpredictable. Fewer votes and scattered ratings created erratic success scores. But with time, our metric stabilizes, reflecting how modern movies consistently engage and resonate with large audiences. This trend shows how industry growth parallels increased viewer participation and emotional investment.

---

#### Success vs. Revenue

<div id="success-revenue-plot" style="width: 100%; height: 600px;"></div>

A quick glance reveals a strong relationship between success and revenue — but with notable exceptions. Some highly-rated movies earned modest revenue due to limited release or niche appeal. Conversely, some financially dominant films may have sacrificed quality for commercial appeal. This duality affirms that success isn’t solely about money — it’s about reaching hearts *and* wallets.

---

### *The Actor's Journey: Age, Experience, and Cinematic Legacy*

#### Understanding Actor Trajectories

<div id="actor-age-plot" style="width: 100%; height: 600px;"></div>

An actor’s career arc mirrors a movie's narrative: beginnings, climaxes, and resolutions. Our analysis reveals that actors starting young are more likely to build extensive filmographies. Two standout starting points emerged:

- **1-5 Years Old:** The child star phenomenon.
- **15-19 Years Old:** Teenage career launches.

Actors entering the scene later face a tougher climb, with decreasing movie counts as starting age increases. This pattern underscores experience as a key driver in career longevity — and movie success.

By tracking the most experienced actor in each film, we captured a critical piece of the success puzzle. After all, in the cinematic universe, experience isn’t just an asset — it’s a legacy in motion.

-----------------

## **Sentiment Analysis: Understanding Emotional Dynamics**

In storytelling, emotions are key drivers of engagement. To capture the emotional journey of movies, **MovieKinsey Analytics** conducted sentiment analysis on movie plot summaries, leveraging cutting-edge natural language processing models.


### **Choosing the Right Sentiment Model**

We explored two sentiment analysis models:

1. **VADER (Valence Aware Dictionary and Sentiment Reasoner)**:  
   VADER is a rule-based tool ideal for evaluating sentiment in shorter texts. It detects **positive**, **neutral**, and **negative** sentiment, along with a **compound score** ranging from -1 (most negative) to +1 (most positive). Its efficiency made it the preferred tool for our large-scale analysis.

2. **DistilBERT (Distilled Bidirectional Encoder Representations from Transformers)**:  
   DistilBERT, a transformer-based language model, excels at capturing nuanced linguistic patterns. However, due to its computational demands, we opted for VADER for a more scalable approach.


### **Sentiment Analysis of Movie Plot Summaries Using VADER**

We applied VADER sentiment analysis with the following approach:

1. **Sentiment Calculation**:  
   VADER evaluated each movie's plot summary, producing four key metrics: 
   - **Positive Sentiment**: Ratio of positive words
   - **Negative Sentiment**: Ratio of negative words
   - **Neutral Sentiment**: Ratio of neutral words
   - **Compound Score**: A normalized summary of overall sentiment intensity

2. **Metadata Integration**:  
   Sentiment scores were merged with movie metadata, such as genres and runtime, enabling deeper insight into sentiment-driven success patterns.

3. **Visualizing Sentiment Patterns**:  
   Aggregated sentiment metrics were used to visualize trends across genres and narrative types.

---

### **AVERAGE SENTIMENT PLOT FOR VADER**

<div id="vader-sentiment-plot" style="width: 100%; height: 600px;"></div>

<div class="plot-controls">
    <label for="movie-id-input-vader">Enter Movie ID:</label>
    <input type="number" id="movie-id-input-vader" value="77856" min="1">
    <button onclick="updateVADERPlot(document.getElementById('movie-id-input-vader').value)">
        Update Plot
    </button>
</div>



---

### **Average Sentiment by Top 20 Genres for VADER**

*This is where the average sentiment by the top 20 genres plot will be displayed.*

---

### ** Analysis: Sentiment Trends and Success**

#### **Sentiment Variability and Success**  

We analyzed **sentiment variability** by computing the standard deviation of sentiment scores across each movie's plot, hypothesizing that emotional rollercoasters might enhance audience engagement.

**AVERAGE SUCCESS BY SENTIMENT VARIABILITY PLOT**  

*This is where the plot showing average success by sentiment variability will be displayed.*

- **High Variability** movies have significantly higher success than **Low Variability** movies.
- A low p-value from statistical tests indicates this difference is **statistically significant**, confirming that emotional dynamics impact a movie's success.

---

#### **Shape-Based Sentiment Features and Success**  

We examined the following sentiment-based features:

1. **Amplitude**: Difference between maximum and minimum sentiment scores
2. **Slope**: Sentiment change rate
3. **Peak Timing**: When the highest sentiment occurs (early, mid, or late in the plot)

---

**AVERAGE SUCCESS BY AMPLITUDE QUARTILES PLOT**  

*This is where the plot for average success by amplitude quartiles will be displayed.*

**AVERAGE SUCCESS BY SLOPE QUARTILES PLOT**  

*This is where the plot for average success by slope quartiles will be displayed.*

**AVERAGE SUCCESS BY PEAK TIMING QUARTILES PLOT**  

*This is where the plot for average success by peak timing quartiles will be displayed.*

---

#### **Narrative Types Across All Movies**

By clustering sentiment arcs using **Time-Series KMeans Clustering**, we identified six narrative archetypes, inspired by **Kurt Vonnegut's Story Shapes**:

1. **Rags to Riches:** Rising success
2. **Riches to Rags:** Declining fortunes
3. **Man in a Hole:** Fall followed by recovery
4. **Icarus:** Rise followed by downfall
5. **Cinderella:** Rise, fall, and rise again
6. **Oedipus:** Fall, rise, and fall again

---

**NUMBER OF MOVIES PER NARRATIVE TYPE PLOT**  

*This is where the plot showing the number of movies per narrative type will be displayed.*

**AVERAGE SUCCESS BY NARRATIVE TYPE PLOT**  

*This is where the plot showing average success by narrative type will be displayed.*


### **Insights from Sentiment Analysis**

- **Cinderella** and **Oedipus** narratives lead in average success, suggesting audiences resonate with these emotional arcs.
- **Riches to Rags** performs the worst, highlighting limited audience engagement with steadily declining stories.
- A statistically significant ANOVA result confirms narrative structure influences success rates.

-----------------

## **Network Analysis: Exploring Actor Collaborations**

In this section, we evaluate how **actor collaborations** influence movie success. Using a collaboration network model, we explore relationships between actors based on shared movie appearances.

### **Network Structure Overview**

- **Nodes:** Represent actors
- **Edges:** Indicate shared movie appearances
- **Node Color:** Reflects an actor's success
- **Node Size:** Reflects the number of collaborations

---

### **NETWORK VISUALIZATION PLOT**  
<div id="actor-network-plot" style="width: 100%; height: 600px;"></div>
<div id="collaboration-success-plot" style="width: 100%; height: 600px;"></div>
<div id="career-trajectory-plot" style="width: 100%; height: 600px;"></div>

---

### **Collaboration and Success**

- **Collaboration Count Distribution:** Most actors have around 100 collaborations, with a few notable outliers.
- **Success vs Collaboration Correlation:** A positive correlation confirms that actors with more collaborations tend to be more successful.

---

### **Conclusion from Network Analysis**

- **Actor Success Metric:** Defined by an actor's average movie success and collaboration count.
- **Industry Insight:** Actors with extensive networks and high collaboration counts tend to have greater success.

---

*By integrating sentiment analysis with actor networks, **MovieKinsey Analytics** unlocks a deeper understanding of what makes movies resonate with audiences and achieve lasting success.*

-----------------

## **Exploring Key Factors for Movie Success**

Understanding the factors that influence movie success requires a deep dive into key variables that shape a film's reach, engagement, and reception. At **MovieKinsey Analytics**, we examined how exposure, release timing, genre popularity, and economic growth influence cinematic success. Here's what we uncovered:

---

### **Exposure: Language and Global Reach**

A movie’s reach depends heavily on the languages it features, determining the potential size of its global audience. Using global language populations, we calculated a movie's **exposure score** by summing the number of speakers of all its spoken languages. For example:

- **English:** 1.5 billion speakers
- **Mandarin:** 1.1 billion speakers
- **Hindi:** 609 million speakers

The more widely spoken languages in a movie, the greater its potential audience. Movies featuring multiple languages or globally popular languages score highest on exposure.

**EXPOSURE DISTRIBUTION PLOT**  

---

### **Holiday Releases: Timing the Premiere Right**

Release timing can play a crucial role in a movie's success. We defined **holiday releases** as movies launched in November, December, or July—peak months for cinema attendance.

Our analysis shows that movies released during these holiday months tend to perform better due to increased audience availability and holiday festivities.

**SUCCESS BY HOLIDAY RELEASE PLOT**  

---

### **Genre Popularity: Audience Preferences in Storytelling**

Certain genres resonate more strongly with audiences. We calculated each movie's **weighted genre popularity** by averaging the success scores of its genres. Additionally, we assigned a **primary genre** based on the movie's most successful genre.

Movies with higher genre popularity scores often fall into well-loved categories such as action, adventure, and fantasy, reinforcing the importance of genre selection in boosting a film’s appeal.

**HISTOGRAM OF WEIGHTED GENRE POPULARITY PLOT**  

---

### **Economic Growth: Riding the Market Waves**

The global economy affects entertainment consumption. We tracked the **S&P 500 Index returns** to measure annual economic performance. Movies released in years of positive economic growth showed higher average success rates, suggesting that a thriving economy boosts movie attendance.

**HISTOGRAM OF S&P 500 RETURNS PLOT**  

-----------------

## **Results and Interpretations: What Drives Success?**

Combining these factors, we explored their collective influence on a movie’s success. Our model identified six key variables:

1. **Actor Fame**  
2. **Budget (Log-Scaled)**  
3. **Holiday Release Timing**  
4. **Genre Popularity**  
5. **Number of Languages**  
6. **Economic Growth (S&P Returns)**  

---

### **Explained Variance in Success**

We calculated each factor’s **percentage contribution** to the explained variance in movie success, accounting for residual noise. 

**INFLUENCE OF FACTORS PIE CHART PLOT**  

---

### **Factor Correlation Heatmap**

To understand how these variables interact, we visualized a **correlation heatmap**. This helped identify synergies between variables such as actor fame, budget, and exposure.

**CORRELATION HEATMAP PLOT**

<div id="correlation"></div>
<!-- <script type="module">
  import { createRoot } from 'react-dom/client';
  import HeaderLogo from './assets/js/results-plots.js';

  <!-- const container = document.getElementById('header-logo-container');
  const root = createRoot(container);
  root.render(<HeaderLogo />); -->
<!-- </script> --> -->

-----------------

## **Model Evaluation: Decision Tree Analysis**

Finally, we used a **Decision Tree Regressor** to predict movie success based on our key factors. After testing various depths, we identified the **best depth of 4**, achieving an **R² score of 17.18%** with a **Mean Squared Error of 156.20**.

**DECISION TREE VISUALIZATION PLOT**  

---

### **Key Takeaways**

- **Exposure and Timing Matter:** Movies released during holidays and featuring globally popular languages have a clear edge.  
- **Genre Popularity Shapes Success:** Strong storytelling aligned with audience preferences boosts success.  
- **Economic Health Affects Viewership:** Positive economic growth correlates with higher movie success rates.  

Through this multifaceted analysis, **MovieKinsey Analytics** demonstrates that predicting cinematic success is an intricate process shaped by industry dynamics, creative choices, and market conditions.


<div class="flex items-center justify-between p-4">
  <div id="header-logo-container"></div>
  <!-- Rest of your header content -->
</div>

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
<!-- <script src="{{ site.baseurl }}/assets/js/vader-sentiment-plot.js"></script> -->
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="{{ site.baseurl }}/assets/js/utilities.js"></script>
<script src="{{ site.baseurl }}/assets/js/data-analysis-plots.js"></script>
<script src="{{ site.baseurl }}/assets/js/network-analysis-plots.js"></script>
<script src="{{ site.baseurl }}/assets/js/results-plot.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>



<script>
document.addEventListener('DOMContentLoaded', function() {
    // Load the movie master dataset
    Papa.parse('{{ site.baseurl }}/data/movie_master_dataset.csv', {
        download: true,
        header: true,
        complete: function(movieResults) {
            const yearStats = processYearlyData(movieResults.data);
            const years = Object.keys(yearStats).sort((a, b) => a - b);

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
            createDummyPlot();
            createCollaborationSuccessPlot();
            createCareerTrajectoryPlot();
        },
        error: function(error) {
            console.error('Error loading movie master dataset:', error);
        }
    });
});
</script>





