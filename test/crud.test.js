describe('Home Page', function () {
    beforeAll(async () => {
        await page.goto(
          'https://hopeful-lewin-95a6c7.netlify.app/home.html'
        );
      });
      it('check if search bar exists', async () => {
        let searchBar = page.$('searchFormID');
        expect(searchBar).not.toBeNull();
      },1000);
  
});
describe('Check if deleting a checked ingredient works', function () {
  beforeAll(async () => {
      await page.goto(
        'http://127.0.0.1:5500/source/home.html#grocery'
      );
    });
    test('should change page when button is clicked', async() => {
     let result =page.$('ingredient-list');
     let input = page.$('#my-input');
     page.type(input,"test");
     let button = page.$('add-icon');
     button.click;
     let result2 = page.$('ingredient-list');
     console.log(result);
     expect(result).not.toBe(result2);

    let divCount = page.$$eval('form > div', (divs) => divs.length);
    console.log(divCount + "1");
    });
});




// Test to see if the search bar exists, should expect not a null
// describe('Basic user flow for Website', () => {
//   beforeAll(async () => {
//     await page.goto(
//       'http://127.0.0.1:5500/source/home.html'
//     );
//   });

//   it('check if search bar exists', async () => {
//        let searchBar = page.$('#searchFormID');
//     expect(searchBar).not.toBeNull();
//   },1000);
  
// test('should change page when button is clicked', async() => {
//   var button = await page.$('button#LinkToList');
  
//   await button.click();
//   await page.waitForNavigation();
//   const result = await page.evaluate(() => {
//    return JSON.stringify(window.location.href);
//   });
//   console.log(result);
//   expect(result).toBe("\"'http://127.0.0.1:5500/source/home.html#grocery'");
// });
// });


// test('should change page when button is clicked', async() => {
  //   var button = await page.$('button#LinkToList');
  //   await button.click();
  //   await page.waitForNavigation();
  //   const result = await page.evaluate(() => {
  //    return JSON.stringify(window.location.href);
  //   });
  //   console.log(result);
  //   expect(result).toBe("\"http://127.0.0.1:5500/source/home.html#grocery\"");
  // });

  // Test to see if add recipe without filling all the fields works, should not
/*
describe('Add a Recipe', function () {
  beforeAll(async () => {
      await page.goto(
        'http://127.0.0.1:5500/source/home.html#add-recipe'
      );
    });
it('check if adding a recipe works', async () => {
 let input= page.$('addTitle')
 page.type(input,"title");

 await page.waitForSelector('button#publish-button'); // waits for the continue button to finish loading
 await page.click('button#publish-button'); // click it 

 await page.goto(
  'http://127.0.0.1:5500/source/home.html#profile'
);

let result =page.$('profile-page-recipeID');
expect(result).not.toBe('Recipe Gallery Should Be Displayed Here.');
});
});
*/
