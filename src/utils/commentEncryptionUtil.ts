import WakalaContractKit from "./Celo-Integration/WakalaContractKit";
import { decryptComment as decryptCommentRaw, encryptComment as encryptCommentRaw, } from '@celo/utils/lib/commentEncryption';
import { compressedPubKey } from '@celo/utils/lib/dataEncryptionKey'
import { hexToBuffer } from '@celo/utils/lib/address';
import { AccountsWrapper } from "@celo/contractkit/lib/wrappers/Accounts";
import { ERC20_ADDRESS } from './ContractAdresses/contract';
import BigNumber from 'bignumber.js';
import crypto from 'crypto';

/**
 * Registers the accounts public key as the data encryption key.
 * @param name the name to be saved in the accounts smart contract.
 * @param publicKey the data encryption key.
 * @param publicAddress the public address to paired with the public encryption key.
 * @returns the saved data encryption key.
 */
export async function registerAccountEncryptionKey(name: string, publicKey: string, publicAddress: string) {
    const wakalaContractKit = WakalaContractKit.getInstance();
    const contractKit = wakalaContractKit?.kit;

    const publicDataKey = compressedPubKey(hexToBuffer(publicKey))
    const accounts: AccountsWrapper = await contractKit?.contracts.getAccounts();

    const tsxObject = accounts.setAccount(name, publicDataKey, publicAddress, null);
    let gasFees = new BigNumber(0);

    const estimate = await wakalaContractKit?.fetchGasPrice(ERC20_ADDRESS);
    if (estimate) {
        gasFees = estimate
    }

    const txParams = {
        from: contractKit?.defaultAccount,
        feeCurrency: ERC20_ADDRESS,
        gasPrice: gasFees.toString()
    }

    // receipt for logging if necessary when debugging
    const r = await tsxObject.sendAndWaitForReceipt(txParams);
    // console.log(r);

    const dataEncryptionKey = await accounts?.getDataEncryptionKey(publicAddress);
    console.log("==========>", dataEncryptionKey, await accounts?.getName(publicAddress))

    console.log("===========comment encryption================>");

    const encryptedPhone = await encryptComment("+254791725651", publicAddress, "0x2f254ceA58719E3AE7DF82E1117Ea7C1cE2Ce30d");
    console.log("Encrypted comment", encryptedPhone);

    const decryptedComment = await decryptComment(encryptedPhone.comment, publicAddress, true);
    console.log("Decrypted comment", decryptedComment);
    return dataEncryptionKey;
}

/**
 * Gets the data encryption key of a public address.
 * @param publicAddress the public address with the data encryption key.
 * @returns the public key/data encryption key.
 */
export async function getDataEncryptionKey(publicAddress: string) {
    const wakalaContractKit = WakalaContractKit.getInstance();
    const contractKit = wakalaContractKit?.kit;
    const accounts = await contractKit?.contracts.getAccounts();
    return await accounts?.getDataEncryptionKey(publicAddress);
}

/**
 * Encrypts a comment given the right params.
 * @param comment the comment to be encrypted.
 * @param from the source address.
 * @param to the recipient address
 * @returns the encrypted comment.
 */
export async function encryptComment(comment: string, from: string, to: string) {
    const fromKey = await getDataEncryptionKey(from);
    const toKey = await getDataEncryptionKey(to);

    if (fromKey == "" || toKey == "") {
        throw "Invalid from or to address"
    }

    return encryptCommentRaw(comment, hexToBuffer(toKey), hexToBuffer(fromKey))
}

/**
 * Decrypts encrypted comments.
 * @param encryptedComment the comment to be decrypted.
 * @param dataEncryptionKey the data encryption key used to encrypt the data.
 * @param isSender true if the data encryption key belongs to the sender of the message.
 */
export async function decryptComment(encryptedComment: string, publicAddress: string, isSender: boolean) {
    const decryptionKey = await getDataEncryptionKey(publicAddress);
    return decryptCommentRaw(encryptedComment, decryptionKey, isSender);
}
