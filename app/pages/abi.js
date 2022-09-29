export const testContractAddr = "0xeede1950bA3edD86b1c1130ae7a66bBb5FC647cc";
export const TEST_ABI = `[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userId",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_postId",
				"type": "string"
			}
		],
		"name": "addUserPostId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_postId",
				"type": "string"
			}
		],
		"name": "removeUserPostId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUserIds",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userId",
				"type": "string"
			}
		],
		"name": "getAllUserPostIds",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`;