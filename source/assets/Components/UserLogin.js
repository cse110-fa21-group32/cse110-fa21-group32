// UserLogin.js

// IMPORTS
// GLOBALS
// TODO: edit the local server URL to hosted server
const SERVER_URL = 'http://127.0.0.1:5000/';

/**
 * TODO:
 * @param {*} formElement
 * @param {*} type
 * @param {*} message
 */
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector('.form__message');

  messageElement.textContent = message;
  messageElement.classList.remove(
    'form__message--success',
    'form__messgae--error'
  );
  messageElement.classList.add(`form_message--${type}`);
}

/**
 * TODO:
 * @param {*} inputElement
 * @param {*} message
 */
function setInputError(inputElement, message) {
  inputElement.classList.add('form__input--error');
  inputElement.parentElement.querySelector(
    '.form__input-error-message'
  ).textContent = message;
}

/**
 * TODO:
 * @param {*} inputElement
 */
function clearInputError(inputElement) {
  inputElement.classList.remove('form__input--error');
  inputElement.parentElement.querySelector(
    '.form__input-error-message'
  ).textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login');
  const createForm = document.querySelector('#creation');
  const confirmationForm = document.querySelector('#confirmationPage');
  const successRegForm = document.querySelector('#successReg');

  document.querySelector('#linkCreation').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('form--hidden');
    confirmationForm.classList.add('form--hidden');
    successRegForm.classList.add('form--hidden');
    createForm.classList.remove('form--hidden');
  });

  // Maybe we can simplify this part of the code
  //--------------------------------------------------------
  document.querySelector('#linkLogin0').addEventListener('click', (e) => {
    e.preventDefault();
    createForm.classList.add('form--hidden');
    confirmationForm.classList.add('form--hidden');
    successRegForm.classList.add('form--hidden');
    loginForm.classList.remove('form--hidden');
  });

  document.querySelector('#linkLogin2').addEventListener('click', (e) => {
    e.preventDefault();
    createForm.classList.add('form--hidden');
    confirmationForm.classList.add('form--hidden');
    successRegForm.classList.add('form--hidden');
    loginForm.classList.remove('form--hidden');
  });

  document.querySelector('#linkLogin3').addEventListener('click', (e) => {
    e.preventDefault();
    createForm.classList.add('form--hidden');
    confirmationForm.classList.add('form--hidden');
    successRegForm.classList.add('form--hidden');
    loginForm.classList.remove('form--hidden');
  });
  //---------------------------------------------------------------

  //   loginForm.addEventListener('submit', (e) => {
  //     e.preventDefault();

  //     //do fetch and check data of users here and return
  //     setFormMessage(loginForm, 'error', 'Invalid username or password!');
  //   });

  document.querySelectorAll('.form__input').forEach((inputElement) => {
    inputElement.addEventListener('blur', (e) => {
      if (
        e.target.id === 'signUpUsername' &&
        e.target.value.length > 0 &&
        e.target.value.length < 10
      ) {
        setInputError(inputElement, 'Username must be at least 10 characters');
      } else if (
        e.target.id === 'signUpUsername' &&
        e.target.value.length > 16
      ) {
        setInputError(inputElement, 'Username must be less than 16 characters');
      }
    });

    inputElement.addEventListener('input', () => {
      clearInputError(inputElement);
    });
  });

  // Try to create account when info is submitted
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setFormMessage(createForm, 'error', 'wrong information');
    loginForm.classList.remove('form--hidden');
    createForm.classList.add('form--hidden');
    confirmationForm.classList.add('form--hidden');
    // successRegForm.classList.remove('form--hidden');

    createAccount(
      document.forms['create-form']['reg-user'].value,
      document.forms['create-form']['reg-email'].value,
      document.forms['create-form']['reg-pass'].value
    );
  });

  // Try to login when info is submitted
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(document.forms['login-form']['log-user'].value);
    login(
      document.forms['login-form']['log-user'].value,
      document.forms['login-form']['log-pass'].value,
      loginForm
    );
  });
});

/**
 * TODO:
 * @param {String} username
 * @param {String} password
 */
function login(username, password, loginForm) {
  fetch(
    // need to encode with UTF-8 for special characters like ' '
    `${SERVER_URL}?type=login&user=${encodeURIComponent(
      username
    )}&pass=${encodeURIComponent(password)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //No Token Returned (wrong authentication)
      if (!data.userInfo) {
        setFormMessage(loginForm, 'error', 'Invalid username or password!');
        console.error('Wrong information provided to DB!');
      } else {
        localStorage.setItem('username', username);
        localStorage.setItem('token', data.userInfo);
        window.location.href = `home.html`;
        console.log('Success:', data);
      }
    })
    .catch((error) => {
      setFormMessage(loginForm, 'error', 'Invalid username or password!');
      console.error('Error:', error);
    });

  //setFormMessage(loginForm, 'error', 'Invalid username or password!');
}

/**
 * Sends new user information to the database to store
 * @param {String} username user's username
 * @param {String} email user's email
 * @param {String} password user's password
 */
function createAccount(username, email, password) {
  let msg = {
    type: 'register',
    username: username,
    password: password,
    email: email,
  };

  fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(msg),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}