@Smoke
Feature: Balance tests

	@INTGR-18
	Scenario Outline: INTGR-18_1 Verify reponse from account info for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-18
	Scenario Outline: INTGR-18_2 Basic operations with the balance for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		When add amount 30.00 balance for '<username>' user
		Then corresponding response is
			| statusCode          | 200   |
			| body.result.balance | 30.00 |
		And get valid account info for '<username>' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 30.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		When remove balance 30.00 for '<username>' user
		Then corresponding response is
			| statusCode          | 200  |
			| body.result.balance | 0.00 |
		And get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-18
	Scenario Outline: INTGR-18_3 Try to remove insufficieant balance for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		When add amount 30.00 balance for '<username>' user
		And get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 30.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		When remove balance 60.00 for '<username>' user
		Then get corresponding response error code and message
			| statusCode             | 400               |
			| body.errors[0].code    | 5004              |
			| body.errors[0].message | Not enough funds! |
		And get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 30.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		When remove all balance for '<username>' user
		And get valid account info for '<username>' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-18
	Scenario Outline: INTGR-18_4 Bonus with cents for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		When add amount 30.13 balance for '<username>' user
		And get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 30.13 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		And remove all balance for '<username>' user
		And get valid account info for '<username>' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-18 @BUG_CA-7
	Scenario Outline: INTGR-18_5 Add balance amount less than 0 for <username> user
		Given get valid account info for '<username>' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		When add amount -30.13 balance for '<username>' user
		Then get corresponding response error code and message
			| statusCode             | 400                             |
			| body.errors[0].code    | 5005                            |
			| body.errors[0].message | Amount can't be less then zero! |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

#	@INTGR-18 @BUG_CA-8
#	Scenario Outline: INTGR-18_6 Remove balance amount less than 0 for <username> user
#		Given get valid account info for '<username>' user by 'login'
#		And account info have the corresponding data for user
#			| statusCode | 200   |
#			| body.result.balance          | 0.00  |
#			| body.result.bonus.amount     | 0.00  |
#			| body.result.bonus.rollover   | 0.00  |
#			| body.result.freespins  | 0.00  |
#		When remove balance -60.00 for '<username>' user
#		Then get corresponding response error code and message
#			| statusCode | 400                             |
#			| body.errors[0].code       | 5005                            |
#			| body.errors[0].message    | Amount can't be less then zero! |
#		And get valid account info for '<username>' user by 'login'
#		And account info have the corresponding data for user
#			| statusCode | 200   |
#			| body.result.balance          | 0.00  |
#			| body.result.bonus.amount     | 0.00  |
#			| body.result.bonus.rollover   | 0.00  |
#			| body.result.freespins  | 0.00  |
#		When remove balance 60.00 for '<username>' user
#		And account info have the corresponding data for user
#			| statusCode | 200   |
#			| body.result.balance          | 0.00  |
#			| body.result.bonus.amount     | 0.00  |
#			| body.result.bonus.rollover   | 0.00  |
#			| body.result.freespins  | 0.00  |
#		Examples:
#			| username      |
#			| BCXTIMRUBTEST |
#			| BCXTIMEURTEST |


