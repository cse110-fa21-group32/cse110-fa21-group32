/**
 * This file is used to query Spoonacular's database for a specific recipe given the recipes' ID, it
 * returns a JSON file with all the details of the recipe. To use it you need to import the
 * fetchRecipe function by placing this line in your code.
 * import fetchRecipe from 'path/to/fetchRecipe/fetchRecipe.js';
 *
 * Then your argument for the fetchRecipe function should be the ID number of the recipe you are
 * searching for.
 *
 * You will be returned an object with the recipes' JSON file.
 */
let recipe = {};
const API_KEY = '1414109596ee45759cfec0f52917cc31';

/**
 * Calls fetchJSON function to fetch the result recipe JSON file and returns this in an object
 * @param {String} ID The ID of the recipe being searched for
 * @returns {Object} Returns an object with the recipe's JSON file
 */
export default async function fetchRecipe(ID) {
  await fetchJSON(ID);
  return recipe;
}

/**
 * Calls createURL function and then fecthes the JSON file from that URL with the recipe JSON file
 * @param {String} ID The ID of the recipe being searched for
 */
function fetchJSON(ID) {
  let requestString = createURL(ID);

  return new Promise((resolve, reject) => {
    fetch(requestString)
      .then((response) => response.json())
      .then((data) => {
        recipe = data;
        resolve();
      })
      .catch((err) => {
        console.log(`Error loading the recipe ${err}`);
        reject(err);
      });
  });
}

/**
 * Creates the URL that query's Spoonacular for the recipe
 * @param {String} ID The ID of the recipe being searched for
 * @returns {String} URL that has result recipe JSON file and needs to be fetched
 */
function createURL(ID) {
  let requestString = `https://api.spoonacular.com/recipes/${ID}/information?apiKey=${API_KEY}&includeNutrition=false`;

  return requestString;
}
