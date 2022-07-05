import { ContractKit, newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";
import { KARMA_ABI } from "../smart_contract_abis/KarmaAbi";
import { WakalaEscrowAbi } from "../smart_contract_abis/WakalaEscrowAbi";
import { WAKALA_CONTRACT_ADDRESS, KARMA_CONTRACT_ADDRESS, ERC20_ADDRESS } from "../smart_contract_addresses_";
import { WakalaEscrowTransaction, TransactionType } from "../wakala_types";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import ERC20Abi from "../smart_contract_abis/ERC20.abi.json";


/**
 * Wakala contract kit.
 */
export default class ReadContractDataKit {
  /**
   * Tag for logging and debugging purposes.
   */
  private TAG = "[ " + this.constructor.name + "] : ";

  /**
   * Private instance of the wakala contract kit class.
   */
  private static readDataContractKit?: ReadContractDataKit;

  stableToken: any;


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
    return this.readDataContractKit;
  }

  /**
   * Creates a singleton instance of wakala contract kit.
   * @param magic instance of magic provider.
   */
  static createInstance() {
    if (ReadContractDataKit.readDataContractKit) {
      console.log(" instance already created!!");
    } else {
      let instance: ReadContractDataKit = new ReadContractDataKit();
      ReadContractDataKit.readDataContractKit = instance;
    }
  }

  /**
   * Destroy wakala contract kit instance.
   */
  static destroyInstance() {
    ReadContractDataKit.readDataContractKit = undefined;
  }

  /**
   * The users private key.
   * @param privateKey magic provider instance.
   */
  private constructor() {

    // console.log("configs.CONTRACT_KIT_URI!", configs.CONTRACT_KIT_URI!);
    // this.web3 = new Web3(configs.CONTRACT_KIT_URI!);
    this.web3 = new Web3('https://alfajores-forno.celo-testnet.org');

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
  }

  /**
   * Gets the current account balance.
   * @returns the current account`s balance.
   */
  async getCurrentAccountBalance(publicAddress: string) {
    return await this.kit?.getTotalBalance(publicAddress);
  }


  /**
   * Fetches the transactions from the smart contract.
   */
  async fetchTransactions() {
    let wakalaTxsArray = new Array<WakalaEscrowTransaction>();
    let l = await this.getNextTxIndex();

    // tracks the starting point for the search.
    let currentQueryTx = l - 1;

    console.log("fetchTransactions()  =====>    ")
    for (let index = 0; index < 16; index++) {
      let tx = await this.queryGetNextUnpairedTransaction(currentQueryTx);

      if (tx.netAmount != 0) {
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

    console.log(tx);

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
}
