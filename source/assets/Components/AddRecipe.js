// AddRecipe.js

// IMPORTS
// import { formatters } from 'stylelint';
import { router } from '../scripts/main.js';
import { POST } from '../scripts/request.js';

/**
 * Class: AddRecipePage
 * Whenever the user tries to add a recipe, they will be taken to this page
 * where there is a form (split into 3 sidepanel displays). Upon clicking the
 * publish button, the newly added recipe will be added to the database.
 */
class AddRecipePage extends HTMLElement {
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
    #new-recipe{
      text-align: center;
      margin: auto;
    }
    .part1 {
      background-color: #CA676A;
      width: 100%;
      color: white;
      text-align: center;
    }
    .part2 { 
      text-align: center;
      border-top: 3px solid white;
      background-color: #324A54;
      color: white;
      padding-left: 5%;
      padding-right: 5%;
      padding-top: 50px;
      padding-bottom: 13px;}
    .part3 { 
      text-align: center;
      margin: auto;
      padding-left: 5%;
      padding-right: 5%;
     }
     .part4 {
       padding-left: 5%;
     }
     .part4:after {
      content: " ";
      clear: both;
      display: table;
    }
    .part4-button { 
      cursor: pointer;
      background-color: white;
      border-radius: 16px !important;
      border: 1.5px solid #ca676a;
      text-align: center;
      min-width: 15% !important;
      height: 2.2em; !important;
      font-size: 16pt;
      color:#ca676a;
      width: auto !important;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
      margin: 0.3em;
      padding: 0.2em !important;
     }
    .part4-button:hover {
      background-color: #ca676a;
      color: white;
    }
     .add-recipe-navbar button {
      border: transparent;
      cursor: pointer;
      float: left;
      color: white;
      font-size: large;
      height: 40pt;
    }
    .add-recipe-navbar:after {
      clear: both;
      display: table;
    }

    .add-recipe-navbar button:not(:last-child) {
      border-right: none; /* Prevent double borders */
    }

    textarea {
      width: 80%;
      height: 42pt;
      background-color: #EEEEEE;
      font-size: 16pt;
    }

    .addIng {
      width: 90%;
      padding: 10px 15px;
      margin: 4px;
      box-sizing: border-box;
      font-size: 16pt;
    }
    
    .css-input {
      width: 20%;
      padding: 10px 15px;
      margin: 4px;
      box-sizing: border-box;
      font-size: 16pt;
    }
    .css-margin {
      
      margin: auto;
    }
    
    #recipeImage{
      width: 100%;
      max-height: 400px;
      object-fit: cover;
    }

    a { text-decoration: none; }

    .add-more-button {
      cursor: pointer;
      width: 20%;
      height: 22pt;
      background-color: white;
      border: 1.5px solid black;
    }
    .css-x-circle {
      background-color: white;
      border: none;
      cursor: pointer;
    }
    .emp {
      clear: both;
      height: 50px;
    }
    table {
      margin: auto;
      padding: 10px;
      height: 42pt
    }
    .part5 {
      text-align: center;
    }
    .part6 {
      text-align: center;
    }
    ol {
      margin: auto;
      padding: 10px;
    }
    li {
      display: list-item;
      list-style-position: inside;
    }
    .firstStepTA {
      position: relative;
      right: 18px;
    }
    
    
    }
        `;
    article.innerHTML = `
       
      <div class="part1"> 
        <h2>Add Your Recipe</h2>
        <div class="add-recipe-navbar" style="width: 100%">
          <button id="ToAddSum" style="width:33.3%; background-color: #324A54;">Summary
            <a href="#add-recipe-summaryID"></a>
          </button>
          <button id="ToAddIng" style="width:33.4%; background-color: #CA676A;">Ingredients
            <a href="#add-recipe-ingredientsID"></a>
          </button>
          <button id="ToAddDir" style="width:33.3%; background-color: #CA676A;">Directions
            <a href="#add-recipe-directionID"></a>
          </button>
        </div>
      </div>


      <form id="new-recipe">
      <div id="add-recipe-summary" style="display: show">
        <div class="part2">
          <!--Add Image-->
          <label for="img"><p><strong>Add Image</strong></p></label>
          <input type="file" id="imgfile" name="img" accept="image/*" required/>
          <p><img id="recipeImage"/></p>
          <br>
          <br>

          <!--Basic Information-->
          <label class="css-margin">Cooking Time:</label>
          <input class="css-input" type="text" name="cookingTimeHour" id="#input--cook-time-hour" placeholder="hours.." required>
          <input class="css-input" type="text" name="cookintTimeMin" id="#input--cook-time-mins" placeholder="mins.." required>
          <br>
          <label class="css-margin" id="servings" for="servings"> No. of Servings: </label>
          <input class="css-input" type="text" name="numServings" id="#input--no-of-serv" required>
          <br>
          <br>
        </div>

        <div class="part3">
          <label for="sum"><p><strong>Add Summary: </strong></p></label>
          <textarea id="addTitle" name="recipeTitle" placeholder="Title:" required></textarea><br>
          <textarea id="addSummary" name="recipeSummary" placeholder="Summary" required></textarea>
          <br>
        </div>
      </div>
    
      <!--Add Recipe Ingredients-->
      <div class="part5" id="add-recipe-ingredients" style="display: none">
        <!-- empty div for spacing -->
        <div class="emp"></div>
        <table id="ingredient-table">
          <tr>
            <th>Qty</th>
            <th>Unit</th>
            <th>Ingredient</th>
          </tr>
          <tr>
            <td><input class="addIng" type="text" name="quantity" required/></td>
            <td><input class="addIng" type="text" name="unit"/></td>
            <td><input class="addIng" type="text" name="ingredientName" required/></td>
          </tr>
        </table>
        <!--When click add more should create another new 'tr' with three new inputs-->
        <button class="add-more-button" id="addIngredientButton"> 
          <img src="assets/icons/plus-circle.svg"/> 
        </button>
        <br>
      </div>
      <!--TO DO delete ingredients button-->
  
      <!--Add Recipe Directions-->
      <div class="part6" id="add-recipe-direction" style="display: none">
        <!-- empty div for spacing -->
        <div class="emp"></div>
        <ol>
          <li class="firstStepli">Step:</li>
          <textarea class="firstStepTA" name="directionStep" id="#input--direction-step" required></textarea>
        </ol>
        <br>
        <!--When click add more should create another new textarea for direction-->
        <button class="add-more-button" id="addDirectionButton"> 
        <img src="assets/icons/plus-circle.svg"/>
         </button>
      </div>
      <br>
      
      <input class="part4-button" id="submitBtn" type="submit" value="Publish"/>
      <button class="part4-button" id="leaveButton">
      <a href="home.html"  style="color:#CA676A"> Leave </a>
      </button>
      <br>

      <br>
      </form>
      <!--TO DO delete Directions button-->

      `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    // Functions for the layout of recipe detailed page
    var goToSummaryButton = this.shadowRoot.getElementById('ToAddSum');
    var goToIngredientsButton = this.shadowRoot.getElementById('ToAddIng');
    var goToDirectionsButton = this.shadowRoot.getElementById('ToAddDir');
    goToSummaryButton.addEventListener('click', () => {
      goToSummaryButton.style.backgroundColor = '#324A54';
      goToIngredientsButton.style.backgroundColor = '#CA676A';
      goToDirectionsButton.style.backgroundColor = '#CA676A';
    });
    goToIngredientsButton.addEventListener('click', () => {
      goToSummaryButton.style.backgroundColor = '#CA676A';
      goToIngredientsButton.style.backgroundColor = '#324A54';
      goToDirectionsButton.style.backgroundColor = '#CA676A';
    });
    goToDirectionsButton.addEventListener('click', () => {
      goToSummaryButton.style.backgroundColor = '#CA676A';
      goToIngredientsButton.style.backgroundColor = '#CA676A';
      goToDirectionsButton.style.backgroundColor = '#324A54';
    });

    // Add Summary
    this.shadowRoot
      .getElementById('ToAddSum')
      .addEventListener('click', (e) => {
        e.preventDefault();
        this.shadowRoot
          .getElementById('add-recipe-summary')
          .setAttribute('style', 'display: show');
        this.shadowRoot
          .getElementById('add-recipe-ingredients')
          .setAttribute('style', 'display: none');
        this.shadowRoot
          .getElementById('add-recipe-direction')
          .setAttribute('style', 'display: none');
      });

    // Add Ingredients
    this.shadowRoot
      .getElementById('ToAddIng')
      .addEventListener('click', (e) => {
        e.preventDefault();
        this.shadowRoot
          .getElementById('add-recipe-summary')
          .setAttribute('style', 'display: none');
        this.shadowRoot
          .getElementById('add-recipe-ingredients')
          .setAttribute('style', 'display: show');
        this.shadowRoot
          .getElementById('add-recipe-direction')
          .setAttribute('style', 'display: none');
      });

    // Add Directions
    this.shadowRoot
      .getElementById('ToAddDir')
      .addEventListener('click', (e) => {
        e.preventDefault();
        this.shadowRoot
          .getElementById('add-recipe-summary')
          .setAttribute('style', 'display: none');
        this.shadowRoot
          .getElementById('add-recipe-ingredients')
          .setAttribute('style', 'display: none');
        this.shadowRoot
          .getElementById('add-recipe-direction')
          .setAttribute('style', 'display: show');
      });

    // Add ingredient to ingredients page
    this.shadowRoot
      .getElementById('addIngredientButton')
      .addEventListener('click', (e) => {
        e.preventDefault();
        let ingredientsList = this.shadowRoot
          .querySelector('#add-recipe-ingredients')
          .querySelector('table');
        let row = ingredientsList.insertRow(-1);
        let quantity = row.insertCell(0);
        quantity.innerHTML =
          '<input class="addIng" type="text" name="quantity"/>';
        let unit = row.insertCell(1);
        unit.innerHTML = '<input class="addIng" type="text" name="unit"/>';
        let ingredient = row.insertCell(2);
        ingredient.innerHTML =
          '<input class="addIng" type="text" name="ingredientName"/>';
        let deleteButton = row.insertCell(3);
        deleteButton.innerHTML =
          '<button class="css-x-circle" onclick="event.preventDefault();this.parentNode.parentNode.parentNode.deleteRow(this.parentNode.parentNode.rowIndex)"><img src="assets/icons/x-circle.svg"/></button>';
      });

    // When click "Add More" there should be a new input text area for user to input directions
    this.shadowRoot
      .getElementById('addDirectionButton')
      .addEventListener('click', (e) => {
        e.preventDefault();
        let directionsList = this.shadowRoot
          .querySelector('#add-recipe-direction')
          .querySelector('ol');
        let div = document.createElement('div');
        let li = document.createElement('li');
        li.innerHTML = 'Step:';
        let button = document.createElement('button');
        button.setAttribute('class', 'css-x-circle');
        button.innerHTML = '<img src="assets/icons/x-circle.svg"/>';
        let input = document.createElement('textarea');
        input.setAttribute('name', 'directionStep');

        div.appendChild(li);
        div.appendChild(input);
        div.appendChild(button);

        directionsList.appendChild(div);

        button.addEventListener('click', function () {
          this.parentNode.remove();
        });
      });

    // Add images/Display Image when the file is been addes
    var img = this.shadowRoot.getElementById('recipeImage');
    var imgFile = this.shadowRoot.querySelector('input[type="file"]');
    var base64Image = '';

    imgFile.addEventListener('change', function () {
      imageDisplay(this);
      //console.log(imgFile.files[0]);
    });

    function imageDisplay(input) {
      var reader;
      if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
          img.setAttribute('src', e.target.result);
          base64Image = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

    // this.shadowRoot
    //   .getElementById('addImage')
    //   .addEventListener('click', (e) => {
    //     e.preventDefault();
    //     let imagesList = this.shadowRoot.querySelector('#chooseFiles');
    //     let li = document.createElement('li');
    //     li.innerHTML =
    //       '<input type="file" id="img" name="img" accept="image/*"/>';
    //     imagesList.appendChild(li);
    //   });

    // TODO: listener when a user save a draft of the form
    // newRecipe.addEventListener("submit", handleFormSubmit)

    // Event handler for a form submit event
    this.shadowRoot
      .getElementById('new-recipe').addEventListener('submit', (e) => {
      e.preventDefault();
      postCreateRecipeData();
    });

    // Get elements of the form

    // const photo = this.shadowRoot.getElementById('img'); TODO: photo issue needs to be resolved
    const cookingTimeHour = this.shadowRoot.getElementById(
      '#input--cook-time-hour'
    );
    const cookingTimeMin = this.shadowRoot.getElementById(
      '#input--cook-time-mins'
    );

    const servings = this.shadowRoot.getElementById('#input--no-of-serv');
    const title = this.shadowRoot.getElementById('addTitle');
    const summary = this.shadowRoot.getElementById('addSummary');
    const ingredientList = this.shadowRoot.getElementById('ingredient-table');
    const directions = this.shadowRoot.getElementById('add-recipe-direction');

    /**
     * Upon submitting the form, form input is processed and sent to
     * the backend.
     * Resource for images: https://www.geeksforgeeks.org/how-to-convert-image-into-base64-string-using-javascript/
     */
    function postCreateRecipeData() {
      // Select all ingredients
      let quantity = ingredientList.querySelectorAll('input[name="quantity"]');
      let unit = ingredientList.querySelectorAll('input[name="unit"]');
      let ingredient = ingredientList.querySelectorAll(
        'input[name="ingredientName"]'
      );

      // Select all input from Direction Steps
      let directionsList = directions.querySelectorAll(
        'textarea[name="directionStep"]'
      );

      // Select all input from file image
      //console.log(base64Image);

      // For loop for upload all ingredient information
      let extendedIngredients = [];
      for (let i = 0; i < ingredient.length; i++) {
        if (ingredient[i].value.length !== 0) {
          let ing = {};
          ing['name'] = ingredient[i].value;
          ing['amount'] = quantity[i].value;
          ing['unit'] = unit[i].value;
          ing['original'] =
            quantity[i].value + ' ' + unit[i].value + ' ' + ingredient[i].value;
          extendedIngredients.push(ing);
        }
      }

      // For loop for upload all direction steps
      let instructions = [];
      let outerSteps = {};
      let steps = [];
      for (let i = 0; i < directionsList.length; i++) {
        if (directionsList[i].value.length !== 0) {
          let outerStep = {};
          let step = directionsList[i].value;
          outerStep['number'] = i + 1;
          outerStep['step'] = step;
          steps.push(outerStep);
        }
      }
      outerSteps['steps'] = steps;
      instructions.push(outerSteps);

      const readyInMinutes =
        60 * parseInt(cookingTimeHour.value) + parseInt(cookingTimeMin.value);

      // Create recipe JSON to send to the backend
      let recipe = {
        image: base64Image,
        readyInMinutes: readyInMinutes,
        servings: servings.value,
        title: title.value,
        summary: summary.value,
        extendedIngredients: extendedIngredients,
        analyzedInstructions: instructions,
        author: localStorage.getItem('username'), // TODO: Need to update with curr user
      };

      // Create the POST message to send to the backend
      let data = {
        type: 'addRecipe',
        username: localStorage.getItem('username'), // TODO: Need to update with curr user
        token: localStorage.getItem('token'), // TODO: Need to update with curr password
        recipe: recipe,
        title: title.value,
      };

      //POST request to send recipe data

      function afterAdd() {
        router.addPage(`recipe_${recipe['id']}`, function () {
          document
            .getElementById('#section--add-recipe')
            .classList.remove('shown');

          // Fetch and populate recipe page and add to recipe section
          const recipePage = document.createElement('recipe-page');
          document.getElementById('#section--recipe').innerHTML = '';

          recipePage.data = data;
          document.getElementById('#section--recipe').appendChild(recipePage);
          document.getElementById('#section--recipe').classList.add('shown');
        });
        router.navigate(`recipe_${recipe['id']}`);

        // Tell the profile page to update with the updated recipe list
        setTimeout(()=> document.getElementById('#section--profile').firstChild.recipes = '', 100);
        
      }
      POST(data, afterAdd);
    }
  }
}

customElements.define('add-recipe-page', AddRecipePage);

// EXPORTS
