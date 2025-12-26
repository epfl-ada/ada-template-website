---
layout: default
---

# When the Market Bleeds, Do We Go Green or Go Home?

The big question: when the world goes sideways and the market tanks, does our "feel-good" portfolio actually protect our capital, or do we get wrecked? We put it to the test against the old-school, no-regrets Non-ESG portfolio across the biggest meltdowns of the last few years. Let's see who cried less.

We didn't just pick random bad days. We chose four distinct flavors of market chaos to see how our portfolios would hold up under different kinds of pressure:

*   **China-US Trade War (2018):** A slow-burn political mess of tariffs and threats. Tests patience and resilience to prolonged uncertainty.
*   **COVID-19 Pandemic (2020):** The big one. A global, black-swan event that nuked everything. A raw test of pure downside protection.
*   **Russia-Ukraine Invasion (2022):** A sudden geopolitical shock that sent energy and commodity prices to the moon.
*   **New Tariffs Shock (2025):** Our hypothetical flash-crash. A sharp, policy-driven panic to test reaction speed.

<img src="assets/img/not_stonks.jpg" alt="intro_image" style="width:60%;max-width:1000px;display:block;margin:auto;">

## The Math Behind the Madness

Before we look at the charts, let's establish how we kept score. We calculated returns for over 4,000 ETFs. The stocks were not analysed to keep the comparison fair and focused on the ETF level only. Here are the key metrics we used to evaluate performance during each crisis: 

**1. Daily Returns ($$R_t$$):**  
For every asset, we calculated the daily percentage change:  
$$R_t = \left( \frac{P_t - P_{t-1}}{P_{t-1}} \right)$$
with $$P_t$$ being the closing price on day $$t$$<sup><a href="conclusion.html#ref-5" id="cite-5">[5]</a></sup>.

**2. Cumulative Returns ($$CR_T$$):**  
To visualize the "pain journey" over time $$T$$, we compounded these daily returns:  
$$CR_T = \left( \prod_{t=1}^{T} (1 + R_t) \right) - 1$$<sup><a href="conclusion.html#ref-10" id="cite-10">[10]</a></sup>.

**3. Volatility (Risk):**  
We measure fear by the standard deviation ($$\sigma$$) of the daily returns during the crisis period. A higher $$\sigma$$ means the portfolio was wildly unpredictable.  
$$\sigma = \sqrt{\frac{\sum (R_t - \bar{R})^2}{N-1}}$$
with $$\bar{R}$$ being the mean daily return and $$N$$ the number of trading days<sup><a href="conclusion.html#ref-11" id="cite-11">[11]</a></sup>.

---

## The Scorecard: Average Hits and Volatility

Before we get into in depth analysis, here's the executive summary. This chart shows the average daily return and the volatility for each portfolio during a crisis.


![Mean Return and Volatility](./assets/img/Mean_return_volatility_per_crisis.jpg)

Two things jump out immediately. First, in every single crisis except the Russia-Ukraine invasion, the ESG portfolio's average daily loss was smaller than the Non-ESG portfolio's. It consistently took less damage. Second, and more dramatically, the ESG portfolio's standard deviation is significantly lower across the board, meaning it was far less volatile. During the COVID-19 panic, the Non-ESG portfolio's volatility was off the charts, while our ESG plays kept a much cooler head. This isn't just about losing less; it's about being fundamentally more stable and predictable when everything is on fire.
Howver, let's get deeper into our analysis to be sure of these findings.

---

## Daily Mood Swings: The Boxplot Analysis

Averages can lie, but distributions rarely do. This boxplot breaks down the daily return distribution for every asset in both portfolios across all crises.

![Boxplot of Daily Returns](./assets/img/boxplot_daily_returns_all_crises.jpg)

We can observe now way more nuanced differences. In fact, the boxplots shows  that daily returns went through approximatly the same variations in both portfolios. On the one hand for China US Trade War and Covid-19 crises, the non-ESG portfolio had a slightly higher median and interqualtile range (IQR) than ESG showing a better performance for non-ESG. On the other hand, while for the New tarrif crisis, the reactions were the same, in the Russia-Ukraine crisis, the ESG portfolio had a higher median and IQR than non-ESG showing a better performance for ESG.  
So for now, our financially environmental bets seem to be holding their own, but let's dig deeper to see where the money actually flowed during these turbulent times.

---

## The Big Picture: Where the Money Ran to Hide

We classified every ETF's total performance during the crisis into four buckets to visualize capital rotation:
* **Major Loss:** $$< -20\%$$
* **Minor Loss:** $$-20\% \text{ to } -5\%$$
* **Resilient:** $$-5\% \text{ to } +5\%$$
* **Gainer:** $$> +5\%$$

### ESG Portfolio: The "Conscious Capital" Flow

<div class="flourish-embed flourish-sankey" data-src="visualisation/26665718"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26665718/thumbnail" width="100%" alt="sankey visualization" /></noscript></div>

### Non-ESG Portfolio: The "Old School" Flow

<div class="flourish-embed flourish-sankey" data-src="visualisation/26665695"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26665695/thumbnail" width="100%" alt="sankey visualization" /></noscript></div>


**The Analysis:** These flow diagrams reveal the underlying strategic differences in how capital behaves under pressure within each portfolio.

The aggregated Sankey for the **ESG portfolio** highlights its core defensive characteristic: effective capital preservation. Across all sectors, the flow of assets into the "Major Loss" category is notably suppressed, demonstrating a structural resilience to severe drawdowns. Fixed Income acted as a key anchor, with the majority of its capital remaining in the "Resilient" bucket, which stabilized the overall portfolio. This illustrates that the portfolio's construction is geared towards mitigating the worst-case scenarios during high-volatility periods.

The **Non-ESG portfolio** tells a story of higher risk concentration. While many of its core holdings also landed in the "Resilient" and "Minor Loss" categories, its exposure to more cyclically sensitive sectors proved costly. Specifically, the **Trading, Equity, and Energy** sectors showed a significant flow into the "Major Loss" bucket. These are the high-beta sectors that, while powerful in a bull market, are punished during a fight for safety. The analysis confirms the Non-ESG portfolio carries a higher sensitivity to systemic shocks, driven by this concentration.


---

## A Trip Down Crisis Lane: Round-by-Round Analysis

### Round 1: The U.S.-China Slap Fight (2018)

<div class="flourish-embed flourish-chart" data-src="visualisation/26665792"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26665792/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

**Analysis:**
* **ESG Mean Return:** -0.089%
* **Non-ESG Mean Return:** -0.093%

A victory for ESG by a hair. The China-US trade war crisis was mainly about unpredictable government rules, like new tariffs. The results suggest that ESG companies did a little better because they often have stronger governance (the "G" in ESG). Good governance usually means better control over their supply chains and a clearer view of how to handle complex international rules, helping them adapt faster than the broader market.


### Round 2: The COVID-19 Panic Room (2020)

<div class="flourish-embed flourish-chart" data-src="visualisation/26666176"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26666176/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

**Analysis:**
* **ESG Mean Return:** -0.11%
* **Non-ESG Mean Return:** -0.14%

While the cumulative lines both trend down as excepted, the Non-ESG portfolio experienced sharper drops. The ESG portfolio's "quality bias" (companies with better governance and balance sheets) likely dampened the blow of the economic shutdown. This time, being great and conscious paid off again.
These results give differnent results than the boxplot analysis where non-ESG seemed to perform better.
It can be explained because while the non ESG portfolio had better 'typical' days (higher median), its bad days were catastrophic, dragging down its overall average. So ESG was less exciting, but safer.

### Round 3: Russia Goes Rogue (2022)

<div class="flourish-embed flourish-chart" data-src="visualisation/26666209"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26666209/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

**Analysis:** **The Exception.**
* **ESG Mean Return:** -0.07%
* **Non-ESG Mean Return:** -0.05%

This is the only crisis where Non-ESG won. Why? **Oil and Defense.** The invasion caused a spike in oil prices and defense stocks—two sectors that ESG portfolios typically shun. This highlights the "anti-energy" risk inherent in ESG investing during commodity super-cycles.

In fact, look at that sankey diagram of non-ESG sectors during the crisis: Energy and Utilities had significant flows into the "Gainer" bucket, boosting the Non-ESG portfolio's performance. So, while ESG generally protects better, it can get blindsided by sector-specific shocks.

<div class="flourish-embed flourish-sankey" data-src="visualisation/26669735"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26669735/thumbnail" width="100%" alt="sankey visualization" /></noscript></div>


### Round 4: The Great Tariff Scare of 2025

<div class="flourish-embed flourish-chart" data-src="visualisation/26666190"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26666190/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

**Analysis:**
During Trump's sudden tariff announcements, markets reacted sharply. These are the results:
* **ESG Mean Return:** -0.232%
* **Non-ESG Mean Return:** -0.229%

This time, non-ESG proves slightly more resilient, but both portfolios took a heating and followed similar paths. 

---


## The Bottom Line

So, after all the number-crunching, what's the verdict? When the market is in freefall, does the ESG portfolio actually protect your capital?

The data gives a clear, if nuanced, answer: **Yes, for the most part, it does.**

Looking at the data, it seems our ESG portfolio was like having a slightly better helmet. It didn't make us invincible—a market-wide crash is still a crash—but it consistently took fewer direct hits. The drawdowns were often shallower and the recovery a bit steadier.

Across three out of four distinct crisis types, the ESG portfolio consistently delivered sligthly superior downside protection. As the Sankey analysis revealed, the ESG strategy is fundamentally better at avoiding the catastrophic "Major Loss" bucket. The result is a portfolio that is significantly less volatile and takes smaller average daily hits.

However, the Russia-Ukraine crisis serves as a critical counterpoint. It highlights the primary risk of an ESG strategy: **sector-specific shocks.** By deliberately underweighting or excluding sectors like defense and fossil fuels, the portfolio was unable to capture the massive upside from the commodity and geopolitical rally. This was the one scenario where the old-school, Non-ESG portfolio came out on top.

**The final call:**
You might not get the same face-ripping rallies as some high-risk legacy sectors, but you also might not lose your shirt when things go sideways. And you get to tell people you're saving the world. For a finance bro, that's what we call a win-win.
