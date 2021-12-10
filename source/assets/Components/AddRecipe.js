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
    .openbtn {
      background: #324A54;
    }
    .part1 {
      background-color: #CA676A;
      width: 100%;
      color: white;
      text-align: center;
    }
    h2 {
      padding-top: 23.5px;
      padding-bottom: 10px;
    }
    .part2 { 
      border-top: 3px solid white;
      background-color: #324A54;
      color: white;
      padding-left: 5%;
      padding-right: 5%;
      padding-top: 5px;
      padding-bottom: 13px;}
    .part3 { 
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
       margin-left: 5%;
      background-color: white;
      border-radius: 18px;
      border: 1.5px solid #ca676a;
      text-align: center;
      width: 42%;
      height: 22pt;
      font-size: 14pt;
      color:#ca676a;
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
      content: "";
      clear: both;
      display: table;
    }

    .add-recipe-navbar button:not(:last-child) {
      border-right: none; /* Prevent double borders */
    }
    .normal-button {
      background-color: white;
      border-radius: 18px;
      border: 1.5px solid #ca676a;
      text-align: center;
      min-width: 8%;
      height: 22pt;
      font-size: 14pt;
      color:#ca676a;
    }
    textarea {
      width: 80%;
      height: 42pt;
      background-color: #EEEEEE;
    }
    .css-input {
      width: 10%;
    }
    .css-margin {
      margin-left: 5%;
    }
    a { text-decoration: none; }
    .add-more-button {
      width: 90%;
      height: 22pt;
      background-color: white;
      border: 1.5px solid black;
    }
    .css-x-circle {
      background-color: white;
      border: none;
      
    }
    table {
      padding: 10px;
    }
    .css-wrap {
      margin-left: 5%;
      margin-right: 5%;
    }
    }
        `;
    article.innerHTML = `
       
      <div class="part1"> <h2>Add Your Recipe</h2>
      <div class="add-recipe-navbar" style="width: 100%">
        <button id="ToAddSum" style="width:33.3%; background-color: #324A54;">Summary
          <a href="#add-recipe-summaryID"></a>
        </button>
        <button id="ToAddIng" style="width:33.3%; background-color: #CA676A;">Ingredients
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
        <p><img id="recipeImage" width="200"/></p>
        <br>
        <br>
        <!--<button id="addImage">Add Another Image</button>-->

        <!--Basic Information-->
        <label>Cooking Time:</label>
        <input class="css-input" type="text" name="cookingTimeHour" id="#input--cook-time-hour" placeholder="hours.." required>
        <input class="css-input" type="text" name="cookintTimeMin" id="#input--cook-time-mins" placeholder="mins.." required>
        <label class="css-margin" id="servings" for="servings"> No. of Servings: </label>
        <input class="css-input" type="text" name="numServings" id="#input--no-of-serv" required>
        <br>
        <br>
      </div>

        <label id="servings" for="servings"> No. of Servings: </label>
        <input type="text" name="numServings" id="#input--no-of-serv" required>
        <br>

      <label for="sum"><p><strong>Add Summary: </strong></p></label>
      <textarea id="addTitle" name="recipeTitle" placeholder="Title:" required></textarea><br>
      <textarea id="addSummary" name="recipeSummary" placeholder="Summary" required></textarea>
      <br>
      </div>
      </div>
    
      <!--Add Recipe Ingredients-->
      <div class="css-wrap" id="add-recipe-ingredients" style="display: none">
      <label for="ingredients"><p><strong>Add Ingredients</strong></p></label>
      <table id="ingredient-table">
        <tr>
          <th>Qty</th>
          <th>Unit</th>
          <th>Ingredient</th>
        </tr>
        <tr>
          <td><input type="text" name="quantity" required/></td>
          <td><input type="text" name="unit"/></td>
          <td><input type="text" name="ingredientName" required/></td>
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
      <div class="css-wrap" id="add-recipe-direction" style="display: none">
        <p>Direction</p>
        <ol>
          <li>Step:</li>
          <textarea name="directionStep" id="#input--direction-step" required></textarea>
        </ol>
        <br>
        <!--When click add more should create another new textarea for direction-->
        <button class="add-more-button" id="addDirectionButton"> 
        <img src="assets/icons/plus-circle.svg"/>
         </button>
      </div>
      <br>
      
      </form>
      <!--TO DO delete Directions button-->
      <br>
      <button type ="button" id="publish-button"> Publish </button>
      <button type="button" id="leave-button">LEAVE</button>
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
        quantity.innerHTML = '<input type="text" name="quantity"/>';
        let unit = row.insertCell(1);
        unit.innerHTML = '<input type="text" name="unit"/>';
        let ingredient = row.insertCell(2);
        ingredient.innerHTML = '<input type="text" name="ingredientName"/>';
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
        button.innerHTML =
          '<button class="css-x-circle"><img src="assets/icons/x-circle.svg"/></button>';
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
    const newRecipe = this.shadowRoot.getElementById('publish-button');
    newRecipe.addEventListener('click', (e) => {
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
        router.addPage('profile', function () {
          document.getElementById('#section--home').classList.remove('shown');
          document
            .getElementById('#section--search-bar')
            .classList.remove('shown');
          document
            .getElementById('#section--add-recipe')
            .classList.remove('shown');

          document.getElementById('#section--profile').classList.add('shown');
        });
        router.navigate('profile');
      }
      POST(data, afterAdd);
    }
  }
}

customElements.define('add-recipe-page', AddRecipePage);

// EXPORTS
