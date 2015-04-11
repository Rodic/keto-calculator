Feature: Add food item
  As a user
  So that I can know more about nutritional and other data of specific item
  I want be able to see them

  Scenario: Add food item successfully
    Given I am on "new_food_item" page
    And I fill fields with values
      | Naziv  | Ključna reč | Brend | Kalorije | Proteini | Ugljeni hidrati | Masti | Količina | Jedinica mere |
      | Jogurt | jogurt      | Imlek |    52.80 |     2.90 |            4.00 |  2.80 |      100 | grams         |
    And I press "Dodaj"
    Then I should be on "Jogurt" food item page
    And I should see values
      | Naziv  | Ključna reč | Brend | Kalorije | Proteini | Ugljeni hidrati | Masti | Količina | Jedinica mere |
      | Jogurt | jogurt      | Imlek |    52.8  |     2.9  |            4.0  |  2.8  |      100 | grams         |
    And I should see "Hvala Vam. Namirnica će postati dostupna nakon verifikacije."

  
  Scenario: Add food item without name
    Given I am on "new_food_item" page
    And I fill fields with values
      | Naziv | Ključna reč | Brend | Kalorije | Proteini | Ugljeni hidrati | Masti | Količina | Jedinica mere |
      |       | jogurt      | Imlek |    52.80 |     2.90 |            4.00 |  2.80 |      100 | grams         |
    And I press "Dodaj"
    Then I should be on "food_items" page
    And I should see "Namirnica nije dodata. Molimo Vas da proverite ispravnost upisanih vrednosti."


  Scenario: Add food item with calories non-numerical
    Given I am on "new_food_item" page
    And I fill fields with values
      | Naziv  | Ključna reč | Brend | Kalorije | Proteini | Ugljeni hidrati | Masti | Količina | Jedinica mere |
      | Jogurt | jogurt      | Imlek | dosta    |     2.90 |            4.00 |  2.80 |      100 | grams         |
    And I press "Dodaj"
    Then I should be on "food_items" page
    And I should see "Namirnica nije dodata. Molimo Vas da proverite ispravnost upisanih vrednosti."
