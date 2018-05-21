@Smoke
Feature: Account tests

	@INTGR-29
	Scenario Outline: INTGR-29_1 Find account success <value> by <field>
		Given get valid account info for '<value>' user by '<field>'
		Then account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		Examples:
			| field      | value         |
			| login      | BCXTIMRUBTEST |
			| account_id | 1004546       |


	@INTGR-29
	Scenario Outline: INTGR-29_2 Can not find account with <value> by <field>
		Given get invalid account info for '<value>' user by '<field>'
		Then get corresponding response error code and message
			| statusCode             | 400                |
			| body.errors[0].code    | 5002               |
			| body.errors[0].message | Account not found! |
		Examples:
			| field      | value             |
			| login      | NON_EXISTING_USER |
			| account_id | 100454600000001   |
