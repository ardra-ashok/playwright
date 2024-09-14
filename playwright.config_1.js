// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: "./tests/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  projects: [
    {
      name: "Safari",
      use: {
        browserName: "webkit",
        headless: true,
        screensFhot: "only-on-failure",
        trace: "on",
        ignoreHTTPSErrors:true, // permissions for disabling ssl error
        permissions:['geolocation'], // allowing locations
        viewport:{width:720,height:720},
        // ...devices["iPhone 11"],
        video:'retain-on-failure'
        // trace: 'on-first-retry',
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screensFhot: "only-on-failure",
        trace: "on",
        ...devices["iPhone 11"],
        // trace: 'on-first-retry',
      },
    },
  ],

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   }]
});