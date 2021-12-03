// Recipe.js
import { router } from '../scripts/main.js';
import { POST } from '../scripts/request.js';
/**
 * Class: RecipePage
 * Shows detailed information of the recipe broken
 * down into summary, ingredients, and direction tabs.
 */
class RecipePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create styles and root element
    const styles = document.createElement('style');
    const article = document.createElement('article');

    // Fill in styles and root element
    styles.innerHTML = `
    h2{
      background-color: #324A54;
      background-size: cover;
      padding: 23.5px;
      color: white;
    }
    .openbtn {
      background-color: #324A54 !important;
    }
    .recipe-navbar{
      display: flex;
      justify-content: space-around;
      background-color: #324A54;
      padding: 20px;
      color: white !important;
    }

    .recipe-navbar > a{
      color:white;
      text-decoration: none;
    }

    img{
      width: 100%;
      max-height: 350px;
      object-fit: cover;
    }

    .genInfo{
      display: flex;
      justify-content: space-around;
      background-color: #324A54;
      padding: 40px;
      color: white !important;
      font-family: IBM Plex Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 9px;
    }
    .insertInfo{
      display: flex;
      justify-content: space-around;
    }

    `;

    article.innerHTML = `

        <h2>Recipes</h2>
        <div class="recipe-navbar">
        <a href="#recipe-summaryID" id="ToSum">Summary</a>
        <a href="#recipe-ingredientsID" id="ToIng">Ingredients</a>
        <a href="#recipe-directionID" id="ToDir">Directions</a>
        </div>

        <!--Recipe Summary-->
        <div id="recipe-summaryID" class="recipe-summary" style="display: block">
        <!--<p>Summary</p>-->
          <!--placeholder for recipe image-->
          <div class="placeholder">
            <img src="https://media.istockphoto.com/photos/varied-food-carbohydrates-protein-vegetables-fruits-dairy-legumes-on-picture-id1218254547?b=1&k=20&m=1218254547&s=170667a&w=0&h=mOEC7x7qU5NC78mCULs-jAPeLkxy8opOvIbGSnwmAyw=" img>
          </div>

          <!--general info-->
          <div class="genInfo">
            <p>Cook Time</p>
            <p>Servings</p>
            <p>Cost</p>
          </div>

          <p>Content...</p>
          <button type="button" class="recipe-summmaryButton">Add to My Favorites</button>

        </div>

        <!--Recipe Ingredients-->
        <div id="recipe-ingredientsID" class="recipe-ingredients" style="display: none">
        <p>Ingredients</p>
        <!--Add To List Button--> 
        <form></form>
        <br>
        <button type="button" id="addToList">Add to List</button>
        </div>

        <!--Recipe Directions-->
        <div id="recipe-directionID" class="recipe-direction" style="display: none">
        <p>Direction</p>
        <ul>
        </ul>
        <button type ="button" id="LinkToCM"> Cook </button>
        </div>

    `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);
  }

  /**
   * Populate the recipe information sections with data
   * @param {JSON} data Recipe data retrieved from backend (db or Spoonacular)
   */
  set data(data) {
    console.log(data);
    this.json = data;
    this.id = this.shadowRoot.querySelector('article').innerHTML = `

      <h2>Recipes</h2>
      <div class="recipe-navbar">
      <a href="#recipe-summaryID" id="ToSum">Summary</a>
      <a href="#recipe-ingredientsID" id="ToIng">Ingredients</a>
      <a href="#recipe-directionID" id="ToDir">Directions</a>
      </div>

      <br>
      <!--User recipes ONLY-->
      <div class="editRecipes">
      <button type="button" id="editRecipe"> Edit </button>
      </div>
      <br>

      <!--Recipe Summary-->
      <div id="recipe-summaryID" class="recipe-summary" style="display: block">
      <button type="button" class="recipe-summmaryButton">Add to My Favorites</button>
      <div id="recipe-servingsID" class="recipe-servings">Servings: </div>
      <div id="recipe-cooktimeID" class="recipe-cooktime">Cooktime: </div>
      Summary:
      
      </div>

      <!--Recipe Ingredients-->
      <div id="recipe-ingredientsID" class="recipe-ingredients" style="display: none">
        <p>Ingredients</p>
        <!--Add To List Button--> 
        <form>
        </form>
        <br>
        <button type="button" id="addToList">Add to List</button>
      </div>

      <!--Recipe Directions-->
      <div id="recipe-directionID" class="recipe-direction" style="display: none">
      <p>Direction</p>
      <ol>
      </ol>
      <button type ="button" id="LinkToCM"> Cook </button>
      </div>

    `;
    //Edit button nav to UpdateRecipe.js
    //TODO: Have ONLY the USER recipe been send to update-recipe
    //----------------------------------------------------------------------------
    router.addPage('update-recipe', function () {
      document.getElementById('#section--recipe').classList.remove('shown');
      document.getElementById('#section--update-recipe').classList.add('shown');
      console.log(document.getElementById('#section--update-recipe'));
    });

    const updateBtn = this.shadowRoot.getElementById('editRecipe');
    updateBtn.addEventListener('click', () => {
      const recipeUpdatePage = document.createElement('update-recipe-page');

      recipeUpdatePage.classList.add('shown');
      document.getElementById('#section--update-recipe').innerHTML = '';
      document
        .getElementById('#section--update-recipe')
        .appendChild(recipeUpdatePage);
      recipeUpdatePage.data = this.json;
      router.navigate('update-recipe');
    });

    router.addPage('cooking-mode', function () {
      document.getElementById('#section--recipe').classList.remove('shown');

      document.getElementById('#section--cooking-mode').classList.add('shown');
    });

    const CMPage = this.shadowRoot.getElementById('LinkToCM');
    CMPage.addEventListener('click', () => {
      const cookingPage = document.createElement('cooking-mode-page');
      cookingPage.classList.add('shown');
      document.getElementById('#section--cooking-mode').innerHTML = '';
      document
        .getElementById('#section--cooking-mode')
        .appendChild(cookingPage);
      cookingPage.data = this.json;
      router.navigate('cooking-mode');
    });

    // Set Title
    const title = getTitle(data).toUpperCase();
    this.shadowRoot.querySelector('h2').innerHTML = title;

    // Set Summary
    // var image = new Image();
    // image.src = 
    // document.body.appendChild(image);
    const summary = document.createElement('p');
    const image = document.createElement('img');
    summary.innerHTML = getSummary(data);
    image.setAttribute('width', "400");
    image.setAttribute('src', getImage(data));
    this.shadowRoot.getElementById('recipe-summaryID').appendChild(image);
    this.shadowRoot.getElementById('recipe-summaryID').appendChild(summary);

    //Set Servings
    const servings = document.createElement('p');
    servings.innerHTML = getServings(data);
    this.shadowRoot.getElementById('recipe-servingsID').appendChild(servings);

    // Set cooktime
    const cooktime = document.createElement('p');
    cooktime.innerHTML = timeConvert(getCookTime(data));
    this.shadowRoot.getElementById('recipe-cooktimeID').appendChild(cooktime);

    //Set Ingredients
    const form = this.shadowRoot.querySelector('form');
    for (let i = 0; i < data.recipe.extendedIngredients.length; i++) {
      const ingredient = data.recipe.extendedIngredients[i];
      const div = document.createElement('div');
      const currElement = document.createElement('input');
      currElement.setAttribute('type', 'checkbox');
      currElement.setAttribute('name', ingredient.name);
      currElement.setAttribute('value', ingredient.original);
      div.append(currElement);
      const content = document.createElement('label');
      content.setAttribute('for', ingredient.name);
      content.innerHTML = ingredient.original;
      div.append(content);
      form.append(div);
    }

    // Set Directions
    const list = this.shadowRoot.querySelector('ol');
    for (let i = 0; i < data.recipe.analyzedInstructions[0].steps.length; i++) {
      const step = data.recipe.analyzedInstructions[0].steps[i];
      const currStep = document.createElement('li');
      currStep.innerHTML = step.step;
      list.appendChild(currStep);
    }

    this.shadowRoot.getElementById('ToSum').addEventListener('click', (e) => {
      e.preventDefault();
      this.shadowRoot
        .getElementById('recipe-summaryID')
        .setAttribute('style', 'display: show');
      this.shadowRoot
        .getElementById('recipe-ingredientsID')
        .setAttribute('style', 'display: none');
      this.shadowRoot
        .getElementById('recipe-directionID')
        .setAttribute('style', 'display: none');
    });

    this.shadowRoot.getElementById('ToDir').addEventListener('click', (e) => {
      e.preventDefault();
      this.shadowRoot
        .getElementById('recipe-summaryID')
        .setAttribute('style', 'display: none');
      this.shadowRoot
        .getElementById('recipe-ingredientsID')
        .setAttribute('style', 'display: none');
      this.shadowRoot
        .getElementById('recipe-directionID')
        .setAttribute('style', 'display: show');
    });

    this.shadowRoot.getElementById('ToIng').addEventListener('click', (e) => {
      e.preventDefault();
      this.shadowRoot
        .getElementById('recipe-summaryID')
        .setAttribute('style', 'display: none');
      this.shadowRoot
        .getElementById('recipe-ingredientsID')
        .setAttribute('style', 'display: show');
      this.shadowRoot
        .getElementById('recipe-directionID')
        .setAttribute('style', 'display: none');
    });

    const checkedIng = this.shadowRoot.querySelectorAll(
      'input[type="checkbox"]'
    );
    //Add Ingredients to an Array "ingredientsSelect" List if they are been checked
    function getCheckedIngredient() {
      //console.log(checkedIng);
      let listAll = [];
      let ingredientsSelect = [];
      for (let i = 0; i < checkedIng.length; i++) {
        //console.log(checkedIng[i].value);
        if (checkedIng[i].checked == true) {
          //console.log(checkedIng[i].value);
          ingredientsSelect.push(checkedIng[i].value);
          //TODO: Nasty Array with Recipe Name, Token, ID, and Checked ingredients
          listAll['name'] = title;
          listAll['token']=window.localStorage.getItem('token');// newly added 
          listAll['id'] = data.recipe.id;
          listAll['ingredients'] = ingredientsSelect;
        }
      }
      console.log(ingredientsSelect);
      console.log(listAll);
      POST(listAll,doNothing());    
      return listAll;
    }
    function doNothing()
    {

    }
    //"Add to list" button -> send the data to Grocery list
    const checklist = this.shadowRoot.getElementById('addToList');
    checklist.addEventListener('click', (e) => {
      e.preventDefault();
      getCheckedIngredient();
    });
  }

  /**
   * Returns the object of the currect recipe being used.
   */
  get data() {
    return this.json;
  }
}

// SUMMARY ELEMENTS
/**
 * Returns number of minutes for cooking the recipe
 * @param {JSON} data
 * @returns Number of minutes it takes to cook this recipe
 */
function getCookTime(data) {
  return data.recipe['readyInMinutes'];
}

// TIME CONVERT
/**
 * Converts time units into a string format (hrs and min equivalent)
 * @param {int} n
 * @returns Number of minutes, hours, and minutes it takes to cook this recipe
 */
function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return (
    num + ' minutes = ' + rhours + ' hour(s) and ' + rminutes + ' minute(s).'
  );
}

/**
 * Returns the number of servings
 * @param {JSON} data
 * @returns Number of servings this recipe creates
 */
function getServings(data) {
  return data.recipe['servings'];
}

/**
 * Returns the image (Base 64 format)
 * @param {JSON} data
 * @returns Base 64 format of image or url link to image depending on if it comes from spoonacular or our database
 */
function getImage(data) {
  return data.recipe.image;
}

/**
 * Returns the title of the recipe
 * @param {JSON} data
 * @returns Title of recipe
 */
function getTitle(data) {
  return data.recipe.title;
}

/**
 * Returns the summary of the recipe
 * @param {JSON} data
 * @returns Summary paragraph of the recipe
 */
function getSummary(data) {
  return data.recipe.summary;
}

// TODO: remove if remains unused
// // INGREDIENTS ELEMENTS
// /**
//  *
//  * @param {JSON} data
//  * @returns Array of objects where each object contains an ingredient summary,
//  * the ingredient summary object looks like, {name:"", unit:"", amount:""}
//  */
// function getIngreds(data) {
//   return data['extendedIngredients'];
// }

// // DIRECTIONS ELEMENTS
// /**
//  *
//  * @param {JSON} data
//  * @returns An ordered list <ol> with each step in its own list element <li>
//  */
// function getDirs(data) {
//   return data['instructions'];
// }

customElements.define('recipe-page', RecipePage);
