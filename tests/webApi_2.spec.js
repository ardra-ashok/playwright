const { test, expect } = require('@playwright/test')
let webContext
  const email = 'anshika@gmail.com'
test.beforeAll('Test Application', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://rahulshettyacademy.com/client')
  await page.locator('#userEmail').fill(email)
  await page.locator('#userPassword').type('Iamking@000')
  await page.locator('[value="Login"]').click()
  await page.waitForLoadState('networkidle')
  await context.storageState({ path: 'state.json' })
  webContext = await browser.newContext({ storageState: 'state.json' })
})

test('Client App login', async () => {

  const productName = 'IPHONE 13 PRO'
  const page = await webContext.newPage()
  await page.goto('https://rahulshettyacademy.com/client')
  const products = page.locator('.card-body')
  const titles = await page.locator('.card-body b').allTextContents()
  const count = await products.count()
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator('b').textContent()) == productName) {
      await products.nth(i).locator('text=Add To Cart').click()
      break
    }
  }
  await page.locator('[routerlink*="cart"]').click()
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
    .locator('.em-spacer-1 .ng-star-inserted').first()
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
})
