---
layout: default
---

# Actors & Astrology: Zodiac Trends in Movie Field

<br><br><br>

## Abstract
-----------------------------------------------
Astrology, an ancient practice that predicts present and future events through the movements of celestial bodies, remains popular despite a lack of scientific validation. Many continue to believe that individuals born under different zodiac signs exhibit distinct personality traits. Our project aims to use statistical methods to examine whether zodiac-related trends exist in the film industry, potentially explaining why such pseudoscientific beliefs persist.

To explore these trends, we first analyze the distribution of actors' zodiac signs based on their birthdates. We then investigate whether individuals of different zodiac signs exhibit different patterns within the film industry, such as genre preferences or the types of roles they are cast in. In this stage, we plan to use large language models (LLMs) to obtain data on role types, validating the accuracy of this information to ensure reliable analysis. Finally, we plan to evaluate if there are some factors will influence these distributions and tendencies, such as gender and nationality. 
<br><br>

## Research Questions
-----------------------------------------------

These questions serve as guideline of our project.

*(Almost) Completed:*<br>
(1) Is the **distribution** of actors across zodiac signs uniform, or are certain signs more represented than others? Which zodiac sign has the highest representation among actors?  

(2) Do actors of different zodiac signs tend to **prefer specific movie genres**?

*Ongoing:*<br>
(3) Do certain movie genres show a **preference for actors** of specific zodiac signs during casting?

(4) What is the difference in the **number** of movies performed by actors of different zodiac signs?

(5) How do zodiac signs influence the assignment of **power roles**, such as heroes, villains, and sidekicks? 

(6) Are these distributions and trends affected by **demographic factors** such as gender, nationality, or other characteristics of the actors?
<br><br>

## Proposed additional datasets
-----------------------------------------------
We need more data for Research Question (5). We have not found an open dataset specifically focused on the assignment of power roles. Therefore, we plan to leverage large language models (LLMs), such as ChatGPT, to help determine power dynamics among characters. To enhance the accuracy of the data provided by LLMs, we will incorporate supplementary information from the IMDB dataset. Additionally, we will validate the data by selecting a sample set to assess the reliability of the LLM-generated information.
<br><br>

## Method
-----------------------------------------------

### Data Cleaning & Preparation
First, we carefully reviewed each dataset to assess whether its columns were relevant to our project and whether the qualities of the columns were good. 

Next, we performed data cleaning and preparation, removing any inconsistencies and grouping actors by zodiac sign based on their birthdates. We also group the movies based on its genre.

### Data Enrichment: 
Create the dataset of power roles. First, we randomly selected a sample of characters and manually labeled their power roles—such as hero or bad guy. Then, we will use LLMs to determine the power roles of these samples and validate the results. Once validated, we will apply the LLMs to classify power roles across the entire dataset.

### Data Analysis

#### *Completed:*
(1) **Distribution Analysis**: After group the actors into different zodiac signs, we will calculate the distribution. Then we will utilise chi-square to determine if the differences between the zodiac signs are significant or not.  
(2) **Genre Analysis**
Preferences for movie genres among actors of different zodiac signs: ① Calculate the distribution of different genre ② Calculate the genre distribution of each sign ③ Divide the two proportion ④ use statstical method to test if the trends are significant.

#### *Ongoing:*
(3) **Casting preferences** :① Calculate the distribution of different genre ② Calculate the genre distribution of each sign③ Divide the two proportion ④ use statstical method to test if the trends are significant.  
(4) **Number of Movies** : After group the actors into different zodiac signs, we will calculate the average number of movie the actor perform for each zodiac sign and use use statstical method to test if the differences between the zodiac signs are significant or not.  
(5) **Power Role Analysis**: ① Map each actor’s zodiac sign to their respective role ② Use statistical methods (e.g., chi-square tests, logistic regression) to determine if there is a significant association between zodiac signs and the likelihood of being cast in specific roles. Analyze trends and compare how often actors of certain signs are cast as heroes versus villains or sidekicks.  
(6) **Career longevity**: How do zodiac signs correlate with actors' career longevity, examining the timespan from their first to last movie appearances?  
(7) **Type Diversity Index**: Which zodiac signs demonstrate greater versatility in genre-switching, and how successful are they in different genres throughout their careers?  
(8) **Demographic factors Analysis**: Utilised the demographic factors to normalize the data, and repeat (1)-(5)
<br><br>




## Timeline
-----------------------------------------------

| Date       | Milestone                                             | Details                                                                                 |
|------------|-------------------------------------------------------|------------------------------------------------------------------|
| **11.15**  | Data Cleaning and Preparation                         | Initial analysis for Data Analysis goals (1) & (2)                                           |
| **11.29**  | Data Enrichment & Demographic Factors Analysis        | Enrichment and demographic analysis for Data Analysis (1) & (2), plus Deadline for Homework 2       |
| **12.06**  | Finish Data Analysis                                  | Complete all analysis tasks                                                            |
| **12.13**  | Report Writing                                        | Begin drafting and finalizing the project report                                       |
| **12.20**  | Deadline: Milestone 3                                 | Submit the final project deliverables                                                 |

<br><br>

## Team Organization
-----------------------------------------------

| Member           | Primary Contributions                     |
|-------------------|------------------------------------------|
| Zhichen          | Distribution Analysis & Data Enrichment & README writing  |
| Jiaqi            | Data Cleaning & Distribution Analysis & README writing   |
| Xin              | Genre Analysis & Power Role Analysis     |
| Maksymiliann     | Genre Analysis & Power Role Analysis     |
| ~~Zoyed~~        | ~~Never showed up and considered quit this project with TA approval~~ |

*Note: All group members will also engage in demographic factors analysis and creating the final data story. All work are discussed and opyimized within group.*
<br><br>

## Project Structure
-----------------------------------------------

The current directory structure:

```
├── data                        <- data here
│
├── Image                       <- Graph for Analysis
├── src                         <- Source code
│   ├── data                            <- Not used now
│   ├── models                          <- Not used now
│   ├── utils                           <- Utility directory contains the functions used in results
│   ├── scripts                         <- Not used now
│
├── tests                       <- Tests files with all the development details
│
├── results.ipynb               <- well-structured notebook showing the results
│
├── .gitignore                  
├── pip_requirements.txt        
└── README.md
```
