import { MnemonicLanguages, generateMnemonic, MnemonicStrength, generateKeys } from '@celo/utils/lib/account';
import * as bip39 from 'react-native-bip39';
import CryptoJS from 'crypto-js'
import { storeItem } from './session.key.storage.utils';

const MNEMONIC_BIT_LENGTH = MnemonicStrength.s256_24words

const MNEMONIC_STORAGE_KEY = 'mnemonic'

const checkDuplicate = (someString: string) => {
    return new Set(someString.split(' ')).size !== someString.split(' ').length
}

export function getMnemonicLanguage(language: string | null) {
    switch (language?.slice(0, 2)) {
      case 'es': {
        return MnemonicLanguages.spanish
      }
      case 'pt': {
        return MnemonicLanguages.portuguese
      }
      default: {
        return MnemonicLanguages.english
      }
    }
}

export async function generateNewMnemonic(): Promise<string> {
    
    const mnemonicLanguage = getMnemonicLanguage("");
    let mnemonic = await generateMnemonic(MNEMONIC_BIT_LENGTH, mnemonicLanguage, bip39)

    let isDuplicateInMnemonic = checkDuplicate(mnemonic);
    while (isDuplicateInMnemonic) {
        let mnemonic = await generateMnemonic(MNEMONIC_BIT_LENGTH, mnemonicLanguage, bip39)
        isDuplicateInMnemonic = checkDuplicate(mnemonic)
    }

    return mnemonic;
}

/**
 * Creates a mnemonic and derives an account out of it.
 * @returns the private key.
 */
export async function createNewAccountWithMnemonic() {
    const mnemonic = await generateNewMnemonic();
    const keys = await generateKeys(mnemonic, undefined, undefined, undefined, bip39);
    console.log("=======================> keys", keys.privateKey, mnemonic)
    return mnemonic;
}

/**
 * Sets the password/pin used to encrypt the created mnemonic.
 * @param password the password/pin.
 * @param mnemonic the mnemonic to be encrypted and stored.
 */
export async function setEncryptionPassword(password: string, mnemonic: string) {
  const storedItem = await storeMnemonic(mnemonic, password);
}

/**
 * Encrypt and store the mnemonic given a password.
 * @param mnemonic the mnemonic string.
 * @param password the string used to encrypt the mnemonic before storage.
 * @returns the result of the storage action.
 */
export async function storeMnemonic(mnemonic: string, password: string) {

  password = password.trim()
  mnemonic = mnemonic.trim();

  if (password == "" || mnemonic == "") {
      throw new Error("Password or mnemonic can not be empty")
  }

  // encrypt and store the mnemonic.
  const encryptedMnemonic = await encryptMnemonic(mnemonic, password);
  const storageItem = {
          key: MNEMONIC_STORAGE_KEY,
          value: encryptedMnemonic, 
        }
  const storedItem = await storeItem(storageItem);

  return storedItem;
}


/**
 * Encrypt mnemonic.
 * @param phrase the mnemonic.
 * @param password the password used to encrypt the mnemonic.
 * @returns the encrypted mnemonic.
 */
export async function encryptMnemonic(phrase: string, password: string) {
  return CryptoJS.AES.encrypt(phrase, password).toString()
}

/**
 * Decrypts the mnemonic
 * @param encryptedMnemonic encrypted mnemonic string. 
 * @param password password used to decrypt the mnemonic.
 * @returns the decrypted mnemonic.
 */
export async function decryptMnemonic(encryptedMnemonic: string, password: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, password)
  return bytes.toString(CryptoJS.enc.Utf8)
}