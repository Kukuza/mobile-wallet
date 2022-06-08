import WakalaContractKit from "./Celo-Integration/WakalaContractKit";
import { decryptComment as decryptCommentRaw, encryptComment as encryptCommentRaw, } from '@celo/utils/lib/commentEncryption';
import { hexToBuffer } from '@celo/utils/lib/address';

/**
 * Registers the accounts public key as the data encryption key.
 * @param publicKey the data encryption key.
 */
export async function registerAccountEncryptionKey(publicKey: string, publicAddress: string) {
    const wakalaContractKit = WakalaContractKit.getInstance();
    const contractKit = wakalaContractKit?.kit;
    const accounts = await contractKit?.contracts.getAccounts();
    const tx = accounts?.setAccountDataEncryptionKey(publicKey);
    const receipt = await wakalaContractKit?.sendTransactionObject(tx);

    const proofOfPossession: {
        v: number
        r: string
        s: string
      } =accounts?.generateProofOfKeyPossession(
        accountAddress,
        walletAddress
      )
  
      setAccountTx = accounts?.setAccount('', publicKey, publicAddress, proofOfPossession)
    console.log("=====================>", receipt)
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
export function decryptComment(encryptedComment: string, dataEncryptionKey: string, isSender: boolean) {
    return decryptCommentRaw(encryptedComment, hexToBuffer(dataEncryptionKey), isSender);
}