Feature: Make menu
  As a user
  I want to use web food calculator
  So that I can make my daily keto diet menu

  @javascript
  Scenario: Calculate my calories expenditure
    When I visit "root" page
    Then I should see "Molimo Vas da uneste podatke neophodne za određivanje kalorijskog deficita."
    And I select fields with values
      | height | weight | age |   sex | activity_level |
      |    200 |     73 |  31 | muški | umereno        |
    And I select "20%" from "deficit"
    And I press "Izračunaj!"
    Then I should see "Vaš dnevni utrošak kalorija iznosi 3053. Dozvoljeni unos kalorija za vreme dijete - 2442 kcal."
