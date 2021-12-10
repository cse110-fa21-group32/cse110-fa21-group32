/**
 * Router.js
 *
 * Used for handling the navigation between pages to create the SPA effect.
 * Reference Sources: Lab 7 Implementation
 */
export class Router {
  /**
   * Adds the page to the router with an associated function to "navigate"
   * to this page
   * @param {String} page name of page
   * @param {Function} pageFunc function that is used to navigate to page
   */
  addPage(page, pageFunc) {
    this[page] = pageFunc;
  }

  /**
   * Routes us to the page associated with the name page. Manages the URLs
   * by adding the page name after '#'.
   * @param {String} page name of page to navigate to
   * @param {Boolean} statePopped true if we just back-paged, false otherwise
   */
  navigate(page, statePopped) {
    console.log(`navigate() function called, requested page: ${page}`);
    if (typeof this[page] === 'undefined') {
      console.log(`Function for ${page} is undefined`);
      return;
    }

    let currHash = page == 'home' ? '' : '#' + page;

    if (!statePopped && window.location.hash !== currHash) {
      let state = { statePage: page, hash: currHash };
      history.pushState(
        state,
        '',
        window.location.origin + window.location.pathname + currHash
      );
    }

    this[page].call();
  }
}
