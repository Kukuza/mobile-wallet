import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { WakalaEscrowAbi } from "../smart_contract_abis/WakalaEscrowAbi";
import { KARMA_ABI } from "../smart_contract_abis/KarmaAbi";
import ERC20Abi from "../smart_contract_abis/ERC20.abi.json";
import {
  WAKALA_CONTRACT_ADDRESS,
  ERC20_ADDRESS,
  KARMA_CONTRACT_ADDRESS,
} from "../smart_contract_addresses_";
import { ContractKit, newKitFromWeb3 } from "@celo/contractkit";
import { AbiItem } from "web3-utils";
import BigNumber from 'bignumber.js'
import { UserMetadata } from '../wakala_types';

/**
 * Wakala contract kit.
 */
export default class WriteContractDataKit {
  /**
   * Tag for logging and debugging purposes.
   */
  private TAG = "[ " + this.constructor.name + "] : ";

  /**
   * Private instance of the wakala contract kit class.
   */
  private static wakalaContractKitInstance?: WriteContractDataKit;


  stableToken: any;

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
    console.log("WriteContractDataKit   ======> createInstance");
    if (WriteContractDataKit.wakalaContractKitInstance) {
      console.log(" instance already created!!");
    } else {
      let instance: WriteContractDataKit = new WriteContractDataKit(privateKey);
      WriteContractDataKit.wakalaContractKitInstance = instance;
    }
  }

  /**
   * Destroy wakala contract kit instance.
   */
  static destroyInstance() {
    WriteContractDataKit.wakalaContractKitInstance = undefined;
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

  }

  /**
   * Signs and sends the composed transaction object.
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
