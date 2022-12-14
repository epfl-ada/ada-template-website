# Are beers political?


## Usage
1. Fork (copy) this repository by clicking the "Fork" button on the top right corner.
2. Go to "Settings" -> "Pages" in your forked repository. Under "Branch" change "None" to "master" and click "Save".
3. Edit the `_config.yml` file in your forked repository to change the site title (after `title:`) and description (after `description:`).
4. Build your own page by editing this `README.md` (home page) and creating new `.md` files (other pages), formatting is done with standard [GitHub Markdown syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), we provide an example file `example.md` in the repository.
**Important**: Please include ```--- layout: default ---``` (the first three line in `example.md`) at the beginning of your every newly created `.md` file.
5. Add your new `.md` files to the site by editing the `_config.yml` file in your forked repository. Under `navigation:` add a new pair of `- title:` and `url:`, and fill their value with your page name and `.md` file name. Remember to remove the `- title:` and `url:` pair for the example page.
6. Go back to "Settings" -> "Pages" to find your website link.


"It's 5 pm, time to go home and drink a beer" - me, every day
You might not think that way, however, this is the everyday statement of a beer lover (or a really tired hard worker). Beer is a beverage that is consumed by many people around the world. It is a drink that is consumed by people of all ages, and all cultures. 
After having tried hundreds of different beers, one might be interested to share its opinion on the beverage, that's the purpose of online plateforms such as BeerAdvocate or RateBeer. Simple ratings can be given to a beer as well as more complex reviews containing a description of the beer, its taste, its color, its smell, and its origin. We relied on these reviews and the corresponding dataset to dig into the political orientation of the beer drinkers.

Focusing on the USA, let's try to figure out if a 'conservative' consumption exists. By classifiying beers from their original states, we want to investigate what are the most popular beers in each state, and if these 'local beers' are more likely to be on top of this ranking. 

