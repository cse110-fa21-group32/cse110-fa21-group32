# {Decision on what to include on the home page}

* Status: accept
* Deciders: all team members <!-- optional -->
* Date: {2021-12-01} <!-- optional -->

## Context and Problem Statement

We were discussing what information to show on the home page

## Decision Drivers <!-- optional -->

* User-friendly
* Easy to implement

## Considered Options

* random recipes for exploratory purposes
* favorited recipe list
* list of recently visited recipes (like the ones on the grocery list)

## Decision Outcome

Chosen option: {random recipes} because it adds the most to balance out the features of our app, lots of personalized items for own recipes and grocery list so random recipes helps the user discover more recipes in addition to the search bar. Also more stable because the number of recipes shown on the home page can be fixed.

### Negative Consequences <!-- optional -->

* Got limited calls everyday, else need to be paid

## Pros and Cons of the Options <!-- optional -->

* easier to load recipes
* easier to use the functionality
* make backend set up easier

### {random recipes}

* Good, adds an exploratory element so that the user can interact with our recipe pool more and is always populated even if they're a new user
* Bad, more API intensive and might be less useful to a longer-term user that already knows what they want from the recipes

### {favorited recipe list}

* Good, user controls the recipes that they want to see/of interest so it would likely be relevant to see them on the home page
* Bad, requires the favorited recipe functionality and more communication with our backend to save the favorited recipes upon logout; looks empty if the user has not added much

### {list of recently visited recipes (like the ones on the grocery list)}

* Good, already have the information for grocery list so that there would not be any extra fetches required
* Bad, redundant information to the grocery list, timing on waiting for the grocery list to be fetched from the backend may be tricky when generating pages all upon login; looks empty if the user has not added much
