// Profile.js

// IMPORTS
import { router } from '../scripts/main.js';
import { GET /*, POST*/ } from '../scripts/request.js';

/**
 * Class: ProfilePage
 * TODO:
 */
class ProfilePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create styles and root element
    const styles = document.createElement('style');
    const article = document.createElement('article');

    // Added styles
    styles.innerHTML = `
    h2{
        background-color: #CA676A;
        background-size: cover;
        padding: 23.5px;
        color: white;
      }

    table {
      table-layout: fixed;
      width: 80%;
      text-align: left;
    }

    img {
      border-radius: 50%;
      width:  100px;
      height: 100px;
      object-fit: contain;
    }

    th {
        height: 200px;
    }

    .button-group button {
      background-color: transparent;
      border: transparent;
        cursor: pointer;
      float: left;
    }

    .button-group:after {
      content: "";
      clear: both;
      display: table;
    }

    .button-group button:not(:last-child) {
      border-right: none; /* Prevent double borders */
    }

    .button-group button:hover {
      color: blue;
    }

    .profile-page-review {
      display: none;
    }
    `;

    /* Added article */
    article.innerHTML = `
        <h2>User Profile</h2>

        <!--Profile Page Navbar-->
        <table class=profile-page-navbar style="background-color: #eecbcc" align="center" >
        <th scope="col" style="text-align: center"><img src="assets/icons/logo.png"></th>
        <th scope="col">
            <ul>
                <li><a href="#profile-page-recipeID" id="UserRec">Recipes</a></li><br>
                <li><a href="#profile-page-reviewsID" id="UserRev">Reviews</a></li><br>
                <li><button id="#delete-user" type="button">Delete User</button></li>
            </ul>
        </th>
        </table>
        <br>

        <!--Profile Page Recipe-->
        <div class="button-group">
          <button id="recipe-in-profile-button" style="width:50%; color: blue">Recipes</button>
          <button id="review-in-profile-button" style="width:50%; color: grey">Reviews</button>
        </div>
        <div id="profile-page-recipeID" class="profile-page-recipe">
            <p>Recipe Gallery Should Be Displayed Here.</p>
            
            <br>
        </div>

        <!--Profile Page Reviews-->
        <div id="profile-page-reviewID" class="profile-page-review">
            <p>NOT AVAILABLE</p>
            <button>REMOVE ME 2</button>
            <br>
        </div>
        `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    // Functions for the layout of profile page
    var recipesInProfileButton = this.shadowRoot.getElementById(
      'recipe-in-profile-button'
    );
    var recipesInProfile = this.shadowRoot.getElementById(
      'profile-page-recipeID'
    );
    var reviewsInProfileButton = this.shadowRoot.getElementById(
      'review-in-profile-button'
    );
    var reviewsInProfile = this.shadowRoot.getElementById(
      'profile-page-reviewID'
    );
    recipesInProfileButton.addEventListener('click', () => {
      recipesInProfileButton.style.color = 'blue';
      reviewsInProfileButton.style.color = 'grey';
      reviewsInProfile.style.display = 'none';
      recipesInProfile.style.display = 'contents';
    });
    reviewsInProfileButton.addEventListener('click', () => {
      reviewsInProfileButton.style.color = 'blue';
      recipesInProfileButton.style.color = 'grey';
      recipesInProfile.style.display = 'none';
      reviewsInProfile.style.display = 'contents';
    });

    const btn = this.shadowRoot.getElementById('#delete-user');
    btn.addEventListener('click', () => {
      console.log('Clicked');
    });

    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    getRecipes(user, token, this.shadowRoot);

  }

  set recipes(recipes) {}

  set reviews(reviews) {}
}

/**
 *
 * @param {*} username
 * @param {*} token
 * @param {*} shadowRoot
 */
function getRecipes(username, token, shadowRoot) {
  const searchReq = `type=getCustomizedRecipeIDs&user=${encodeURIComponent(
    username
  )}&token=${encodeURIComponent(token)}`;

  /**
   *
   * @param {*} data
   */
  function atFetch(data) {
    for (let i = 0; i < data.ID.length; i++) {
      fetchRecipe(data.ID[i], shadowRoot);
    }

    function fetchRecipe(recipeId, shadowRoot) {
      const fetchReq = `type=fetchRecipe&id=${encodeURIComponent(recipeId)}`;

      /**
       * TODO:
       * @param {JSON} data
       */
      function afterFetch(data) {
        // Create title element
        const title = document.createElement('h3');
        title.innerText = data.recipe.title;
        shadowRoot.getElementById('profile-page-recipeID').appendChild(title);

        // Add page to router so navigate works
        router.addPage(`recipe_${recipeId}`, function () {
          document
            .getElementById('#section--profile')
            .classList.remove('shown');

          document.getElementById('#section--recipe').classList.add('shown');

          // Fetch and populate recipe page and add to recipe section
          const recipePage = document.createElement('recipe-page');
          recipePage.data = data;
          recipePage.classList.add('shown');
          document.getElementById('#section--recipe').innerHTML = '';
          document.getElementById('#section--recipe').appendChild(recipePage);
        });

        // Add click listener to title element -> navigates to recipe card page
        title.addEventListener('click', () => {
          // let recipeView = document.getElementById('#profile-page-recipeID');
          // while (recipeView.firstChild) {
          //   recipeView.removeChild(recipeView.firstChild);
          // }
          router.navigate(`recipe_${recipeId}`);
        });
      }

      GET(fetchReq, afterFetch);
    }
  }

  GET(searchReq, atFetch);
}

customElements.define('profile-page', ProfilePage);
