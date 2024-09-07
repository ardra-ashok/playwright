const { expect } = require('@playwright/test')
const { log } = require('console')

class Api_Utils {
  baseUrl = 'https://rahulshettyacademy.com/'

  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext
    this.loginPayload = loginPayload
  }

  async get_Token() {
    const loginResponse = await this.apiContext.post(
      this.baseUrl + 'api/ecom/auth/login',
      {
        data: this.loginPayload,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    await expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson = await loginResponse.json()
    const token = loginResponseJson.token
    return token
  }

  async create_Order(orderPayload) {
    let response = {}
    response.token = await this.get_Token()
    const orderResponse = await this.apiContext.post(
      this.baseUrl + 'api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          'Content-Type': 'application/json',
        },
      }
    )
    await expect(orderResponse.ok()).toBeTruthy()
    const orderRes_Json = await orderResponse.json()
    response.orderId = orderRes_Json.orders[0]
    response.successMessage = orderRes_Json.message
    return response
  }
}

module.exports = { Api_Utils }
