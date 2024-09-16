import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'

import { DashboardPage } from './DashboardPage'
import { CartPage } from './CartPage'
import { CheckOutPage } from './CheckOutPage'
import { OrderSummaryPage } from './OrderSummaryPage'
import { OrdersPage } from './OrdersPage'

export class POManager {
  page: Page
  loginPage: LoginPage
  dashboardPage: DashboardPage
  cartPage: CartPage
  checkOutPage: CheckOutPage
  orderSummaryPage: OrderSummaryPage
  ordersPage: OrdersPage
  
  constructor(page:Page) {
    this.page = page
    this.loginPage = new LoginPage(this.page)
    this.dashboardPage = new DashboardPage(this.page)
    this.cartPage = new CartPage(this.page)
    this.checkOutPage = new CheckOutPage(this.page)
    this.orderSummaryPage = new OrderSummaryPage(this.page)
    this.ordersPage = new OrdersPage(this.page)
  }

  getLoginPage() {
    return this.loginPage
  }

  getDashboardPage() {
    return this.dashboardPage
  }

  getCartPage() {
    return this.cartPage
  }

  getCheckOutPage() {
    return this.checkOutPage
  }

  getOrderSummaryPage() {
    return this.orderSummaryPage
  }
  getOrdersPage() {
    return this.ordersPage
  }
}

module.exports = { POManager }
