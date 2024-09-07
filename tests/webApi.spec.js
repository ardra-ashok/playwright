const { test, expect, request } = require('@playwright/test')
const { log } = require('console')
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
}

const baseUrl = 'https://rahulshettyacademy.com/'
let token
test.beforeAll(async () => {
  const apiContext = await request.newContext()
  const loginResponse = await apiContext.post(baseUrl + 'api/ecom/auth/login', {
    data: {
      userEmail: 'anshika@gmail.com',
      userPassword: 'Iamking@000',
    },
  })

  await expect(loginResponse.ok()).toBeTruthy()
  const loginResponseJson = await loginResponse.json()
  token = loginResponseJson.token
})

test('Client App Login', async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value)
  }, token)
  await page.goto(baseUrl+'/client')
})
