const { After,Before, Status, BeforeAll,AfterStep } = require('@cucumber/cucumber')
const playwright = require('@playwright/test')
const { POManager } = require('../../pageObjects/POManager')

Before(async function () {
  const browser = await playwright.chromium.launch({ headless: false })
  const context = await browser.newContext()
  this.page = await context.newPage()
})

After(async function () {
  console.log('I am the last to execute')
})

Before(async function () {
})
AfterStep(async function ({result}) {
  if (result.status === Status.FAILED)
    await this.page.screenshot({path:'screenshots/screenshot1.png'})
})

