Feature: Ecommerce Validations
   @validations
   Scenario Outline: Placing the order
     Given I login to Ecomm App with "<username>" and "<password>"
     Then I verify error messag is displayed

     Examples:
     | username          | password    |
     | anshika@gmail.com | IamKing@000 |
     | hello@123.com     | Iamhello!12 |