import { Magic, MagicUserMetadata } from "@magic-sdk/react-native";
import Web3 from "web3";
import { Contract, EventData } from "web3-eth-contract";
import { WakalaEscrowAbi } from "../ContractABIs/WakalaEscrowAbi";
import { KARMA_ABI } from "../ContractABIs/KarmaAbi";
import ERC20Abi from "../ContractABIs/ERC20.abi.json";
import {
  WAKALA_CONTRACT_ADDRESS,
  ERC20_ADDRESS,
  KARMA_CONTRACT_ADDRESS,
} from "../ContractAdresses/contract";
import { CeloContract, ContractKit, newKitFromWeb3 } from "@celo/contractkit";
import { AbiItem } from "web3-utils";
import { WakalaContractEventsKit } from "./WakalaContractEventsKit";
import {
  Status,
  TransactionType,
  WakalaEscrowTransaction,
} from "./transaction_types";
import { EventOptions } from "@celo/contractkit/lib/generated/types";

/**
 * Wakala contract kit.
 */
export default class WakalaContractKit {
  /**
   * Tag for logging and debugging purposes.
   */
  private TAG = "[ " + this.constructor.name + "] : ";

  /**
   * Private instance of the wakala contract kit class.
   */
  private static wakalaContractKitInstance?: WakalaContractKit;

  /**
   * Wakala contract events.
   */
  wakalaContractEvents?: WakalaContractEventsKit;

  stableToken: any;

  private isInitialize = false;

  /**
   * Web3 instance.
   */
  web3?: Web3 | any;

  /**
   * Magic provider instance.
   */
  magic?: Magic | any;

  /**
   * Instance of wakala escrow smart contract.
   */
  wakalaEscrowContract?: Contract;

  /**
   * Instance of karma protocol smart contract.
   */
  karmaContract?: Contract;

  /**
   * Magic user metadata.
   */
  userMetadata?: MagicUserMetadata;

  /**
   * Instance of the cUSD smart contract.
   */
  cUSDContract?: Contract;

  kit?: ContractKit | any;

  /**
   * Gets a running instance of wakala contract kit utils.
   * @returns instance of wakala contract kit.
   */
  static getInstance() {
    return this.wakalaContractKitInstance;
  }

  /**
   * Creates a singleton instance of wakala contract kit.
   * @param magic instance of magic provider.
   */
  static createInstance(magic: Magic) {
    if (WakalaContractKit.wakalaContractKitInstance) {
      console.log(" instance already created!!");
    } else {
      let instance: WakalaContractKit = new WakalaContractKit(magic);
      WakalaContractKit.wakalaContractKitInstance = instance;
    }
  }

  /**
   * Destroy wakala contract kit instance.
   */
  static destroyInstance() {
    WakalaContractKit.wakalaContractKitInstance = undefined;
  }

  /**
   * Set the currents users metadata.
   * @param userMetadata the current users metadata.
   */
  setUserMetadata(userMetadata?: MagicUserMetadata) {
    this.userMetadata = userMetadata;
  }

  /**
   *
   * @param magic magic provider instance.
   */
  private constructor(magic: Magic) {
    this.web3 = new Web3(magic.rpcProvider);
    this.magic = magic;

    this.wakalaEscrowContract = new this.web3.eth.Contract(
      WakalaEscrowAbi as AbiItem[],
      WAKALA_CONTRACT_ADDRESS
    );

    this.karmaContract = new this.web3.eth.Contract(
      KARMA_ABI as AbiItem[],
      KARMA_CONTRACT_ADDRESS
    );
    this.cUSDContract = new this.web3.eth.Contract(ERC20Abi, ERC20_ADDRESS);
    this.kit = newKitFromWeb3(this.web3);

    this.wakalaContractEvents = new WakalaContractEventsKit([
      WAKALA_CONTRACT_ADDRESS,
    ]);
  }

  /**
   * Initialize the contract kit.
   */
  async init() {
    if (!this.isInitialize) {
      this.wakalaContractEvents = new WakalaContractEventsKit([
        WAKALA_CONTRACT_ADDRESS,
      ]);
      try {
        const accounts = await this?.kit?.web3?.eth.getAccounts();
        this.kit.defaultAccount = accounts[0];
        if (typeof accounts !== undefined) {
          this.web3.eth.defaultAccount = accounts[0];
        }
        await this.kit.setFeeCurrency(CeloContract.StableToken); // To use cUSD
        this.stableToken = await this.kit.contracts.getStableToken(); // To use cUSD
      } catch (error) {
        console.log(this.TAG, error);
        alert(error);
      }
    }
  }

  /**
   * Approve the wakala to use a certain amount of cUSD from the users.
   * @param amount the amount that can be used by a smart contract.
   * @returns approval receipt.
   */
  async cUSDApproveAmount(amount) {
    amount = amount + 100000000000000000000;

    // try {
    let txObject = await this?.cUSDContract?.methods
      .approve(WAKALA_CONTRACT_ADDRESS, amount)
      .call();

    //   let tx = await this.kit.sendTransactionObject(txObject, {
    //     from: this.kit.defaultAccount,
    //     feeCurrency: ERC20_ADDRESS,
    //   });
    //   let receipt = await tx.waitReceipt();
    //   console.log("From Approve", receipt);
    //   return receipt;
    // } catch (e) {
    //   console.log(e, "approveTransaction catch");
    // }
  }

  /**
    * @dev Function to update a user's karma value for a specified application
    * @param address The address of the user whose karma is being updated
    * @param amount The amount used to calculate how much should be added or removed from
                    a user's karma value. If the amount is positive, it will increase the 
                    user's karma. If it is negative, it will decrease it. 
    * @param updateFunctionKey An integer specifying which function should be used to update
                               the user's karma. Setting the value to 1 will lead to a weighted 
                               sum updated and setting it to 2 will lead to an averaged sum. 
                               See README for details. => pass 2 for our case 
                               karma contract link: https://github.com/karma-reputation-protocol/karma/tree/main

    **/
  updateKarma = async (address, amount, updateFunctionKey) => {
    let txObject: any = await this?.karmaContract?.methods.updateKarma(
      address,
      amount,
      updateFunctionKey
    );
    let tx: any = await this?.kit.sendTransactionObject(txObject, {
      from: this?.kit.defaultAccount,
      feeCurrency: this.stableToken.address,
    });
    let receipt = await tx.waitReceipt();
    console.log("From updateKarma", receipt);
    return receipt;
  };

  /**
   * @dev Function to retireve the karma value for a user.
   * @param address The address of the user whose karma is being accessed
   **/

  getKarma = async (address) => {
    let karma = await this?.karmaContract?.methods.getKarma(address).call();
    console.log("From getKarma", karma);
    return karma;
  };

  /**
   *  @param sendAmount The amount being converted into wei
   *  @returns The amount in wei
   *
   **/
  getAmountInWei(sendAmount) {
    return this.kit.web3.utils.toWei(sendAmount, "ether");
  }

  /**
   * @param amount The amount in integer format
   * @param phoneNumber The encoded phone number
   * @returns transaction receipt
   **/
  initializeDepositTransaction = async (amount, phoneNumber) => {
    await this.cUSDApproveAmount(this.getAmountInWei(amount));
    let txObject =
      await this?.wakalaEscrowContract?.methods.initializeDepositTransaction(
        this.getAmountInWei(amount),
        phoneNumber
      );
    let tx = await this.kit.sendTransactionObject(txObject, {
      from: this.kit.defaultAccount,
      feeCurrency: this.stableToken.address,
    });
    let receipt = await tx.waitReceipt();
    console.log("From initializeDepositTransaction", receipt);
    return receipt;
  };

  /**
   * @param amount The amount in integer format
   * @param phoneNumber The encoded phone number
   * @returns transaction receipt
   **/
  initializeWithdrawalTransaction = async (amount, phoneNumber) => {
    await this.cUSDApproveAmount(this.getAmountInWei(amount));
    let txObject =
      await this?.wakalaEscrowContract?.methods.initializeWithdrawalTransaction(
        this.getAmountInWei(amount),
        phoneNumber
      );
    let tx = await this.kit.sendTransactionObject(txObject, {
      from: this.kit.defaultAccount,
      feeCurrency: this.stableToken.address,
    });
    let receipt = await tx.waitReceipt();
    console.log("From initializeWithdrawalTransaction", receipt);
    return receipt;
  };

  /**
   * Fetches the transactions from the smart contract.
   */
  async fetchTransactions() {
    let wakalaTxsArray = new Array<WakalaEscrowTransaction>();
    let l = await this.getNextTxIndex();

    // tracks the starting point for the search.
    let currentQueryTx = l - 1;

    for (let index = 0; index < 16; index++) {
      let tx = await this.queryGetNextUnpairedTransaction(currentQueryTx);

      if (tx.amount != 0) {
        wakalaTxsArray.push(tx);
      } else {
        // exit loop (no next tsx)
        return wakalaTxsArray;
      }

      // exit loop (no next tsx)
      if (tx.id == 0) {
        return wakalaTxsArray;
      }

      // set the next starting point for the smart contract loop.
      currentQueryTx = tx.id - 1;
    }

    return wakalaTxsArray;
  }

  /**
   * Add contract event listeners.
   * @param event the name of the event to listen to.
   * @param callback what to do with the event data.
   * @param tag (optional) logging label for debugging purposes.
   * @param options (optional) options for the event listener.
   */
  addContractEventListener(
    event: string,
    callback: (eventData: EventData) => void,
    tag?: string,
    options?: EventOptions
  ) {
    // use params options if not null.
    if (!options) {
      options = {
        filter: {
          value: [],
        },
        fromBlock: "latest",
      };
    }

    this.wakalaContractEvents?.wakalaEscrowContract?.events[event](options)
      .on("data", (eventData) => {
        //data – Will fire each time an event of the type you are listening for has been emitted
        console.log(`[ ${this.TAG} ] [ ${tag} ] data`);
        console.debug(eventData);
        // Act on the event data.
        callback(eventData);
      })
      .on("changed", (changed) => {
        //  changed – Will fire for each event of the type you are
        //  listening for that has been removed from the blockchain.
        console.log(
          `[ ${this.TAG} ] [ ${tag} ] ${event} changed { ${changed} }`
        );
      })
      .on("error", (err) => {
        //error – Will fire if an error in the event subscription occurs.
        console.log(event + " error ", err);
      })
      .on("connected", (str) => {
        //  connected – Will fire when the subscription has successfully established a connection.
        //  It will return a subscription id. This event only fires once.
        console.log(event + " connected ", str);
      });
  }

  /**
   * Get transaction by index.
   */
  async getNextTxIndex(): Promise<number> {
    const txIndexResp = await this.wakalaEscrowContract?.methods
      .getNextTransactionIndex()
      .call();
    console.log("getNextTxIndex()=>", txIndexResp);
    return parseInt(txIndexResp);
  }

  /**
   * Get transaction by index.
   */
  async queryTransactionByIndex(
    index: number
  ): Promise<WakalaEscrowTransaction> {
    const tx = await this.wakalaEscrowContract?.methods
      .getTransactionByIndex(index)
      .call();
    let wakalaTx = await this.convertToWakalaTransactionObj(tx);
    return wakalaTx;
  }

  /**
   * Get transaction by index.
   */
  async queryGetNextUnpairedTransaction(
    id: number
  ): Promise<WakalaEscrowTransaction> {
    const tx = await this.wakalaEscrowContract?.methods
      .getNextUnpairedTransaction(id)
      .call();

    let wakalaTx = await this.convertToWakalaTransactionObj(tx);
    return wakalaTx;
  }

  /**
   * Convert response to wakala transaction object.
   * @param tx the response object.
   * @returns the wakala transaction object.
   */
  convertToWakalaTransactionObj(tx: Object): WakalaEscrowTransaction {
    let wakalaTx: WakalaEscrowTransaction = {
      id: parseInt(tx[0]),
      txType: TransactionType[parseInt(tx[1])],
      clientAddress: tx[2],
      agentAddress: tx[3],
      status: Status[parseInt(tx[4])],
      amount: this.kit.web3.utils.fromWei(tx[5], "ether"),
      agentFee: this.kit.web3.utils.fromWei(tx[6], "ether"),
      wakalaFee: this.kit.web3.utils.fromWei(tx[7], "ether"),
      grossAmount: this.kit.web3.utils.fromWei(tx[8], "ether"),
      agentApproval: tx[9],
      clientApproval: tx[10],
      agentPhoneNumber: Buffer.from(tx[11], "base64").toString("ascii"),
      clientPhoneNumber: Buffer.from(tx[12], "base64").toString("ascii"),
    };

    return wakalaTx;
  }
}
