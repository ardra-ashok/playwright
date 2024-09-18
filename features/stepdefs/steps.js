const { When, Then, Given } = require('@cucumber/cucumber')
const playwright = require('@playwright/test')
const { POManager } = require('../../pageObjects/POManager')

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
