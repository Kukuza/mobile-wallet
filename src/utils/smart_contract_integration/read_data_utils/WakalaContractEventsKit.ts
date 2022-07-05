import { Contract, EventData } from "web3-eth-contract";
import Web3 from "web3";
import { Subscription } from "web3-core-subscriptions";
import { EventOptions } from "@celo/contractkit/lib/generated/types";
import { Log } from "web3-core";
import { AbiItem } from "web3-utils";
import { WakalaEscrowAbi } from "../smart_contract_abis/WakalaEscrowAbi";
import { WAKALA_CONTRACT_ADDRESS } from "../smart_contract_addresses_";
import configs from "../../../configs";

/**
 * Contains wakala events logic.
 */
export class ContractEventsListenerKit {
  /**
   * Tag for logging and debugging purposes.
   */
  private TAG = "[ " + this.constructor.name + "] : ";

  private static contractsEventListenerKit: ContractEventsListenerKit;

  /**
   * Creates a new instance of contract kit event listeners.
   * @param contractAddresses list of smart contract addresses to listen to for events.
   */
  static createInstance(contractAddresses: Array<string>) {
     this.contractsEventListenerKit = new ContractEventsListenerKit(contractAddresses);
  }

    /**
   * Gets a running instance of wakala contract kit utils.
   * @returns instance of wakala contract kit.
   */
  static getInstance() {
    return this.contractsEventListenerKit; 
  }

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
  private constructor(contractAddresses: Array<string>) {
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

    this.wakalaEscrowContract?.events[event](options)
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
}
