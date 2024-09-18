const { When, Then, Given } = require('@cucumber/cucumber')
const playwright = require('@playwright/test')
const { POManager } = require('../../pageObjects/POManager')
const { expect } = require('@playwright/test')

let poManager
let orderId
Given(
  'I login to Ecommerce application using {string} and {string}',
  { timeout: 100 * 1000 },
  async function (username, password) {
    poManager = new POManager(this.page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goToLogin()
    await loginPage.validLogin(username, password)
  }
)

When(
  'I add {string} to Cart',
  { timeout: 100 * 1000 },
  async function (productName) {
    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProduct(productName)
    await dashboardPage.navigateToCart()
  }
)

Then(
  'I verify {string} is displayed in the Cart',
  async function (productName) {
    const cartPage = poManager.getCartPage()
    await cartPage.verifyProductIsDisplayed(productName)
    await cartPage.navigateToCheckOut()
  }
)

When('I enter valid details and place the order', async function () {
  const checkOutPage = poManager.getCheckOutPage()
  await checkOutPage.enterDetailsAndPlaceOrder('India', 'piyaasok@gmail.com')

  const orderSummaryPage = poManager.getOrderSummaryPage()
  orderId = await orderSummaryPage.confirmOrderAndGetOrderId()
  await orderSummaryPage.navigateToOrdersPage()
})

Then('I verify the order is present in the order history', async function () {
  const ordersPage = poManager.getOrdersPage()
  await ordersPage.verifyOrder(orderId)
})

Given('I login to Ecomm App with {string} and {string}',
  async function (username, password) {
    const userName = this.page.locator('#username')
    const signIn = this.page.locator('#signInBtn')
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await this.page.title())
    await userName.fill(username)
    await this.page.locator("[type='password']").fill(password)
    await signIn.click()
  }
)
Then('I verify error messag is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent())
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect')
})
