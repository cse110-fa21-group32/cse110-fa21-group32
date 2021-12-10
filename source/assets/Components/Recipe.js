// Recipe.js
import { router } from '../scripts/main.js';

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
      margin-bottom: 0 !important;
      background-color: #ca676a;
      background-size: cover;
      padding: 23.5px;
      color: white;
      margin-top: 0;
      text-align: center;
      font-weight: lighter !important;
    }
    .openbtn {
      background: #324A54;
    }
    
    #recipe-summaryID > p{
      margin: auto;
      margin-top: 1%;
      width: 75%;
      font-size: 16pt;
    }

    .part1 {
      background-color: #CA676A;
      width: 100%;
      color: white;
      text-align: center;
    }
    
    a { text-decoration: none; }

    #recipe-ingredientsID > p{
      margin: auto;
      margin-top: 1%;
      width: 75%;
      font-size: 16pt;
    }

    #recipe-directionID > p{
      margin: auto;
      margin-top: 1%;
      width: 75%;
      font-size: 16pt;
    }

    #recipe-directionID > ol > li{
      margin: auto;
      margin-top: 1%;
      width: 60%;
      font-size: 18pt;
    }

    form {
      margin: 5%;
    }
    input[type=checkbox] {
      transform: scale(1.5);
      width: 2em;
      margin-bottom: 20px !important;
    }

    label {
      font-size: 18pt;
    }

    img{
      width: 100%;
      max-height: 400px;
      object-fit: cover;
    }

    .my-row{
      background: #324A54;
      color: white;
    }

    .my-col{
      height: 12.5rem;
    }

    .circle {
      background: white;
      border-radius: 50%;
      height: 6.5rem;
      width: 6.5rem;
      position: relative;
      margin-left:auto;
      margin-right:auto;
      display:block;
      text-align: center;
    }

    .circle > p{
      color: #609C8B;
      hyphens: auto;
      margin: 0.75em;
      text-align: center;
      font-size: 2rem;
    }

    .my-navbar{
      background: #324A54;
    }

    .navbar-light .navbar-nav .nav-link {
      color: white;
    }

    .regbutton {
      cursor: pointer;
      background-color: white;
      border-radius: 16px !important;
      border: 1.5px solid #ca676a;
      text-align: center;
      min-width: 8% !important;
      height: 2.2em; !important;
      font-size: 16pt;
      color:#ca676a;
      width: auto !important;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
      margin: 0.3em;
      padding: 0.2em !important;
    }

    div#recipe-ingredientsID {
      text-align: center;
    }

    .cook-button{
      font-size: 35pt !important;
      height: auto !important;
      weidth auto !important;
      border-radius: 162px !important;
    }
    .regbutton:hover {
      background-color: #ca676a;
      color: white;
    }

    .editButton, recipe-summmaryButton{
      display: inline-block; 
    }

    li{
      margin-bottom: 20px !important;   
    }

    .recipe-navbar button {
      border: transparent;
      cursor: pointer;
      float: left;
      color: white;
      font-size: large;
      height: 40pt;
    }

    .recipe-navbar:after {
      /*content: "";*/
      clear: both;
      display: table;
    }

    .recipe-navbar button:not(:last-child) {
      border-right: none; /* Prevent double borders */
    }

    .emp {
      clear: both;
      height: 100px;
    }

    .my-container{
      width: 100% !important;
    }
    .editButton{
      margin-left:120px;
    }

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
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!--<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">-->
    <!--<link rel="stylesheet" type="text/css" href="assets/styles/bootstrap-change.css">-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <div class="part1"> 
    <h2></h2>
    <div class="recipe-navbar" style="width: 100%">
      <button id="ToSum" style="width:33.3%; background-color: #324A54;">Summary
        <a href="#update-recipe-summaryID"></a>
      </button>
      <button id="ToIng" style="width:33.4%; background-color: #CA676A;">Ingredients
        <a href="#update-recipe-ingredientsID"></a>
      </button>
      <button id="ToDir" style="width:33.3%; background-color: #CA676A;">Directions
        <a href="#update-recipe-directionID"></a>
      </button>
    </div>
  </div>

    <!--Recipe Summary-->
    <div id="recipe-summaryID" class="recipe-summary" style="display: block">

      <!--recipe image-->
      <div id="recipe-imageID">
        <img src="https://media.istockphoto.com/photos/varied-food-carbohydrates-protein-vegetables-fruits-dairy-legumes-on-picture-id1218254547?b=1&k=20&m=1218254547&s=170667a&w=0&h=mOEC7x7qU5NC78mCULs-jAPeLkxy8opOvIbGSnwmAyw=" class="d-block w-100" alt="No Photo Loaded">
      </div>

      
      <!--general info-->
      <div class="container-fluid my-container">
        <div class="row justify-content-center d-flex align-items-center my-row">
        <!--cook time-->
          <div class="col my-col text-center align-items-center justify-content-center p-4">
            <div class="circle d-flex align-items-center my-circle justify-content-center" id="recipe-cooktimeID">
            
            </div>
            <br>
            Cook Time
          </div>
          <!--servings-->
          <div class="col my-col text-center align-items-center justify-content-center p-4">
            <div class="circle d-flex align-items-center my-circle justify-content-center" id="recipe-servingsID">
              
            </div>
            <br>
            Servings
          </div>
          <!--cost-->
          <div class="col my-col text-center align-items-center justify-content-center p-4">
            <div class="circle d-flex align-items-center my-circle justify-content-center">
              <p>X</p>
            </div>
            <br>
            Cost
          </div>
        </div>
      </div>
      <br>
      <!--description-->
      <div class="recipe-description" id="recipe-descriptionID">
        <!--<button type="button" class="recipe-summmaryButton regbutton">Add to My Favorites</button>-->
        <button type="button" class="editButton regbutton"id="editRecipe">Edit Recipe</button>
        <br>
        <br>
      </div>
    </div>
    
    <!--Recipe Ingredients-->
    
    <div id="recipe-ingredientsID" class="recipe-ingredients" style="display: none" text-align: center;">
      <br> 
      <div class="container my-container">
      </div>
      <form style="display: inline-block; text-align: left;"></form>
      <br>
      <br>
      <div class="row justify-content-center w-100">
        <button type="button" id="addToList" class="regbutton">Add to List</button>
      </div>
      <br>
      <br>
    </div>

    <!--Recipe Directions-->
    <div id="recipe-directionID" class="recipe-direction" style="display: none">
      <!-- empty div for spacing -->
      <div class="emp"></div>
      <div class="row justify-content-center w-100">
      <br>
        <button type ="button" id="LinkToCM" class="cook-button regbutton">COOK</button>
      </div>
      <br>
      <ol>
      </ol>
      <br>
    </div>
    `;

    var recipeID = data.recipe.id;
    const updateBtn = this.shadowRoot.getElementById('editRecipe');
    getRecipes(recipeID, updateBtn);

    //Edit button nav to UpdateRecipe.js
    //TODO: Have ONLY the USER recipe been send to update-recipe
    //----------------------------------------------------------------------------
    //Edit button will only appear if that's user's own recipe

    router.addPage('update-recipe', function () {
      document.getElementById('#section--recipe').classList.remove('shown');
      document.getElementById('#section--update-recipe').classList.add('shown');
      console.log(document.getElementById('#section--update-recipe'));
    });

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

    // Nav to cooking mode
    router.addPage('cooking-mode', function () {
      document.getElementById('#section--recipe').classList.remove('shown');

      document.getElementById('#section--cooking-mode').classList.add('shown');
    });

    const CMPage = this.shadowRoot.getElementById('LinkToCM');
    const footer = document.querySelector('.footer');
    const sideBtn = document.getElementById('openbtnID');
    CMPage.addEventListener('click', () => {
      footer.style.display = 'none';
      sideBtn.style.backgroundColor = 'transparent';
      sideBtn.style.color = 'transparent';
      const cookingPage = document.createElement('cooking-mode-page');
      cookingPage.classList.add('shown');
      document.getElementById('#section--cooking-mode').innerHTML = '';
      document
        .getElementById('#section--cooking-mode')
        .appendChild(cookingPage);
      cookingPage.data = this.json;
      router.navigate('cooking-mode');
    });
    footer.style.display = 'flex';
    sideBtn.style.color = 'white';
    sideBtn.style.backgroundColor = '#ca676a';

    // Set Title
    const title = getTitle(data);
    this.shadowRoot.querySelector('h2').innerHTML = title;

    // Set Summary
    const summary = document.createElement('p');
    summary.innerHTML = getSummary(data);
    this.shadowRoot
      .getElementById('recipe-imageID')
      .querySelector('img')
      .setAttribute('src', getImage(data));
    this.shadowRoot.getElementById('recipe-summaryID').appendChild(summary);

    // Set Servings
    const servings = document.createElement('p');
    servings.innerHTML = getServings(data);
    this.shadowRoot.getElementById('recipe-servingsID').appendChild(servings);

    // Set cooktime
    const cooktime = document.createElement('p');
    cooktime.innerHTML = timeConvert(getCookTime(data));
    this.shadowRoot.getElementById('recipe-cooktimeID').appendChild(cooktime);

    // Set Ingredients
    const form = this.shadowRoot.querySelector('form');
    if (
      !data.recipe.extendedIngredients ||
      data.recipe.extendedIngredients.length == 0
    ) {
      form.innerHTML = 'There are no ingredients';
    } else {
      for (let i = 0; i < data.recipe.extendedIngredients.length; i++) {
        const ingredient = data.recipe.extendedIngredients[i];
        const div = document.createElement('div');
        const currElement = document.createElement('input');
        currElement.setAttribute('type', 'checkbox');
        currElement.setAttribute('name', ingredient.name);
        currElement.setAttribute('value', ingredient.original);
        div.append(currElement);
        const content = document.createElement('label');
        content.setAttribute('for', 'ingredient');
        content.innerHTML = ingredient.original;
        div.append(content);
        form.append(div);
      }
    }

    //Set User Checked Ingredidents
    // localStorage.setItem("grocery", JSON.stringify([]));
    let current = localStorage.getItem('grocery');
    current = JSON.parse(current);

    if (current == null) {
      current = [];
    }

    for (let i = 0; i < current.length; i++) {
      if (recipeID == current[i].id) {
        const checkeding = this.shadowRoot.querySelectorAll(
          'input[type="checkbox"]'
        );
        const userchecked = current[i].ingredients;
        for (let s = 0; s < userchecked.length; s++) {
          for (let e = 0; e < checkeding.length; e++) {
            if (userchecked[s] == checkeding[e].value) {
              checkeding[e].checked = true;
            }
          }
        }
      }
    }

    // Set Directions
    const list = this.shadowRoot.querySelector('ol');
    if (
      !data.recipe.analyzedInstructions ||
      data.recipe.analyzedInstructions.length == 0
    ) {
      list.innerHTML = 'there are no directions';
    } else {
      for (
        let i = 0;
        i < data.recipe.analyzedInstructions[0].steps.length;
        i++
      ) {
        const step = data.recipe.analyzedInstructions[0].steps[i];
        const currStep = document.createElement('li');
        currStep.innerHTML = step.step;
        list.appendChild(currStep);
      }
    }

    // Functions for the layout of recipe detailed page
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

      this.shadowRoot.getElementById('ToSum').style.backgroundColor = '#324A54';
      this.shadowRoot.getElementById('ToDir').style.backgroundColor = '#CA676A';
      this.shadowRoot.getElementById('ToIng').style.backgroundColor = '#CA676A';
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
      this.shadowRoot.getElementById('ToSum').style.backgroundColor = '#CA676A';
      this.shadowRoot.getElementById('ToDir').style.backgroundColor = '#324A54';
      this.shadowRoot.getElementById('ToIng').style.backgroundColor = '#CA676A';
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
      this.shadowRoot.getElementById('ToSum').style.backgroundColor = '#CA676A';
      this.shadowRoot.getElementById('ToDir').style.backgroundColor = '#CA676A';
      this.shadowRoot.getElementById('ToIng').style.backgroundColor = '#324A54';
    });

    const checkedIng = this.shadowRoot.querySelectorAll(
      'input[type="checkbox"]'
    );
    //Add Ingredients to an Array "ingredientsSelect" List if they are been checked
    function getCheckedIngredient() {
      //Build array of ingredients that were checked by the user.
      let ingredientsSelect = [];
      for (let i = 0; i < checkedIng.length; i++) {
        if (checkedIng[i].checked == true) {
          ingredientsSelect.push(checkedIng[i].value);
        }
      }

      if (ingredientsSelect.length == 0) {
        return;
      }

      // Construct submessage containing information about the recipe.
      let listAll = {
        name: title, // Title of recipe.
        id: recipeID,
        ingredients: ingredientsSelect, // List of checked ingredients in the recipe.
        checked: new Array(ingredientsSelect.length).fill(false), // All unchecked in list
        recipe: data,
      };

      // Updates the last edited timestamp on grocery
      localStorage.setItem('groceryStamp', Date.now());
      // Push listAll to the localStorage
      var tempList = localStorage.getItem('grocery');
      tempList = JSON.parse(tempList);
      console.log(tempList);
      if (tempList == null || tempList.length == 0) {
        tempList = [];
        // if localStorage for "grocery" is empty, push "listAll" directly to the local storage
        tempList.push(listAll);
        localStorage.setItem('grocery', JSON.stringify(tempList));
        document.getElementById('#section--grocery').firstChild.update = '';
        return;
      }
      // If ingredients have been pushed (with the same recipe id) -> Update ingredients
      else {
        for (let i = 0; i < tempList.length; i++) {
          if (data.recipe.id == tempList[i].id) {
            tempList[i].ingredients = ingredientsSelect;
            localStorage.setItem('grocery', JSON.stringify(tempList));
            document.getElementById('#section--grocery').firstChild.update = '';
            return;
          }
        }
      }
      // If ingredients not been pushed -> push "listAll" to the local storage
      tempList.push(listAll);
      localStorage.setItem('grocery', JSON.stringify(tempList));

      document.getElementById('#section--grocery').firstChild.update = '';
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
  if (rhours == 0) {
    return rminutes + 'm';
  } else if (rminutes == 0) {
    return rhours + 'h';
  } else {
    return rhours + 'h ' + rminutes + 'm';
  }
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

/**
 * Call function for Edit to appear
 * @param {*} recipeID
 * @param {*} button
 */
function getRecipes(recipeID, button) {
  let userRecipes = localStorage.getItem('userRecipes');
  if (userRecipes !== null && userRecipes.indexOf(recipeID) >= 0) {
    button.parentElement.style.display = 'block';
  } else {
    button.parentElement.style.display = 'none';
  }
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
