const { expect } = require('@playwright/test')

class CartPage {
  constructor(page) {
   this.page = page
   this.listProduct = page.locator('div li')
   this.checkOut = page.locator('text=Checkout')
  }

  async verifyProductIsDisplayed(productName) {
    await this.listProduct.first().waitFor()
    expect(
      await this.getProductLocator(productName).isVisible()
    ).toBeTruthy()
    
 }
 
 async navigateToCheckOut() {
  await this.checkOut.click()
 }

 getProductLocator(productName){
  return this.page.locator(`h3:has-text("${productName}")`);
 }
}

module.exports = { CartPage }

