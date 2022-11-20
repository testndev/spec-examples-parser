Feature: eating

  Scenario Outline: eating cucumbers
    Given there are <start> cucumbers
    When I eat <eat> cucumbers
    Then I should have <left> cucumbers

    Examples: 
    |  start | eat | left |
    |     12 |   5 |    7 |
    |     20 |   5 |   15 |

         
  Scenario Outline: eating apples
    Given there are <start> apples
    When I eat <eat> apples
    Then I should have <left> apples

    Examples: 
      | start | eat | left |
      |    10 |   4 |    6 |
