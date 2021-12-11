// Grocery.js

// IMPORTS
import { router } from '../scripts/main.js';
import { GET } from '../scripts/request.js';

/**
 * Class: GroceryPage
 * The page which shows the list of ingredients belonging to the
 * user. Allows for editing the list manually and adding from recipe view.
 */
class GroceryPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create styles and root element
    const styles = document.createElement('style');
    const article = document.createElement('article');

    // Fill in styles and root element
    styles.innerHTML = `
        * {
          font-family: "IBM Plex Sans", sans-serif;
          font-weight: normal;
          font-style: normal;
        }
        h2 {
          margin-bottom: 0 !important;
          background-color: #ca676a;
          background-size: cover;
          padding: 23.5px;
          color: white;
          margin-top: 0;
          text-align: center;
          font-weight: lighter !important;
          font-size: calc(1.325rem + .9vw);
        }
        h3 {
          font-weight: bold;
          font-size: 16pt;
          font-family: "IBM Plex Sans", sans-serif;
        }
        button {
          cursor: pointer;
          background-color: white;
          border-radius: 16px !important;
          border: 1.5px solid #ca676a;
          text-align: center;
          min-width: 8% !important;
          height: 2.2em; !important;
          font-size: 16pt;
          color:#ca676a;
          width: 4em !important;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
          margin: 0.3em;
          padding: 0.2em !important;
        }
        button:hover {
          background-color: #ca676a;
          color: white;
        }
        .css-wrap {
          margin-left: 35%;
        }

        input[type=text] {
          width: 60%;
          padding: 10px 15px;
          margin: 4px 0;
          border-radius: 10px;
          box-sizing: border-box;
          font-size: 16pt;
        }
        input[type=checkbox] {
          transform: scale(1.5);
          width: 2em;
        }

        label {
          font-size: 18pt;
        }

        #delete{
          margin-left: 1em;
        } 
        #grocery-list {
          margin: auto;
          margin-top: 1%;
          width: 60%;
          padding: 5% 5% 3% 5%;
        }

        .recipe-link {
          cursor: pointer;
        }
        .recipe-link:hover {
          color: gray;
        }



        `;
    article.innerHTML = ` 
        <h2>Grocery List</h2>
        <div id="grocery-list" class="center">
        <!--Add Recipe Ingredients-->
        <form id="#my-input">
          <input type="text" id="add-input" placeholder="Add ingredient..."/>
          <button type="submit" id="add-icon">Add</button>
        </form>
        <h3>My List</h3>
        <form id="#my-list">
        </form>
        <button type="delete" id="delete">Delete</button>
        </div>
        `;
    // // Show title
    // const title = document.querySelector('title').innerHTML;
    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    // Adds small timeout so to avoid simultaneous requests to backend
    // (recursive cursor error)
    setTimeout(() => {
      loadGroceryList();
    }, 200);
  }

  /**
   * Display checked Ingredients information from the localStorage
   */
  set update(data) {
    // Reset the contents of the grocery page
    this.id = this.shadowRoot.querySelector('article').innerHTML = `
          <h2>Grocery List</h2>
          <div id="grocery-list" class="center">
          <!--Add Recipe Ingredients-->
          <form id="#my-input">
            <input type="text" id="add-input" placeholder="Add ingredient..."/>
            <button type="submit" id="add-icon">Add</button>
            <button type="delete" id="delete">Delete</button>
          </form>
          <h3>My List</h3>
          <form id="#my-list">
          </form>
          `;

    const groceryList = this.shadowRoot.getElementById('grocery-list');
    const myIngredient = this.shadowRoot.getElementById('#my-input');
    const myForm = this.shadowRoot.getElementById('#my-list');

    // Get information from the Local Storage for the user's custom list
    let mytempList;
    if (localStorage.getItem('mylist') !== null) {
      mytempList = JSON.parse(localStorage.getItem('mylist'));
    } else {
      mytempList = [];
      let ingredient = [];
      let checked = [];
      let Mylist = {
        name: 'My List', // Title of recipe.
        id: null,
        ingredients: ingredient, // List of checked ingredients in the recipe.
        checked: checked,
      };
      mytempList.push(Mylist);
      localStorage.setItem('mylist', JSON.stringify(mytempList));
    }

    // Gets ingredient and check lists, if null initialize to empty list
    let myIngreds = mytempList['ingredients'];
    if (myIngreds == null) {
      myIngreds = [];
    }
    let myChecks = mytempList['checked'];
    if (myChecks == null) {
      myChecks = [];
    }

    displayIngredients(myIngreds, myChecks, groceryList, myForm, 'mylist');

    // Load list from localStorage "grocery"
    let currList;
    if (localStorage.getItem('grocery') !== null) {
      currList = JSON.parse(localStorage.getItem('grocery'));
    } else {
      currList = [];
    }

    // Displays each ingredient from other people's recipes
    for (let i = 0; i < currList.length; i++) {
      let form = document.createElement('form');
      form.setAttribute('class', 'recipe-list');

      // Populates recipe name as title of section
      let p = document.createElement('h3');
      p.setAttribute('class', 'recipe-link');
      p.innerHTML = currList[i]['name'];
      p.addEventListener('click', () => {
        // Add the recipe page if it doesn't exist
        if (router[`recipe_${currList[i]['id']}`] == null) {
          router.addPage(`recipe_${currList[i]['id']}`, function () {
            //Display recipe information from saved
            const recipePage = document.createElement('recipe-page');
            document
              .getElementById('#section--cooking-mode')
              .classList.remove('shown');
            document
              .getElementById('#section--grocery')
              .classList.remove('shown');
            recipePage.classList.add('shown');

            document.getElementById('#section--recipe').innerHTML = '';

            recipePage.data = currList[i].recipe;
            document.getElementById('#section--recipe').appendChild(recipePage);
            document.getElementById('#section--recipe').classList.add('shown');
          });
        }

        router.navigate(`recipe_${currList[i]['id']}`); // link to recipe page
      });
      form.append(p);

      // Populates ingredients and checked list
      const ingreds = currList[i]['ingredients'];
      const checks = currList[i]['checked'];

      displayIngredients(ingreds, checks, groceryList, form, 'grocery');
    }

    // Add the input text to the list if user click "Add to the list"
    const addButton = this.shadowRoot.getElementById('add-icon');
    addButton.addEventListener('click', (e) => {
      e.preventDefault();
      // Updates last-edited timestamp on grocery
      localStorage.setItem('groceryStamp', Date.now());
      addNewIngredient(myIngredient, myForm);
      saveIngredient(myForm); //update my saved ingredients saved in local storage
    });

    // Delete ingredients when user clicked Delete Button
    const deleteButton = this.shadowRoot.getElementById('delete');
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (
        window.confirm(
          'Do you want to delete all of your marked ingredients from your list?'
        )
      ) {
        // If confirmed, updates last-edited timestamp on grocery
        localStorage.setItem('groceryStamp', Date.now());
        deleteIngredient(groceryList, currList);
        saveIngredient(myForm); //update my saved ingredients saved in local storage
      }
    });
  }
}

customElements.define('grocery-page', GroceryPage);

/**
 * Generates the checklist and text for the grocery page for one recipe
 * section or the My List section
 * @param {Object} ingreds list of ingredients for the section
 * @param {Object} checks list of checks for the section
 * @param {HTMLElement} groceryList grocery list div
 * @param {HTMLElement} form append ingredients to this form
 * @param {String} localName name of item in local storage to update ('mylist' or 'grocery)
 */
function displayIngredients(ingreds, checks, groceryList, form, localName) {
  // Displays each ingredient in user's custom list
  for (let e = 0; e < ingreds.length; e++) {
    let div = document.createElement('div');
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    div.append(input);
    let label = document.createElement('label');

    // Updates the ingredient description and checked status
    label.innerHTML = ingreds[e];
    input.checked = checks[e];

    div.append(label);
    form.append(div);

    // Adds a click listener to each ingredient checkbox
    input.addEventListener('click', () => {
      let currList = JSON.parse(localStorage.getItem(localName));
      // Updates the last-edited timestamp on grocery
      localStorage.setItem('groceryStamp', Date.now());
      let recipeIdx = -1;

      // If updating grocery list
      if (localName === 'grocery') {
        for (let j = 0; j < currList.length; j++) {
          // If the name matches the input element's label then save index
          if (
            currList[j]['name'] ===
            input.parentElement.parentElement.querySelector('p').innerText
          ) {
            recipeIdx = j;
            break;
          }
        }
        // Should not happen but just as safety check
        if (recipeIdx < 0) {
          console.log('Ingredient checkbox not matching error');
          return;
        }
        // If input label is properly found
        else {
          // Look for the ingredient that was checked and update the corresponding
          // checked list element
          for (let i = 0; i < currList[recipeIdx]['ingredients'].length; i++) {
            if (currList[recipeIdx]['ingredients'][i] === label.innerHTML) {
              currList[recipeIdx]['checked'][i] =
                !currList[recipeIdx]['checked'][i];
              localStorage.setItem(localName, JSON.stringify(currList));
              break; // break since there is only one check for one listener
            }
          }
        }
      }
      // If updating My List
      else if (localName === 'mylist') {
        // Look through ingredients and update the corresponding checked
        // list element
        for (let i = 0; i < currList['ingredients'].length; i++) {
          if (currList['ingredients'][i] === label.innerHTML) {
            currList['checked'][i] = !currList['checked'][i];
            localStorage.setItem(localName, JSON.stringify(currList));
            break;
          }
        }
      }
    });
  }
  groceryList.append(form);
}

/**
 * Add a new ingredient to My List
 * @param {HTMLElement} myIngredient text input form for adding ingredient
 * @param {HTMLElement} myForm append ingredients to the My List form
 */
function addNewIngredient(myIngredient, myForm) {
  // Create the checkbox element and label
  let element = myIngredient.querySelector('input[type="text"]');
  let div = document.createElement('div');
  let currElement = document.createElement('input');
  currElement.setAttribute('type', 'checkbox');
  div.append(currElement);
  let content = document.createElement('label');
  content.innerHTML = element.value;

  // Add the elements to to the existing My List section
  div.append(content);
  myForm.append(div);

  element.value = ''; // Reset the value in the input box

  // Add an event listener with the new ingredient
  currElement.addEventListener('click', () => {
    // input.checked will show the status *after* the click
    let currList = JSON.parse(localStorage.getItem('mylist'));

    // Look for the index of the corresponding ingredient
    for (let i = 0; i < currList['ingredients'].length; i++) {
      if (currList['ingredients'][i] === content.innerHTML) {
        // Update the checked status on the page
        currList['checked'][i] = !currList['checked'][i];
        // Update the checked status in local storage
        localStorage.setItem('mylist', JSON.stringify(currList));
        break;
      }
    }
  });
}

/**
 * Once user add new ingredients, information will be added to local storage
 * for My List (the custom ingredient list)
 * @param {HTMLElement} myForm append ingredients to the My List form
 */
function saveIngredient(myForm) {
  let savedIng = [];
  let savedCheck = [];
  let elements = myForm.querySelectorAll('input[type="checkbox"]');
  // Creates the local storage data object by going through HTML elements
  for (let i = 0; i < elements.length; i++) {
    let complete = elements[i].parentElement.querySelector('label');
    savedIng.push(complete.innerText);
    savedCheck.push(elements[i].checked);
  }
  let Mylist = {
    name: 'My List', //Title of recipe.
    id: null,
    ingredients: savedIng, //List of checked ingredients in the recipe.
    checked: savedCheck,
  };

  // Update My List in local storage
  localStorage.setItem('mylist', JSON.stringify(Mylist));
}

/**
 * Deletes the selected ingredients from the recipe list section
 * @param {HTMLElement} groceryList grocery list div
 * @param {Object} currList the current local storage grocery list
 */
function deleteIngredient(groceryList, currList) {
  let elements = groceryList.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      let item = elements[i].parentElement.querySelector('label').innerHTML;

      // Delete ingredient information from "grocery" in localStorage
      for (let i = 0; i < currList.length; i++) {
        const ingreds = currList[i]['ingredients'];

        // Goes through each ingredient in the current grocery list recipe section
        for (let e = 0; e < ingreds.length; e++) {
          // If the ingredient matches, delete
          if (ingreds[e] === item) {
            currList[i]['ingredients'].splice(e, 1);
            currList[i]['checked'].splice(e, 1);
            localStorage.setItem('grocery', JSON.stringify(currList));
          }
          // Removes the recipe section if there are 0 ingredients
          if (ingreds.length == 0) {
            console.log(currList);
            console.log(i);
            currList.splice(i, 1);
            localStorage.setItem('grocery', JSON.stringify(currList));
          }
        }
      }

      // Delete ingredient information from display
      elements[i].parentElement.remove();
    }
  }

  // If all ingredients are deleted then delete the recipe title
  let form = groceryList.querySelectorAll('form[class="recipe-list"]');
  for (let i = 0; i < form.length; i++) {
    let checkempty = form[i].querySelectorAll('input[type="checkbox"]');
    if (checkempty.length == 0) {
      form[i].remove();
    }
  }
}

/**
 * Fetches and loads grocery list into local storage from the backend storage
 */
function loadGroceryList() {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const groceryReq = `type=getGrocery&user=${encodeURIComponent(
    username
  )}&token=${encodeURIComponent(token)}`;

  /**
   * Populate the display element with the fetched shopping
   * @param {JSON} data grocery list and timestamp from backend
   */
  function getFn(data) {
    let hasMyList = localStorage.getItem('mylist') !== null;
    let hasRecList = localStorage.getItem('grocery') !== null;
    let stamp = localStorage.getItem('groceryStamp');
    let hasStamp = stamp !== null;

    // Only executes if the message contains grocery data
    if (!data['isEmpty'] && data['grocery']['list'] !== undefined) {
      // Loads local storage grocery from backend if there is no current
      // local storage that is newer than the backend - prevents from overwriting
      // on a browser close or refresh
      if (
        data['grocery']['list'].length > 0 &&
        (!hasMyList || !hasStamp || data['timestamp'] > stamp)
      ) {
        localStorage.setItem(
          'mylist',
          JSON.stringify(data['grocery']['list'][0])
        );
      }
      // Loads local storage grocery from backend if there is no current
      // local storage that is newer than the backend - prevents from overwriting
      // on a browser close or refresh
      if (
        data['grocery']['list'].length > 1 &&
        (!hasRecList || !hasStamp || data['timestamp'] > stamp)
      ) {
        data['grocery']['list'].splice(0, 1);
        localStorage.setItem(
          'grocery',
          JSON.stringify(data['grocery']['list'])
        );
      }
    }
  }

  GET(groceryReq, getFn);
}
