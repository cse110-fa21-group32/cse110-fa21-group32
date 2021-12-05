// HomePage.js

// IMPORTS
import { router } from '../scripts/main.js';
import { GET, POST } from '../scripts/request.js';

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

    .todayMeals{
      display: flex;
      justify-content: space-between;
    }

    .recentlyVisited{
      display: flex;
      justify-content: space-between;
    }

    .favorites{
      display: flex;
      justify-content: space-between;
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

        <h3>Today's Meals</h3>
        <div id=#todayMeals class="todayMeals">
            <div><button id="ExpRecipe" type="menu">Recipe 1 (click this one)</button></div>
            <div><button type="menu">Recipe 2 (not linked)</button></div>
            <div><button type="menu">Recipe 3 (not linked)</button></div>
        </div>

        <h3>Recently Visited</h3>
        <div id=#recentlyVisited class="recentlyVisited">
              <div><button id="ExpRecipe" type="menu">Recipe 1 (click this one)</button></div>
              <div><button type="menu">Recipe 2 (not linked)</button></div>
              <div><button type="menu">Recipe 3 (not linked)</button></div>
        </div>
        
        <h3>Favorites</h3>
        <div id=#favorites class="favorites">
              <div> <button id="ExpRecipe" type="menu">Recipe 1 (click this one)</button></div>
              <div> <button type="menu">Recipe 2 (not linked)</button></div>
              <div> <button type="menu">Recipe 3 (not linked)</button></div>
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

    const recipePage = this.shadowRoot.getElementById('ExpRecipe');
    recipePage.addEventListener('click', () => {
      router.navigate('recipe');
    });

    // Display current user info TODO: move to other Profile.js

    // Looks in LocalStorage to get username and token.
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
    //setFormMessage(loginForm, 'error', 'Invalid username or password!');
  }

  GET(emailReq, getFn);
}

/**
 * Deletes the user from the database
 * TODO: add a confirmation page
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
   * Redirects to the user login page after deleting user
   */
  function afterDelete() {
    window.location.href = 'userLogin.html';
    //setFormMessage(loginForm, 'error', 'Invalid username or password!');
  }

  POST(msg, afterDelete);
}
