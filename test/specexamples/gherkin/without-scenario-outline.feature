Feature: eating

  Scenario: eating cucumbers
    Given there are 6 cucumbers
    When I eat 4 cucumbers
    Then I should have 2 cucumbers
         
  Scenario: eating apples
    Given there are 5 apples
    When I eat 2 apples
    Then I should have 2 apples