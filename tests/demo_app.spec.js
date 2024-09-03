const { test, expect } = require('@playwright/test')
const { log } = require('console')

test.only('Test Application', async ({ page }) => {
  const productName = 'IPHONE 13 PRO'
  const products = page.locator('.card-body')
  await page.goto('https://rahulshettyacademy.com/client')
  await page.locator('#userEmail').fill('anshika@gmail.com')
  await page.locator('#userPassword').type('Iamking@000')
  await page.locator('[value="Login"]').click()
  await page.waitForLoadState('networkidle')
  const titles = await page.locator('.card-body b').allTextContents()

  const count = await products.count()
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator('b').textContent()) == productName) {
      await products.nth(i).locator('text=Add To Cart').click()
      break
    }
  }
 await page.locator('[routerlink*="cart"]').click()
 
 // Cart - Page
  // await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible()
  await page.locator('div li').first().waitFor()
  expect(
    await page.locator(`h3:has-text("${productName}")`).isVisible()
  ).toBeTruthy()
 await page.locator('text=Checkout').click()

 // Checkout Page
 await page.locator('div:has-text("CVV Code ?")').locator('+ input').fill('621')
 await page.locator('div:has-text("Name on Card")').locator('+ input').fill('Anshika Test')
 // await page.locator('[placeholder*="Select Country"]').pressSequentially('ind')
 await page.locator('[placeholder*="Country"]').type('ind')
 const countryOptions = await page.locator('.ta-results')
 await countryOptions.waitFor()
 const optionsCount = await countryOptions.locator('button').count()
 
 for (let i = 0; i < optionsCount; i++){
  const country = await countryOptions.locator("button").nth(i).textContent()
  if (country.trim() === "India") { 
   await countryOptions.locator("button").nth(i).click()
   break
  }
 }
 await page.locator('a:has-text("PLACE ORDER")').click()

 

  

  await page.pause()
})
