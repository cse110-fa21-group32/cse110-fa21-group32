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
          background-color: #CA676A;
          background-size: cover;
          padding: 23.5px;
          color: white;
        }
        `;
    article.innerHTML = `
          <h2>Update Recipe</h2>
          <div class="update-recipe-navbar">
            <!-- li><a onclick="navTo('homeID')" href="javascript:void(0)">home</a></li> -->
            <a href="#update-recipe-summaryID" id="ToUpdateSum">Summary</a>
            <a href="#update-recipe-ingredientsID" id="ToUpdateIng">Ingredients</a>
            <a href="#update-recipe-directionID" id="ToUpdateDir">Directions</a>
          </div>
  
          <form id="update-recipe">
          <!--Update Recipe Summary-->
          <div id="update-recipe-summary" style="display: show">
          <br>
  
          <!--Update Image-->
          <label for="img"><p><strong>Replace Image</strong></p></label>
          <input type="file" id="img" name="img" accept="image/*"/>
          <p><img id="recipeImage" width="200"/></p>
          <br>
          <br>
  
          <!--Update Basic Information-->
          <label>Cooking Time:</label>
          <input type="text" name="cookingTimeHour" id="#input--cook-time-hour" placeholder="hours..">
          <input type="text" name="cookintTimeMin" id="#input--cook-time-mins" placeholder="mins..">
          <br>
          <br>
  
          <label id="servings" for="servings"> No. of Servings: </label>
          <input type="text" name="numServings" id="#input--no-of-serv">
          <br>
  
        <!--Update Basic Information (Summary)-->
        <label for="sum"><p><strong>Add Summary: </strong></p></label>
        <textarea id="updateTitle" name="recipeTitle" placeholder="Title:"></textarea><br>
        <textarea id="updateSummary" name="recipeSummary" placeholder="Summary"></textarea>
        <br>
        </div>
      
        <!--Update Recipe Ingredients-->
        <div id="update-recipe-ingredients" style="display: none">
        <label for="ingredients"><p><strong>Add Ingredients</strong></p></label>
        <table id="ingredient-table">
          <tr>
            <th>Qty</th>
            <th>Unit</th>
            <th>Ingredient</th>
          </tr>
        </table>
        <!--When click add more should create another new 'tr' with three new inputs-->
        <button id="addIngredientButton"> Add More </button>
        <br>
        </div>
        <!--TO DO delete ingredients button-->
    
        <!--Update Recipe Directions-->
        <div id="update-recipe-direction" style="display: none">
          <p>Direction</p>
          <ol>
          </ol>
          <br>
          <!--When click add more should create another new textarea for direction-->
          <button id="addDirectionButton"> Add More </button>
        </div>
        <br>
        <input type="submit" id="publishBtn" value="Publish">
        </form>
        <!--TO DO delete Directions button-->
        
        <button><a href="javascript:void(0)" id="deleteRecipe"> Delete </a></button>
        <button type="button" id="leave-button"> LEAVE </button>
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
    var base64Image = '';

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
      quantityTextArea.setAttribute('name', 'quantity');
      quantityTextArea.setAttribute('value', ingredientsPrev[i]['amount']);
      quantity.appendChild(quantityTextArea);

      let unitTextArea = document.createElement('input');
      unitTextArea.setAttribute('type', 'text');
      unitTextArea.setAttribute('name', 'unit');
      unitTextArea.setAttribute('value', ingredientsPrev[i]['unit']);
      unit.appendChild(unitTextArea);

      let ingredientTextArea = document.createElement('input');
      ingredientTextArea.setAttribute('type', 'text');
      ingredientTextArea.setAttribute('name', 'ingredientName');
      ingredientTextArea.setAttribute('value', ingredientsPrev[i]['name']);
      ingredient.appendChild(ingredientTextArea);

      deleteButton.innerHTML =
        '<button onclick="event.preventDefault();this.parentNode.parentNode.parentNode.deleteRow(this.parentNode.parentNode.rowIndex)">Delete Row</button>';
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
        quantity.innerHTML = '<input type="text" name="quantity"/>';
        let unit = row.insertCell(1);
        unit.innerHTML = '<input type="text" name="unit"/>';
        let ingredient = row.insertCell(2);
        ingredient.innerHTML = '<input type="text" name="ingredientName"/>';
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
        }

        POST(data, afterDelete);
      });

    //console.log('Before publish button');
    this.shadowRoot
      .getElementById('publishBtn')
      .addEventListener('click', (e) => {
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
          document.getElementById('#section--recipe').classList.add('shown');
          // Fetch and populate recipe page and add to recipe section
          const recipePage = document.createElement('recipe-page');
          recipePage.data = data;
          recipePage.classList.add('shown');
          document.getElementById('#section--recipe').innerHTML = '';
          document.getElementById('#section--recipe').appendChild(recipePage);
        });
        router.navigate(`recipe_${recipe['id']}`);
      }

      //Sends data to database
      POST(newData, afterFetch());
    }
  }
}

customElements.define('update-recipe-page', UpdateRecipePage);

// EXPORTS
