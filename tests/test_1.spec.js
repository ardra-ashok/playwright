const { test, expect } = require('@playwright/test')
const { log } = require('console')

test('Test Login', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const userName = page.locator('#username')
  const signIn = page.locator('#signInBtn')
  const prodTitles = page.locator('.card-body a')
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  console.log(await page.title())

  await userName.fill('rahulshetty')
  await page.locator('[type="password"]').fill('learning')
  await signIn.click()
  console.log(await page.locator("[style*='block']").textContent())
  await expect(page.locator("[style*='block']")).toContainText('Incorrect')
  await userName.fill('')
  await userName.fill('rahulshettyacademy')
  await signIn.click()
  console.log(await prodTitles.first().textContent())
  console.log(await prodTitles.nth(1).textContent())
  const allTitles = await prodTitles.allTextContents()
  console.log(allTitles)
})

test('Page playwright Test', async ({ page }) => {
  // await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  await page.goto('https://google.com')
  console.log(await page.title())
  await expect(page).toHaveTitle('Google')
})

test('Test Login - Excercise', async ({ page }) => {
  // const context = await browser.newContext()
  // const page = await context.newPage()

  const firstName = page.locator('#firstName')
  const lastName = page.locator('#lastName')
  const email = page.locator('#userEmail')
  const registerPageBtn = page.locator('.login-wrapper-footer-text')
  const phone = page.locator('#userMobile')
  const password = page.locator('#userPassword')
  const confirmPassword = page.locator('#confirmPassword')
  const loginBtn = page.locator('#login')
  const ageConfirm = page.locator('[type="checkbox"]')
  const emailValue = 'test_6@automation.com'
  const pw = 'testPw!123'
  const cardTitle = page.locator('.card-body h5 b')

  // Register
  await page.goto('https://rahulshettyacademy.com/client')
  await registerPageBtn.click()
  await firstName.fill('testFName')
  await lastName.fill('testLName')
  await email.fill(emailValue)
  await phone.fill('1234567890')
  await password.fill(pw)
  await confirmPassword.fill(pw)
  await ageConfirm.check()
  await loginBtn.click()

  // login
  await page.goto('https://rahulshettyacademy.com/client')
  await email.fill(emailValue)
  await password.fill(pw)
  await loginBtn.click()

  await cardTitle.first().waitFor()
  console.log(await cardTitle.first().textContent())
  // await page.waitForLoadState('networkidle') // discouraged

  console.log(await cardTitle.allTextContents())
})
