// const { base } = require("@playwright/test");

// exports.test = base.test.extend({
//   testDataForOrder: {
//     username: "piyaasok@gmail.com",
//     password: "Test!12345",
//     productName: "IPHONE 13 PRO",
//   },
// });
import { test as base } from "@playwright/test";

interface TestDataForOrder {
  username: string
  password: string
  productName: string
}

const test = base.extend<{testDataForOrder:TestDataForOrder}>({
  testDataForOrder: async ({}, use) => {
    const testDataForOrder = {
      username: "piyaasok@gmail.com",
      password: "Test!12345",
      productName: "IPHONE 13 PRO",
    };
    await use(testDataForOrder);
  },
});

export { test };
