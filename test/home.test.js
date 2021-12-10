global.window = { location: { pathname: null } };
describe('Basic user flow for Website', () => {
    beforeAll(async () => {
      await page.goto(
        'https://hopeful-lewin-95a6c7.netlify.app/home.html'
      );
    });
  
    // Simply checks how many side panel buttons there are. (Should be just 1)
    it('Home Page - Checking how mnay side panel buttons are on the page', async () => {
      console.log('Checking number of side panel buttons');
  
      const numberSidePanelButtons = await page.$$eval(
        '.openbtn',
        (sidePanelBtns) => sidePanelBtns.length
      );
  
      expect(numberSidePanelButtons).toBe(1);
    });
    test("Title of the Home page", async () => {
      const title = await page.title();
      console.log(title);
      expect(title).toBe("CookEZ");
  }, 1000);
});

  describe("Test title of the homepage", () => {
    beforeAll(async () => {
        await page.goto(
          'https://hopeful-lewin-95a6c7.netlify.app/home.html'
        );
      });
    test("Title of the page", async () => {
        const title = await page.title();
        console.log(title);
        expect(title).toBe("CookEZ");
    }, 1000);
});

// describe("Test navigation from home to profile", () => {
//   beforeAll(async () => {
//       await page.goto(
//         'http://127.0.0.1:5500/source/home.html'
//       );
//     });
//     test('should change page when button is clicked', async() => {
//       var button = await page.$('button#LinkToProfile');
      
//       await button.click();
//       await page.waitForNavigation();
//       let result = await page.url()
//       expect(result).toBe("\"http://127.0.0.1:5500/source/home.html#profile");
//     },10000);
// });

// describe("Test Navigation from Home to Calendar", () => {
//   beforeAll(async () => {
//       await page.goto(
//         'http://127.0.0.1:5500/source/home.html'
//       );
//     });
//     test('should change page when button is clicked', async() => {
//       var button = await page.$('button#LinkToCalendar');
      
//       await button.click();
//       await page.waitForNavigation();
//       const result = await page.evaluate(() => {
//        return JSON.stringify(window.location.href);
//       });
//       console.log(result);
//       expect(result).toBe("\"http://127.0.0.1:5500/source/full_calendar/calendar.html\"");
//     });
// });

// describe("Test Navigation from SidePanel to Add Recipe", () => {
//   beforeAll(async () => {
//       await page.goto(
//         'http://127.0.0.1:5500/source/home.html'
//       );
//     });
//     test('should change page when button is clicked', async() => {
//       var button = await page.$('a#LinkToAdd');
      
//       await button.click();
//       await page.waitForNavigation();
//       const result = await page.evaluate(() => {
//        return JSON.stringify(window.location.href);
//       });
//       console.log(result);
//       expect(result).toBe("\"http://127.0.0.1:5500/source/full_calendar/calendar.html\"");
//     });
// });