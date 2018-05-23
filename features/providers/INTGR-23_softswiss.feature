Feature: Softswiss tests

	Background: check if Softswiss Callback API v2.0 is running
		Given check if Softswiss Callback API v2.0 is running
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |

	@INTGR-23 @Smoke
	Scenario: INTGR-23_1 Bet
		And add amount 30.00 balance for 'BCXTIMRUBTEST' user
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 30.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		And player balance for 'BCXTIMRUBTEST' user is following for rollover allowed 100% is 30.00
		When user 'BCXTIMRUBTEST' bet 5.00 amount with rollover allowed 100%
		And corresponding response is
			| statusCode   | 200   |
			| body.balance | 25.00 |
		Then player balance for 'BCXTIMRUBTEST' user is following for rollover allowed 100% is 25.00
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 25.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |

	@INTGR-23 @Smoke
	Scenario: INTGR-23_2 Bet insufficient ammount
		And add amount 30.00 balance for 'BCXTIMRUBTEST' user
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 30.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		And player balance for 'BCXTIMRUBTEST' user is following for rollover allowed 100% is 30.00
		When user 'BCXTIMRUBTEST' bet 60.00 amount with rollover allowed 100%
		Then get corresponding response error code and message
			| statusCode   | 412                                              |
			| body.code    | 100                                              |
			| body.message | Player has not enough funds to process an action |

	@INTGR-23 @Smoke
	Scenario: INTGR-23_3 Bet and win
		And add amount 30.00 balance for 'BCXTIMRUBTEST' user
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 30.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		And player balance for 'BCXTIMRUBTEST' user is following for rollover allowed 100% is 30.00
		When user 'BCXTIMRUBTEST' bet 5.00 and win 10.00 amount with rollover allowed 100%
		Then corresponding response is
			| statusCode   | 200   |
			| body.balance | 35.00 |
		And player balance for 'BCXTIMRUBTEST' user is following for rollover allowed 100% is 35.00
		When get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 35.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |

	@INTGR-23 @Smoke
	Scenario: INTGR-23_4 Rollback
		And add amount 30.00 balance for 'BCXTIMRUBTEST' user
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 30.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		And player balance for 'BCXTIMRUBTEST' user is following for rollover allowed 100% is 30.00
		When user 'BCXTIMRUBTEST' bet 5.00 and win 10.00 amount with rollover allowed 100%
		Then corresponding response is
			| statusCode   | 200   |
			| body.balance | 35.00 |
		When system rollback last action for 'BCXTIMRUBTEST' user
		Then corresponding response is
			| statusCode   | 200   |
			| body.balance | 25.00 |
		And player balance for 'BCXTIMRUBTEST' user is following for rollover allowed 100% is 25.00
		When get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 25.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |

	@INTGR-23
	Scenario: INTGR-23_5 User spent bonus and balance amount
		And add amount 30.00 balance for 'BCXTIMRUBTEST' user
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.00               |
			| wager      | 4                   |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 10.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 20.00 |
			| body.result.bonus.amount   | 10.00 |
			| body.result.bonus.rollover | 30.00 |
			| body.result.freespins      | 0.00  |
		When user 'BCXTIMRUBTEST' bet 10.00 and win 5.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 15.00 |
			| body.result.bonus.amount   | 10.00 |
			| body.result.bonus.rollover | 20.00 |
			| body.result.freespins      | 0.00  |
		When user 'BCXTIMRUBTEST' bet 10.00 and win 15.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 15.00 |
			| body.result.bonus.amount   | 15.00 |
			| body.result.bonus.rollover | 10.00 |
			| body.result.freespins      | 0.00  |
		When user 'BCXTIMRUBTEST' bet 10.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 20.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		When get 'active' bonus from bonus list for 'BCXTIMRUBTEST' user
		Then bonus size is 0


	@INTGR-23
	Scenario: INTGR-23_6 Bet insufficient ammount
		And add amount 30.00 balance for 'BCXTIMRUBTEST' user
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.00               |
			| wager      | 4                   |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 10.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 20.00 |
			| body.result.bonus.amount   | 10.00 |
			| body.result.bonus.rollover | 30.00 |
			| body.result.freespins      | 0.00  |
		When user 'BCXTIMRUBTEST' bet 20.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 0.00  |
			| body.result.bonus.amount   | 10.00 |
			| body.result.bonus.rollover | 10.00 |
			| body.result.freespins      | 0.00  |
		When user 'BCXTIMRUBTEST' bet 40.00 amount with rollover allowed 100%
		Then get corresponding response error code and message
			| statusCode   | 412                                              |
			| body.code    | 100                                              |
			| body.message | Player has not enough funds to process an action |
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 0.00  |
			| body.result.bonus.amount   | 10.00 |
			| body.result.bonus.rollover | 10.00 |
			| body.result.freespins      | 0.00  |
		When user 'BCXTIMRUBTEST' bet 10.00 and win 15.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 15.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |
		When get 'active' bonus from bonus list for 'BCXTIMRUBTEST' user
		Then bonus size is 0


	@INTGR-23
	Scenario: INTGR-23_7 No money for bet
		And add amount 30.00 balance for 'BCXTIMRUBTEST' user
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.00               |
			| wager      | 4                   |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 40.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		When get 'active' bonus from bonus list for 'BCXTIMRUBTEST' user
		Then bonus size is 0


	@INTGR-23
	Scenario: INTGR-23_8 Checking the correct compensation of funds
		And add amount 10.00 balance for 'BCXTIMRUBTEST' user
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 20.00               |
			| wager      | 1                   |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 15.00 and win 30.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 10.00 |
			| body.result.bonus.amount   | 35.00 |
			| body.result.bonus.rollover | 5.00  |
			| body.result.freespins      | 0.00  |

	@INTGR-23
	Scenario: INTGR-23_9 Checking the correct compensation of funds with double win
		And add amount 10.00 balance for 'BCXTIMRUBTEST' user
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 20.00               |
			| wager      | 1                   |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 10.00 and win 15.00 amount with rollover allowed 100%
		And win 20.00 for last bet action for 'BCXTIMRUBTEST' user
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 10.00 |
			| body.result.bonus.amount   | 45.00 |
			| body.result.bonus.rollover | 10.00 |
			| body.result.freespins      | 0.00  |

	@INTGR-23
	Scenario: INTGR-23_10 Check rollover with rollover allowed 20%
		And add amount 20.00 balance for 'BCXTIMRUBTEST' user
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.00               |
			| wager      | 3                   |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 10.00 and win 15.00 amount with rollover allowed 20%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 20.00 |
			| body.result.bonus.amount   | 15.00 |
			| body.result.bonus.rollover | 28.00 |
			| body.result.freespins      | 0.00  |

	@INTGR-23
	Scenario: INTGR-23_11 Check rollover with rollover allowed 0%
		And add amount 20.00 balance for 'BCXTIMRUBTEST' user
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.00               |
			| wager      | 3                   |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 10.00 and win 15.00 amount with rollover allowed 0%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 20.00 |
			| body.result.bonus.amount   | 15.00 |
			| body.result.bonus.rollover | 30.00 |
			| body.result.freespins      | 0.00  |

	@INTGR-23
	Scenario: INTGR-23_12 Check bonus with rollover allowed 0% when real balance was 0
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.00               |
			| wager      | 10                  |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 10.00 and win 15.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 0.00  |
			| body.result.bonus.amount   | 15.00 |
			| body.result.bonus.rollover | 90.00 |
			| body.result.freespins      | 0.00  |

	@INTGR-23
	Scenario: INTGR-23_13 Bonus used when user haven't enougth money for bet
		And add bonus for 'BCXTIMRUBTEST' user with bellow data
			| status     | active              |
			| amount     | 10.00               |
			| wager      | 4                   |
			| timestamp  | {"hours": 1}        |
			| format     | YYYY-MM-DD HH:mm:ss |
			| statusCode | 200                 |
		When user 'BCXTIMRUBTEST' bet 10.00 amount with rollover allowed 100%
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		Then account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
		When get 'active' bonus from bonus list for 'BCXTIMRUBTEST' user
		Then bonus size is 0

