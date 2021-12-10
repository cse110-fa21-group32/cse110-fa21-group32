describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto(
      'http://127.0.0.1:5500/source/home.html'
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
});
