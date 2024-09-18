const { When, Then, Given } = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../pageObjects/POManager");

let poManager, orderId
Given(
  "I login to Ecommerce application using {string} and {string}",
  {timeout:100*1000},async function (username, password) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    poManager = new POManager(page);
    this.loginPage = poManager.getLoginPage();
    await this.loginPage.goToLogin();
    await this.loginPage.validLogin(username, password);
  });

When("I add {string} to Cart", {timeout:100*1000}, async function (productName) {
  this.dashboardPage = poManager.getDashboardPage();
  await this.dashboardPage.searchProduct(productName);
  await this.dashboardPage.navigateToCart();
});

Then("I verify {string} is displayed in the Cart", async function (productName) {
  const cartPage = await poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(productName);
  await cartPage.navigateToCheckOut();
});

When("I enter valid details and place the order", async function () {
  const checkOutPage = await poManager.getCheckOutPage();
  await checkOutPage.enterDetailsAndPlaceOrder("India","piyaasok@gmail.com");

  const orderSummaryPage = poManager.getOrderSummaryPage();
  orderId = await orderSummaryPage.confirmOrderAndGetOrderId();
  await orderSummaryPage.navigateToOrdersPage();
});

Then("I verify the order is present in the order history", async function () {
  const ordersPage = poManager.getOrdersPage();
  await ordersPage.verifyOrder(orderId);
});
