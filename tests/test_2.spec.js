const { test, expect } = require('@playwright/test')
const { log } = require('console')


test('Test Login - Excercise', async ({ page }) => {
 await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
 const userName = page.locator('#username')
 const signIn = page.locator('#signInBtn')
 const dropDown = page.locator('select.form-control')
 const documentLink = page.locator("[href*='documents-request']")

 await dropDown.selectOption('consult')
 await page.locator('.radiotextsty').last().click()
 await page.locator('#okayBtn').click()

 
 await expect(page.locator('.radiotextsty').last()).toBeChecked()
 // another method 
 // console.log(await page.locator('.radiotextsty').last().isChecked())

 await page.locator('#terms').click()
 await expect(page.locator('#terms')).toBeChecked()
 await page.locator('#terms').uncheck()
 expect(await page.locator('#terms').isChecked()).toBeFalsy()
 await expect(documentLink).toHaveAttribute("class","blinkingText")


 // await page.pause()

 

})