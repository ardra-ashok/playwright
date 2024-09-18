const { expect } = require('@playwright/test')
class LoginPage {
  constructor(page) {
    this.page = page
    this.signInButton = page.locator("[value='Login']")
    this.userName = page.locator('#userEmail')
    this.password = page.locator('#userPassword')
  }

  async goToLogin() {
    await this.page.goto('https://rahulshettyacademy.com/client')
  }
  async validLogin(username, password) { 
 
   expect(await this.page.isVisible('form input[value="Login"]')).toBeTruthy()
    await this.userName.fill(username) 
    await this.password.fill(password) 
    console.log('clicking...')
    await this.signInButton.click({ force: true })
    await this.page.waitForLoadState('networkidle')
  }
}
module.exports = { LoginPage }
