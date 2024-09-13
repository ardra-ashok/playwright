const { test, expect } = require("@playwright/test");
const { log } = require("console");
const { POManager } = require("../pageObjects/POManager");
const productDetails = JSON.parse(JSON.stringify(require("./utils/orderDetails.json")));

for (const data of productDetails) {
  test(`Test Application - ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = await poManager.getLoginPage();
    await loginPage.goToLogin();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();

    // Cart - Page
    const cartPage = await poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.navigateToCheckOut();
    // CheckoutPage
    const checkOutPage = await poManager.getCheckOutPage();
    await checkOutPage.enterDetailsAndPlaceOrder("India", data.username);

    const orderSummaryPage = await poManager.getOrderSummaryPage();
    const orderId = await orderSummaryPage.confirmOrderAndGetOrderId();
    await orderSummaryPage.navigateToOrdersPage();

    const ordersPage = await poManager.getOrdersPage();
    await ordersPage.verifyOrder(orderId);
  });
}
