const { test, expect, request } = require('@playwright/test')
const { log } = require('console')
const { Api_Utils } = require('./utils/Api_Utils')
const { AsyncLocalStorage } = require('async_hooks')

let response
const baseUrl = 'https://rahulshettyacademy.com/'
const loginPayload = {
  userEmail: 'piyaasok@gmail.com',
  userPassword: 'Test!12345',
}
const orderPayload = { orders: [{ country: 'India', productOrderedId: '6581ca399fd99c85e8ee7f45' }] }

const fakePayload = { data: [], message: 'No Orders' } 
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
 await page.route(
  'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {
   const response = await page.request.fetch(route.request())
   let body = JSON.stringify(fakePayload)
   route.fulfill({
    response,
    body
   })
   }
 )



 await page.locator('button[routerlink="/dashboard/myorders"]').click()
 await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
 console.log(await page.locator('.mt-4').textContent());
 
 
  
})
