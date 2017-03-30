Feature: Search schemas
  Use the search feature for filter schemas

  Scenario: Search for one schema, and returned one
    Given I sign in as "owner" with password "password"
    And I create a schema with title "Test" and description "Test schema"
    When I click menu option "Schemas"
    And I search "Tes"
    Then I see 1 schema

  Scenario: Search for one schema that not exist, and returned none
    Given I sign in as "owner" with password "password"
    And I create a schema with title "Test" and description "Test schema"
    When I click menu option "Schemas"
    And I search "0"
    Then I see 0 schema
