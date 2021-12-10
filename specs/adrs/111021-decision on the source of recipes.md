# {Decision on the main features on Recipe page -> auto-calculate servings}

* Status: accept
* Deciders: George, Esther, Hannah, You, Ke, Eamon, Bagrat, Martin, Stewart, Tiffany <!-- optional -->
* Date: {2021-11-10} <!-- optional -->

## Context and Problem Statement

We were discussing ways to get recipes between, JSON-LD and spoonacular API

## Decision Drivers <!-- optional -->

* Easy to implement if uploading 100s of recipes

## Considered Options

* JSON-LD
* spoonacular API

## Decision Outcome

Chosen option: spoonacular api

### Negative Consequences <!-- optional -->

* Got limited calls everyday, else need to be paid

## Pros and Cons of the Options <!-- optional -->

* easier to load recipes
* easier to use the functionality
* make backend set up easier

### {API}

* Good, make backend set up easier
* Good, because quicky set up with ingredients
* Bad, there are a lot of paid API
* Bad, only up to 150calls/day

### {JSON-LD}

* Good, free and easy to use since all data are local
* Bad, backend might be large, that will take up a lot of time
