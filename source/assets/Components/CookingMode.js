// CookingMode.js

/**
 * Class: CookingMode
 * Redirect option from the recipe view that splits the directions of
 * the recipe onto separate views.
 */
class CookingMode extends HTMLElement {
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
      text-align: center;
    }
    button {
      min-width: 10%;
      border-radius: 18px;
      background-color: white;
      border: 1.5px solid #ca676a;
      text-align: center;
      font-size: 14pt;
      color:#ca676a;
    }
    #btnNav {
      position: fixed;
      bottom: 40pt;
    }
    #btnNav button {
      height: 22pt;
      width: 22pt;
      border-radius: 50%;
      background-color: white;
      border: 1.5px solid #ca676a;
      text-align: center;
      font-size: 14pt;
      color:#ca676a;
    }
    .css-outer {
      display: flex;
      justify-content: center;
    }
    .special-outer {
      display: table;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      text-align: center;
    }
    
    .middle {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
    
    #cooking-steps {
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      text-align: center;
      font-size: 18pt;
    }
    #cooking-timer {
      position: fixed;
      bottom: 80pt;
      text-align: center;
    }
        `;
    article.innerHTML = `
        <h2>Cooking Mode</h2>

        <div class="css-outer">
        <div class="special-outer">
        <div class="middle">
        <button>Quit</button>
        <!--Cooking Steps-->
        <div id="cooking-steps">
        </div>
        </div>
        </div>

        <div id="btnNav">
        </div>
        </div>

        <div class="css-outer">
        <!--Cooking Timer-->
        <div id="cooking-timer">
        </div>
        </div>
    

        `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);
  }

  /**
   * Sets all the elements of the update recipe page to the recipes current data
   * @param data Previous recipe data to set the placeholder values
   */
  set data(data) {
    this.json = data;
 
    // Set Title
    const title = getTitle(data).toUpperCase();
    this.shadowRoot.querySelector('h2').innerHTML = title;


    //convert totalseconds into seconds, minutes and hours format
    function convertHMS(value) {
      const sec = parseInt(value, 10); // convert value to number if it's string
      let hours   = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
      let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
    }
    
    let quitBtn = this.shadowRoot.querySelector('button');
    quitBtn.addEventListener('click', () => {
      history.back();
    });

    //get all directions
    const content = data.recipe.analyzedInstructions[0].steps;
    
    // initialize page
    for (let i = 0; i < content.length; i++) {
      // initialize current step
      let cookingStep = this.shadowRoot.getElementById('cooking-steps');
      let cookingBtn = this.shadowRoot.getElementById('btnNav');
      let currStep = document.createElement('p');
      currStep.setAttribute('id', `step${i + 1}`);
      currStep.innerHTML = `${i + 1}` + '.' + content[i].step;
      cookingStep.appendChild(currStep);

      // let other than first step be invisible initially
      if (i != 0) {
        currStep.setAttribute('style', 'display:none');
      }

      // initialize all buttons
      let currBtn = document.createElement('button');
      currBtn.setAttribute('id', `btn${i + 1}`);
      currBtn.innerHTML = `${i + 1}`;
      cookingBtn.appendChild(currBtn);

      //initialize timer if needed
      if(content[i].step.search(/hour/i) != -1 || content[i].step.search(/minute/i) != -1 || content[i].step.search(/second/i) != -1){

        //get maximum time of current recipe
        let time;
        if (content[i].step.match(/([\d.]+) *-second/)){
          time = content[i].step.match(/([\d.]+) *-second/)[1];
          time = parseInt(time);
        }
        else if (content[i].step.match(/([\d.]+) *minutes/)){
          time = content[i].step.match(/([\d.]+) *minutes/)[1];
          time = parseInt(time);
          time = time * 60;
        }
        else if (content[i].step.match(/([\d.]+) *hours/)){
          time = content[i].setp.match(/([\d.]+) *hours/)[1];
          time = parseInt(time);
          time = time * 3600;
        }
        


        let totalSeconds = 0;
        let timer;
        //count up algorithm
        function setTime() {
          ++totalSeconds;
          if(totalSeconds >= time){
            currTime.style.color = 'red';
          }
          else{
            currTime.style.color = 'green';
          }
          currTime.innerHTML = convertHMS(totalSeconds);
        }



        let timerArea = this.shadowRoot.getElementById('cooking-timer');
        
        //create a div for current page timer
        let currArea = document.createElement('div');
        currArea.setAttribute('id', `area${i + 1}`);
        timerArea.appendChild(currArea);

        //create a paragraph for showing time
        let currTime = document.createElement('p');
        currTime.setAttribute('id', `currTime${i + 1}`);
        currTime.innerHTML = '00:00:00';
        currTime.style.fontSize = '25px';
        currTime.style.fontWeight = 'bold';
        currTime.style.color = 'green';
        currArea.appendChild(currTime);

        //create a start button for start timer
        let startBtn = document.createElement('button');
        startBtn.setAttribute('id', `startBtn${i + 1}`);
        startBtn.innerHTML = 'Start';
        currArea.appendChild(startBtn);
        
        //create a pasue button
        let pauseBtn = document.createElement('button');
        pauseBtn.setAttribute('id', `pauseBtn${i + 1}`);
        pauseBtn.innerHTML = 'Pause';
        currArea.appendChild(pauseBtn);
        
        //create a reset button
        let resetBtn = document.createElement('button');
        resetBtn.setAttribute('id', `resetBtn${i + 1}`);
        resetBtn.innerHTML = 'Reset';
        currArea.appendChild(resetBtn);
        
        //create functionality for three buttons
        startBtn.addEventListener('click', () => {
          if(timer){
            clearInterval(timer);
          }
          timer = setInterval(setTime, 1000);
        });
          
        pauseBtn.addEventListener('click', () => {
          clearInterval(timer);
        });
          
        resetBtn.addEventListener('click', () => {
          totalSeconds = 0;
          currTime.innerHTML = '00:00:00';
          currTime.style.color = 'green';
        });
        
        //initialize all timer to be invisible excepte first one
        if(i != 0){
          currArea.setAttribute('style', 'display:none');
        }

      }
    }
    
    for (let i = 0; i < content.length; i++) {
      let curr = this.shadowRoot.querySelectorAll('button')[i+1];
      let area = this.shadowRoot.getElementById('cooking-timer');
      let pages = this.shadowRoot.querySelectorAll('p');
      curr.addEventListener('click', () => {
        for (let j = 0; j < content.length; j++) {
          if (j == i) {
            pages[j].setAttribute('style', 'display: inline');
          } else {
            pages[j].setAttribute('style', 'display: none');
          }
        }

        for(let k = 0; k < area.children.length; k++){
          if(area.children[k].id == `area${i + 1}`){
            area.children[k].setAttribute('style', 'display: inline');
          }
          else{
            area.children[k].setAttribute('style', 'display: none');
          }
        }
      });
    }
  }
}
function getTitle(data) {
  return data.recipe.title;
}
customElements.define('cooking-mode-page', CookingMode);

// EXPORT
