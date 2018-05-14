@Smoke
Feature: Account tests

	@INTGR-29
	Scenario Outline: INTGR-29_1 Find account success
		Then try to get account info by <field> for <value> true
		Examples:
			| field      | value         |
			| login      | BCXTIMRUBTEST |
			| account_id | 1004546       |


	@INTGR-29
	Scenario Outline: INTGR-29_2 Can not find account by login
		Then try to get account info by <field> for <value> false
		Examples:
			| field      | value           |
			| login      | BCXTIMRUBTEST1  |
			| account_id | 100454600000000 |
