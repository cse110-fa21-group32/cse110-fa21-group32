// FavoriteRecipes.js

// IMPORTS
// import { router } from '../scripts/main.js';
// import { GET, POST } from '../scripts/request.js';

/**
 * Class: FavRecipesPage
 * A page that will show the user the recipes in their
 * favorites list and link to the recipe view for each.
 */
class FavRecipesPage extends HTMLElement {
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
        <h2>Favorites</h2>
        <p>Content...</p>
        <div class="favorite-recipe-cards-wrapper">
          <!--ADD RECIPES HERE-->
        </div>
        `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);
  }
}

customElements.define('fav-recipes-page', FavRecipesPage);
