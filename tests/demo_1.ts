import { expect, type Locator, type Page } from '@playwright/test';

let message1: String = 'Hello'
message1 = "bye"

let age1: number = 20;

let isActive : boolean = false
let numberArry: number[] = [1,2,4]

let data: any = "this is a test string"

data = 23

console.log(message1);


function add(a:number,b:number):number{
    return a+b;
}

let res = add(3,5)

let user:{name:string,age:number} = { name : "testName",age:25}

// classes
class CartPage {
    page: Page
    listProduct : Locator
    checkOut: Locator


  constructor(page: any) {
   this.page = page
   this.listProduct = page.locator('div li')
   this.checkOut = page.locator('text=Checkout')
  }

  async verifyProductIsDisplayed(productName) {
    await this.listProduct.first().waitFor()
    expect(
      await this.getProductLocator(productName).isVisible()
    ).toBeTruthy()
    
 }
 
 async navigateToCheckOut() {
  await this.checkOut.click()
 }

 getProductLocator(productName){
  return this.page.locator(`h3:has-text("${productName}")`);
 }
}