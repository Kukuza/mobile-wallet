import { Magic } from "@magic-sdk/react-native";
import Web3 from 'web3';
import { Contract } from "web3-eth-contract";
import wakalaEscrowAbi from "../ContractABIs/WakalaEscrow.abi.json";
import ERC20Abi from "../ContractABIs/ERC20.abi.json";
import { WAKALA_CONTRACT_ADDRESS, ERC20_ADDRESS, } from "../ContractAdresses/contract";
import { CeloContract, ContractKit, newKitFromWeb3 } from "@celo/contractkit";

/**
 * Wakala contract kit.
 */
export class WakalaContractKit {

    /**
     * Tag for logging and debugging purposes.
     */
    private TAG = "[ " + this.constructor.name + "] : "

    web3: Web3 
    
    /**
     * Magic provider instance.
     */
    magic: Magic

    /**
     * Instance of wakala escrow smart contract.
     */
    wakalaEscrowContract: Contract

    /**
     * Instance of the cUSD smart contract.
     */
    cUSDContract: Contract

    kit: ContractKit
   
    /**
     * 
     * @param magic the magic provider instance.
     */
    constructor(magic: Magic) {
      this.web3 = new Web3(magic.rpcProvider);
      this.magic  = magic;
      this.wakalaEscrowContract = new this.web3.eth.Contract(wakalaEscrowAbi,
        WAKALA_CONTRACT_ADDRESS);

      this.cUSDContract = new this.web3.eth.Contract(ERC20Abi,
        ERC20_ADDRESS);

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
        console.log(this.TAG, error)
        alert(error)
      }
    }
  }
  