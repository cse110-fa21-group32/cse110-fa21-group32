// Profile.js

// IMPORTS
import { router } from '../scripts/main.js';
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

    `;

    /* Added article */
    article.innerHTML = `
        <h2>User Profile</h2>

        <!--Profile Page Navbar-->
        <table class=profile-page-navbar style="background-color: #eecbcc" align="center" >
        <th scope="col" style="text-align: center"><img src="assets/icons/logo.png"></th>
        <th scope="col">
            <ul>
                <li><p id="showUsername"></p></li><br>
                <li><p id="showEmail"></p></li><br>
            </ul>
        </th>
        </table>
        <br>

        <!--Profile Page Recipe-->
        <div class="button-group">
          <button id="recipe-in-profile-button" style="width:50%; color: blue">Recipes</button>
          <button id="editProfile-in-profile-button" style="width:50%; color: grey">Edit Profile</button>
        </div>

        <div id="profile-page-recipeID" class="profile-page-recipe">
            <p>Recipe Gallery Should Be Displayed Here.</p>
            
            <br>
        </div>

        <div id="profile-page-editProfileID" class="profile-page-editProfile">
            <div id="edit-username">
                <label for='username'>Change Username: </label>
                <input type='textarea' id="username" value="NewUsername">
            </div>
            <div id="edit-email">
                <label for='email'>Change Email: </label>
                <input type='textarea' id="email" value="NewEmail">
            </div>
            <div id="change-password">
                <label for='password'>Change Password: </label>
                <input type='textarea' id="password" placeholder="NewPassword">
            </div>
            <div id="confirm-password-div">
                <label for='confirm-password'>Confirm Password: </label>
                <input type='textarea' id="confirm-password" placeholder="NewPassword">
            </div>
            <button id="add-changes"> Add Changes </button>
            <button id="delete-user"> Delete User </button>
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

    let shadowRoot = this.shadowRoot;
    setTimeout(function () {
      getRecipes(user, token, shadowRoot);
    }, 2000);

    let showUsername = this.shadowRoot.getElementById('showUsername');
    showUsername.innerHTML = 'Username: ' + user;
    let showEmail = this.shadowRoot.getElementById('showEmail');

    // Create Edit Username Label and text area
    let username = this.shadowRoot.getElementById('username');
    username.setAttribute('value', user);

    // Add current email to email textarea element
    let email = this.shadowRoot.getElementById('email');
    setTimeout(function () {
      showEmail.innerHTML = `User Email: ` + localStorage.getItem('userEmail');
      email.setAttribute('value', localStorage.getItem('userEmail'));
    }, 2000);

    let password = this.shadowRoot.getElementById('password');
    let confirmPassword = this.shadowRoot.getElementById('confirm-password');

    // Update user info when Update user button is clicked
    let addChangesBtn = this.shadowRoot.getElementById('add-changes');
    addChangesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let newInfo = {
        Username: username.value,
        Email: email.value,
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

  set recipes(recipes) {}
}

/**
 * Replaces the users details (Username, Email and Password) with the given information
 * @param {Object} newInfo The user information to replace the old information
 */
function setNewInfo(newInfo) {
  let newInfoPost = {
    type: 'updateUser',
    username: localStorage.getItem('username'), // TODO: Need to update with curr user
    token: localStorage.getItem('token'), // TODO: Need to update with curr password
    newInfo: newInfo,
  };

  /**
   * After the information is replaced in the database the local storage needs to be updated
   */
  function afterUpdate() {
    localStorage.setItem('username', newInfo['Username']);
    localStorage.setItem('userEmail', newInfo['Email']);
  }

  POST(newInfoPost, afterUpdate);
}

/**
 * Deletes the user from the database and logs the user out
 */
function deleteUser() {
  let deleteUserPost = {
    type: 'deleteUser',
    username: localStorage.getItem('username'), // TODO: Need to update with curr user
    token: localStorage.getItem('token'), // TODO: Need to update with curr password
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
    let userRecipes = [];
    for (let i = 0; i < data.recipes.length; i++) {
      // Create title element
      let recipe = data.recipes[i];
      const title = document.createElement('h3');
      title.innerText = recipe['title'];
      const image = document.createElement('img');
      image.setAttribute('src', recipe['image']);
      image.setAttribute('alt', 'No Image');
      shadowRoot.getElementById('profile-page-recipeID').appendChild(title);
      shadowRoot.getElementById('profile-page-recipeID').appendChild(image);

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
      title.addEventListener('click', () => {
        // let recipeView = document.getElementById('#profile-page-recipeID');
        // while (recipeView.firstChild) {
        //   recipeView.removeChild(recipeView.firstChild);
        // }
        router.navigate(`recipe_${recipe['id']}`);
      });
    }
    localStorage.setItem('userRecipes', userRecipes);
  }

  GET(searchReq, atFetch);
}

customElements.define('profile-page', ProfilePage);
