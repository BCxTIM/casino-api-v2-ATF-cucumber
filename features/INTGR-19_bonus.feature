@Smoke
Feature: Bonus tests

	@INTGR-19
	Scenario Outline: INTGR-19_1 Basic operations with bonuses
		Given get account info for '<username>' user
		And account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		When add bonus for '<username>' user with bellow data
			| status        | active              |
			| amount        | 10.05               |
			| wager         | 10                  |
			| timestamp     | {"hours": 1}        |
			| format        | YYYY-MM-DD HH:MM:ss |
			| response_code | 200                 |
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 10.05  |
			| rollover | 100.50 |
		And get 'active' bonus from bonus list for '<username>' user
		Then update 'active' bonus with new status 'canceled' for '<username>' user
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-19 @BUG_CA-5
	Scenario Outline: INTGR-19_2 Add bonus with data less than 0
		Given get account info for '<username>' user
		And account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		When add bonus for '<username>' user with bellow data
			| status        | active              |
			| amount        | <bonus_amount>      |
			| wager         | <wager>             |
			| timestamp     | {"hours": 1}        |
			| format        | YYYY-MM-DD HH:MM:ss |
			| response_code | 400                 |
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		Examples:
			| username      | bonus_amount | wager |
			| BCXTIMRUBTEST | -10.05       | 10    |
			| BCXTIMRUBTEST | 10.05        | -10   |
			| BCXTIMEURTEST | -10.05       | 10    |
			| BCXTIMEURTEST | 10.05        | -10   |

	@INTGR-19 @BUG_CA-6
	Scenario Outline: INTGR-19_3 Add bonus with non existing status
		Given get account info for '<username>' user
		And account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		When add bonus for '<username>' user with bellow data
			| status        | non existing status |
			| amount        | 10.05               |
			| wager         | 10                  |
			| timestamp     | {"hours": 1}        |
			| format        | YYYY-MM-DD HH:MM:ss |
			| response_code | 400                 |
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

