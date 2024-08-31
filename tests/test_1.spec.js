const {test} = require('@playwright/test')


test('First Test', async ({ browser })=> {
 const context = await browser.newContext();
 const page = await context.newPage();
 await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

})

test.only('Page playwright Test', async ({ page }) => {

  // await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  await page.goto('https://google.com')
})