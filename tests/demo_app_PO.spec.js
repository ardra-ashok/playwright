const { test, expect } = require('@playwright/test')
const { log } = require('console')
const { POManager } = require('../pageObjects/POManager')

test('Test Application', async ({ page }) => {
  const username = 'piyaasok@gmail.com'
  const password = 'Test!12345'
  const productName = 'IPHONE 13 PRO'
  const products = await page.locator('.card-body')
  const poManager = new POManager(page)

  const loginPage = await poManager.getLoginPage()
  await loginPage.goToLogin()
  await loginPage.validLogin(username, password)

  const dashboardPage = await poManager.getDashboardPage()
  await dashboardPage.searchProduct(productName)
  await dashboardPage.navigateToCart()

  // Cart - Page
  const cartPage = await poManager.getCartPage()
  await cartPage.verifyProductIsDisplayed(productName)
  await cartPage.navigateToCheckOut()
  // CheckoutPage
  const checkOutPage = await poManager.getCheckOutPage()
  await checkOutPage.enterDetailsAndPlaceOrder('India', username)

  const orderSummaryPage = await poManager.getOrderSummaryPage()
  const orderId = await orderSummaryPage.confirmOrderAndGetOrderId()
  await orderSummaryPage.navigateToOrdersPage()

  const ordersPage = await poManager.getOrdersPage()
  await ordersPage.verifyOrder(orderId)
})

