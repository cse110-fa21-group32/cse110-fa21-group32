// HomePage.js

// IMPORTS
import { router } from '../scripts/main.js';
import { GET /*, POST */ } from '../scripts/request.js';

/**
 * Class: HomePage
 * Starting page after loggin in. Shows some basic user info
 * and some of the favorite/recent recipes.
 */
class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create styles and root element
    const styles = document.createElement('style');
    const article = document.createElement('article');

    // Fill in styles and root element
    styles.innerHTML = `
    *{
      clear: both;
      font-family: "IBM Plex Sans", sans-serif;
      font-weight: normal;
      font-style: normal;
      font-size: 10px;
    }
    filling {
      margin-bottom: 0 !important;
      background-color: #ca676a;
      background-size: cover;
      padding: 23.5px;
      color: white;
      margin-top: 0;
    }
    .recipe-grid {
      margin-left: 5%;
      display: grid;
      grid-template-columns: auto auto auto;
      grid-column-gap: 2%;
      grid-row-gap: 10%;
      margin-right: 5%;
    }

    button {
      background-color: white;
      border-radius: 9px;
      border: 1.5px solid #ca676a;
      text-align: center;
      min-width: 8%;
      height: 16pt;
    }
    .css-wrap {
      margin-left: 5%;
      margin-bottom: 16pt;
      margin-right: 5%;
    }

    h5{
      font-size: 1rem !important;
      
    }
    

    .my-card{
      margin:0;
      padding:0;

      position: static;
      width: 175px;
      height: 275px;

      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

      align-items: center;
      border: 1px solid rgb(223, 225, 229);
      border-radius: 4px;
      transition: all 0.2s ease;
      user-select: none;

    }

    .card-img-top {
      display: inline-block;
      object-fit: cover;
      width: 175px;
      height: 200px;
    }

    .card-body{
      background-color: #324A54;
      width: 100%;
      height: 75px;
      color: white;
      text-align: center;
      font-weight: lighter;
      font-style: normal;
      vertical-align: middle;
    }
    
    card-title {
      font-weight: lighter;
      font-style: normal;
      text-align: center;
      position: sticky;
      bottom: 15px;
      width: 175px;
      height: 22px;
      font-size: 11.5pt;
      line-height: 22px;
      color: #FFFFFF;
      margin: auto;
  }

    .my-container{
      width: 100% !important;
      margin-top: 10px;
      display: none;
    }

    .head{
      text-align: center;
      background-color: #ca676a;
      vertical-align: middle;
      height: 12rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    h2{
      font-size: 3.5rem !important;
      color: white;
    }

    .row {
      padding-left: 20px;
    }

    `;
    article.innerHTML = `
        <!--<h1>Home Page</h1>-->
        
        <!--ADD RECIPES HERE-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <!-- div for filling -->
        <!--<div class="filling"></div>-->
        <div class="head">
          <h2>EXPLORE RECIPES</h2>
        </div>
        <div class="container-fluid my-container mx-auto ">
          <div class=" w-100 row justify-content-center d-flex align-items-center my-row h-100 align-items-stretch">
            <div class="col my-col text-center align-items-center d-flex justify-content-center p-4 align-items-stretch">
              <div class="card my-card" style="width: 90%">
                <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4 align-items-stretch">
              <div class="card my-card" style= "width: 90%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4 align-items-stretch">
              <div class="card my-card" style="width: 90%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
          </div>
          <div class=" w-100 row justify-content-center d-flex align-items-center my-row h-100 align-items-stretch">
            <div class="col my-col text-center align-items-center d-flex justify-content-center p-4 align-items-stretch">
              <div class="card my-card" style="width: 90%;">
                <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4 align-items-stretch">
              <div class="card my-card" style="width: 90%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4 align-items-stretch">
              <div class="card my-card" style="width: 90%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
          </div>
          <div class=" w-100 row justify-content-center d-flex align-items-center my-row align-items-stretch">
            <div class="col my-col text-center align-items-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 90%;">
                <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4 align-items-stretch">
              <div class="card my-card" style="width: 90%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4 align-items-stretch">
              <div class="card my-card" style="width: 90%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
          </div>
      
      </div>
        `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    router.addPage('recipe', function () {
      document.getElementById('#section--home').classList.remove('shown');
      document.getElementById('#section--search-bar').classList.remove('shown');

      document.getElementById('#section--recipe').classList.add('shown');
    });

    // Add random recipes to the card elements

    searchRandomRecipes(this.shadowRoot);
  }
}

customElements.define('home-page', HomePage);

/**
 * Searches for random recipes to populate the home page
 * {Array} resultsObject Array of recipe cards to add data to
 */
function searchRandomRecipes(resultsObject) {
  const searchReq = `type=searchRandom`;

  /**
   * Add data to the recipe cards after data is retrieved
   * @param {Object} data Contains all the random recipes
   */
  function afterSearch(data) {
    createRecipeCards(data, resultsObject);
  }

  GET(searchReq, afterSearch);
}

/**
 * Adds data to the recipe cards
 * @param {Objects} results The random recipes retrieved from spoonacular
 * @param {Object} section The array of recipe cards to add data to
 */
function createRecipeCards(results, shadowRoot) {
  let section = shadowRoot.querySelectorAll('.card');
  // Go through every one of the result recipes
  Object.keys(results).forEach(function (key) {
    const data = results[key];
    // Add recipe title
    section[key].querySelector('h5').innerHTML = data.title;

    // Add recipe picture
    //image.classList.add('css-image');
    section[key].querySelector('img').setAttribute('src', data.image);
    section[key].querySelector('img').setAttribute('alt', 'No Image Available');

    // Add the corresponding expand recipe view to router
    addPage(data);

    // Open up recipe when you click on its card
    section[key].addEventListener('click', () => {
      let recipeView = document.getElementById('#section--recipe');
      while (recipeView.firstChild) {
        recipeView.removeChild(recipeView.firstChild);
      }
      router.navigate(`recipe_${data.id}`);
    });
  });
  console.log('display');
  shadowRoot.querySelector('.my-container').style.display = 'initial';
}

/**
 * Attaches an expanded recipe view to the card so that when you click on it
 * you can see the full recipe
 * @param {Object} data The data to give to the recipe card so that when it
 * opens up the expanded view has data to populate it
 */
function addPage(data) {
  router.addPage(`recipe_${data.id}`, function () {
    document.getElementById('#section--home').classList.remove('shown');
    document.getElementById('#section--search-bar').classList.remove('shown');
    document.getElementById('#section--grocery').classList.remove('shown');
    document.getElementById('#section--cooking-mode').classList.remove('shown');

    document.getElementById('#section--recipe').classList.add('shown');

    // Fetch and populate recipe page and add to recipe section
    const recipePage = document.createElement('recipe-page');
    //fetchRecipe(recipeId, recipePage);
    let outerData = { recipe: data };
    recipePage.data = outerData;
    recipePage.classList.add('shown');
    document.getElementById('#section--recipe').innerHTML = '';
    document.getElementById('#section--recipe').appendChild(recipePage);
  });
}
