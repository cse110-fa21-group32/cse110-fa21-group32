// Grocery.js

// IMPORTS
// import { router } from '../scripts/main.js';
// import { GET, POST } from '../scripts/request.js';

/**
 * Class: GroceryPage
 * TODO:
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
        h2{
            background-color: #CA676A;
            background-size: cover;
            padding: 23.5px;
            color: white;
          }
        `;
    article.innerHTML = `
    <h2>Grocery List</h2>
    <div id="grocery-list">
    <!--Add Recipe Ingredients-->
    <p> Grocery List </p>
    <form id="#my-input">
      <input type="text" placeholder="Add ingredient..."/>
      <button type="submit" id="add-icon">Add to the list</button>
    </form>
    <br>
    <form id="#my-list">
    <p>My List</p>
      <div>
        <input type="checkbox" name="ingredient-list">
        <label>item</label>
      </div>
      <div>
        <input type="checkbox" name="ingredient-list">
        <label>item</label>
      </div>
      <div>
        <input type="checkbox" name="ingredient-list">
        <label>item</label>
      </div>
    </form>
    <p>Some Recipe Ingredient List</p>
    <form id="#recipe-list">
      <div>
        <input type="checkbox" name="ingredient-list">
        <label>item</label>
      </div>
      <div>
        <input type="checkbox" name="ingredient-list">
        <label>item</label>
      </div>
      <div>
        <input type="checkbox" name="ingredient-list">
        <label>item</label>
      </div>
    </form>
    <br>
    <br>
    <br>
    </div>
    <button type="checked" id="checked">Checked &#10004;</button>
    <button type="delete" id="delete">Delete &#10006;</button>
        `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    const groceryList = this.shadowRoot.getElementById('grocery-list');
    
    // Add the input text to the list if user click "Add to the list"
    const addButton = this.shadowRoot.getElementById('add-icon');
    addButton.addEventListener('click', e =>{
      e.preventDefault();
      addNewIngredient();
    });

    const myIngredient = this.shadowRoot.getElementById('#my-input');
    const myForm = this.shadowRoot.getElementById('#my-list');

    function addNewIngredient(){
      const element = myIngredient.querySelector('input[type="text"]');
      const div = document.createElement('div');
      const currElement = document.createElement('input');
      currElement.setAttribute('type', 'checkbox');
      //Maybe have the checkbox invisible by default, and if user click delete button, checkbox will appear
      currElement.setAttribute('name', element.value);
      div.append(currElement);
      const content = document.createElement('label');
      content.innerHTML = element.value;
      div.append(content);
      myForm.append(div);
    }

    //Delete ingredients when user clicked Delete Button 
    const deleteButton = this.shadowRoot.getElementById('delete');
    deleteButton.addEventListener('click', e => {
      e.preventDefault();
      deleteIngredient();
    });

    function deleteIngredient(){
      const elements = groceryList.querySelectorAll('input[type="checkbox"]');
      for(let i = 0; i < elements.length; i++)
      {
        if(elements[i].checked == true){
          elements[i].parentElement.remove();
        }
      }
    }

    // //Delete Recipe
    // this.shadowRoot
    // .getElementById('deleteRecipe')
    // .addEventListener('click', () => {
    //   let recipe = {
    //     id: this.json['recipe']['id'],
    //   };
    //   let data = {
    //     type: 'deleteRecipe',
    //     username: 'Martin1234', // TODO: Need to update with curr user
    //     password: '1234', // TODO: Need to update with curr password
    //     recipe: recipe,
    //   };

    //   function afterDelete() {
    //     //Going Back to the Home Pgae
    //     router.navigate('home');
    //   }

    //   POST(data, afterDelete);
    // });

    //line through ingredients when user clicked Checked Button 
    const checkedButton = this.shadowRoot.getElementById('checked');
    checkedButton.addEventListener('click', e => {
      e.preventDefault();
      checkedIngredient();
    });

    function checkedIngredient(){
      const elements = groceryList.querySelectorAll('input[type="checkbox"]');
      for(let i = 0; i < elements.length; i++)
      {
        if(elements[i].checked == true){
          let complete = elements[i].parentElement.querySelector('label');
          let findS = elements[i].parentElement.getElementsByTagName('s');
          let s = document.createElement('s');
          if(findS.length == 0)
          {
            s.append(complete);
            elements[i].parentElement.append(s);
          }
          else{
            elements[i].parentElement.append(complete);
            elements[i].parentElement.querySelector('s').remove();
          }

        }
      }
    }

    //TODO:
    //1. Backend Save Data (under user ID)
    //2. Get the Data 
    //3. 

    /* ADDED */
     /* Dummy Test. Delete this after integration with backend. */
    // var name = "Ingredient name";
    // var amount = 3;
    // var unit = "mg";
    // this.shadowRoot.querySelector("button").addEventListener("click", e => {
    //     e.preventDefault();   
    //     let ingredientsList = this.shadowRoot.querySelector('table');
    //     ingredientsList.innerHTML += '<tr><td><input type="checkbox"></td><td>' + name + '</td><td>' + amount + unit + '</td></tr>'
    //     //ingredientsList.innerHTML += ingredient;
    // });

    /* Integration Test. Modify this. */
    // this.shadowRoot.getElementById("test").addEventListener("click", e => {
    //     e.preventDefault();   
    //     loadIngredientList();
    // });

    //function loadIngredientList() {
    /* NOT SURE About fetch() */
    // fetch('http://127.0.0.1:5000', {
    //     method: 'GET', // or 'PUT'
    //     headers: {
    //       'Content-Type': ,
    //     },
    //     //body: JSON.stringify(data),
    //     //body: imgList[0].files[0]
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       //   window.location.href = 'home.html';
    //         console.log('Success:', data);
    //         let fullIngredientListPos = this.shadowRoot.querySelector('table');
    //         let fullIngredientList = data.recipe.extendedIngredients;
    //         for(let i = 0; i < fullIngredientList.length; i++) {
    //             fullIngredientListPos.innerHTML += '<tr><td><input type="checkbox"></td><td>' + extendedIngredients[i].name + '</td><td>' + extendedIngredients[i].amount + extendedIngredients[i].unit + '</td></tr>';
    //         }
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    //}
  }
}

customElements.define('grocery-page', GroceryPage);
