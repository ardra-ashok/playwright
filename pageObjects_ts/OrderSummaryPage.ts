import { test, expect, Locator, Page } from '@playwright/test'

export class OrderSummaryPage {
  page: Page
  successMsg: Locator
  orderId: Locator
  ordersPage:Locator
  constructor(page:Page) {
    this.page = page
    this.successMsg = page.locator('.hero-primary')
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted')
    this.ordersPage = page.locator('button[routerlink="/dashboard/myorders"]')
  }

  async confirmOrderAndGetOrderId() {
    await expect(this.successMsg).toHaveText(' Thankyou for the order. ')
   
    let orderId: string | null = await this.orderId.textContent()
    if (orderId) {
       orderId = orderId.replace(/\|/g, '').trim()
      return orderId
    }
  }
  async navigateToOrdersPage() {
    await this.ordersPage.click()
  }
}

module.exports = { OrderSummaryPage }
