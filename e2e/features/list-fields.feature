Feature: List Fields
  In order to know about available fields
  As a field user
  I want to list them

  Scenario: List all fields when none yet
    Given I'm in the home page
    When I click menu option "Fields"
    Then I see 0 fields

  Scenario: List all fields when one created
    Given I click sign out
    And I sign in as "owner" with password "password"
    And I create a field with title "Test" and description "Test field"
    When I click menu option "Fields"
    Then I see 1 fields

