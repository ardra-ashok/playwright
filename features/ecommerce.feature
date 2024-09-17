Feature: Ecommerce Validations
    
    Scenario: Placing the order
        Given I login to Ecommerce application using "piyaasok@gmail.com" and "Test123451!"
        When I add "IPHONE 13 PRO" to Cart
        Then I verify "IPHONE 13 PRO" is displayed in the Cart
        When I enter valid details and place the order
        Then I verify the order is present in the order history