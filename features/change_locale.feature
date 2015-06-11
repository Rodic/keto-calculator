Feature: Change locale
  As a user
  I want to choose app language
  So that I can use one I'm more familiar with

  Scenario: Use 'en' locale
    Given locale is set to "sr"
    When I visit "root" page
    And I click "en"
    Then I should see "Keto Calculator"
    And I should see "Please enter required information."

  Scenario: Use 'sr' locale
    Given locale is set to "en"
    When I visit "root" page
    And I click "sr"
    Then I should see "Keto Kalkulator"
    And I should see "Molimo Vas da uneste neophodne podatke."
