describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto(
      'https://hopeful-lewin-95a6c7.netlify.app/'
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
