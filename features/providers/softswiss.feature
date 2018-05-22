Feature: Softswiss tests

	Background: check if Softswiss Callback API v2.0 is running
		Given check if Softswiss Callback API v2.0 is running

	Scenario: Bet
		Given get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
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


	Scenario: Bet insufficient ammount
		Given get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
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

	@Todo
	Scenario: Bet and win
		Given get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200  |
			| body.result.balance        | 0.00 |
			| body.result.bonus.amount   | 0.00 |
			| body.result.bonus.rollover | 0.00 |
			| body.result.freespins      | 0.00 |
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
		Then player balance for 'BCXTIMRUBTEST' user is following for rollover allowed 100% is 35.00
		And get valid account info for 'BCXTIMRUBTEST' user by 'login'
		And account info have the corresponding data for user
			| statusCode                 | 200   |
			| body.result.balance        | 35.00 |
			| body.result.bonus.amount   | 0.00  |
			| body.result.bonus.rollover | 0.00  |
			| body.result.freespins      | 0.00  |