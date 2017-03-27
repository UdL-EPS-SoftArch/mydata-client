Feature: List Schemas
  In order to know about available schemas
  As a schema user
  I want to list them

  Scenario: List all schemas when none yet
    Given I'm in the home page
    When I click menu option "Schemas"
    Then I see 0 schemas

  Scenario: List all schemas when one created
    Given I click sign out
    Given I sign in as "owner" with password "password"
    And I create a schema with title "Test" and description "Test schema"
    When I click menu option "Schemas"
    Then I see 1 schemas

