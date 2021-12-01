// HomePage.js

// IMPORTS
import { router } from '../scripts/main.js';
import { GET, POST } from '../scripts/request.js';

/**
 * Class: HomePage
 * TODO:
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
    `;
    article.innerHTML = `
        <!--<h1>Home Page</h1>-->
        <!--ADD RECIPES HERE-->
        <p id="#user-status"></p>
        <p id="#user-email"></p>
        <div class="recipe-grid">
        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/634559-556x370.jpg"/>
        </div>

        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/634629-556x370.jpg"/>
        </div>

        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/624889-556x370.jpg"/>
        </div>

        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/624779-556x370.jpg"/>
        </div>

        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/634229-556x370.jpg"/>
        </div>

        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/624449-556x370.jpg"/>
        </div>

        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/634769-556x370.jpg"/>
        </div>

        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/634779-556x370.jpg"/>
        </div>

        <div>
          <img class="recipe-picture" src="https://spoonacular.com/recipeImages/624569-556x370.jpg"/>
        </div>
        </div>
        <button id="#btn-delete" type="button">Delete User</button>
        <button id="#btn-recipe" type="button">See Added Recipes</button>
        <div id="#recipeDiv">
        </div>
        <ul>
            <li> <button id="ExpRecipe" type="menu">Recipe 1 (click this one)</button></li>
            <li> <button type="menu">Recipe 2 (not linked)</button></li>
            <li> <button type="menu">Recipe 3 (not linked)</button></li>
        </ul>
        `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    router.addPage('recipe', function () {
      document.getElementById('#section--home').classList.remove('shown');
      document.getElementById('#section--search-bar').classList.remove('shown');

      document.getElementById('#section--recipe').classList.add('shown');
    });

    const recipePage = this.shadowRoot.getElementById('ExpRecipe');
    recipePage.addEventListener('click', () => {
      router.navigate('recipe');
    });

    // Display current user info TODO: move to other Profile.js
    //const urlParams = new URLSearchParams(window.location.search); Old way of URL searching (bad for security)

    //Looks in LocalStorage to get username and token.
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const userStatus = this.shadowRoot.getElementById('#user-status');
    userStatus.innerHTML = `Currently logged in as ${user}`;

    const userEmail = this.shadowRoot.getElementById('#user-email');
    getEmail(user, token, userEmail);

    const deleteBtn = this.shadowRoot.getElementById('#btn-delete');
    deleteBtn.addEventListener('click', () => {
      console.log('DELETE');
      deleteUser(user, token);
    });
  }
}

customElements.define('home-page', HomePage);

/**
 * TODO:
 * @param {String} username
 * @param {String} token
 */
function getEmail(username, token, userEmail) {
  const emailReq = `type=request&elem=email&user=${encodeURIComponent(
    username
  )}&token=${encodeURIComponent(token)}`;

  /**
   * TODO:
   * @param {*} data
   */
  function getFn(data) {
    userEmail.innerHTML = `User email: ${data.userInfo[0]}`;
    //setFormMessage(loginForm, 'error', 'Invalid username or password!');
  }

  GET(emailReq, getFn);
}

/**
 * TODO:
 * @param {String} username
 * @param {String} token
 */
function deleteUser(username, token) {
  let msg = {
    type: 'deleteUser',
    username: username,
    token: token,
  };

  /**
   * TODO:
   */
  function afterDelete() {
    window.location.href = 'userLogin.html';
    //setFormMessage(loginForm, 'error', 'Invalid username or password!');
  }

  POST(msg, afterDelete);
}