@Smoke @BUG_NR-169
Feature: Freespin tests

	@INTGR-20 @BUG_NR-169
	Scenario Outline: INTGR-20_1 Basic operations with freespins for <username> user
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
		Then corresponding response is
			| statusCode               | 200      |
			| body.result.bonus.status | active   |
			| body.result.bonus.type   | freespin |
		And get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 0.00  |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 10.05 |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-20
	Scenario Outline: INTGR-20_2 Create bonus with status <status> and verify response
		Given add freespin for 'BCXTIMRUBTEST' user with bellow data
			| status     | <status>            |
			| amount     | 10.05               |
			| wager      | 10                  |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		Then corresponding response is
			| statusCode               | 200              |
			| body.result.bonus.status | <responseStatus> |
			| body.result.bonus.type   | freespin         |
		Examples:
			| status | responseStatus |
			| new    | new            |
			| active | active         |

	@INTGR-20
	Scenario: INTGR-20_3 Verify that only 1 active bonus can be
		Given get 'active' bonus from bonus list for 'BCXTIMRUBTEST' user
		And freespin size is 0
		When add freespin for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.05               |
			| wager      | 10                  |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		And corresponding response is
			| statusCode | 200 |
		And get 'active' bonus from bonus list for 'BCXTIMRUBTEST' user
		Then freespin size is 1
		When add freespin for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.05               |
			| wager      | 10                  |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		And corresponding response is
			| statusCode | 200 |
		And get 'active' bonus from bonus list for 'BCXTIMRUBTEST' user
		Then freespin size is 1