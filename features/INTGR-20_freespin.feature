@Smoke
Feature: Freespin tests

	@INTGR-20
	Scenario Outline: Basic operations with freespins for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| field      | value |
			| statusCode | 200   |
			| balance    | 0.00  |
			| amount     | 0.00  |
			| rollover   | 0.00  |
			| freespins  | 0.00  |
		When add freespin for '<username>' user with bellow data
			| status     | active              |
			| amount     | 10.05               |
			| wager      | 10                  |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:MM:ss |
			| statusCode | 200                 |
		And get valid account info for '<username>' user by 'login'
		Then account info have the corresponding data for user
			| field      | value |
			| statusCode | 200   |
			| balance    | 0.00  |
			| amount     | 0.00  |
			| rollover   | 0.00  |
			| freespins  | 10.05 |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |