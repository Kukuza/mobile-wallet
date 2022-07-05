import Web3 from "web3";
import { Contract, EventData } from "web3-eth-contract";
import { WakalaEscrowAbi } from "./smart_contract_abis/WakalaEscrowAbi";
import { KARMA_ABI } from "./smart_contract_abis/KarmaAbi";
import ERC20Abi from "./smart_contract_abis/ERC20.abi.json";
import {
  WAKALA_CONTRACT_ADDRESS,
  ERC20_ADDRESS,
  KARMA_CONTRACT_ADDRESS,
} from "./smart_contract_addresses_";
import { ContractKit, newKitFromWeb3 } from "@celo/contractkit";
import { AbiItem } from "web3-utils";
import { WakalaContractEventsKit } from "./WakalaContractEventsKit";
import {
  Status,
  TransactionType,
  WakalaEscrowTransaction,
} from "./wakala_types";
import { EventOptions } from "@celo/contractkit/lib/generated/types";
import BigNumber from 'bignumber.js'
import { UserMetadata } from './wakala_types';
import configs from "../../configs";


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

  userMetadata: UserMetadata

  /**
   * Web3 instance.
   */
  web3?: Web3 | any;

  /**
   * Instance of wakala escrow smart contract.
   */
  wakalaEscrowContract?: Contract;

  /**
   * Instance of karma protocol smart contract.
   */
  karmaContract?: Contract;

  /**
   * Instance of the cUSD smart contract.
   */
  cUSDContract?: Contract;

  kit?: ContractKit;

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
  static createInstance(privateKey: string) {
    if (WakalaContractKit.wakalaContractKitInstance) {
      console.log(" instance already created!!");
    } else {
      let instance: WakalaContractKit = new WakalaContractKit(privateKey);
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
   * The users private key.
   * @param privateKey magic provider instance.
   */
  private constructor(privateKey: string) {

    // console.log("configs.CONTRACT_KIT_URI!", configs.CONTRACT_KIT_URI!);
    // this.web3 = new Web3(configs.CONTRACT_KIT_URI!);
    this.web3 = new Web3('https://alfajores-forno.celo-testnet.org');


    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.userMetadata = { 
      
    };
    this.userMetadata.publicAddress = account.address;
    this.web3.eth.accounts.wallet.add(account);

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
    this.kit.addAccount(privateKey);
    this.kit.defaultAccount = account.address;

    this.wakalaContractEvents = new WakalaContractEventsKit([
      WAKALA_CONTRACT_ADDRESS,
    ]);

  }

  /**
   * Gets the current account balance.
   * @returns the current account`s balance.
   */
  async getCurrentAccountBalance() {
    return await this.kit?.getTotalBalance(this.userMetadata?.publicAddress ?? "");
  }

  /**
   * Initialize the contract kit.
   */
  async init() {
    // const txObject = this.wakalaEscrowContract?.methods.initializeDepositTransaction(10000000000000, "phoneNumber");
    // const gasPrice = await this.fetchGasPrice(ERC20_ADDRESS);

    // let tx = await this.kit?.sendTransactionObject(txObject, {
    //   from: this.kit.defaultAccount,
    //   feeCurrency: ERC20_ADDRESS,
    //   gasPrice: gasPrice.toString()
    // });

    // let receipt = await tx?.waitReceipt();
    // await this.cUSDApproveAmount(new BigNumber(100000000000000000000));
    // await this.updateKarma(WAKALA_CONTRACT_ADDRESS, 10, 2);

  }

  /**
   * Sends the composed transaction object.
   * @param txObject the transaction object.
   * @returns receipt.
   */
  async sendTransactionObject(txObject) {
    const gasPrice = await this.fetchGasPrice(ERC20_ADDRESS);
    let tx = await this.kit?.sendTransactionObject(txObject, {
      from: this.kit.defaultAccount,
      feeCurrency: ERC20_ADDRESS,
      gasPrice: gasPrice.toString()
    });

    let receipt = await tx?.waitReceipt();
    return receipt;
  }

  /**
   * Approve the wakala to use a certain amount of cUSD from the users.
   * @param amount the amount that can be used by a smart contract.
   * @returns approval receipt.
   */
  async cUSDApproveAmount(amount) {
    amount = amount + 100000000000000000000;
    let txObject = await this?.cUSDContract?.methods
      .approve(WAKALA_CONTRACT_ADDRESS, amount)
    
    const receipt = await this.sendTransactionObject(txObject);
    return receipt;
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
    let receipt: any = await this?.sendTransactionObject(txObject);
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
   * Fetches the transactions from the smart contract.
   */
  async fetchTransactions() {
    let wakalaTxsArray = new Array<WakalaEscrowTransaction>();
    let l = await this.getNextTxIndex();

    // tracks the starting point for the search.
    let currentQueryTx = l - 1;

    for (let index = 0; index < 16; index++) {
      let tx = await this.queryGetNextUnpairedTransaction(currentQueryTx);

      if (tx.grossAmount != 0) {
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
   convertToWakalaTransactionObj(tx: string[]): WakalaEscrowTransaction {

    const wakalaTx: WakalaEscrowTransaction = {
      id: parseInt(tx[0]),
      txType: TransactionType[parseInt(tx[1])],
      clientAddress: tx[2],
      agentAddress: tx[3],
      status: parseInt(tx[4]),
      netAmount: parseInt(tx[5]),
      cryptoFiatConversionRate: tx[6],
      fiatCurrencyCode: tx[7],
      agentFee: parseInt(tx[8]),
      wakalaFee: parseInt(tx[9]),
      grossAmount: parseInt(tx[10]),
      agentApproval: tx[11],
      clientApproval: tx[12],
      agentPhoneNumber: tx[13],
      clientPhoneNumber: tx[14],
    };

    return wakalaTx;
  }

  /**
   * Fetch gas fees estimate.
   * @param tokenAddress token used as gas fees (at this point still using CELO).
   * @returns the gas price estimate.
   */
  async fetchGasPrice(tokenAddress: string): Promise<BigNumber> {
    const gasPriceMinimum = await this.kit?.contracts.getGasPriceMinimum()
    const latestGasPrice = await gasPriceMinimum?.getGasPriceMinimum(tokenAddress)
    const inflatedGasPrice = latestGasPrice?.times(5) ?? new BigNumber(0)
    return inflatedGasPrice;
  }
}