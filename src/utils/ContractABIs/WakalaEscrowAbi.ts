export const WakalaEscrowAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_cUSDTokenAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_agentFee",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WakalaEscrow.TransactionType",
                        "name": "txType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "clientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "agentAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "enum WakalaEscrow.Status",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "agentFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wakalaFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "grossAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "agentApproval",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "clientApproval",
                        "type": "bool"
                    }
                ],
                "indexed": false,
                "internalType": "struct WakalaEscrow.WakalaTransaction",
                "name": "wtx",
                "type": "tuple"
            }
        ],
        "name": "AgentConfirmationEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WakalaEscrow.TransactionType",
                        "name": "txType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "clientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "agentAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "enum WakalaEscrow.Status",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "agentFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wakalaFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "grossAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "agentApproval",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "clientApproval",
                        "type": "bool"
                    }
                ],
                "indexed": false,
                "internalType": "struct WakalaEscrow.WakalaTransaction",
                "name": "wtx",
                "type": "tuple"
            }
        ],
        "name": "AgentPairingEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WakalaEscrow.TransactionType",
                        "name": "txType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "clientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "agentAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "enum WakalaEscrow.Status",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "agentFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wakalaFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "grossAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "agentApproval",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "clientApproval",
                        "type": "bool"
                    }
                ],
                "indexed": false,
                "internalType": "struct WakalaEscrow.WakalaTransaction",
                "name": "wtx",
                "type": "tuple"
            }
        ],
        "name": "ClientConfirmationEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WakalaEscrow.TransactionType",
                        "name": "txType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "clientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "agentAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "enum WakalaEscrow.Status",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "agentFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wakalaFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "grossAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "agentApproval",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "clientApproval",
                        "type": "bool"
                    }
                ],
                "indexed": false,
                "internalType": "struct WakalaEscrow.WakalaTransaction",
                "name": "wtx",
                "type": "tuple"
            }
        ],
        "name": "ConfirmationCompletedEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WakalaEscrow.TransactionType",
                        "name": "txType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "clientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "agentAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "enum WakalaEscrow.Status",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "agentFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wakalaFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "grossAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "agentApproval",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "clientApproval",
                        "type": "bool"
                    }
                ],
                "indexed": false,
                "internalType": "struct WakalaEscrow.WakalaTransaction",
                "name": "wtx",
                "type": "tuple"
            }
        ],
        "name": "TransactionCompletionEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "wtxIndex",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "initiatorAddress",
                "type": "address"
            }
        ],
        "name": "TransactionInitEvent",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_transactionid",
                "type": "uint256"
            }
        ],
        "name": "agentAcceptDepositTransaction",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_transactionid",
                "type": "uint256"
            }
        ],
        "name": "agentAcceptWithdrawalTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_transactionid",
                "type": "uint256"
            }
        ],
        "name": "agentConfirmPayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_transactionid",
                "type": "uint256"
            }
        ],
        "name": "clientConfirmPayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "countSuccessfulTransactions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getNextTransactionIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_transactionID",
                "type": "uint256"
            }
        ],
        "name": "getTransactionByIndex",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum WakalaEscrow.TransactionType",
                        "name": "txType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "clientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "agentAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "enum WakalaEscrow.Status",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "agentFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wakalaFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "grossAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "agentApproval",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "clientApproval",
                        "type": "bool"
                    }
                ],
                "internalType": "struct WakalaEscrow.WakalaTransaction",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "initializeDepositTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "initializeWithdrawalTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
