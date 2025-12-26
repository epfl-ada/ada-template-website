<img src="assets/img/intro_image.jpg" alt="intro_image" style="width:100%;max-width:1000px;display:block;margin:auto;">
* * *
# Introduction

Can **doing well** in finance also mean **doing good** for human kind? If you’ve asked yourself this question, you’re not alone, we have too! Sustainable investing has been gaining a lot of attention lately, and we wanted to see whether ethical investing can also stand up financially. To find out, we looked at data from ESG funds and traditional ETFs, comparing them across several financial metrics to explore how they behave differently.

* * *
## What are ESG funds?
<span id="cite-esg-1"></span>
<span id="cite-esg-2"></span>
ESG stands for **Environmental**, **Social**, and **Governance**, basically, the three pillars of responsible investing. An ESG ETF is a fund that includes companies that do well in these areas. For example, it might invest in companies that are eco-friendly, treat their employees and communities well, and have strong, transparent leadership. Think of ESG funds as a way to align your investments with your values 
<sup><a href="conclusion.html#ref-esg-1" id="cite-esg-1">[1]</a></sup>
<sup><a href="conclusion.html#ref-esg-2" id="cite-esg-2">[2]</a></sup>.
<span id="cite-esg-3"></span>
But a quick heads-up: the rules for what counts as “ESG” aren’t set in stone yet. Each fund issuer can have slightly different standards putting more importance into certain categories, so ESG funds can vary quite a bit
<sup><a href="conclusion.html#ref-esg-3" id="cite-esg-3">[3]</a></sup>.

* * *
# Research Questions


1. How does the volatility and return ESG ETFs over time differs to traditional ETFs?

2. Is there a relationship between volatility and returns in ESG ETFs?

3. To what extent do ESG-focused exchange-traded funds provide meaningful diversification relative to one another?

4. Does the performance of ETFs vary with the same pattern every year and does this seasonality difer from ESG to non-ESG ETFs?

5. Do ESGs exhibit superior downside protection relative to non-ESG portfolios during periods of market stress?


* * *
# The Data


<img src="assets/img/show_me_the_data.gif" alt="intro_image" style="width:40%;max-width:1000px;display:block;margin:auto;">

The data used in this investigation contains historical daily data on all the tickers, (stocks and ETFs), that are currently trading on NASDAQ starting from different timepoints up to 2025. The daily data contains **Opening**, **Closing**, **Highest** and **Lowest** prices as well as the total **volume** traded on that specific day. We also have access to metadata for each company where we find our ESG labels.


Below is a visualisation of the data for the Apple stock for different metrics. _(Even if doesnt look like it, the graphs **are** different, their low variability makes sense given the fact that they are measurements from the same days)_

* * *

<div id="aapl-widget" style="max-width:900px; margin: 1rem 0;">
	<label for="metricSelect">Metric:</label>
	<select id="metricSelect" style="margin-left:0.5rem;">
		<option value="High" selected>Highest price (High)</option>
		<option value="Low">Lowest price (Low)</option>
		<option value="Volume">Volume</option>
		<option value="Close">Closing price (Close)</option>
		<option value="Open">Opening price (Open)</option>
	</select>

	<div id="aaplError" style="color:#b00020; display:none; margin-top:0.5rem;"></div>

	<div id="aaplChartContainer" style="background:#fff; border:1px solid #e6e6e6; padding:1rem; margin-top:0.5rem;">
		<canvas id="aaplChart" width="800" height="300"></canvas>
	</div>

	<div id="aaplInfo" style="margin-top:0.5rem; font-size:0.9rem; color:#333;"></div>
</div>

<!-- Chart.js CDN - lightweight and easy to use -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<!-- Local JS that loads raw_data/stocks/AAPL.csv and renders the interactive chart -->
<script src="assets/js/stocks.js"></script>

* * * 
## The ETF Data


We can further take a look at the section of the data that we will use that is comprised of the ETF data. Below a visulaisation of the sectors present in our data.

<iframe src="https://pablovallbona.github.io/ada-template-website/assets/graphs/etf_sector_distribution.html" width="100%" height="600px" frameborder="0"></iframe>



* * *
## The ESG data


After selecting the ETFs with the ESG labels the dataset is as follows:

| Number of ETFs       | Labelled as ESG    | Percentage |
|:--------------------:|:------------------:|:----------:|
|                 4748 |                 61 |        1.3 |

With the following sectors:

<iframe src="https://pablovallbona.github.io/ada-template-website/assets/graphs/esg_sector_distribution.html" width="100%" height="600px" frameborder="0"></iframe>


Let’s pause for a moment to examine the differences between ESG and non-ESG ETFs. First, the energy sector is entirely absent from our ESG dataset, while it accounts for 2.26% of the overall ETF data. This gap is expected, as most ESG funds avoid companies heavily involved in fossil fuels and other high-carbon industries. Additionally, there is a noticeable underweight in the financial sector. While it is the largest sector across all ETFs (14.8%), it appears in only one ESG fund. This stems from the “S” (Social) and “G” (Governance) criteria of ESG investing. Companies in the financial sector may be excluded due to involvement in controversial lending practices, poor governance records, or low scores on metrics such as financial inclusion.

* * * 

Next, we’ll take a closer look at our ESG ETFs by exploring their volatility, how they respond to crises, their long-term performance, and seasonal patterns. Move on to the next page to dive in.

<img src="assets/img/toddler-dive-child.gif" alt="intro_image" style="width:20%;max-width:1000px;display:block;margin:auto;">
