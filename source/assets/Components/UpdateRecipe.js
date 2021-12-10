// UpdateRecipe.js

// IMPORTS
import { router } from '../scripts/main.js';
import { POST } from '../scripts/request.js';

/**
 * Class: UpdateRecipePage
 * Whenever the user updates the recipe (option is found under the update
 * button on the recipe page), they are taken to this page. This page
 * populates the form values with the previous values and submitting will
 * update the recipe.
 */
class UpdateRecipePage extends HTMLElement {
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

      #update-recipe{
        text-align: center;
        margin: auto;
      }
      
      table {
        margin: auto;
        padding: 10px;
        height: 42pt
      }

      .part1 {
        background-color: #CA676A;
        width: 100%;
        color: white;
        text-align: center;
      }
      a { text-decoration: none; }
      
      #recipeImage{
        width: 100%;
        max-height: 400px;
        object-fit: cover;
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

      .update-recipe-navbar button {
        border: transparent;
        cursor: pointer;
        float: left;
        color: white;
        font-size: large;
        height: 40pt;
      }
      .update-recipe-navbar:after {
        clear: both;
        display: table;
      }
  
      .update-recipe-navbar button:not(:last-child) {
        border-right: none; /* Prevent double borders */
      }

      textarea {
        width: 80%;
        height: 42pt;
        background-color: #EEEEEE;
        font-size: 16pt;
      }
      table {
        margin: auto;
        padding: 10px;
        height: 42pt
      }
      .emp {
        clear: both;
        height: 50px;
      }

      .updateIng {
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
      ol {
        margin: auto;
        padding: 10px;
      }
      .css-x-circle {
        background-color: white;
        border: none;
        cursor: pointer;
      }
      .add-more-button {
        cursor: pointer;
        width: 20%;
        height: 22pt;
        background-color: white;
        border: 1.5px solid black;
      }
      li {
        display: list-item;
        list-style-position: inside;
      }
      
      
        `;
    article.innerHTML = `
      <div class="part1"> 
        <h2>Update Recipe</h2>
        <div class="update-recipe-navbar" style="width: 100%">
          <button id="ToUpdateSum" style="width:33.3%; background-color: #324A54;">Summary
            <a href="#update-recipe-summaryID"></a>
          </button>
          <button id="ToUpdateIng" style="width:33.4%; background-color: #CA676A;">Ingredients
            <a href="#update-recipe-ingredientsID"></a>
          </button>
          <button id="ToUpdateDir" style="width:33.3%; background-color: #CA676A;">Directions
            <a href="#update-recipe-directionID"></a>
          </button>
        </div>
      </div>


      <form id="update-recipe">
      <div id="update-recipe-summary" style="display: show">
        <div class="part2">
          <!--Add Image-->
          <label for="img"><p><strong>Change Image</strong></p></label>
          <input type="file" id="img" name="img" accept="image/*"/>
          <p><img id="recipeImage"/></p>
          <br>
          <br>

          <!--Update Basic Information-->
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
          <label for="sum"><p><strong>Update Summary: </strong></p></label>
          <textarea id="updateTitle" name="recipeTitle" placeholder="Title:" required></textarea><br>
          <textarea id="updateSummary" name="recipeSummary" placeholder="Summary" required></textarea>
          <br>
        </div>
      </div>
  
  
      <!--Update Recipe Ingredients-->
      <div class="part5" id="update-recipe-ingredients" style="display: none">
        <!-- empty div for spacing -->
        <div class="emp"></div>
        <table id="ingredient-table">
          <tr>
            <th>Qty</th>
            <th>Unit</th>
            <th>Ingredient</th>
          </tr>
        </table>
        <!--When click add more should create another new 'tr' with three new inputs-->
        <button class="add-more-button" id="addIngredientButton"> 
          <img src="assets/icons/plus-circle.svg"/> 
        </button>
        <br>
      </div>
     
     
      <!--Add Recipe Directions-->
      <div class="part6" id="update-recipe-direction" style="display: none">
        <!-- empty div for spacing -->
        <div class="emp"></div>
        <ol>
        </ol>
        <br>
        <!--When click add more should create another new textarea for direction-->
        <button class="add-more-button" id="addDirectionButton"> 
        <img src="assets/icons/plus-circle.svg"/>
         </button>
      </div>
      <br>


      <input class="part4-button" type="submit" value="Publish"/>
      <button class="part4-button" type="button" id="deleteRecipe"> Delete </button>
      <button class="part4-button" type="button" id="leave-button"> LEAVE </button>
      </form>
      <!--TO DO delete Directions button-->

      `;

    this.recipeId = 0;
    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    // Add leave button listener
    this.shadowRoot
      .getElementById('leave-button')
      .addEventListener('click', () => {
        router.navigate('home');
      });

    //Nav Bar for "Summary", "Ingredients", and "Directons"
    //----------------------------------------------------------------
    // Display Update Summary
    this.shadowRoot
      .getElementById('ToUpdateSum')
      .addEventListener('click', (e) => {
        e.preventDefault();
        this.shadowRoot
          .getElementById('update-recipe-summary')
          .setAttribute('style', 'display: show');
        this.shadowRoot
          .getElementById('update-recipe-ingredients')
          .setAttribute('style', 'display: none');
        this.shadowRoot
          .getElementById('update-recipe-direction')
          .setAttribute('style', 'display: none');
      });

    // Update Ingredients
    this.shadowRoot
      .getElementById('ToUpdateIng')
      .addEventListener('click', (e) => {
        e.preventDefault();
        this.shadowRoot
          .getElementById('update-recipe-summary')
          .setAttribute('style', 'display: none');
        this.shadowRoot
          .getElementById('update-recipe-ingredients')
          .setAttribute('style', 'display: show');
        this.shadowRoot
          .getElementById('update-recipe-direction')
          .setAttribute('style', 'display: none');
      });

    // Update Directions
    this.shadowRoot
      .getElementById('ToUpdateDir')
      .addEventListener('click', (e) => {
        e.preventDefault();
        this.shadowRoot
          .getElementById('update-recipe-summary')
          .setAttribute('style', 'display: none');
        this.shadowRoot
          .getElementById('update-recipe-ingredients')
          .setAttribute('style', 'display: none');
        this.shadowRoot
          .getElementById('update-recipe-direction')
          .setAttribute('style', 'display: show');
      });
    //------------------------------------------------------------
  }

  // Fill in form with current recipe data

  /**
   * Sets all the elements of the update recipe page to the recipes current data
   * @param data Previous recipe data to set the placeholder values
   */
  set data(data) {
    this.json = data;
    //Set Image
    let oldimage = data.recipe.image;
    this.shadowRoot.getElementById('recipeImage').setAttribute('src', oldimage);

    // Display/Change Image form the data
    var img = this.shadowRoot.getElementById('recipeImage');
    var imgFile = this.shadowRoot.querySelector('input[type="file"]');
    var base64Image = oldimage;

    imgFile.addEventListener('change', function () {
      imageDisplay(this);
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

    //Set Cooking Hour and Mins
    let cookTimeHourPrev = Math.floor(
      parseInt(data.recipe['readyInMinutes']) / 60
    );
    let cookTimeMinPrev = parseInt(data.recipe['readyInMinutes']) % 60;
    let cookTimeHour = this.shadowRoot.getElementById('#input--cook-time-hour');
    cookTimeHour.setAttribute('value', cookTimeHourPrev);
    let cookTimeMin = this.shadowRoot.getElementById('#input--cook-time-mins');
    cookTimeMin.setAttribute('value', cookTimeMinPrev);

    //Set No. of Servings
    this.shadowRoot
      .getElementById('#input--no-of-serv')
      .setAttribute('value', data.recipe['servings']);

    //Set the Title and Summery
    let updatedTitle = this.shadowRoot.getElementById('updateTitle');
    updatedTitle.innerHTML = data.recipe['title'];
    let updatedSummary = this.shadowRoot.getElementById('updateSummary');
    updatedSummary.innerHTML = data.recipe['summary'];

    //Set Ingredients
    let ingredientTable = this.shadowRoot.getElementById('ingredient-table');
    let ingredientsPrev = data.recipe['extendedIngredients'];

    for (let i = 0; i < ingredientsPrev.length; i++) {
      let row = ingredientTable.insertRow(i + 1);
      let quantity = row.insertCell(0);
      let unit = row.insertCell(1);
      let ingredient = row.insertCell(2);
      let deleteButton = row.insertCell(3);

      let quantityTextArea = document.createElement('input');
      quantityTextArea.setAttribute('type', 'text');
      quantityTextArea.setAttribute('class', 'updateIng');
      quantityTextArea.setAttribute('name', 'quantity');
      quantityTextArea.setAttribute('value', ingredientsPrev[i]['amount']);
      quantity.appendChild(quantityTextArea);

      let unitTextArea = document.createElement('input');
      unitTextArea.setAttribute('type', 'text');
      unitTextArea.setAttribute('class', 'updateIng');
      unitTextArea.setAttribute('name', 'unit');
      unitTextArea.setAttribute('value', ingredientsPrev[i]['unit']);
      unit.appendChild(unitTextArea);

      let ingredientTextArea = document.createElement('input');
      ingredientTextArea.setAttribute('type', 'text');
      ingredientTextArea.setAttribute('class', 'updateIng');
      ingredientTextArea.setAttribute('name', 'ingredientName');
      ingredientTextArea.setAttribute('value', ingredientsPrev[i]['name']);
      ingredient.appendChild(ingredientTextArea);

      deleteButton.innerHTML =
        '<button class="css-x-circle" onclick="event.preventDefault();this.parentNode.parentNode.parentNode.deleteRow(this.parentNode.parentNode.rowIndex)">Delete Row</button>';
    }

    //Set Directions
    let instructionsList = this.shadowRoot
      .getElementById('update-recipe-direction')
      .querySelector('ol');

    for (let i = 0; i < data.recipe.analyzedInstructions[0].steps.length; i++) {
      const step = data.recipe.analyzedInstructions[0].steps[i];

      let div = document.createElement('div');
      let stepName = document.createElement('li');
      stepName.innerHTML = 'Step:';

      let button = document.createElement('button');
      button.innerHTML = 'Delete';

      let stepTextArea = document.createElement('textarea');
      stepTextArea.setAttribute('name', 'directionStep');
      stepTextArea.innerHTML = step.step;

      div.appendChild(stepName);
      div.appendChild(stepTextArea);
      div.appendChild(button);

      instructionsList.appendChild(div);

      button.addEventListener('click', function () {
        this.parentNode.remove();
      });
    }

    //Add More ingredient to ingredients page (When Add More is clicked)
    this.shadowRoot
      .getElementById('addIngredientButton')
      .addEventListener('click', (e) => {
        e.preventDefault();
        let ingredientsList = this.shadowRoot
          .querySelector('#update-recipe-ingredients')
          .querySelector('table');
        let row = ingredientsList.insertRow(-1);
        let quantity = row.insertCell(0);
        quantity.innerHTML = '<input class="updateIng" type="text" name="quantity"/>';
        let unit = row.insertCell(1);
        unit.innerHTML = '<input class="updateIng" type="text" name="unit"/>';
        let ingredient = row.insertCell(2);
        ingredient.innerHTML = '<input class="updateIng" type="text" name="ingredientName"/>';
        let deleteButton = row.insertCell(3);
        deleteButton.innerHTML =
          '<button onclick="event.preventDefault();this.parentNode.parentNode.parentNode.deleteRow(this.parentNode.parentNode.rowIndex)">Delete Row</button>';
      });

    //When click "Add More" there should be a new input text area for user to input information
    this.shadowRoot
      .getElementById('addDirectionButton')
      .addEventListener('click', (e) => {
        e.preventDefault();
        let directionsList = this.shadowRoot
          .querySelector('#update-recipe-direction')
          .querySelector('ol');
        let div = document.createElement('div');
        let li = document.createElement('li');
        li.innerHTML = 'Step:';
        let button = document.createElement('button');
        button.innerHTML = 'Delete';
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

    //Delete Recipe
    this.shadowRoot
      .getElementById('deleteRecipe')
      .addEventListener('click', () => {
        let recipe = {
          id: this.json['recipe']['id'],
        };
        let data = {
          type: 'deleteRecipe',
          username: localStorage.getItem('username'), // TODO: Need to update with curr user
          token: localStorage.getItem('token'), // TODO: Need to update with curr password
          recipe: recipe,
        };

        function afterDelete() {
          //Going Back to the Home Pgae
          router.navigate('home');
          document.getElementById('#section--profile').firstChild.recipes = '';
        }

        POST(data, afterDelete);
      });

    //console.log('Before publish button');
    this.shadowRoot
      .getElementById('update-recipe')
      .addEventListener('submit', (e) => {
        e.preventDefault();
        updateData();
      });
    // Get elements of the form
    //const photo = this.shadowRoot.getElementById('img');
    const cookingTimeHour = this.shadowRoot.getElementById(
      '#input--cook-time-hour'
    );
    const cookingTimeMin = this.shadowRoot.getElementById(
      '#input--cook-time-mins'
    );

    const servings = this.shadowRoot.getElementById('#input--no-of-serv');
    const title = this.shadowRoot.getElementById('updateTitle');
    const summary = this.shadowRoot.getElementById('updateSummary');
    const ingredientList = this.shadowRoot.getElementById('ingredient-table');
    const directions = this.shadowRoot.getElementById(
      'update-recipe-direction'
    );

    /**
     * This function is called when the publish button is clicked and it sends the new inputted data to the database
     */
    function updateData() {
      // Select elements from ingredients page
      let quantity = ingredientList.querySelectorAll('input[name="quantity"]');
      let unit = ingredientList.querySelectorAll('input[name="unit"]');
      let ingredient = ingredientList.querySelectorAll(
        'input[name="ingredientName"]'
      );

      // Select all input from Direction Steps
      let directionsList = directions.querySelectorAll(
        'textarea[name="directionStep"]'
      );

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

      // Send Data
      let recipe = {
        image: base64Image,
        readyInMinutes: readyInMinutes,
        servings: servings.value,
        title: title.value,
        summary: summary.value,
        extendedIngredients: extendedIngredients,
        analyzedInstructions: instructions,
        author: localStorage.getItem('username'), // TODO: Need to update with curr user
        id: data.recipe['id'],
      };
      if (base64Image == '') {
        delete recipe.image;
      }
      //console.log(recipe);
      // in 'submit' event, call page.updateData = <>
      // Create the POST message to send to the backend
      let newData = {
        type: 'updateRecipe',
        username: localStorage.getItem('username'), // TODO: Need to update with curr user
        token: localStorage.getItem('token'), // TODO: Need to update with curr password
        recipe: recipe,
        title: recipe['title'],
      };

      //Moves back to home page once POST is called
      function afterFetch() {
        router.addPage(`recipe_${recipe['id']}`, function () {
          document
            .getElementById('#section--update-recipe')
            .classList.remove('shown');

          // Fetch and populate recipe page and add to recipe section
          const recipePage = document.createElement('recipe-page');
          document.getElementById('#section--recipe').innerHTML = '';

          recipePage.data = newData;
          document.getElementById('#section--recipe').appendChild(recipePage);
          document.getElementById('#section--recipe').classList.add('shown');

        });
        router.navigate(`recipe_${recipe['id']}`);

        // Tell the profile page to update with the updated recipe list
        document.getElementById('#section--profile').firstChild.recipes = '';
      }

      //Sends data to database
      POST(newData, afterFetch);
    }
  }
}

customElements.define('update-recipe-page', UpdateRecipePage);

// EXPORTS
