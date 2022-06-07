import { ContractKit } from "@celo/contractkit";
import { configs} from '../../configs';

let web3;

export default init = () => {
  web3 = ContractKit.newKit(configs.CONTRACT_KIT_LISTENER).web3;
};

const listenToEvent = (eventId, callback) => {
  return web3.eth.subscribe(eventId, {}, callback);
};

const stopListeningToEvent = (subscriptionObject, callback) => {
  subscriptionObject.unsubscribe(callback);
};

const stopAllEventListeners = () => {
  web3.eth.clearSubscriptions();
};

module.exports.listenToEvent = listenToEvent;
module.exports.stopListeningToEvent = stopListeningToEvent;
module.exports.stopAllEventListeners = stopAllEventListeners;
