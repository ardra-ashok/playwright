const { test, expect } = require('@playwright/test')
const { log } = require('console')
const { LoginPage } = require('../pageObjects/LoginPage')
const { DashboardPage } = require('../pageObjects/DashboardPage')

test('Test Application', async ({ page }) => {
 const username = 'piyaasok@gmail.com'
 const password = 'Test!12345'
 const productName = 'IPHONE 13 PRO'
 const products = page.locator('.card-body')
 const loginPage = new LoginPage(page)
 const dashboardPage = new DashboardPage(page)
 await loginPage.goToLogin()
 await loginPage.validLogin(username, password)
 await dashboardPage.searchProduct(productName)
 await dashboardPage.navigateToCart()
})