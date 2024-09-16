import { POManager } from "../pageObjects_ts/POManager"
import { test } from "./utils_ts/test-base";

test('should display correct title and content', async ({
  page,
  testDataForOrder,
}: {
  page: any
    testDataForOrder: {
      username: string
      password: string
      productName: string
  }
}) => {
  const poManager = new POManager(page)
  console.log('Fixture data:', testDataForOrder)

  const loginPage = await poManager.getLoginPage()
  await loginPage.goToLogin()
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password
  )
  
  const dashboardPage = await poManager.getDashboardPage()
  await dashboardPage.searchProduct(testDataForOrder.productName)
  await dashboardPage.navigateToCart()

  // Cart - Page
  const cartPage = await poManager.getCartPage()
  await cartPage.verifyProductIsDisplayed(testDataForOrder.productName)
  await cartPage.navigateToCheckOut()
})
