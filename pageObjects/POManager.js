const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage')
const { CartPage } = require('./CartPage')
const { CheckOutPage } = require('./CheckOutPage')
const { OrderSummaryPage } = require('./OrderSummaryPage')
const { OrdersPage } = require('./OrdersPage')

class POManager {
  constructor(page) {
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
