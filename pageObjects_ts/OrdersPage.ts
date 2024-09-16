import { Locator, Page, expect } from "playwright/test";


export class OrdersPage {
  page: Page
  ordersRow: Locator
  viewButton: Locator
  orderIdText:Locator
  constructor(page:Page) {
    this.page = page;
    this.ordersRow = page.locator("tr.ng-star-inserted th");
    this.viewButton = page.locator("td button");
    this.orderIdText = this.page.locator(".col-text");
  }

  async verifyOrder(orderId:any) {
    await this.ordersRow.first().waitFor();
    const orderIds = await this.ordersRow.allTextContents();
    const viewButton = this.viewButton.first();
    orderIds.forEach(async (text, index) => {
      if (text.trim() === orderId) {
        await viewButton.nth(index).click();
      }
    });
    await expect(this.orderIdText).toHaveText(orderId);
  }
}

module.exports = { OrdersPage };
