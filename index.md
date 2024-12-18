---
layout: page
title: MovieKinsey Analytics®
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

## *The Evolution of Movie Releases*

<div id="releases-plot" style="width: 100%; height: 600px;"></div>

Picture this: it’s the early 20th century, the golden age of cinema has just begun. Movies trickled into the public sphere at a measured pace, their production limited by the constraints of technology and resources. But as we move past 1920, the plot begins to shift.

The data reveals a compelling story — a steady increase in movie releases. For decades, this rise was modest, reflecting the era’s cautious approach to film production. However, as the 1980s hit, the industry witnessed an explosion. Technological innovations, the rise of global distribution, and evolving audience tastes fueled a boom in movie production. From film reels to streaming platforms, cinema was no longer just an art form; it had become a global phenomenon.

This growth in releases isn’t just a statistic; it sets the stage for everything that follows. More movies mean more competition, more innovation, and a higher bar for success. But does quantity translate to quality? Let’s keep the reel rolling.

---

## *The Story of Revenue: From Modest Beginnings to Box Office Titans*

<div id="revenue-plot" style="width: 100%; height: 600px;"></div>

As the movie release curve climbs, so too does its financial counterpart. Revenue — the industry’s heartbeat — has grown near-exponentially, and the reasons are as clear as a perfectly executed plot twist.

Imagine a time when a successful film was a local triumph. Fast forward to today, and the story has changed dramatically. With an ever-expanding audience, the introduction of global markets, and technological advancements like CGI and IMAX, movies have become larger than life — both in production scale and earnings.

What’s driving this growth? A rising number of releases, yes, but also inflation and a world increasingly captivated by cinema. The industry isn’t just growing; it’s thriving. Yet, this financial boom raises questions. Are blockbusters dominating at the cost of smaller stories? Is success only about revenue? Let’s dig deeper into the numbers.

---

## *The Nuanced Revenue Landscape: Blockbusters, Indies, and Everything In-Between*

<div id="revenue-stats-plot" style="width: 100%; height: 600px;"></div>
<div id="revenue-scatter-plot" style="width: 100%; height: 600px;"></div>

Here’s where the story takes a fascinating turn. Over the years, the revenue landscape has grown polarized. The variance in box office earnings has never been wider. On one end, we have the colossal success of record-breaking blockbusters. On the other, a rise in lower-budget indie films carving their own niche.

Take a closer look, and you’ll spot the trends: spikes in average revenue during the 1960s, 1970s, and the 2000s. These peaks suggest a few standout years when influential movies reshaped audience behavior and consumption. Movies weren’t just entertainment; they became cultural landmarks, driving trends and capturing imaginations.

But here’s the twist: while revenue paints a broad picture of financial success, it’s not the whole story. A movie’s impact goes beyond earnings. Popularity, critical acclaim, and audience connection all play roles in determining what *success* truly means.

---

## *Why Revenue Isn’t Enough*

The data tells us this much: the movie industry is growing, financially and creatively. But focusing on revenue alone misses the bigger picture. A movie’s success isn’t just about box office numbers; it’s about emotional connection, cultural impact, and the stories that resonate.

Our analysis doesn’t stop here. While the industry’s financial growth is impressive, we believe there’s more to success than dollars earned. Through a deep dive into sentiment analysis and actor influence, we aim to uncover the hidden ingredients that separate good movies from great ones. 

So, does a star-studded cast or an unforgettable storyline hold the key to success? The answer is coming — and it’s worth sticking around for.


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
<div id="actor-age-plot-error" style="color: red;"></div>

**Observations**:

1. **Age Intervals of High Activity**: There are two key age ranges where actors are more likely to appear in additional movies:
   - **1-5 years**: Very early career starts
   - **15-19 years**: Teenage career beginnings
   These intervals suggest that actors starting young or during teenage years often have longer, more prolific careers.

2. **Declining Trend**: An overall decline in appearances with increasing starting age indicates that actors beginning their careers later are less likely to have extensive filmographies. This trend suggests a strong correlation between early career start and accumulated experience.

These findings support our hypothesis that an experienced actor contributes to a movie's success. To incorporate this, we considered the most experienced actor in each movie (i.e., the actor with the most previous appearances by the movie's release date) as a factor in our success metric.

# 3. Sentiment Analysis

For the sentiment analysis component, we experimented with two different models to assess their effectiveness in capturing the sentiment of movie plot summaries:

1. **VADER (Valence Aware Dictionary and Sentiment Reasoner)**:

VADER (Valence Aware Dictionary and sEntiment Reasoner) is a lexicon- and rule-based sentiment analysis tool optimized for analyzing sentiment in short, informal, and emotive texts, such as those found on social media. Developed as a "gold standard" sentiment lexicon, VADER uses a combination of a pre-built word lexicon and five general grammatical and syntactical rules to detect sentiment intensity, accounting for nuances like:

- **Intensifiers** (e.g., "extremely" in "extremely good") to increase sentiment strength.
- **Negations** (e.g., "not" in "not great") to reverse sentiment.
- **Punctuation** (e.g., exclamation marks) to heighten sentiment.

VADER produces scores for **positive**, **neutral**, and **negative** sentiment, as well as a **compound score** that summarizes overall sentiment intensity on a scale from -1 (most negative) to +1 (most positive). While it is highly effective for informal social media text, it may face limitations with complex and nuanced contexts.

For more details, check out VADER on [GitHub](https://github.com/cjhutto/vaderSentiment) or refer to the original paper: ["VADER: A Parsimonious Rule-Based Model for Sentiment Analysis of Social Media Text"](https://ojs.aaai.org/index.php/ICWSM/article/view/14550).

---

2. **DistilBERT (Distilled Bidirectional Encoder Representations from Transformers)**:

DistilBERT is a compact, faster, and lighter version of the BERT model. It is built using **knowledge distillation**, where a smaller "student" model is trained to mimic the performance of a larger "teacher" model. DistilBERT retains approximately 97% of BERT's accuracy while being **40% smaller** and **60% faster**, making it highly efficient for real-time or resource-constrained applications.

Key features of DistilBERT include:
- **Transformer-based Architecture**: Captures deep contextual relationships in text to understand nuanced and subtle sentiment cues.
- **Pre-training and Fine-tuning**: Pre-trained on large datasets and fine-tuned for specific tasks like sentiment analysis, enabling it to classify text sentiment (e.g., positive, negative, or neutral).
- **Applicability to Complex Text**: Especially effective for datasets requiring an understanding of linguistic complexity, such as movie plot summaries.

For sentiment analysis, we used a fine-tuned version of DistilBERT that demonstrated strong performance on text with intricate language. It proved capable of capturing sentiment nuances better than rule-based models like VADER.

You can learn more about DistilBERT in the paper ["DistilBERT: A distilled version of BERT"](https://arxiv.org/abs/1910.01108) or explore implementations such as [this GitHub repository](https://github.com/YonghaoZhao722/distilbert-base-uncased-finetuning).

### 3.1 DistilBERT

### Sentiment Analysis of Movie Plot Summaries Using DistilBERT

We implemented sentiment analysis on movie plot summaries through a multi-step process to ensure accurate and nuanced sentiment detection:

1. **Sentence Segmentation**:  
   - Each plot summary was divided into individual sentences to capture sentiment shifts within the text. This was done using the `nltk` library's `sent_tokenize` function.  

2. **Sentence-Level Sentiment Analysis**:  
   - We applied the `distilbert-base-uncased-finetuned-sst-2-english` model from Hugging Face to analyze each sentence. This pre-trained model classifies sentiment as either *positive* or *negative*, providing granular insights into sentiment at a sentence level.

3. **Aggregation of Sentiment Scores**:  
   - Sentiment scores (`1` for positive, `-1` for negative) were aggregated to create a sentiment trajectory for each plot summary. This approach enabled us to identify overall trends and shifts in sentiment throughout the summary.

4. **Saving Results**:  
   - The sentiment analysis data, including each sentence and its associated sentiment score, was stored in a CSV file. This allowed for easy retrieval and further analysis.

By analyzing text at the sentence level, this approach ensures that both subtle and pronounced sentiment variations within a movie plot summary are accurately captured.

All functions required for implementing DistilBERT sentiment analysis are located in the `tests/Sentiment_Analysis/distillBERT.py` file. This script includes functions for:

- **Sentence Segmentation**: Breaking down plot summaries into individual sentences.
- **Sentiment Analysis**: Using DistilBERT to determine the sentiment of each sentence.
- **Result Saving**: Storing the output in a structured format.

The processed sentiment analysis results are saved in a CSV file named `distillbert_sentiment_analysis.csv`. Each entry in this file contains:

- The **movie ID**.
- The **segmented sentences**.
- The **corresponding sentiment scores**.

Below, we provide an example of a sentiment analysis plot for a movie with ID 77856.

<div id="distilbert-sentiment-plot" style="width: 100%; height: 600px;"></div>

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

            // Initialize DistilBERT plot with default movie ID
            updateDistilBERTPlot('77856');
        },
        error: function(error) {
            console.error('Error loading movie data:', error);
        }
    });
});
</script>