const { test, expect, request } = require('@playwright/test')
const { log } = require('console')
const { Api_Utils } = require('./utils/Api_Utils')

let response
const baseUrl = 'https://rahulshettyacademy.com/'
const loginPayload = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000',
}
const orderPayload = {
  orders: [{ country: 'India', productOrderedId: '6581ca399fd99c85e8ee7f45' }],
}
let token, orderId, successMessage

test.beforeAll(async () => {
  const apiContext = await request.newContext()
  const api_utils = new Api_Utils(apiContext, loginPayload)
  response = await api_utils.create_Order(orderPayload)
})

test('Client App Login and Order creation', async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value)
  }, response.token)
  await expect(response.successMessage.includes('Successfully')).toBeTruthy()
  await page.goto(baseUrl + 'client')
  await page.locator('button[routerlink="/dashboard/myorders"]').click()
  await page.locator('tr.ng-star-inserted th').first().waitFor()
  const orderIds = await page
    .locator('tr.ng-star-inserted th')
    .allTextContents()
  const viewButton = await page.locator('td button').first()
  orderIds.forEach(async (text, index) => {
    if (text.trim() === response.orderId) {
      await viewButton.nth(index).click()
    }
  })
  // const rows = await page.locator('tbody tr')
  // for (let i = 0; i < (await rows.count()); ++i) {
  //   const rowOrderId = await rows.nth(i).locator('th').textContent()
  //   if (response.orderId.includes(rowOrderId)) {
  //     await rows.nth(i).locator('button').first().click()
  //     break
  //   }
  // }
  await expect(page.locator('.col-text')).toHaveText(response.orderId)
})
