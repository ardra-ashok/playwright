const { test, expect, request } = require('@playwright/test')
const { log } = require('console')
const loginPayload = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000',
}
const orderPayload = {
  orders: [{ country: 'India', productOrderedId: '6581ca399fd99c85e8ee7f45' }],
}

const baseUrl = 'https://rahulshettyacademy.com/'
let token, orderId, respMsg
test.beforeAll(async () => {
  //
  const apiContext = await request.newContext()
  const loginResponse = await apiContext.post(baseUrl + 'api/ecom/auth/login', {
    data: loginPayload,
  })

  await expect(loginResponse.ok()).toBeTruthy()
  const loginResponseJson = await loginResponse.json()
  token = loginResponseJson.token

  // Order creation api
  const orderResponse = await apiContext.post(
    baseUrl + 'api/ecom/order/create-order',
    {
      data: orderPayload,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    }
  )
  await expect(orderResponse.ok()).toBeTruthy()
  const orderRes_Json = await orderResponse.json()
  console.log(orderRes_Json)
  orderId = orderRes_Json.orders[0]
  respMsg = orderRes_Json.message
})

test('Client App Login', async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value)
  }, token)
  await page.goto(baseUrl + '/client')
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
  await expect(respMsg.includes('Successfully')).toBeTruthy()
})
