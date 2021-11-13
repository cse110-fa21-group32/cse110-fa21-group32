// RecipeCard.js

class RecipeCard extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    if (!data) return;

    // Used to access the actual data object
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
      position: static;
      width: 124px;
      height: 123px;

      background: #324A54;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

      align-items: center;
      border: 1px solid rgb(223, 225, 229);
      border-radius: 4px;
      padding: 0 16px 16px 16px;
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

    // Grab the title
    const titleText = getTitle(data);
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = titleText;


    // Grab the thumbnail
    const imageUrl = getImage(data);
    const image = document.createElement('img');
    image.setAttribute('src', imageUrl);
    image.setAttribute('alt', titleText);


    // Add all of the elements to the card
    card.appendChild(image);
    card.appendChild(title);

    this.shadowRoot.append(style, card);
  }

  get data() {
    // Stored in .json to avoid calling set data() recursively in a loop.
    // .json is also exposed so you can technically use that as well
    return this.json;
  }
}



/**
 * Extract the title of the recipe from the given recipe schema JSON obejct
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the recipe title
 */
function getTitle(data) {
  if (data.name) return data.name;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Recipe') {
        if (data['@graph'][i]['name']) return data['@graph'][i]['name'];
      };
    }
  }
  return null;
}

/**
 * Extract a usable image from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the URL of the image as a string, otherwise null
 */
function getImage(data) {
  if (data.image?.url) return data.image.url;
  if (data.image?.contentUrl) return data.image.contentUrl;
  if (data.image?.thumbnail) return data.image.thumbnail;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'ImageObject') {
        if (data['@graph'][i]['url']) return data['@graph'][i]['url'];
        if (data['@graph'][i]['contentUrl']) return data['@graph'][i]['contentUrl'];
        if (data['@graph'][i]['thumbnailUrl']) return data['@graph'][i]['thumbnailUrl'];
      };
    }
  }
  return null;
}

/**
 * Extract the URL from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the URL of
 * @returns {String} If found, it returns the URL as a string, otherwise null
 */
function getUrl(data) {
  if (data.url) return data.url;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] == 'Recipe') return data['@graph'][i]['@id'];
    }
  };
  return null;
}

// Define the Class so you can use it as a custom element
customElements.define('recipe-card', RecipeCard);