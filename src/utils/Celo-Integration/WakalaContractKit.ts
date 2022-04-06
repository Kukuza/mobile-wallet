import { Magic, MagicUserMetadata } from "@magic-sdk/react-native";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { WakalaEscrowAbi } from "../ContractABIs/WakalaEscrowAbi";
import ERC20Abi from "../ContractABIs/ERC20.abi.json";
import {
  WAKALA_CONTRACT_ADDRESS,
  ERC20_ADDRESS,
} from "../ContractAdresses/contract";
import { CeloContract, ContractKit, newKitFromWeb3 } from "@celo/contractkit";
import { AbiItem } from "web3-utils";

/**
 * Wakala contract kit.
 */
export default class WakalaContractKit {
  /**
   * Tag for logging and debugging purposes.
   */
  private TAG = "[ " + this.constructor.name + "] : ";

  /**
   * Private instance of the wakala contract kit.
   */
  private static wakalaContractKitInstance?: WakalaContractKit | any;

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
  wakalaEscrowContract?: Contract | any;

  /**
   * Magic user metadata.
   */
  userMetadata?: MagicUserMetadata | any;

  /**
   * Instance of the cUSD smart contract.
   */
  cUSDContract?: Contract | any;

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
    this.cUSDContract = new this.web3.eth.Contract(ERC20Abi, ERC20_ADDRESS);
    this.kit = newKitFromWeb3(this.web3);
  }

  /**
   * Initialize the contract kit.
   */
  async init() {
    try {
      const accounts = await this.web3?.eth.getAccounts();
      if (typeof accounts !== undefined) {
        this.web3.eth.defaultAccount = accounts[0];
      }
      await this.kit.setFeeCurrency(CeloContract.StableToken); // To use cUSD
    } catch (error) {
      console.log(this.TAG, error);
      alert(error);
    }
    console.log;
  }
}
