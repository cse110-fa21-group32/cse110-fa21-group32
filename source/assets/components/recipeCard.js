/**
 * This class creates the recipe card elements that will be used to show the recipe search results in
 * the search/home page. The functions in this file as well as the class are taken from our Lab 7.
 *
 * To use it place this in your html page,
 *
 * <script src="assets/components/RecipeCard.js" type="module"></script>
 *
 * And to create the card in your main js file use this,
 *
 * const recipeCard = document.createElement('recipe-card');
 */

class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    if (data == false) return;
    this.json = data;

    const style = document.createElement('style');
    const card = document.createElement('article');
    style.innerHTML = `
    *{
      font-family: IBM Plex Sans; 'https://fonts.google.com/specimen/IBM+Plex+Sans#standard-styles'
      margin:0;
      padding:0;
    }
    article {
      overflow-x: scroll;
      position: static;
      width: 124px;
      height: 123px;

      background: #324A54;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

      align-items: center;
      border: 1px solid rgb(223, 225, 229);
      border-radius: 4px;
      transition: all 0.2s ease;
      user-select: none;
    }

    img {
      display: inline-block;
      object-fit: cover;
      width: 124px;
      height: 71px;
            
    }
    p.title {
      text-align: center;
      position: relative;
      bottom: 15px;
      width: 124px;
      height: 22px;
      font-size: 12px;
      line-height: 22px;
      color: #FFFFFF;
    }
        `;

    //Get Recipe Title
    const titleText = getTitle(data);
    const title = document.createElement('p');
    title.appendChild(titleText);

    //Get Thumbnail
    const img = document.createElement('img');
    const image_link = getImage(data);
    img.src = image_link;
    img.alt = titleText;

    //Add all the elements to the card
    card.appendChild(img);
    card.appendChild(title);

    this.shadowRoot.append(style, card);
  }

  get data() {
    return this.json;
  }
}

/**
 * Recursively search for a key nested somewhere inside an object
 * @param {Object} object the object with which you'd like to search
 * @param {String} key the key that you are looking for in the object
 * @returns {*} the value of the found key
 */
function searchForKey(object, key) {
  let value;
  Object.keys(object).some(function (k) {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === 'object') {
      value = searchForKey(object[k], key);
      return value !== undefined;
    }
  });
  return value;
}

/**
 * Extract the title of the recipe from the given recipe schema JSON obejct
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the recipe title
 */
function getTitle(data) {
  if (data.name) {
    return data.name;
  }
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Recipe') {
        if (data['@graph'][i]['name']) {
          return data['@graph'][i]['name'];
        }
      }
    }
    return null;
  }
}

/**
 * Extract a usable image from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the URL of the image as a string, otherwise null
 */
function getImage(data) {
  if (data.image?.url) {
    return data.image.url;
  }
  if (data.image?.contentUrl) {
    return data.image.contentUrl;
  }
  if (data.image?.thumbnail) {
    return data.image.thumbnail;
  }
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'ImageObject') {
        if (data['@graph'][i]['url']) {
          return data['@graph'][i]['url'];
        }
        if (data['@graph'][i]['contentUrl']) {
          return data['@graph'][i]['contentUrl'];
        }
        if (data['@graph'][i]['thumbnailUrl']) {
          return data['@graph'][i]['thumbnailUrl'];
        }
      }
    }
  }
  return null;
}

// Define the Class so you can use it as a custom element
customElements.define('recipe-card', RecipeCard);

/**
 * TODO: UNUSED ELEMENTS
 */
searchForKey(null);
getTitle(null);
getImage(null);
