Feature: Make menu
  As a user
  I want to use web food calculator
  So that I can make my daily keto diet menu

  @javascript
  Scenario: Calculate my calories expenditure
    When I visit "root" page
    Then I should see "Molimo Vas da uneste podatke neophodne za određivanje kalorijskog deficita."
    And I select fields with values
      | Visina | Težina | Godine | Pol   | Nivo aktivnosti |
      |    200 |     73 |     31 | muški | umereno         |
    And I press "Izračunaj!"
    Then I should see "Vaš dnevni utrošak kalorija iznosi 3053. Za vreme dijete unosite 2553 kalorije."
