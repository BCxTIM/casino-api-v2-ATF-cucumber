@Smoke
Feature: Bonus tests

	@INTGR-19
	Scenario Outline: INTGR-19_1 Basic operations with bonuses for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| field      | value |
			| statusCode | 200   |
			| balance    | 0.00  |
			| amount     | 0.00  |
			| rollover   | 0.00  |
			| freespins  | 0.00  |
		When add bonus for '<username>' user with bellow data
			| status     | active              |
			| amount     | 10.05               |
			| wager      | 10                  |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:MM:ss |
			| statusCode | 200                 |
		And get valid account info for '<username>' user by 'login'
		Then account info have the corresponding data for user
			| field      | value  |
			| statusCode | 200    |
			| balance    | 0.00   |
			| amount     | 10.05  |
			| rollover   | 100.50 |
			| freespins  | 0.00  |
		When get 'active' bonus from bonus list for '<username>' user
		Then update 'active' bonus with new status 'canceled' for '<username>' user
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-19 @BUG_CA-5
	Scenario Outline: INTGR-19_2 Add bonus with data less than 0 for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| field      | value |
			| statusCode | 200   |
			| balance    | 0.00  |
			| amount     | 0.00  |
			| rollover   | 0.00  |
			| freespins  | 0.00  |
		When add bonus for '<username>' user with bellow data
			| status     | active              |
			| amount     | <bonus_amount>      |
			| wager      | <wager>             |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:MM:ss |
			| statusCode | 400                 |
		Then get corresponding response error code and message
			| field      | value     |
			| statusCode | 400       |
			| code       | <code>    |
			| message    | <message> |
		When get valid account info for '<username>' user by 'login'
		Then account info have the corresponding data for user
			| field      | value |
			| statusCode | 200   |
			| balance    | 0.00  |
			| amount     | 0.00  |
			| rollover   | 0.00  |
			| freespins  | 0.00  |
		Examples:
			| username      | bonus_amount | wager | code | message                          |
			| BCXTIMRUBTEST | -10.05       | 10    | 5005 | Account can't be less then zero! |
			| BCXTIMRUBTEST | 10.05        | -10   | 5005 | Wager can't be less then zero!   |
			| BCXTIMEURTEST | -10.05       | 10    | 5005 | Account can't be less then zero! |
			| BCXTIMEURTEST | 10.05        | -10   | 5005 | Wager can't be less then zero!   |

	@INTGR-19 @BUG_CA-6
	Scenario Outline: INTGR-19_3 Add bonus with non existing status for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| field      | value |
			| statusCode | 200   |
			| balance    | 0.00  |
			| amount     | 0.00  |
			| rollover   | 0.00  |
			| freespins  | 0.00  |
		When add bonus for '<username>' user with bellow data
			| status     | non existing status |
			| amount     | 10.05               |
			| wager      | 10                  |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:MM:ss |
			| statusCode | 400                 |
		Then get corresponding response error code and message
			| field      | value   |
			| statusCode | 400     |
			#should be set code and message after fixing bug
			| code       | code    |
			| message    | message |
		When get valid account info for '<username>' user by 'login'
		Then account info have the corresponding data for user
			| field      | value |
			| statusCode | 200   |
			| balance    | 0.00  |
			| amount     | 0.00  |
			| rollover   | 0.00  |
			| freespins  | 0.00  |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-19
	Scenario: INTGR-19_4 Update not existing bonus
		Given update not exisging bonus by id 999999 to 'canceled'
		Then get corresponding response error code and message
			| field      | value           |
			| statusCode | 400             |
			| code       | 2120            |
			| message    | Bonus not found |

	@INTGR-19
	Scenario: INTGR-19_5 Update existing bonus to not valid status
		Given update exisging bonus by id 1350 to not valid 'canceledddd' status
		Then get corresponding response error code and message
			| field      | value         |
			| statusCode | 400           |
			| code       | 5007          |
			| message    | Wrong status! |
