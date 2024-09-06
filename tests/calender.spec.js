const { test, expect } = require('@playwright/test')
const { log } = require('console')
const { SourceTextModule } = require('vm')

test.only('Calender Validation', async ({ page }) => {
  const monthNumber = 7
  const date = '25'
  const year = '1984'

  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
  await page.locator('.react-date-picker__inputGroup').click()
  await page.locator('.react-calendar__navigation__label').click()
  await page.locator('.react-calendar__navigation__label').click()
  await page.locator('.react-calendar__navigation__label').click()
  await page
    .locator(
      'div.react-calendar__navigation .react-calendar__navigation__arrow'
    )
    .first()
    .click()
  await page.getByRole('button', { name: '– 1990' }).click()
  await page.getByText(year).click()
  await page.waitForSelector('.react-calendar__year-view__months__month')
  await page
    .locator('.react-calendar__year-view__months__month')
    .nth(monthNumber - 1)
    .click()
  await page.locator(`xpath=//abbr[text()='${date}']`).nth(1).click()

  const expectedList = [monthNumber, date, year]
  const inputs = await page.locator('input[inputmode*="numeric"]')
  const inputCount = await inputs.count()


  for (let index = 0; index < inputCount; index++) {
    const value = await inputs.nth(index).getAttribute('value')
    await expect(value).toBe(String(expectedList[index]))
  }
})
