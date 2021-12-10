// HomePage.js

// IMPORTS
import { router } from '../scripts/main.js';
import { GET /*, POST */} from '../scripts/request.js';

/**
 * Class: SearchResultsPage
 * Results of recipes from searching in search bar
 */
class SearchResultsPage extends HTMLElement {
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
    }
    .recipe-grid {
      margin-left: 5%;
      display: grid;
      grid-template-columns: auto auto auto;
      grid-column-gap: 3%;
      grid-row-gap: 3%;
      margin-right: 5%;
    }
    .recipe-picture {
      max-width: 100%;
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

    .card-body{
      background-color: #324A54;
      color: white;
      text-align: center;
      font-weight: lighter;
      font-style: normal;
    }

    .card-title{
      font-weight: lighter;
      font-style: normal;
    }

    .my-card{
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .my-container{
      width: 90% !important;
    }


    `;
    article.innerHTML = `
        <!--<h1>Home Page</h1>-->
        <!--ADD RECIPES HERE-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <div class="css-wrap">
        <p id="#user-status"></p>
        <p id="#user-email"></p>
        </div>

        <div class="container-fluid my-container">
          <div class="row justify-content-center d-flex align-items-center my-row ">
            <div class="col my-col text-center align-items-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
                <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5> 
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center d-flex align-items-center my-row ">
            <div class="col my-col text-center align-items-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
                <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center d-flex align-items-center my-row ">
            <div class="col my-col text-center align-items-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
                <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center d-flex align-items-center my-row ">
            <div class="col my-col text-center align-items-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
                <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
              <img class="card-img-top" src="" alt="">
                <div class="card-body">
                  <h5 id="ExpRecipe" class="card-title align-items-center"></h5>
                </div>
              </div>
            </div>
            <div class="col my-col text-center d-flex justify-content-center p-4">
              <div class="card my-card" style="width: 75%;">
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
      document.getElementById('#section--search-results').classList.remove('shown');
      document.getElementById('#section--search-bar').classList.remove('shown');

      document.getElementById('#section--recipe').classList.add('shown');
    });

    // Add random recipes to the card elements
    
  }
  
  /**
     * TODO:
     * @param {Objects} results
     */
  set results(results) {
    if (!results) return;

    this.data = results;

    let cards = this.shadowRoot.querySelectorAll('.card');

    createRecipeCards(results, cards);

    console.log(this.shadowRoot);
  }
}

customElements.define('search-results-page', SearchResultsPage);


/**
 * Adds data to the recipe cards 
 * @param {Objects} results The random recipes retrieved from spoonacular
 * @param {Object} section The array of recipe cards to add data to
 */
function createRecipeCards(results, section) {
  // Go through every one of the result recipes
  Object.keys(results).forEach(function (key) {
    const data = results[key];
    // Add recipe title
    section[key].querySelector('h5').innerHTML = data.title;

    // Add recipe picture
    //image.classList.add('css-image');
    section[key].querySelector('img').setAttribute('src', data.image);
    section[key].querySelector('img').setAttribute('alt', data.title);

    // Add the corresponding expand recipe view to router
    addPage(data.id);

    // Open up recipe when you click on its card
    section[key].addEventListener('click', () => {
      let recipeView = document.getElementById('#section--recipe');
      while (recipeView.firstChild) {
        recipeView.removeChild(recipeView.firstChild);
      }
      router.navigate(`recipe_${data.id}`);
    });
  });

  console.log(Object.keys(results).length);
  console.log(section.length);
  for (let i=Object.keys(results).length; i<section.length; i++) {
    section[i].style.display = "none";
  }
}

/**
 * Attaches an expanded recipe view to the card so that when you click on it
 * you can see the full recipe
 * @param {Object} data The data to give to the recipe card so that when it 
 * opens up the expanded view has data to populate it
 */
function addPage(recipeId) {
  router.addPage(`recipe_${recipeId}`, function () {
    document.getElementById('#section--home').classList.remove('shown');
    document.getElementById('#section--search-bar').classList.add('shown');
    document.getElementById('#section--grocery').classList.remove('shown');
    document.getElementById('#section--cooking-mode').classList.remove('shown');
    document.getElementById('#section--search-results').classList.remove('shown');

    document.getElementById('#section--recipe').classList.add('shown');

    // Fetch and populate recipe page and add to recipe section
    const recipePage = document.createElement('recipe-page');
    //fetchRecipe(recipeId, recipePage);
    fetchRecipe(recipeId, recipePage);
    recipePage.classList.add('shown');
    document.getElementById('#section--recipe').innerHTML = '';
    document.getElementById('#section--recipe').appendChild(recipePage);
  });
}

/**
 * Uses the recipe ID to get the full json details of the recipe. Once
 * the recipe is found, set the recipe information.
 * @param {String} recipeId
 * @param {SearchResultsPage} recipePage
 */
 function fetchRecipe(recipeId, recipePage) {
  const fetchReq = `type=fetchRecipe&id=${encodeURIComponent(recipeId)}`;

  /**
   * TODO:
   * @param {JSON} data
   */
  function afterFetch(data) {
    recipePage.data = data;
  }

  GET(fetchReq, afterFetch);
}

