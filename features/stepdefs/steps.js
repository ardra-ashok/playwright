const { When, Then, Given } = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../pageObjects/POManager");

Given(
  "I login to Ecommerce application using {string} and {string}",
  {timeout:100*1000},async function (username, password) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToLogin();
    await loginPage.validLogin(username, password);
  }
);

When("I add {string} to Cart", {timeout:100*1000}, async function (productName) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProduct(productName);
  await this.dashboardPage.navigateToCart();
});

Then("I verify {string} is displayed in the Cart", async function (productName) {
  const cartPage = await this.poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(productName);
  await cartPage.navigateToCheckOut();
});

When("I enter valid details and place the order", async function () {
  const checkOutPage = await this.poManager.getCheckOutPage();
  await checkOutPage.enterDetailsAndPlaceOrder("India","piyaasok@gmail.com");

  const orderSummaryPage = this.poManager.getOrderSummaryPage();
  const orderId = await orderSummaryPage.confirmOrderAndGetOrderId();
  await orderSummaryPage.navigateToOrdersPage();
});

Then("I verify the order is present in the order history", async function () {
  const ordersPage = this.poManager.getOrdersPage();
  await ordersPage.verifyOrder(orderId);
});
