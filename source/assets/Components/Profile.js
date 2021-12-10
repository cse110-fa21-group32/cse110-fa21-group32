// Profile.js

// IMPORTS
import { router, logout } from '../scripts/main.js';
import { GET, POST } from '../scripts/request.js';

// Page to change to when user is deleted
const loginPage = 'userLogin.html';

/**
 * Class: ProfilePage
 * Shows user information and shows recipes created by the user.
 * Also allows for updating user account information.
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

    .profile-page-navbar{
      width: 100%
    }

    th {
      width: 30%;
      height: 40pt;
      font-size: 16pt;
    }

    td {
      width: 30%;
      font-size: 16pt;
    }

    .button-group button {
      border: transparent;
      cursor: pointer;
      float: left;
      color: white;
      font-size: large;
      height: 40pt;
    }

    .button-group:after {
      content: "";
      clear: both;
      display: table;
    }

    .button-group button:not(:last-child) {
      border-right: none; /* Prevent double borders */
    }

    .profile-page-review {
      display: none;
    }

    .css-background {
      background-color: #324A54;
      width: 100%;
    }
    img {
      width:  100px;
      height: 100px;
      object-fit: contain;
    }

    .normal-button {
      background-color: #324A54;
      color: white;
      border: none;
      font-size: 14pt;
    }

    a {
      color: white;
      text-decoration: none;
      font-size: 14pt;
    }

    .profile-page-editProfile {
      margin: auto;
      padding: 10px 15px;
      border-radius: 10px;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
    }

    .styleBtn{
      cursor: pointer;
      margin: auto;
      background-color: white;
      border-radius: 16px !important;
      border: 1.5px solid #ca676a;
      text-align: center;
      min-width: 8% !important;
      height: 2.2em; !important;
      font-size: 16pt;
      color:#ca676a;
      width: auto;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
      margin: 0.3em;
      padding: 0.2em !important;
    }

    .styleBtn:hover {
      background-color: #ca676a;
      color: white;
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
    .css-wrap {
      margin-left: 5%;
      margin-bottom: 16pt;
      margin-right: 5%;
    }

    .userinfo {
      margin-top: 50px;
    }
    .card-body{
      background-color: #324A54;
      color: white;
      text-align: center;
      font-weight: lighter;
      font-style: normal;
    }

    .card-title{
      font-weight: lighter;
      font-style: normal;
    }

    .my-card{
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .my-container{
      width: 90% !important;
    }

    .text-center {
      text-align: center!important;
    }
    
    `;

    /* Added article */
    article.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

        <h2>User Profile</h2>

        <!--Profile Page Navbar-->
        <table class=profile-page-navbar style="background-color: #eecbcc" align="center" >
        <th scope="col" style="text-align: center"><img src="assets/icons/logo.png"></th>
        <th scope="col" style="text-align: left">
            <ul class="userinfo">
                <li><p id="showUsername"></p></li><br>
                <li><p id="showEmail"></p></li><br>
            </ul>
        </th>
        </table>
        <!--Profile Page Recipe-->
        <div class="button-group">
          <button id="recipe-in-profile-button" style="width:50%; background-color: #324A54">Recipes</button>
          <button id="editProfile-in-profile-button" style="width:50%; background-color: #CA676A">Edit Profile</button>
        </div>

        <br>
        <br>
        <div id="profile-page-recipeID" class="profile-page-recipe container-fluid my-container">
            <br>
        </div>

        <div id="profile-page-editProfileID" class="profile-page-editProfile">
        <br>
        <br>
        <table class="profile-page-editProfile>
            <tr id="edit-username">
                <th><label for='username'>Change Username: </label></th>
                <td><input type='textarea' id="username" value="NewUsername">
            </tr>
            <tr id="edit-email">
                <th><label for='email'>Change Email: </label></th>
                <td><input type='textarea' id="newemail" placeholder="NewEmail"></td>
            </tr>
            <tr id="change-password">
                <th><label for='password'>Change Password: </label></th>
                <td><input type='textarea' id="password" placeholder="NewPassword"></td>
            </tr>
            <tr id="confirm-password-div">
                <th><label for='confirm-password'>Confirm Password: </label></th>
                <td><input type='textarea' id="confirm-password" placeholder="NewPassword"></td>
            </tr>
            <tr>
                <th><button id="add-changes" class="styleBtn"> Add Changes </button></th>
                <td><button id="delete-user" class="styleBtn"> Delete User </button></td>
            </tr>
        </table>

        </div>
        `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    // Functions for the layout of profile page
    let recipesInProfileButton = this.shadowRoot.getElementById(
      'recipe-in-profile-button'
    );
    let recipesInProfile = this.shadowRoot.getElementById(
      'profile-page-recipeID'
    );
    let editProfileInProfileButton = this.shadowRoot.getElementById(
      'editProfile-in-profile-button'
    );
    let editProfileInProfile = this.shadowRoot.getElementById(
      'profile-page-editProfileID'
    );

    // Set default view when first loading page
    recipesInProfileButton.style.backgroundColor = '#324A54';
    editProfileInProfileButton.style.backgroundColor = '#CA676A';
    editProfileInProfile.style.display = 'none';
    recipesInProfile.style.display = 'contents';

    recipesInProfileButton.addEventListener('click', () => {
      recipesInProfileButton.style.backgroundColor = '#324A54';
      editProfileInProfileButton.style.backgroundColor = '#CA676A';
      editProfileInProfile.style.display = 'none';
      recipesInProfile.style.display = 'contents';
    });
    editProfileInProfileButton.addEventListener('click', () => {
      editProfileInProfileButton.style.backgroundColor = '#324A54';
      recipesInProfileButton.style.backgroundColor = '#CA676A';
      recipesInProfile.style.display = 'none';
      editProfileInProfile.style.display = 'contents';
    });

    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    
    setTimeout(function() {
      const email = localStorage.getItem('userEmail');
      showEmail.innerHTML = 'Email: ' + email;
      inputEmail.setAttribute('value', email);
    },1000);
    
    // Set timeout to allow for main page to load first
    let shadowRoot = this.shadowRoot;
    setTimeout(function () {
      getRecipes(user, token, shadowRoot);
    }, 2000);

    let showUsername = this.shadowRoot.getElementById('showUsername');
    showUsername.innerHTML = 'Username: ' + user;
    let showEmail = this.shadowRoot.getElementById('showEmail');
    let inputEmail = this.shadowRoot.getElementById('newemail');

    // Create Edit Username Label and text area
    let username = this.shadowRoot.getElementById('username');
    username.setAttribute('value', user);

    let password = this.shadowRoot.getElementById('password');
    let confirmPassword = this.shadowRoot.getElementById('confirm-password');

    // Update user info when Update user button is clicked
    let addChangesBtn = this.shadowRoot.getElementById('add-changes');
    addChangesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let newInfo = {
        Username: username.value,
        Email: inputEmail.value,
        Password: password.value,
      };
      if (
        password.value == confirmPassword.value &&
        password.value != '' &&
        username.value.length > 9
      ) {
        // Sets the users info to the given info
        setNewInfo(newInfo);
      } else if (password.value != confirmPassword.value) {
        // If passwords don't match then send error
        let nonmatchingPasswords = document.createElement('p');
        nonmatchingPasswords.innerHTML = 'Passwords do not match!';
        let divConfirmPassword = this.shadowRoot.getElementById(
          'confirm-password-div'
        );
        divConfirmPassword.appendChild(nonmatchingPasswords);
      } else if (username.value.length < 10) {
        // Send error if the user tries to change username to something less than 10 characters
        let divUsername = this.shadowRoot.getElementById('edit-username');
        let usernameError = document.createElement('p');
        usernameError.innerHTML = 'Username must be at least 10 characters';
        divUsername.appendChild(usernameError);
      } else if (password.value == '') {
        //If there is no given password value then do not update the password
        delete newInfo['Password'];
        setNewInfo(newInfo);
      }
    });

    //Deletes user when Delete user button is clicked
    this.shadowRoot
      .getElementById('delete-user')
      .addEventListener('click', function () {
        deleteUser();
      });
  }

  /**
   * Called from Add recipe and Update recipe to notify the profile
   * page that the user's recipes have been changed
   */
  set recipes(recipes) {
    // Clear the old recipes
    this.shadowRoot.getElementById('profile-page-recipeID').innerHTML = '';

    // Recreate the userRecipes
    let username = localStorage.getItem('username');
    let token = localStorage.getItem('token');
    getRecipes(username, token, this.shadowRoot);
  }
}

/**
 * Replaces the users details (Username, Email and Password) with the given information
 * @param {Object} newInfo The user information to replace the old information
 */
function setNewInfo(newInfo) {
  let newInfoPost = {
    type: 'updateUser',
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    newInfo: newInfo,
  };

  /**
   * After the information is replaced in the database the local storage needs to be updated
   */
  function afterUpdate() {
    let username = localStorage.getItem('username');
    let token = localStorage.getItem('token');
    logout(username, token);
  }

  POST(newInfoPost, afterUpdate);
}

/**
 * Deletes the user from the database and logs the user out
 */
function deleteUser() {
  let deleteUserPost = {
    type: 'deleteUser',
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
  };

  /**
   * Logs the user out and returns to log in page
   */
  function afterDelete() {
    localStorage.clear();
    window.location = loginPage;
  }

  POST(deleteUserPost, afterDelete);
}

/**
 * Retrieves the user's recipes from the backend and builds the page
 * @param {String} username the username of the user
 * @param {String} token the user's token received upon login
 * @param {HTMLElement} shadowRoot the shadow root of the Profile page
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
    let userRecipes = [];
    //data == results
    let divRow;
    let rowNum = 3;
    for (let i = 0; i < data.recipes.length; i++) {
      // If this is the start of a row, create a row
      if (i % rowNum == 0) {
        divRow = document.createElement('div');
        let divRowClasses = [
          'row',
          'justify-content-center',
          'd-flex',
          'align-items-center',
          'my-row',
          'p-0',
          'w-100',
        ];
        for (let i = 0; i < divRowClasses.length; i++) {
          divRow.classList.add(divRowClasses[i]);
        }
      }
      // Create title element
      let recipe = data.recipes[i];

      let divCol = document.createElement('div');
      let divCard = document.createElement('div');
      let cardImg = document.createElement('img');
      let cardBody = document.createElement('div');
      let cardTitle = document.createElement('h5');

      let divColClasses = [
        'col',
        'my-col',
        'text-center',
        'align-items-center',
        'd-flex',
        'justify-content-center',
        'p-4',
      ];
      for (let i = 0; i < divColClasses.length; i++) {
        divCol.classList.add(divColClasses[i]);
      }
      divCard.classList.add('my-card');
      cardBody.classList.add('card-body');
      cardImg.classList.add('card-img-top');
      cardImg.setAttribute('src', recipe['image']);
      cardImg.setAttribute('alt', `No Image for ${recipe['title']}`);
      cardTitle.innerText = recipe['title'];

      cardTitle.setAttribute('id', 'ExpRecipe');
      cardTitle.classList.add('align-items-center');
      cardTitle.classList.add('card-title');

      // Build the card
      cardBody.appendChild(cardTitle);
      divCard.appendChild(cardImg);
      divCard.appendChild(cardBody);
      divCol.append(divCard);
      divRow.append(divCol);

      // Add the row if it is the last element in the row or the last item
      // in the list
      if (i % rowNum == rowNum - 1 || i == data.recipes.length - 1) {
        shadowRoot.getElementById('profile-page-recipeID').appendChild(divRow);
      }

      userRecipes.push(recipe['id']);
      // Add page to router so navigate works
      router.addPage(`recipe_${recipe['id']}`, function () {
        document.getElementById('#section--profile').classList.remove('shown');

        document.getElementById('#section--recipe').classList.add('shown');

        // Fetch and populate recipe page and add to recipe section
        const recipePage = document.createElement('recipe-page');
        console.log(recipe);
        recipePage.data = { recipe: recipe };
        recipePage.classList.add('shown');
        document.getElementById('#section--recipe').innerHTML = '';
        document.getElementById('#section--recipe').appendChild(recipePage);
      });

      // Add click listener to title element -> navigates to recipe card page
      divCard.addEventListener('click', () => {
        router.navigate(`recipe_${recipe['id']}`);
      });
    }
    localStorage.setItem('userRecipes', userRecipes);
  }

  GET(searchReq, atFetch);
}

customElements.define('profile-page', ProfilePage);
