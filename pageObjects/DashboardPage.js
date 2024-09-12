class DashboardPage {
  constructor(page) {
    this.page = page
    this.products = page.locator('.card-body')
    this.productsText = page.locator('.card-body b')
    this.cart = page.locator('[routerlink*="cart"]')
  }

  async searchProduct(productName) {
    await this.page.waitForLoadState('networkidle')
    await this.page.waitForURL(
      'https://rahulshettyacademy.com/client/dashboard/dash'
    ) 

    const titles = await this.productsText.allTextContents()
    console.log(titles)

    const count = await this.products.count()
    for (let i = 0; i < count; i++) {
      if (
        const textContent = await this.products.nth(i).locator('b').textContent().trim()
        if(textContent == productName)
      ) {
        await this.products.nth(i).locator('text=Add To Cart').click()
        break
      }
    }
  }

  async navigateToCart() {
    await this.cart.click()
  } 
}

module.exports = { DashboardPage }