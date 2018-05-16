@Smoke
Feature: Account tests

	@INTGR-29
	Scenario Outline: INTGR-29_1 Find account success <value> by <field>
		Given get valid account info for '<value>' user by '<field>'
		Then account info have the corresponding data for user
			| field      | value |
			| statusCode | 200   |
			| balance    | 0.00  |
			| amount     | 0.00  |
			| rollover   | 0.00  |
			| freespins  | 0.00  |
		Examples:
			| field      | value         |
			| login      | BCXTIMRUBTEST |
			| account_id | 1004546       |


	@INTGR-29
	Scenario Outline: INTGR-29_2 Can not find account with <value> by <field>
		Given get invalid account info for '<value>' user by '<field>'
		Then get corresponding response error code and message
			| field      | value              |
			| statusCode | 400                |
			| code       | 5002               |
			| message    | Account not found! |
		Examples:
			| field      | value             |
			| login      | NON_EXISTING_USER |
			| account_id | 100454600000001   |
