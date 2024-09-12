const { expect } = require("@playwright/test");

class OrderSummaryPage {
  constructor(page) {
    this.page = page;
    this.successMsg = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    this.ordersPage = page.locator('button[routerlink="/dashboard/myorders"]');
  }

  async confirmOrderAndGetOrderId() {
    await expect(this.successMsg).toHaveText(" Thankyou for the order. ");
    let orderId = await this.orderId.textContent();
    orderId = orderId.replaceAll("|", "").trim();
    return orderId;
  }
  async navigateToOrdersPage(){
    await this.ordersPage.click();
  }
}

module.exports  = { OrderSummaryPage }