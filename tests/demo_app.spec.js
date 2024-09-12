const { test, expect } = require('@playwright/test')
const { log } = require('console')

test('Test Application', async ({ page }) => {
  const username = 'piyaasok@gmail.com'
  const password = 'Test!12345'
  const productName = 'IPHONE 13 PRO'
  const products = page.locator('.card-body')
  await page.goto('https://rahulshettyacademy.com/client')
  await page.locator('#userEmail').fill(username)
  await page.locator('#userPassword').type(password)
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
  await page
    .locator('div:has-text("CVV Code ?")')
    .locator('+ input')
    .fill('621')
  await page
    .locator('div:has-text("Name on Card")')
    .locator('+ input')
    .fill('Anshika Test')
  // await page.locator('[placeholder*="Select Country"]').pressSequentially('ind')
  await page.locator('[placeholder*="Country"]').type('ind')
  // const countryOptions = await page.locator('.ta-results')
  // await countryOptions.waitFor()
  // const optionsCount = await countryOptions.locator('button').count()
  // for (let i = 0; i < optionsCount; i++){
  //  const country = await countryOptions.locator("button").nth(i).textContent()
  //  if (country.trim() === "India") {
  //   await countryOptions.locator("button").nth(i).click()
  //   break
  //  }
  // }

  // Using forEach
  const countryOptions = page.locator('.ta-results')

  const buttons = countryOptions.locator('button')
  await buttons.first().waitFor()
  const buttonTexts = await buttons.allTextContents()
  buttonTexts.forEach(async (text, index) => {
    if (text.trim() === 'India') await buttons.nth(index).click()
  })

  await expect(page.locator('.user__name [type="text"]').first()).toHaveText(
    email
  )
  await page.locator('a:has-text("PLACE ORDER")').click()
  await expect(page.locator('.hero-primary')).toHaveText(
    ' Thankyou for the order. '
  )
  let orderId = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent()
  orderId = orderId.replaceAll('|', '').trim()

  await page.locator('button[routerlink="/dashboard/myorders"]').click()

  await page.locator('tr.ng-star-inserted th').first().waitFor()
  const orderIds = await page
    .locator('tr.ng-star-inserted th')
    .allTextContents()
  const viewButton = page.locator('td button').first()
  orderIds.forEach(async (text, index) => {
    if (text.trim() === orderId) {
      await viewButton.nth(index).click()
    }
  })

  await expect(page.locator('.col-text')).toHaveText(orderId)

  // Alternate method using for loop for orderId verification
  // const rows = await page.locator('tbody tr')

  // for (let i = 0; i < (await rows.count()); ++i) {
  //   const rowOrderId = await rows.nth(i).locator('th').textContent()
  //   if (orderId.includes(rowOrderId)) {
  //     await rows.nth(i).locator('button').first().click()
  //     break
  //   }
  // }
  // const orderIdDetails = await page.locator('.col-text').textContent()
  // expect(orderId.includes(orderIdDetails)).toBeTruthy()

  // await page.pause()
})
