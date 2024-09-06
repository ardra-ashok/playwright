const { test, expect } = require('@playwright/test')
const { log } = require('console')

test.only('Frames', async ({ page }) => {
 await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
 // await page.goto('https://www.google.com/')
 // await page.goBack()
 // await page.goForward()

 await expect(page.locator('#displayed-text')).toBeVisible()
 await page.click('#hide-textbox');
 await expect(page.locator('#displayed-text')).toBeHidden()
 await page.pause()
 page.on('dialog', dialog => dialog.accept());
 await page.click('#confirmbtn')
 await page.locator('#mousehover').hover()
 const framesPage = page.frameLocator('#courses-iframe')
 framesPage.locator('li a[href*="lifetime-access"]:visible').click()
 const textCheck = await framesPage.locator('.text h2').textContent()
 console.log(textCheck.split(' ')[1]);
})