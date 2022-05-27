import { 
  MnemonicLanguages,  
  invalidMnemonicWords,
  normalizeMnemonic,
  validateMnemonic,
  generateMnemonic,
  MnemonicStrength, 
  generateKeys 
} from '@celo/utils/lib/account';
import * as bip39 from 'react-native-bip39';
import CryptoJS from 'crypto-js'
import { retrieveStoredItem, storeItem } from './session.key.storage.utils';
import WakalaContractKit from '../../utils/Celo-Integration/WakalaContractKit';

/**
 * The number of words to be contained in the mnemonic.
 */
const MNEMONIC_BIT_LENGTH = MnemonicStrength.s256_24words

/**
 * The key used to store the mnemonic.
 */
const MNEMONIC_STORAGE_KEY = 'mnemonic'

/**
 * Checks if the mnemonic has duplicate words.
 */
const checkDuplicate = (someString: string) => {
    return new Set(someString.split(' ')).size !== someString.split(' ').length
}

/**
 * Picks a the language to be used for mnemonic creation.
 */
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

/**
 * Generates a new mnemonic for account creation.
 */
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
    const keys = await getAccountFromMnemonic(mnemonic);
    WakalaContractKit.createInstance(keys.privateKey);
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
 * Sets the password/pin used to encrypt the created mnemonic.
 * @param password the password/pin.
 * @param mnemonic the mnemonic to be encrypted and stored.
 */
 export async function encryptPasswordWithNewMnemonic(password: string) {
  const mnemonic = await createNewAccountWithMnemonic();
  const storedItem = await storeMnemonic(mnemonic, password);
  return mnemonic;
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

export async function getStoredMnemonic(
  password: string
): Promise<string | null> {

  try {
    const encryptedMnemonic = await retrieveStoredItem(MNEMONIC_STORAGE_KEY);
    if (!encryptedMnemonic) {
      throw new Error('No mnemonic found in storage');
    }
    return decryptMnemonic(encryptedMnemonic, password);
  } catch (error) {
    return null
  }
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


/**
 * Checks if a mnemonic is valid or not.
 * @param phrase the mnemonic to be validated.
 * @returns true if valid
 */
export function isMnemonicValid(phrase: string) {
  const normalizedPhrase = normalizeMnemonic(phrase)
  const phraseIsValid = validateMnemonic(normalizedPhrase, bip39)
  const invalidWords = phraseIsValid ? [] : invalidMnemonicWords(normalizedPhrase)

  return phraseIsValid;
}


/**
 * Creates an account given a mnemonic.
 * @param mnemonic the mnemonic string.
 */
export function getAccountFromMnemonic(mnemonic: string) {
  const keys = generateKeys(mnemonic, undefined,  undefined, undefined, bip39);
  return keys;
}



export async function fetchTokenBalanceInWeiWithRetry(token: Currency, account: string) {
  const tokenContract = await getTokenContract(token)
  // Retry needed here because it's typically the app's first tx and seems to fail on occasion
  // TODO consider having retry logic for ALL contract calls and txs. ContractKit should have this logic.
  const balanceInWei = await retryAsync(tokenContract.balanceOf, 3, [account])
  Logger.debug(
    TAG + '@fetchTokenBalanceInWeiWithRetry',
    `Account ${account} ${token} balance: ${balanceInWei.toString()}`
  )
  return balanceInWei
}