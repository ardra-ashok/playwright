const { test, expect } = require('@playwright/test')

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
  // await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible()
  await page.locator('div li').first().waitFor()
  expect(await page.locator(`h3:has-text("${productName}")`).isVisible()).toBeTruthy()
  // await page.pause()
})
