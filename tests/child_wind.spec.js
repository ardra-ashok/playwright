const { test, expect } = require('@playwright/test')
const { log } = require('console')

test('Test Login', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const username = page.locator('#username')
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const documentLink = page.locator("[href*='documents-request']")
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ])
  const text = await newPage.locator('.red').textContent()
  const userName = text.split('@')[1].split(' ')[0]

  await page.locator('#username').fill(userName)
  const test = await page.locator('#username').textContent()

  console.log(test)

  await page.pause()
})
