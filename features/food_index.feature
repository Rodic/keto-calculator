Feature: Food index
  As a user
  So that I can have overview of available food items
  I want to be able to have them listed in food index page

  Scenario: List food
    Given there are following food items
      | name                | keyword  | brand  |
      | Moja kravica jogurt | jogurt   | Imlek  |
      | Celo jaje, kuvano   | jaje     |        |
      | Pileci batak        | piletina |        |
      | Grasak              | grasak   | Frikom |
    When I visit "food_items" page
    Then I should see following items
      | name                |
      | Moja kravica jogurt |
      | Celo jaje, kuvano   |
      | Pileci batak        |
      | Grasak              |
