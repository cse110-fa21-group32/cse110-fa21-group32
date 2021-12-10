import { Router } from './Router.js';
import { POST } from './request.js';

// If modified, also modify list of page names under addMainPages
const pageNames = [
  'home',
  'grocery',
  'profile',
  'recipe',
  'search-results',
  'cooking-mode',
  'add-recipe',
  'update-recipe',
];
//,'prevCooked','user-login','calendar',
const router = new Router();

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize function that runs all JS in this file
 */
async function init() {
  addMainPages();
  bindNavIcons();
  bindSidePanel();

  bindPopstate();
  router.navigate('home');
}

/**
 * Add all of the main pages in list pageNames to the router
 */
function addMainPages() {
  for (let i = 0; i < pageNames.length; i++) {
    // Add all of the main pages
    router.addPage(pageNames[i], function () {
      // If modified, also modify global pageNames
      //const pageNames = ['home', 'calendar', 'grocery', 'profile'];
      for (let j = 0; j < pageNames.length; j++) {
        // If adding the current page, show. Otherwise hide
        if (pageNames[i] === pageNames[j]) {
          document
            .getElementById('#section--' + pageNames[j])
            .classList.add('shown');
          console.log(document.getElementById('#section--' + pageNames[j]));
        } else {
          document
            .getElementById('#section--' + pageNames[j])
            .classList.remove('shown');
        }
      }

      // All pages that have a search bar TODO:
      if (pageNames[i] === 'home') {
        document.getElementById('#section--search-bar').classList.add('shown');
      } else {
        document
          .getElementById('#section--search-bar')
          .classList.remove('shown');
      }

      document.getElementById('#section--side-panel').classList.add('shown');

      // Show Login Page
      if (pageNames[i] === 'user-login') {
        document
          .getElementById('#section--side-panel')
          .classList.remove('shown');
      }
    });

    // Create the element with the specific page's content and add to section
    const pageContent = document.createElement(pageNames[i] + '-page');
    document
      .getElementById('#section--' + pageNames[i])
      .appendChild(pageContent);
    if (pageNames[i] === 'grocery') {
      // Add small delay for grocery to load info from backend
      setTimeout(() => {
        pageContent.update = '';
      }, 1000);
    }
  }

  // Create and add search bar
  const searchBar = document.createElement('search-bar');
  document.getElementById('#section--search-bar').appendChild(searchBar);

  // Create and add side panel
  const sidePanel = document.createElement('side-panel');
  document.getElementById('#section--side-panel').appendChild(sidePanel);
}

/**
 * Bind the navigation icons at the bottom to the appropriate pages
 * (Home, Calendar, Grocery, Profile icon)
 */
function bindNavIcons() {
  // Retrieve buttons corresponding to icons
  const homeIcon = document.getElementById('LinkToHome');
  // const calendarIcon = document.getElementById('LinkToCalendar');
  const groceryIcon = document.getElementById('LinkToList');
  const profileIcon = document.getElementById('LinkToProfile');

  // Add click event listeners and proper navigation
  homeIcon.addEventListener('click', () => {
    router.navigate('home');
  });

  // calendarIcon.addEventListener('click', () => {
  //   router.navigate('calendar');
  // });

  groceryIcon.addEventListener('click', () => {
    router.navigate('grocery');
  });

  profileIcon.addEventListener('click', () => {
    router.navigate('profile');
  });
}

/**
 * Bind the Collapased Sidepanel at the side for the appropriate pages
 * (Favorite Recipes, Previously Cooked, Add a Recipe, Write a Review)
 */
function bindSidePanel() {
  // Retrieve buttons corresponding to icons
  //const userLogin = document.getElementById('LinkLogin');
  const addRecipe = document.getElementById('LinkToAdd');
  const logoutElem = document.getElementById('LinkToLogout');

  // Add click event listeners and proper navigation
  // userLogin.addEventListener('click', () => {
  //   router.navigate('user-login');
  // });
  addRecipe.addEventListener('click', () => {
    router.navigate('add-recipe');
  });
  logoutElem.addEventListener('click', () => {
    let username = localStorage.getItem('username');
    let token = localStorage.getItem('token');
    logout(username, token);
  });
}

/**
 * Binds the popstate (back button/forward button) to navigate
 * to the correct page
 * Reference: Lab 7 Implementation
 */
function bindPopstate() {
  window.addEventListener('popstate', (e) => {
    let state = e.state;
    if (state === null || typeof state === 'undefined') {
      router.navigate('home', true);
    } else {
      router.navigate(state.statePage, true);
    }
  });
}

/**
 * Logs the user out by clearing local storage and redirecting to
 * the login page. Sends local storage info to backend before clearing.
 * @param {String} username username from local storage
 * @param {String} token token from local storage (generated with login)
 */
function logout(username, token) {
  // Send grocery.js to the backend
  let groceryCustom = JSON.parse(localStorage.getItem('mylist'));
  let groceryRecipes = JSON.parse(localStorage.getItem('grocery'));

  // Combines the My List and other grocery list into one list
  let combinedGrocery = [groceryCustom];
  if (groceryRecipes != null) {
    for (let i = 0; i < groceryRecipes.length; i++) {
      combinedGrocery.push(groceryRecipes[i]);
    }
  }

  let groceryInfo = {
    timestamp: Date.now(), // Timestamp used by grocery for logging in
    list: combinedGrocery,
  };

  let msg = {
    type: 'logout',
    username: username,
    token: token,
    grocery: groceryInfo,
  };

  /**
   * Redirects to the user login page after logging out
   */
  function afterLogout() {
    window.location.href = 'userLogin.html';
    localStorage.clear(); // Clear local storage
  }
  POST(msg, afterLogout);
}

export { router };
