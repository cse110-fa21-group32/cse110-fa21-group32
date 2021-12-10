describe("Test title of userLogin", () => {
    beforeAll(async () => {
        await page.goto(
          'https://hopeful-lewin-95a6c7.netlify.app/userLogin.html'
        );
      });
    test("Title of the page", async () => {
        const title = await page.title();
        console.log(title);
        expect(title).toBe("Login / Sign Up Form");
    }, 1000);
});
  
const assert = require('assert');


describe('Login Page', function () {
    beforeAll(async () => {
        await page.goto(
          'https://hopeful-lewin-95a6c7.netlify.app/userLogin.html'
        );
      });
  it('should let you log in', async () => {
   let input =  page.$('input[name="log-user"]');
    page.type(input,"Martin1234");
    let pass = page.$('input[name="log-pass"]');
    page.type(pass,"1234");
    await page.waitForSelector('button#continue'); // waits for the continue button to finish loading
    await page.click('button#continue'); // click it 
    let navURL =  await page.url(); // wait for new page to load
    console.log(navURL);
    expect(navURL).toBe('https://hopeful-lewin-95a6c7.netlify.app/userlogin'); // if the username and password are in the
  });
});