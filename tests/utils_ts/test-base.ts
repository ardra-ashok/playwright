// const { base } = require("@playwright/test");

// exports.test = base.test.extend({
//   testDataForOrder: {
//     username: "piyaasok@gmail.com",
//     password: "Test!12345",
//     productName: "IPHONE 13 PRO",
//   },
// });
import { test as base } from "@playwright/test";
// interface testDataForOrder: {
//   userName: string;
//   password: string;
  
// }

// Define custom fixtures
const test = base.extend({
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
