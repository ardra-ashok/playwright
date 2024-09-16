import { expect,Locator, Page } from '@playwright/test'

export class CartPage {

  page: Page
  listProduct: Locator
  checkOut: Locator
  constructor(page:Page) {
   this.page = page
   this.listProduct = page.locator('div li')
   this.checkOut = page.locator('text=Checkout')
  }

  async verifyProductIsDisplayed(productName: string) {
    await this.listProduct.first().waitFor()
    expect(
      await this.getProductLocator(productName).isVisible()
    ).toBeTruthy()
    
 }
 
 async navigateToCheckOut() {
  await this.checkOut.click()
 }

 getProductLocator(productName:string){
  return this.page.locator(`h3:has-text("${productName}")`);
 }
}

module.exports = { CartPage }

