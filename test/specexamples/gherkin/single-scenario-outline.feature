Feature: eating

  Scenario Outline: eating apples
    Given there are <start> apples
    When I eat <eat> apples
    Then I should have <left> apples

    Examples: 
      | start | eat | left |
      |    10 |   4 |    6 |
