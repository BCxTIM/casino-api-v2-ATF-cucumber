@Smoke
Feature: Balance tests

	@INTGR-18
	Scenario Outline: INTGR-18_1 Verify reponse from account info for <username> user
		Given get account info for '<username>' user
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-18
	Scenario Outline: INTGR-18_2 Basic operations with the balance for <username> user
		Given get account info for '<username>' user
		And account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		When add amount 30.00 balance for '<username>' user
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 30.00  |
			| amount   | 0.00   |
			| rollover | 0.00   |
		When remove balance 30 for '<username>' user true
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-18
	Scenario Outline: INTGR-18_3 Try to remove insufficieant balance for <username> user
		Given get account info for '<username>' user
		And account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		When add amount 30.00 balance for '<username>' user
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 30.00  |
			| amount   | 0.00   |
			| rollover | 0.00   |
		When remove balance 60 for '<username>' user false
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 30.00  |
			| amount   | 0.00   |
			| rollover | 0.00   |
		And remove all balance for '<username>' user
		And account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

	@INTGR-18
	Scenario Outline: INTGR-18_4 Bonus with cents for <username> user
		Given get account info for '<username>' user
		And account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		When add amount 30.13 balance for '<username>' user
		Then account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 30.13  |
			| amount   | 0.00   |
			| rollover | 0.00   |
		And remove all balance for '<username>' user
		And account info have the corresponding data for '<username>' user
			| name     | amount |
			| balance  | 0.00   |
			| amount   | 0.00   |
			| rollover | 0.00   |
		Examples:
			| username      |
			| BCXTIMRUBTEST |
			| BCXTIMEURTEST |

		#balance less than 0



