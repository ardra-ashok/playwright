const { count } = require("console")
import { expect, Locator, Page } from '@playwright/test'

export class CheckOutPage {
  page: Page
  countryInput: Locator
  countryOptionsSelect: Locator
  buttons: Locator
  usernameverify: Locator
  placeOrderBtn: Locator

  constructor(page:Page) {
    this.page = page
    this.countryInput = page.locator('[placeholder*="Select Country"]')
    this.countryOptionsSelect = page.locator('.ta-results')
    this.buttons = this.countryOptionsSelect.locator('button')
    this.usernameverify = page.locator('.user__name [type="text"]')
    this.placeOrderBtn = page.locator('a:has-text("PLACE ORDER")')
  }

  async enterDetailsAndPlaceOrder(country:string, username:string) {
    await this.countryInput.pressSequentially(country.substring(0, 3))
    await this.buttons.first().waitFor()
    const buttonTexts = await this.buttons.allTextContents()
    buttonTexts.forEach(async (text, index) => {
      if (text.toLowerCase().trim() === country.toLowerCase())
        await this.buttons.nth(index).click()
    })
    await expect(this.usernameverify.first()).toHaveText(username)
    await this.placeOrderBtn.click()
  }
}

module.exports = { CheckOutPage };
