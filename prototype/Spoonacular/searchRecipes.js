/**
 * This file is used to query Spoonacular's database for recipes, it returns basic information of
 * recipe including name, photo and recipe ID. To use it you need to import the
 * searchRecipes function by placing this line in your code
 * import searchRecipes from 'path/to/searchRecipes/searchRecipes.js';
 *
 * Then your argument for the searchRecipes function should be a string with your query of ingredients
 * or recipe name, for example 'chicken pasta'.
 *
 * You will be returned an object where the recipes can be obtained through the 'results' key, I.e.
 * const foundRecipes = await searchRecipes('chicken pasta');
 * const resultOne = foundRecipes.results[0]]
 */
let foundRecipes = {};
const API_KEY = '1414109596ee45759cfec0f52917cc31';

/**
 * Calls fetchJSON function to fetch the result recipe JSON file and returns this in an object
 * @param {String} ingredients The query that is being serached for. I.e. Ingredients or recipe name
 * @returns {Object} Returns an object with the result recipes from the query
 */
export default async function searchRecipes(ingredients) {
  await fetchJSON(ingredients);
  return foundRecipes;
}

/**
 * Calls createURL function and then fecthes the JSON file from that URL with the different recipe results
 * @param {String} ingredients The query that is being serached for. I.e. Ingredients or recipe name
 */
function fetchJSON(ingredients) {
  let requestString = createURL(ingredients);

  return new Promise((resolve, reject) => {
    fetch(requestString)
      .then((response) => response.json())
      .then((data) => {
        foundRecipes = data;
        resolve();
      })
      .catch((err) => {
        console.log(`Error loading the recipe ${err}`);
        reject(err);
      });
  });
}

/**
 * Creates the URL that query's Spoonacular for it's result recipe's
 * @param {String} ingredients The query that is being serached for. I.e. Ingredients or recipe name
 * @returns {String} URL that has result recipe JSON file and needs to be fetched
 */
function createURL(ingredients) {
  const ingredientsString = ingredients.replace(/ /g, '%2C');
  let requestString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=5&query=${ingredientsString}`;

  return requestString;
}
