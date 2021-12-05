// Profile.js

// IMPORTS
// import { router } from '../scripts/main.js';
import { GET, POST } from '../scripts/request.js';

// Page to change to when user is deleted
const loginPage = 'userLogin.html';
/**
 * Class: UpdateUserPage
 * TODO:
 */
class UpdateUserPage extends HTMLElement {
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

    #outer-table {
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

    `;

    /* Added article */
    article.innerHTML = `
        <h2>Update User Info</h2>

        <!--Update User Navbar-->
        <table id="outer-table" style="background-color: #eecbcc" align="center" >
        <th scope="col" style="text-align: center"><img src="assets/icons/logo.png"></th>
        <th scope="col">
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
        </th>
        </table>
        <br>
        `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);

    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    // Create Edit Username Label and text area
    let username = this.shadowRoot.getElementById('username');
    username.setAttribute('value', user);

    // Add current email to email textarea element
    let email = this.shadowRoot.getElementById('email');
    getEmail(user, token, email);

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
        console.log('setting new info');
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
      .addEventListener('click', function() {
        deleteUser();
      });
  }
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
 * Retrieves the users current email from the database
 * @param {String} username Users username from local storage to help retrieve the email
 * @param {String} token Users token from local storage to help retrieve the email
 */
function getEmail(username, token, userEmailElement) {
  const emailReq = `type=request&elem=email&user=${encodeURIComponent(
    username
  )}&token=${encodeURIComponent(token)}`;

  /**
   * Adds the users email to the text area element where the user can change the email
   * @param {Object} data Users email from the database
   */
  function getFn(data) {
    userEmailElement.setAttribute('value', data.userInfo[0]);
  }

  GET(emailReq, getFn);
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
  }

  POST(newInfoPost, afterUpdate);
}

customElements.define('update-user-page', UpdateUserPage);
