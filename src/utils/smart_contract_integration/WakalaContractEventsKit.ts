import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { Subscription } from "web3-core-subscriptions";
import { Log } from "web3-core";
import { AbiItem } from "web3-utils";
import { WakalaEscrowAbi } from "./smart_contract_abis/WakalaEscrowAbi";
import { WAKALA_CONTRACT_ADDRESS } from "./smart_contract_addresses_";
import configs from "../../configs";

/**
 * Contains wakala events logic.
 */
export class WakalaContractEventsKit {
  /**
   * Tag for logging and debugging purposes.
   */
  private TAG = "[ " + this.constructor.name + "] : ";

  /**
   * List of contract addresses to listen to.
   */
  private watchedAddresses: Array<string> = [];

  /**
   * Event subscription instance.
   */
  public eventSubscription?: Subscription<Log>;

  /**
   * Instance of wakala escrow smart contract.
   */
  public wakalaEscrowContract?: Contract | any;

  /**
   * Instance of websocket provider.
   */
  public provider = new Web3.providers
  .WebsocketProvider("wss://alfajores-forno.celo-testnet.org/ws");
    // .WebsocketProvider(configs.CONTRACT_KIT_LISTENER!);

  /**
   * Instance of web 3.
   */
  public web3?: Web3;

  /**
   * Class constructor.
   */
  constructor(contractAddresses: Array<string>) {
    contractAddresses.forEach((address: string) => {
      this.watchedAddresses.push(address);
    });
    this.setupProviderAndSubscriptions();
    console.log(this.TAG + "constructor done");
  }

  /**
   * Set up provider and subscription.
   */
  setupProviderAndSubscriptions() {
    console.log("setupProviderAndSubscriptions========>");

    let setupNewProvider = false;

    // Keeps track of the number of times we've retried to set up a new provider
    // and subs without a successful header
    let sequentialRetryCount = 0;

    this.provider = new Web3
      .providers
      .WebsocketProvider('wss://alfajores-forno.celo-testnet.org/ws');

    this.web3 = new Web3(this.provider);

    this.wakalaEscrowContract = new this.web3.eth.Contract(
      WakalaEscrowAbi as AbiItem[],
      WAKALA_CONTRACT_ADDRESS
    );

    // logic to reset the connection.
    const setupNewProviderAndSubs = async () => {
      // To prevent us from retrying too aggressively, wait a little if
      // we try setting up multiple times in a row
      const sleepTimeMs = sequentialRetryCount * 100;
      console.log("sleeping", sleepTimeMs);
      await this.sleep(sleepTimeMs);
      sequentialRetryCount++;

      // To avoid a situation where multiple error events are triggered
      if (!setupNewProvider) {
        setupNewProvider = true;
        this.setupProviderAndSubscriptions();
      }
    };

    /**
     * Reconnect on error.
     */
    this.provider.on("error", async () => {
      console.log("WebsocketProvider encountered an error");
      await setupNewProviderAndSubs();
    });

    /**
     * Reconnect on connection expiry.
     */
    this.provider.on("end", async () => {
      console.log("WebsocketProvider has ended, will restart");
      await setupNewProviderAndSubs();
    });
  }

  /**
   * Create a delay in code execution for x number of milliseconds.
   * @param ms number of milliseconds to delay.
   * @param onSleep what to do on sleeping.
   * @returns a promise create a delay.
   */
  sleep(ms: number, onSleep?: () => void): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
      if (onSleep) {
        onSleep();
      }
    });
  }
}
