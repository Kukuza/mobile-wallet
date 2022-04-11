/**
 * Transaction types.
 */
export enum TransactionType {

    DEPOSIT,

    WITHDRAWAL
    
}

/**
 * Status types.
 */
export enum Status {

    AWAITING_AGENT,

    AWAITING_CONFIRMATIONS,

    CONFIRMED,

    CANCELED,

    DONE,

}

/**
 * @typedef {Object} WakalaEscrowTransaction Wakala escrow transaction object.
 * @property { number } id - the transaction id.
 * @property { TransactionType } txType - the transaction type.
 * @property { string } clientAddress - clientAddress the clients address.
 * @property { Status } status - the status of the transaction.
 * @property { number } amount - the amount of money being sent in the transaction.
 * @property { string } agentAddress - the agents address.
 * @property { number } wakalaFee - the amount of money retained by wakala DAO.
 * @property { number } grossAmount - the summation of all the money/crypto involved in the transaction.
 * @property { number } agentFee - the amount of money/crypto levied by the agent.
 * @property { boolean } agentApproval - true on agents approval.
 * @property { boolean } clientApproval - true on clients approval.
 */
export type WakalaEscrowTransaction = {
    id: number;
    txType: TransactionType;
    clientAddress: string;
    status: Status;
    amount: any,
    agentAddress?: string;
    wakalaFee: number,
    grossAmount: number,
    agentFee: number
    agentApproval: boolean,
    clientApproval: boolean,
};
