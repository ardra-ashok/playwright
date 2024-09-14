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
   -->

