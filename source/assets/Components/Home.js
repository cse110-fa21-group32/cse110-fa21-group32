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
    let cards = this.shadowRoot.querySelectorAll('.card');
    searchRandomRecipes(cards);

    // Looks in LocalStorage to get username and token.
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const userStatus = this.shadowRoot.getElementById('#user-status');
    userStatus.innerHTML = `Currently logged in as ${user}`;

    const userEmail = this.shadowRoot.getElementById('#user-email');
    getEmail(user, token, userEmail);
  }
}

customElements.define('home-page', HomePage);

/**
 * Fetch the email from the user and display it
 * @param {String} username
 * @param {String} token
 */
function getEmail(username, token, userEmail) {
  const emailReq = `type=request&elem=email&user=${encodeURIComponent(
    username
  )}&token=${encodeURIComponent(token)}`;

  /**
   * Populate the display element with the fetched email
   * @param {*} data
   */
  function getFn(data) {
    userEmail.innerHTML = `User email: ${data.userInfo[0]}`;
    localStorage.setItem('userEmail', data.userInfo[0]);
    //setFormMessage(loginForm, 'error', 'Invalid username or password!');
  }

  GET(emailReq, getFn);
}

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
