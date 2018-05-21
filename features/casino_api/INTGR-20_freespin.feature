@Smoke
Feature: Freespin tests

	@INTGR-20
	Scenario Outline: Basic operations with freespins for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		When add freespin for '<username>' user with bellow data
			| status     | active              |
			| amount     | 10.05               |
			| wager      | 10                  |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		And get valid account info for '<username>' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 0.00  |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 10.05 |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |