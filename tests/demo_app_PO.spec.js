const { test, expect } = require("@playwright/test");
const { log } = require("console");
const { LoginPage } = require("../pageObjects/LoginPage");
const { DashboardPage } = require("../pageObjects/DashboardPage");
const { CartPage } = require("../pageObjects/CartPage");
const { CheckOutPage } = require("../pageObjects/CheckOutPage");
const { OrderSummaryPage } = require("../pageObjects/OrderSummaryPage");
const { OrdersPage } = require("../pageObjects/OrdersPage")

test("Test Application", async ({ page }) => {
  const username = "piyaasok@gmail.com";
  const password = "Test!12345";
  const productName = "IPHONE 13 PRO";
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckOutPage(page);
  const orderSummaryPage = new OrderSummaryPage(page);
  const ordersPage = new OrdersPage(page);

  await loginPage.goToLogin();
  await loginPage.validLogin(username, password);
  await dashboardPage.searchProduct(productName);
  await dashboardPage.navigateToCart();

  // Cart - Page
  await cartPage.verifyProduct(productName);
  await cartPage.navigateToCheckOut();
  // CheckoutPage
  await checkoutPage.enterDetailsAndPlaceOrder("India", username);

  const orderId = await orderSummaryPage.confirmOrderAndGetOrderId();
  await orderSummaryPage.navigateToOrdersPage();
  await ordersPage.verifyOrder(orderId);

})
