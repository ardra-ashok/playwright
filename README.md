 
 <!-- Generate script using playwright -->

  <!-- npx playwright codegen  -->
<!-- Run test headed 
  npx playwright test tests/filename -- headed
   npx playwright test --ui
-->


 <!-- run test using custom configuration
 add a seperate custom configuration file; - playwright.config_1.js
  and use while running test like this


  npx playwright test tests/tstname. --config playwright.config1.js  
    
    run using different projects 
npx playwright test tests/tstname. --config playwright.config1.js  --project=chromium
npx playwright test tests/ --config playwright.config1.js  --project=chromium
 
  -->

  <!-- npx playwright test "tests/uiBasics.spec.js" --config=playwright.config_1.js --project=chrome -->

  <!-- change mode to parallel mode in any spec test
    test.describe.configure({mode:'parallel'})

  serial mode: 
    if one test fail other tests will not get executed

    to skip some tests 
    test.skip

    Adding test tags
    npx playwright test --grep "@Web"

    generate allure reporting 
    npx playwright test --grep "@Web" --reporter=line,allure-playwright

  To create allure html template
  npx allure generate ./allure-results --clean

  npx allure open ./allure-report
   -->

   <!-- Run a specific cucumber feature file
    npx cucumber-js
    npx cucumber-js .\features\errorvalidations.feature
    npx cucumber-js --tags "@Regression"
    -->

  <!-- Tagged Hooks -->
  <!-- 
  Before({tags:"@foo"},async function () {})
  Before({tags:"@foo and @bar"},async function () {})
  Before({tags:"@foo or @bar"},async function () {})
   -->

  <!-- Execute Parallely
    npx cucumber-js features/errorvalidations.feature --parallel 2 
   -->

   <!-- Generate a HTML report 
    npx cucumber-js .\features\ecommerce.feature --parallel 2 --format html:cucumber-report.html
    -->
